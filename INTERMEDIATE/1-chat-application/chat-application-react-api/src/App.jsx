import React, { useEffect, useRef, useState } from 'react'

function useLocalStorage(key, initial){
  const [state, setState] = useState(()=>{
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : initial
  })
  useEffect(()=>{ localStorage.setItem(key, JSON.stringify(state)) }, [key, state])
  return [state, setState]
}

async function fetchBotScript(){
  const res = await fetch('/botscript.json')
  return await res.json()
}

function botAnswer(script, userText){
  const t = userText.toLowerCase()
  const time = new Date().toLocaleTimeString()
  for(const it of script.intents){
    if(t.includes(it.keyword)){
      return it.reply.replace('${time}', time).replace('${text}', userText)
    }
  }
  return script.fallback.replace('${text}', userText)
}

function Row({ text, me }){
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

export default function App(){
  const [script, setScript] = useState(null)
  const [msgs, setMsgs] = useLocalStorage('chat-level5', [{text:'Xin chào! Đây là Level 5 — React + API JSON + localStorage.', me:false}])
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(()=>{ fetchBotScript().then(setScript) }, [])

  function send(){
    const t = input.trim(); if(!t) return
    setMsgs(m => [...m, {text:t, me:true}])
    setInput('')
    setTimeout(()=>{
      const ans = script ? botAnswer(script, t) : '...'
      setMsgs(m => [...m, {text:ans, me:false}])
    }, 300)
  }

  useEffect(()=>{
    const el = listRef.current
    if(el) el.scrollTop = el.scrollHeight
  }, [msgs])

  return (
    <div style={{
      minHeight:'100dvh',display:'grid',placeItems:'center',
      background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:24
    }}>
      <section style={{width:'min(900px,96vw)',height:'80dvh',display:'grid',gridTemplateRows:'auto 1fr auto',gap:12}}>
        <header style={{display:'flex',gap:12,alignItems:'center',background:'#0b1020',border:'1px solid #242b55',borderRadius:14,padding:'10px 12px'}}>
          <img alt="bot" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop" style={{width:32,height:32,borderRadius:999,objectFit:'cover'}}/>
          <div><div style={{fontWeight:700}}>Bot Script</div><div style={{opacity:.7,fontSize:12}}>fetch /botscript.json</div></div>
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
