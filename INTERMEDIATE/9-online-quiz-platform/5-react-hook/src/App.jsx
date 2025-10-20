import React from 'react'
import { useQuiz } from './useQuiz.js'

function Question({ q, pick, onPick }){
  return (
    <article style={{background:'#161a2b',borderRadius:16,padding:16}}>
      <div style={{opacity:.8,fontSize:14}}>Chủ đề: {q.category}</div>
      <h3 style={{margin:'8px 0'}}>{q.text}</h3>
      <div style={{display:'grid',gap:8}}>
        {q.choices.map((ch,i)=> (
          <button key={i} onClick={()=>onPick(i)} style={{textAlign:'left',padding:'10px 12px',borderRadius:12,border:'1px solid #283055'}}>{ch}</button>
        ))}
      </div>
      {pick!=null && <div style={{opacity:.8, marginTop:8}}>Giải thích: {q.explain}</div>}
    </article>
  )
}

export default function App(){
  const { pool, q, idx, setIdx, left, score, answers, pick, reset } = useQuiz()

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:'24px 0'}}>
      <header style={{textAlign:'center',padding:24}}>
        <h1>🧠 Quiz — Hook + shuffle + lưu</h1>
        <div>⏱ {left}s • Điểm: {score}/{pool.length}</div>
      </header>
      <main style={{width:'min(900px,92vw)',margin:'0 auto'}}>
        {!q ? <p>Đang tải...</p> : (
          <>
            <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
              <button onClick={()=> setIdx(i=> Math.max(0, i-1))}>←</button>
              <div>Câu {idx+1}/{pool.length}</div>
              <button onClick={()=> setIdx(i=> Math.min(pool.length-1, i+1))}>→</button>
              <button onClick={reset} style={{marginLeft:'auto'}}>Làm lại</button>
            </div>
            <Question q={q} pick={answers[q.id]} onPick={pick} />
            <details style={{marginTop:12}}>
              <summary>Xem đáp án đã chọn</summary>
              <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(answers, null, 2)}</pre>
            </details>
          </>
        )}
      </main>
    </div>
  )
}
