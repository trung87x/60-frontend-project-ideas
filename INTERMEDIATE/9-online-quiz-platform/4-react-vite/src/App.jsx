import React, { useEffect, useMemo, useState } from 'react'

function Question({ q, pick, onPick }){
  return (
    <article style={{background:'#161a2b',borderRadius:16,padding:16}}>
      <div style={{opacity:.8,fontSize:14}}>Chủ đề: {q.category}</div>
      <h3 style={{margin:'8px 0'}}>{q.text}</h3>
      <div style={{display:'grid',gap:8}}>
        {q.choices.map((ch,i)=> (
          <button key={i} onClick={()=>onPick(i)} style={{textAlign:'left',padding:'10px 12px',borderRadius:12,border:'1px solid #283055', background: pick==null?'#0f1220': i===q.answer? '#0a2e1a':'#2e0a0a'}}>{ch}</button>
        ))}
      </div>
      {pick!=null && <div style={{opacity:.8, marginTop:8}}>Giải thích: {q.explain}</div>}
    </article>
  )
}

export default function App(){
  const [data, setData] = useState(null)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [left, setLeft] = useState(90)

  useEffect(()=>{ fetch('/questions.json').then(r=>r.json()).then(setData) }, [])
  useEffect(()=>{ const t = setInterval(()=> setLeft(s=> Math.max(0, s-1)), 1000); return ()=> clearInterval(t) }, [])

  const pool = data?.questions || []
  const q = pool[idx]
  const score = useMemo(()=> Object.entries(answers).reduce((acc,[id,p]) => {
    const qq = pool.find(x=>x.id===id); return acc + (qq && qq.answer===p ? 1 : 0)
  }, 0), [answers, pool])

  function onPick(i){
    if(q && answers[q.id] == null) setAnswers(a => ({...a, [q.id]: i}))
  }

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:'24px 0'}}>
      <header style={{textAlign:'center',padding:24}}>
        <h1>🧠 Quiz — React</h1>
        <div>⏱ {left}s • Điểm: {score}/{pool.length}</div>
      </header>
      <main style={{width:'min(900px,92vw)',margin:'0 auto'}}>
        {!q ? <p>Đang tải...</p> : (
          <>
            <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
              <button onClick={()=> setIdx(i=> Math.max(0, i-1))}>←</button>
              <div>Câu {idx+1}/{pool.length}</div>
              <button onClick={()=> setIdx(i=> Math.min(pool.length-1, i+1))}>→</button>
            </div>
            <Question q={q} pick={answers[q.id]} onPick={onPick} />
          </>
        )}
      </main>
    </div>
  )
}
