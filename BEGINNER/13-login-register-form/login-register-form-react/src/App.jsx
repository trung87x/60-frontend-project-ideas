import React, { useState } from 'react'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function App(){
  const [tab, setTab] = useState('login')
  const [login, setLogin] = useState({ email:'', password:'' })
  const [reg, setReg] = useState({ name:'', email:'', password:'' })
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState({})

  const validateLogin = () => {
    const e = {}
    if(!emailRe.test(login.email)) e.loginEmail = 'Email không hợp lệ'
    if((login.password||'').length < 6) e.loginPass = 'Mật khẩu >= 6 ký tự'
    setErrors(e); return Object.keys(e).length===0
  }
  const validateReg = () => {
    const e = {}
    if((reg.name||'').trim().length < 2) e.regName = 'Tên >= 2 ký tự'
    if(!emailRe.test(reg.email)) e.regEmail = 'Email không hợp lệ'
    if((reg.password||'').length < 6) e.regPass = 'Mật khẩu >= 6 ký tự'
    setErrors(e); return Object.keys(e).length===0
  }

  async function onLogin(ev){
    ev.preventDefault(); setStatus(''); if(!validateLogin()) return
    await new Promise(r=>setTimeout(r,500))
    setStatus('✅ Đăng nhập (mock)')
  }
  async function onRegister(ev){
    ev.preventDefault(); setStatus(''); if(!validateReg()) return
    await new Promise(r=>setTimeout(r,500))
    setStatus('✅ Tạo tài khoản (mock)')
    setReg({ name:'', email:'', password:'' })
  }

  return (
    <main style={{maxWidth:920, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>🔐 Login & Register — React (Cấp 4)</h1>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <button onClick={()=>setTab('login')}>Đăng nhập</button>
        <button onClick={()=>setTab('register')}>Đăng ký</button>
      </div>
      {tab==='login' ? (
        <form onSubmit={onLogin} style={{display:'grid', gap:10}}>
          <label>Email</label>
          <input value={login.email} onChange={e=>setLogin({...login, email:e.target.value})} />
          {errors.loginEmail && <p style={{color:'#fca5a5'}}>{errors.loginEmail}</p>}
          <label>Mật khẩu</label>
          <input type="password" value={login.password} onChange={e=>setLogin({...login, password:e.target.value})} />
          {errors.loginPass && <p style={{color:'#fca5a5'}}>{errors.loginPass}</p>}
          <button>Đăng nhập</button>
        </form>
      ):(
        <form onSubmit={onRegister} style={{display:'grid', gap:10}}>
          <label>Họ tên</label>
          <input value={reg.name} onChange={e=>setReg({...reg, name:e.target.value})} />
          {errors.regName && <p style={{color:'#fca5a5'}}>{errors.regName}</p>}
          <label>Email</label>
          <input type="email" value={reg.email} onChange={e=>setReg({...reg, email:e.target.value})} />
          {errors.regEmail && <p style={{color:'#fca5a5'}}>{errors.regEmail}</p>}
          <label>Mật khẩu</label>
          <input type="password" value={reg.password} onChange={e=>setReg({...reg, password:e.target.value})} />
          {errors.regPass && <p style={{color:'#fca5a5'}}>{errors.regPass}</p>}
          <button>Tạo tài khoản</button>
        </form>
      )}
      <p style={{marginTop:10}}>{status}</p>
    </main>
  )
}
