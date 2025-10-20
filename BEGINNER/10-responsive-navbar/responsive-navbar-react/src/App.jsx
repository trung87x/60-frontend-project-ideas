import React, { useState } from 'react'

function Navbar(){
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  return (
    <header style={{position:'sticky',top:0,background:'#111827',borderBottom:'1px solid #1f2937',padding:'10px 16px',color:'#e5e7eb',display:'flex',gap:12,alignItems:'center'}}>
      <div style={{fontWeight:700}}>MySite</div>
      <button onClick={()=>setOpen(!open)} style={{marginLeft:'auto'}} className="md:hidden">☰</button>
      <nav style={{marginLeft:'auto', display: open? 'flex':'none', flexDirection:'column', gap:8}} className="md:flex md:flex-row md:gap-2">
        <a href="#">Home</a>
        <div style={{position:'relative'}}>
          <button onClick={()=>setDrop(!drop)}>Services ▾</button>
          {drop && (
            <div style={{position:'absolute',left:0,top:'calc(100% + 6px)',background:'#0b1220',border:'1px solid #1f2937',borderRadius:10,minWidth:180}}>
              <a href="#" style={{display:'block',padding:'8px 12px'}}>Design</a>
              <a href="#" style={{display:'block',padding:'8px 12px'}}>Dev</a>
              <a href="#" style={{display:'block',padding:'8px 12px'}}>SEO</a>
            </div>
          )}
        </div>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  )
}

export default function App(){
  return (
    <main style={{maxWidth:960,margin:'40px auto',padding:16,fontFamily:'system-ui'}}>
      <Navbar />
      <h1>🧭 Responsive Navbar — React (Cấp 4)</h1>
      <p>Component Navbar có hamburger & dropdown.</p>
      <div style={{height:800}} />
    </main>
  )
}
