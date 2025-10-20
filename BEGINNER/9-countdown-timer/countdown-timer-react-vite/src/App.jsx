import React, { useEffect, useRef, useState } from 'react'

function pad(n){ return String(n).padStart(2,'0') }

export default function App(){
  const [target, setTarget] = useState('')
  const [time, setTime] = useState({ d:'00', h:'00', m:'00', s:'00' })
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(()=>{
    if(!running) return
    const tick = ()=>{
      if(!target) return
      const t = new Date(target).getTime(), now = Date.now()
      let diff = Math.max(0, t - now)
      const d = Math.floor(diff/86400000); diff-=d*86400000
      const h = Math.floor(diff/3600000);  diff-=h*3600000
      const m = Math.floor(diff/60000);    diff-=m*60000
      const s = Math.floor(diff/1000)
      setTime({ d:pad(d), h:pad(h), m:pad(m), s:pad(s) })
      if(t - now <= 0){ setRunning(false) }
    }
    tick()
    timerRef.current = setInterval(tick, 1000)
    return ()=> clearInterval(timerRef.current)
  }, [running, target])

  return (
    <main style={{maxWidth:800, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>⏳ Countdown — React (Cấp 4)</h1>
      <label>Chọn thời điểm kết thúc:</label>
      <input type="datetime-local" value={target} onChange={e=>setTarget(e.target.value)} style={{display:'block',width:'100%',padding:10,margin:'8px 0 12px'}} />
      <div style={{display:'flex', gap:12, margin:'8px 0 12px'}}>
        <button onClick={()=>setRunning(true)}>Start</button>
        <button onClick={()=>setRunning(false)}>Stop</button>
        <button onClick={()=>{ setRunning(false); setTarget(''); setTime({d:'00',h:'00',m:'00',s:'00'}) }}>Reset</button>
      </div>
      <section id="timer" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
        {['d','h','m','s'].map((k,i)=> (
          <div key={i} style={{border:'1px solid #ccc', borderRadius:12, padding:12, textAlign:'center'}}>
            <span style={{display:'block', fontSize:28, fontWeight:700}}>{time[k]}</span>
            <span style={{display:'block', fontSize:12, opacity:.7}}>
              {k==='d'?'Ngày':k==='h'?'Giờ':k==='m'?'Phút':'Giây'}
            </span>
          </div>
        ))}
      </section>
    </main>
  )
}
