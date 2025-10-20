import React, { useState } from 'react'
import { useForm } from './useForm'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function App(){
  const { values, setField, errors, setErrors, clear } = useForm({ name:'', email:'', message:'', agree:false })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if(values.name.trim().length < 2) e.name = 'Tên phải >= 2 ký tự'
    if(!emailRe.test(values.email)) e.email = 'Email không hợp lệ'
    if(values.message.trim().length < 10) e.message = 'Nội dung phải >= 10 ký tự'
    if(!values.agree) e.agree = 'Bạn cần đồng ý điều khoản'
    setErrors(e); return Object.keys(e).length===0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault(); setStatus('')
    if(!validate()) return
    setLoading(true)
    await new Promise(r=>setTimeout(r, 800))
    setStatus('✅ Đã gửi thành công (mock)!')
    clear()
    setLoading(false)
  }

  return (
    <main style={{maxWidth:720, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>📨 Contact Form — Cấp 5 (useForm + draft)</h1>
      <form onSubmit={onSubmit} noValidate style={{display:'grid', gap:10}}>
        <label>Họ tên</label>
        <input value={values.name} onChange={e=>setField('name', e.target.value)} />
        {errors.name && <p style={{color:'#fca5a5', marginTop:-4}}>{errors.name}</p>}

        <label>Email</label>
        <input type="email" value={values.email} onChange={e=>setField('email', e.target.value)} />
        {errors.email && <p style={{color:'#fca5a5', marginTop:-4}}>{errors.email}</p>}

        <label>Nội dung</label>
        <textarea rows={5} value={values.message} onChange={e=>setField('message', e.target.value)} />
        {errors.message && <p style={{color:'#fca5a5', marginTop:-4}}>{errors.message}</p>}

        <label style={{display:'flex', alignItems:'center', gap:8}}>
          <input type="checkbox" checked={values.agree} onChange={e=>setField('agree', e.target.checked)} />
          Tôi đồng ý với điều khoản
        </label>
        {errors.agree && <p style={{color:'#fca5a5', marginTop:-4}}>{errors.agree}</p>}

        <button disabled={loading} type="submit">{loading?'Đang gửi...':'Gửi'}</button>
        <p aria-live="polite">{status}</p>
      </form>
    </main>
  )
}
