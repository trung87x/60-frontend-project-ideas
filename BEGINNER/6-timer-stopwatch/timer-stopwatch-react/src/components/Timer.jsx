import React from 'react'

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
const pad = (n, w=2) => String(n).padStart(w,'0')
const formatHMS = (ms) => {
  const sign = ms < 0 ? '-' : ''
  ms = Math.abs(ms)
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${sign}${pad(h)}:${pad(m)}:${pad(s)}`
}

export default function Timer(){
  const [min, setMin] = React.useState(1)
  const [sec, setSec] = React.useState(30)

  const [running, setRunning] = React.useState(false)
  const [left, setLeft] = React.useState((1*60 + 30) * 1000)
  const endAtRef = React.useRef(null)
  const rafRef = React.useRef(null)

  const totalMs = React.useMemo(() => (clamp(min,0,99) * 60 + clamp(sec,0,59)) * 1000, [min, sec])

  React.useEffect(() => {
    if (running) return
    setLeft(totalMs)
  }, [totalMs, running])

  React.useEffect(() => {
    if (!running) return
    const tick = () => {
      const l = Math.max(0, endAtRef.current - Date.now())
      setLeft(l)
      if (l <= 0){
        setRunning(false)
        try {
          const old = document.title; document.title = '⏰ Hết giờ!'; setTimeout(()=>document.title=old,1500)
        } catch {}
        alert('⏰ Hết giờ!')
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running])

  const start = () => {
    if (running) return
    const base = left > 0 ? left : totalMs
    if (base <= 0){ alert('Vui lòng nhập thời gian lớn hơn 0'); return }
    endAtRef.current = Date.now() + base
    setRunning(true)
  }
  const pause = () => {
    if (!running) return
    cancelAnimationFrame(rafRef.current)
    setLeft(Math.max(0, endAtRef.current - Date.now()))
    setRunning(false)
  }
  const reset = () => {
    cancelAnimationFrame(rafRef.current)
    setRunning(false)
    setLeft(totalMs)
  }

  return (
    <section className="panel">
      <h2>Timer (Đếm ngược)</h2>
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10}}>
        <label className="muted">Phút
          <input className="input" type="number" min="0" step="1" value={min} onChange={e=>setMin(clamp(parseInt(e.target.value||'0',10),0,99))} disabled={running} />
        </label>
        <label className="muted">Giây
          <input className="input" type="number" min="0" max="59" step="1" value={sec} onChange={e=>setSec(clamp(parseInt(e.target.value||'0',10),0,59))} disabled={running} />
        </label>
      </div>
      <div aria-live="polite" className="display">{formatHMS(left)}</div>
      <div className="grid cols-3" style={{marginTop:10}}>
        <button className="button" onClick={start} disabled={running}>Start</button>
        <button className="button" onClick={pause} disabled={!running}>Pause</button>
        <button className="button" onClick={reset} disabled={running}>Reset</button>
      </div>
    </section>
  )
}
