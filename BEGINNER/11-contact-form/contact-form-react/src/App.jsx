import React, { useState } from 'react'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function App(){
  const [form, setForm] = useState({ name:'', email:'', message:'', agree:false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if(form.name.trim().length < 2) e.name = 'Tên phải >= 2 ký tự'
    if(!emailRe.test(form.email)) e.email = 'Email không hợp lệ'
    if(form.message.trim().length < 10) e.message = 'Nội dung phải >= 10 ký tự'
    if(!form.agree) e.agree = 'Bạn cần đồng ý điều khoản'
    setErrors(e)
    return Object.keys(e).length===0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    setStatus(''); if(!validate()) return
    setLoading(true)
    await new Promise(r=>setTimeout(r, 800))
    setStatus('✅ Đã gửi thành công (mock)!')
    setForm({ name:'', email:'', message:'', agree:false })
    setLoading(false)
  }

  return (
    <main style={{maxWidth:720, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>📨 Contact Form — React (Cấp 4)</h1>
      <form onSubmit={onSubmit} noValidate style={{display:'grid', gap:10}}>
        <label>Họ tên</label>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        {errors.name && <p style={{color:'#fca5a5', marginTop:-4}}>{errors.name}</p>}

        <label>Email</label>
        <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        {errors.email && <p style={{color:'#fca5a5', marginTop:-4}}>{errors.email}</p>}

        <label>Nội dung</label>
        <textarea rows={5} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
        {errors.message && <p style={{color:'#fca5a5', marginTop:-4}}>{errors.message}</p>}

        <label style={{display:'flex', alignItems:'center', gap:8}}>
          <input type="checkbox" checked={form.agree} onChange={e=>setForm({...form, agree:e.target.checked})} />
          Tôi đồng ý với điều khoản
        </label>
        {errors.agree && <p style={{color:'#fca5a5', marginTop:-4}}>{errors.agree}</p>}

        <button disabled={loading} type="submit">{loading?'Đang gửi...':'Gửi'}</button>
        <p aria-live="polite">{status}</p>
      </form>
    </main>
  )
}
