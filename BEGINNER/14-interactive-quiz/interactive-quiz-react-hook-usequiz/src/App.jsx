import React from 'react'
import { useQuiz } from './useQuiz'

export default function App(){
  const { data, idx, setIdx, picks, choose, done, score, reset } = useQuiz()
  const q = data[idx]
  return (
    <main style={{maxWidth:880, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>🧠 Interactive Quiz — Cấp 5 (useQuiz + lưu tiến trình)</h1>
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
        <button onClick={reset}>Làm lại</button>
      </div>
      {done && (
        <section style={{marginTop:16}}>
          <h3>🔍 Xem lại đáp án</h3>
          <ul>
            {data.map((qq,i)=>(
              <li key={qq.id} style={{marginBottom:6}}>
                <b>Câu {i+1}:</b> {qq.text} —
                <span> Bạn chọn: {qq.options[picks[i]] ?? '—'};</span>
                <span> Đúng: <b>{qq.options[qq.answer]}</b></span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
