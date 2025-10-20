import React, { useState } from 'react'
import { useAuth } from './useAuth'
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function App(){
  const { user, login, logout, register } = useAuth()
  const [tab, setTab] = useState('login')
  const [loginForm, setLoginForm] = useState({ email:'', password:'' })
  const [regForm, setRegForm] = useState({ name:'', email:'', password:'' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const vLogin = () => {
    const e = {}
    if(!emailRe.test(loginForm.email)) e.loginEmail = 'Email không hợp lệ'
    if((loginForm.password||'').length < 6) e.loginPass = 'Mật khẩu >= 6 ký tự'
    setErrors(e); return Object.keys(e).length===0
  }
  const vReg = () => {
    const e = {}
    if((regForm.name||'').trim().length < 2) e.regName = 'Tên >= 2 ký tự'
    if(!emailRe.test(regForm.email)) e.regEmail = 'Email không hợp lệ'
    if((regForm.password||'').length < 6) e.regPass = 'Mật khẩu >= 6 ký tự'
    setErrors(e); return Object.keys(e).length===0
  }

  const onLogin = (ev)=>{ ev.preventDefault(); setStatus(''); if(!vLogin()) return; login(loginForm.email); setStatus('✅ Đăng nhập (local)') }
  const onRegister = (ev)=>{ ev.preventDefault(); setStatus(''); if(!vReg()) return; register(regForm.name, regForm.email); setRegForm({name:'',email:'',password:''}); setStatus('✅ Đăng ký (local)') }

  return (
    <main style={{maxWidth:920, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>🔐 Login & Register — Cấp 5 (useAuth + localStorage)</h1>
      {user ? (
        <section style={{display:'grid', gap:8}}>
          <p>Xin chào: <b>{user.email}</b></p>
          <button onClick={logout}>Đăng xuất</button>
        </section>
      ) : (
        <>
          <div style={{display:'flex', gap:8, marginBottom:12}}>
            <button onClick={()=>setTab('login')}>Đăng nhập</button>
            <button onClick={()=>setTab('register')}>Đăng ký</button>
          </div>
          {tab==='login' ? (
            <form onSubmit={onLogin} style={{display:'grid', gap:10}}>
              <label>Email</label>
              <input value={loginForm.email} onChange={e=>setLoginForm({...loginForm, email:e.target.value})} />
              {errors.loginEmail && <p style={{color:'#fca5a5'}}>{errors.loginEmail}</p>}
              <label>Mật khẩu</label>
              <input type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm, password:e.target.value})} />
              {errors.loginPass && <p style={{color:'#fca5a5'}}>{errors.loginPass}</p>}
              <button>Đăng nhập</button>
            </form>
          ):(
            <form onSubmit={onRegister} style={{display:'grid', gap:10}}>
              <label>Họ tên</label>
              <input value={regForm.name} onChange={e=>setRegForm({...regForm, name:e.target.value})} />
              {errors.regName && <p style={{color:'#fca5a5'}}>{errors.regName}</p>}
              <label>Email</label>
              <input type="email" value={regForm.email} onChange={e=>setRegForm({...regForm, email:e.target.value})} />
              {errors.regEmail && <p style={{color:'#fca5a5'}}>{errors.regEmail}</p>}
              <label>Mật khẩu</label>
              <input type="password" value={regForm.password} onChange={e=>setRegForm({...regForm, password:e.target.value})} />
              {errors.regPass && <p style={{color:'#fca5a5'}}>{errors.regPass}</p>}
              <button>Tạo tài khoản</button>
            </form>
          )}
          <p style={{marginTop:10}}>{status}</p>
        </>
      )}
    </main>
  )
}
