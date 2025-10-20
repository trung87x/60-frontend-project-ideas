import React, { useEffect, useState } from 'react'
import { useCountdown } from './useCountdown'

const KEY = 'countdown.targetDate'

export default function App(){
  const [target, setTarget] = useState(() => localStorage.getItem(KEY) || '')
  const { d,h,m,s,isExpired } = useCountdown(target)

  useEffect(()=>{ if(target) localStorage.setItem(KEY, target) }, [target])

  return (
    <main style={{maxWidth:800, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>⏳ Countdown — Cấp 5 (Hook + LocalStorage)</h1>
      <label>Chọn thời điểm kết thúc:</label>
      <input type="datetime-local" value={target} onChange={e=>setTarget(e.target.value)} style={{display:'block',width:'100%',padding:10,margin:'8px 0 12px'}} />
      {isExpired && <p style={{color:'#b91c1c'}}>⏰ Hết giờ!</p>}
      <section style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
        {[
          ['Ngày',d],['Giờ',h],['Phút',m],['Giây',s]
        ].map(([lbl,val])=> (
          <div key={lbl} style={{border:'1px solid #ccc', borderRadius:12, padding:12, textAlign:'center'}}>
            <span style={{display:'block', fontSize:28, fontWeight:700}}>{val}</span>
            <span style={{display:'block', fontSize:12, opacity:.7}}>{lbl}</span>
          </div>
        ))}
      </section>
      <div style={{marginTop:12}}>
        <button onClick={()=>{ setTarget(''); localStorage.removeItem(KEY) }}>Reset</button>
      </div>
    </main>
  )
}
