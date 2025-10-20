'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type Q = { id:string; category:string; text:string; choices:string[]; answer:number; explain:string }

function Question({ q, pick, onPick }:{ q:Q, pick:number|null|undefined, onPick:(i:number)=>void }){
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

export default function Page(){
  const [data, setData] = useState<{categories:string[], questions:Q[]}|null>(null)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [left, setLeft] = useState(120)

  useEffect(()=>{ fetch('/api/questions').then(r=>r.json()).then(d=>{
    d.questions = d.questions.sort(()=> Math.random()-0.5)
    setData(d)
  }) }, [])
  useEffect(()=>{ const t = setInterval(()=> setLeft(s=> Math.max(0, s-1)), 1000); return ()=> clearInterval(t) }, [])

  const pool = data?.questions || []
  const q = pool[idx]
  const score = useMemo(()=> Object.entries(answers).reduce((acc,[id,p]) => {
    const qq = pool.find(x=>x.id===id); return acc + (qq && qq.answer===p ? 1 : 0)
  }, 0), [answers, pool])

  function pick(i:number){ if(q && answers[q.id]==null) setAnswers(a => ({...a, [q.id]: i})) }

  return (
    <div style={{maxWidth:900, margin:'0 auto'}}>
      <header style={{textAlign:'center', marginBottom:12}}>
        <h1>🧠 Quiz — Next.js</h1>
        <div>⏱ {left}s • Điểm: {score}/{pool.length}</div>
      </header>
      {!q ? <p>Đang tải...</p> : (
        <>
          <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
            <button onClick={()=> setIdx(i=> Math.max(0, i-1))}>←</button>
            <div>Câu {idx+1}/{pool.length}</div>
            <button onClick={()=> setIdx(i=> Math.min(pool.length-1, i+1))}>→</button>
            <Link href={{ pathname:'/result', query:{ score, total: pool.length } }} style={{marginLeft:'auto',background:'linear-gradient(90deg,#7c3aed,#06b6d4)',color:'#fff',padding:'6px 10px',borderRadius:8,textDecoration:'none'}}>Nộp bài</Link>
          </div>
          <Question q={q} pick={answers[q.id]} onPick={pick} />
        </>
      )}
    </div>
  )
}
