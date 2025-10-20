'use client'
import { useEffect, useRef, useState } from 'react'

const pad = (n:number)=> String(n).padStart(2,'0')

export default function Page(){
  const [target, setTarget] = useState('')
  const [time, setTime] = useState({d:'00',h:'00',m:'00',s:'00'})
  const ref = useRef<any>(null)

  useEffect(()=>{
    if(!target) return
    const tick = ()=>{
      const t = new Date(target).getTime(), now = Date.now()
      let diff = Math.max(0, t - now)
      const d = Math.floor(diff/86400000); diff-=d*86400000
      const h = Math.floor(diff/3600000);  diff-=h*3600000
      const m = Math.floor(diff/60000);    diff-=m*60000
      const s = Math.floor(diff/1000)
      setTime({ d:pad(d), h:pad(h), m:pad(m), s:pad(s) })
    }
    tick()
    ref.current = setInterval(tick, 1000)
    return ()=> clearInterval(ref.current)
  }, [target])

  return (
    <main style={{maxWidth:800, margin:'40px auto', padding:24}}>
      <h1>⏳ Countdown — Next.js (Cấp 6)</h1>
      <label>Chọn thời điểm kết thúc:</label>
      <input type="datetime-local" value={target} onChange={(e)=>setTarget((e.target as HTMLInputElement).value)} style={{display:'block',width:'100%',padding:10,margin:'8px 0 12px'}} />
      <section style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
        {Object.entries({Ngày:time.d, Giờ:time.h, Phút:time.m, Giây:time.s}).map(([k,v])=> (
          <div key={k} style={{border:'1px solid #ccc', borderRadius:12, padding:12, textAlign:'center'}}>
            <span style={{display:'block', fontSize:28, fontWeight:700}}>{v}</span>
            <span style={{display:'block', fontSize:12, opacity:.7}}>{k}</span>
          </div>
        ))}
      </section>
    </main>
  )
}
