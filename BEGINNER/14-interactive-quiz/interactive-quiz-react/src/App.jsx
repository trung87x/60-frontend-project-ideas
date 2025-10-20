import React, { useMemo, useState } from 'react'

const QUESTIONS = [
  { id:1, text:'Thủ đô của Việt Nam là?', options:['Hà Nội','TP.HCM','Đà Nẵng','Huế'], answer:0 },
  { id:2, text:'2 + 2 = ?', options:['3','4','5','22'], answer:1 },
  { id:3, text:'Ngôn ngữ dùng cho style web?', options:['HTML','CSS','SQL','Python'], answer:1 }
]

export default function App(){
  const [idx, setIdx] = useState(0)
  const [picks, setPicks] = useState(Array(QUESTIONS.length).fill(null))
  const done = useMemo(()=> picks.every(v => v !== null), [picks])
  const score = useMemo(()=> picks.reduce((s, v, i) => s + (v === QUESTIONS[i].answer ? 1 : 0), 0), [picks])

  const q = QUESTIONS[idx]
  const choose = (i) => setPicks(p => { const n=[...p]; n[idx]=i; return n })

  return (
    <main style={{maxWidth:840, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>🧠 Interactive Quiz — React (Cấp 4)</h1>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
        <div style={{flex:1,height:10,background:'#0b1220',border:'1px solid #1f2937',borderRadius:999,overflow:'hidden'}}>
          <div style={{height:'100%',background:'#2563eb',width: (idx/(QUESTIONS.length-1))*100 + '%'}}/>
        </div>
        <span style={{opacity:.7}}>Câu {idx+1} / {QUESTIONS.length}</span>
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
        <button onClick={()=>setIdx(i=>Math.min(QUESTIONS.length-1,i+1))}>Tiếp</button>
        <button onClick={()=>alert(done?`Điểm: ${score}/${QUESTIONS.length}`:'Hãy trả lời hết các câu!')}>Nộp bài</button>
      </div>
    </main>
  )
}
