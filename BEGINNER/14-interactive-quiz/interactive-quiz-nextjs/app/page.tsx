'use client'
import { useEffect, useMemo, useState } from 'react'

type Q = { id:number, text:string, options:string[], answer:number }

export default function Page(){
  const [data, setData] = useState<Q[]>([])
  const [idx, setIdx] = useState(0)
  const [picks, setPicks] = useState<number[]>([])
  const done = useMemo(()=> data.length>0 && picks.length===data.length && picks.every(v => v !== null && v !== undefined), [picks, data])
  const score = useMemo(()=> data.reduce((s,q,i)=> s + (picks[i]===q.answer?1:0), 0), [picks, data])

  useEffect(()=>{
    fetch('/api/questions', { cache:'no-store' }).then(r=>r.json()).then(j=>{
      setData(j.questions); setPicks(Array(j.questions.length).fill(null))
    })
  }, [])

  const q = data[idx]
  const choose = (i:number) => setPicks(p => { const n=[...p]; n[idx]=i; return n })

  return (
    <main style={{maxWidth:880, margin:'40px auto', padding:24}}>
      <h1>🧠 Interactive Quiz — Next.js (Cấp 6)</h1>
      {!q ? <p>Đang tải câu hỏi…</p> : (
        <>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
            <div style={{flex:1,height:10,background:'#0b1220',border:'1px solid #1f2937',borderRadius:999,overflow:'hidden'}}>
              <div style={{height:'100%',background:'#2563eb',width: (idx/(data.length-1))*100 + '%'}}/>
            </div>
            <span style={{opacity:.7}}>Câu {idx+1} / {data.length}</span>
          </div>
          <h2>{q.text}</h2>
          <ul style={{listStyle:'none',padding:0,display:'grid',gap:8}}>
            {q.options.map((opt,i)=>(
              <li key={i} onClick={()=>choose(i)}
                  style={{padding:12,border:'1px solid #1f2937',background:'#0b1220',borderRadius:12,cursor:'pointer', outline: picks[idx]===i?'2px solid #2563eb':'none'}}>
                {String.fromCharCode(65+i)}. {opt}
              </li>
            ))}
          </ul>
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button onClick={()=>setIdx(i=>Math.max(0,i-1))}>Trước</button>
            <button onClick={()=>setIdx(i=>Math.min(data.length-1,i+1))}>Tiếp</button>
            <button onClick={()=> alert(done?`Điểm: ${score}/${data.length}`:'Hãy trả lời hết các câu!') }>Nộp bài</button>
          </div>
        </>
      )}
    </main>
  )
}
