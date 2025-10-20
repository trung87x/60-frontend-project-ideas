import React, { useState } from 'react'
import { useTheme } from './useTheme'

function Navbar(){
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const { theme, setTheme } = useTheme()
  return (
    <header style={{position:'sticky',top:0,background: theme==='dark'?'#111827':'#ffffff',borderBottom:'1px solid #1f2937',padding:'10px 16px',display:'flex',gap:12,alignItems:'center'}}>
      <div style={{fontWeight:700}}>MySite</div>
      <button onClick={()=>setOpen(!open)} style={{marginLeft:'auto'}}>☰</button>
      <nav style={{marginLeft:'auto', display: open? 'flex':'none', flexDirection:'column', gap:8}}>
        <a href="#">Home</a>
        <div style={{position:'relative'}}>
          <button onClick={()=>setDrop(!drop)}>Services ▾</button>
          {drop && (
            <div style={{position:'absolute',left:0,top:'calc(100% + 6px)',background: theme==='dark'?'#0b1220':'#f1f5f9',border:'1px solid #1f2937',borderRadius:10,minWidth:180}}>
              <a href="#" style={{display:'block',padding:'8px 12px'}}>Design</a>
              <a href="#" style={{display:'block',padding:'8px 12px'}}>Dev</a>
              <a href="#" style={{display:'block',padding:'8px 12px'}}>SEO</a>
            </div>
          )}
        </div>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <button onClick={()=>setTheme(theme==='dark'?'light':'dark')}>Theme: {theme}</button>
      </nav>
    </header>
  )
}

export default function App(){
  return (
    <main style={{maxWidth:960,margin:'40px auto',padding:16,fontFamily:'system-ui'}}>
      <Navbar />
      <h1>🧭 Responsive Navbar — Cấp 5</h1>
      <p>Hook <code>useTheme()</code> lưu vào <code>localStorage</code> để ghi nhớ chế độ dark/light.</p>
      <div style={{height:800}} />
    </main>
  )
}
