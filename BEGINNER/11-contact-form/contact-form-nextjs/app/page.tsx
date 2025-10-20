'use client'
import { useState } from 'react'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Page(){
  const [form, setForm] = useState({ name:'', email:'', message:'', agree:false })
  const [errors, setErrors] = useState<Record<string,string>>({})
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: Record<string,string> = {}
    if(form.name.trim().length < 2) e.name = 'Tên phải >= 2 ký tự'
    if(!emailRe.test(form.email)) e.email = 'Email không hợp lệ'
    if(form.message.trim().length < 10) e.message = 'Nội dung phải >= 10 ký tự'
    if(!form.agree) e.agree = 'Bạn cần đồng ý điều khoản'
    setErrors(e); return Object.keys(e).length===0
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault(); setStatus(''); if(!validate()) return
    setLoading(true)
    const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    const data = await res.json()
    if(res.ok){
      setStatus('✅ ' + data.message)
      setForm({ name:'', email:'', message:'', agree:false })
    }else{
      setStatus('❌ ' + data.error)
    }
    setLoading(false)
  }

  return (
    <main style={{maxWidth:720, margin:'40px auto', padding:24}}>
      <h1>📨 Contact Form — Next.js (Cấp 6)</h1>
      <form onSubmit={onSubmit} noValidate style={{display:'grid', gap:10}}>
        <label>Họ tên</label>
        <input value={form.name} onChange={e=>setForm({...form, name:(e.target as HTMLInputElement).value})} />
        {errors.name && <p style={{color:'#b91c1c'}}>{errors.name}</p>}

        <label>Email</label>
        <input type="email" value={form.email} onChange={e=>setForm({...form, email:(e.target as HTMLInputElement).value})} />
        {errors.email && <p style={{color:'#b91c1c'}}>{errors.email}</p>}

        <label>Nội dung</label>
        <textarea rows={5} value={form.message} onChange={e=>setForm({...form, message:(e.target as HTMLTextAreaElement).value})} />
        {errors.message && <p style={{color:'#b91c1c'}}>{errors.message}</p>}

        <label style={{display:'flex', alignItems:'center', gap:8}}>
          <input type="checkbox" checked={form.agree} onChange={e=>setForm({...form, agree:(e.target as HTMLInputElement).checked})} />
          Tôi đồng ý với điều khoản
        </label>
        {errors.agree && <p style={{color:'#b91c1c'}}>{errors.agree}</p>}

        <button disabled={loading} type="submit">{loading?'Đang gửi...':'Gửi'}</button>
        <p aria-live="polite">{status}</p>
      </form>
    </main>
  )
}
