import React from 'react'
import useTimer, { formatHMS } from '../hooks/useTimer.js'

const clamp=(n,min,max)=>Math.min(max,Math.max(min,n))

export default function TimerCard({ onRemove }){
  const { minutes, seconds, setMinutes, setSeconds, running, left, start, pause, reset } = useTimer(1,30)

  return (
    <section className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <h3 style={{margin:0}}>Timer</h3>
        <button className="button" onClick={onRemove}>✖</button>
      </div>
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8}}>
        <label className="muted">Phút
          <input className="input" type="number" min="0" step="1" value={minutes} onChange={e=>setMinutes(clamp(parseInt(e.target.value||'0',10),0,99))} disabled={running} />
        </label>
        <label className="muted">Giây
          <input className="input" type="number" min="0" max="59" step="1" value={seconds} onChange={e=>setSeconds(clamp(parseInt(e.target.value||'0',10),0,59))} disabled={running} />
        </label>
      </div>
      <div className="display" aria-live="polite">{formatHMS(left)}</div>
      <div className="row-3">
        <button className="button" onClick={start} disabled={running}>Start</button>
        <button className="button" onClick={pause} disabled={!running}>Pause</button>
        <button className="button" onClick={reset} disabled={running}>Reset</button>
      </div>
    </section>
  )
}
