'use client'
import React, { useEffect, useRef, useState } from 'react'

type Msg = { text: string; me: boolean }

function Row({ text, me }:{ text:string; me:boolean }){
  return (
    <div style={{display:'flex',justifyContent:me?'flex-end':'flex-start'}}>
      <div style={{
        maxWidth:'60ch',padding:'10px 12px',borderRadius:14,
        background: me ? 'linear-gradient(90deg,#7c3aed,#06b6d4)' : '#1f2546',
        color: me ? 'white' : '#e5e7eb'
      }}>{text}</div>
    </div>
  )
}

export default function Page(){
  const [msgs, setMsgs] = useState<Msg[]>([{text:'Xin chào! Đây là Next.js Level 6.', me:false}])
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)

  async function send(){
    const t = input.trim(); if(!t) return
    setMsgs(m => [...m, {text:t, me:true}])
    setInput('')
    const res = await fetch('/api/echo', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text: t }) })
    const data = await res.json()
    setMsgs(m => [...m, {text:data.reply, me:false}])
  }

  useEffect(()=>{
    const el = listRef.current
    if(el) el.scrollTop = el.scrollHeight
  }, [msgs])

  return (
    <div style={{display:'grid',placeItems:'center'}}>
      <section style={{width:'min(900px,96vw)',height:'80dvh',display:'grid',gridTemplateRows:'auto 1fr auto',gap:12}}>
        <header style={{display:'flex',gap:12,alignItems:'center',background:'#0b1020',border:'1px solid #242b55',borderRadius:14,padding:'10px 12px'}}>
          <img alt="bot" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop" style={{width:32,height:32,borderRadius:999,objectFit:'cover'}}/>
          <div><div style={{fontWeight:700}}>API Echo</div><div style={{opacity:.7,fontSize:12}}>/api/echo (POST)</div></div>
        </header>
        <main ref={listRef} style={{background:'#151a2f',borderRadius:16,padding:16,overflow:'auto',display:'flex',flexDirection:'column',gap:10}}>
          {msgs.map((m,i)=> <Row key={i} text={m.text} me={m.me} />)}
        </main>
        <div style={{display:'flex',gap:10}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=> e.key==='Enter' && send()} placeholder="Nhập tin nhắn..." style={{flex:1,padding:12,borderRadius:12,border:'1px solid #242b55',background:'#0b1020',color:'#e5e7eb'}}/>
          <button onClick={send} style={{padding:'12px 16px',borderRadius:12,border:'none',background:'linear-gradient(90deg,#7c3aed,#06b6d4)',color:'white'}}>Gửi</button>
        </div>
      </section>
    </div>
  )
}
