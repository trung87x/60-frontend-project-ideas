'use client'
import { useState } from 'react'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Page(){
  const [tab, setTab] = useState<'login'|'register'>('login')
  const [login, setLogin] = useState({ email:'', password:'' })
  const [reg, setReg] = useState({ name:'', email:'', password:'' })
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState<Record<string,string>>({})
  const [token, setToken] = useState<string|undefined>()

  const vLogin = () => {
    const e: Record<string,string> = {}
    if(!emailRe.test(login.email)) e.loginEmail = 'Email không hợp lệ'
    if((login.password||'').length < 6) e.loginPass = 'Mật khẩu >= 6 ký tự'
    setErrors(e); return Object.keys(e).length===0
  }
  const vReg = () => {
    const e: Record<string,string> = {}
    if((reg.name||'').trim().length < 2) e.regName = 'Tên >= 2 ký tự'
    if(!emailRe.test(reg.email)) e.regEmail = 'Email không hợp lệ'
    if((reg.password||'').length < 6) e.regPass = 'Mật khẩu >= 6 ký tự'
    setErrors(e); return Object.keys(e).length===0
  }

  async function onLogin(ev: React.FormEvent){
    ev.preventDefault(); setStatus(''); if(!vLogin()) return
    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(login) })
    const data = await res.json()
    if(res.ok){ setToken(data.token); setStatus('✅ Đăng nhập thành công') } else { setStatus('❌ ' + data.error) }
  }

  async function onRegister(ev: React.FormEvent){
    ev.preventDefault(); setStatus(''); if(!vReg()) return
    const res = await fetch('/api/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(reg) })
    const data = await res.json()
    if(res.ok){ setStatus('✅ ' + data.message); setTab('login') } else { setStatus('❌ ' + data.error) }
  }

  return (
    <main style={{maxWidth:920, margin:'40px auto', padding:24}}>
      <h1>🔐 Login & Register — Next.js (Cấp 6)</h1>
      {token && <p>Token: <code>{token}</code></p>}
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <button onClick={()=>setTab('login')}>Đăng nhập</button>
        <button onClick={()=>setTab('register')}>Đăng ký</button>
      </div>
      {tab==='login' ? (
        <form onSubmit={onLogin} style={{display:'grid', gap:10}}>
          <label>Email</label>
          <input value={login.email} onChange={e=>setLogin({...login, email:(e.target as HTMLInputElement).value})} />
          {errors.loginEmail && <p style={{color:'#b91c1c'}}>{errors.loginEmail}</p>}
          <label>Mật khẩu</label>
          <input type="password" value={login.password} onChange={e=>setLogin({...login, password:(e.target as HTMLInputElement).value})} />
          {errors.loginPass && <p style={{color:'#b91c1c'}}>{errors.loginPass}</p>}
          <button>Đăng nhập</button>
        </form>
      ) : (
        <form onSubmit={onRegister} style={{display:'grid', gap:10}}>
          <label>Họ tên</label>
          <input value={reg.name} onChange={e=>setReg({...reg, name:(e.target as HTMLInputElement).value})} />
          {errors.regName && <p style={{color:'#b91c1c'}}>{errors.regName}</p>}
          <label>Email</label>
          <input type="email" value={reg.email} onChange={e=>setReg({...reg, email:(e.target as HTMLInputElement).value})} />
          {errors.regEmail && <p style={{color:'#b91c1c'}}>{errors.regEmail}</p>}
          <label>Mật khẩu</label>
          <input type="password" value={reg.password} onChange={e=>setReg({...reg, password:(e.target as HTMLInputElement).value})} />
          {errors.regPass && <p style={{color:'#b91c1c'}}>{errors.regPass}</p>}
          <button>Tạo tài khoản</button>
        </form>
      )}
      <p style={{marginTop:10}}>{status}</p>
    </main>
  )
}
