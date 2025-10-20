import React from 'react'

const pad = (n, w=2) => String(n).padStart(w,'0')
const formatTime = (ms) => {
  const sign = ms < 0 ? '-' : ''
  ms = Math.abs(ms)
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const ms3 = Math.floor(ms % 1000)
  return `${sign}${pad(h)}:${pad(m)}:${pad(s)}.${String(ms3).padStart(3,'0')}`
}

export default function Stopwatch(){
  const [running, setRunning] = React.useState(false)
  const [elapsed, setElapsed] = React.useState(0) // accumulated while paused
  const [now, setNow] = React.useState(0) // trigger re-render while running

  const startAtRef = React.useRef(null)
  const rafRef = React.useRef(null)

  const displayMs = running ? (elapsed + (Date.now() - startAtRef.current)) : elapsed

  React.useEffect(() => {
    if (!running) return
    const tick = () => { setNow(Date.now()); rafRef.current = requestAnimationFrame(tick) }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running])

  const start = () => {
    if (running) return
    startAtRef.current = Date.now()
    setRunning(true)
  }
  const pause = () => {
    if (!running) return
    cancelAnimationFrame(rafRef.current)
    setElapsed((e) => e + (Date.now() - startAtRef.current))
    setRunning(false)
  }
  const reset = () => {
    cancelAnimationFrame(rafRef.current)
    setRunning(false)
    setElapsed(0)
  }
  const lap = () => {
    const ms = running ? (elapsed + (Date.now() - startAtRef.current)) : elapsed
    setLaps((ls) => [{ idx: ls.length + 1, ms }, ...ls])
  }

  const [laps, setLaps] = React.useState([])

  return (
    <section className="panel">
      <h2>Stopwatch (Bấm giờ)</h2>
      <div aria-live="polite" className="display">{formatTime(displayMs)}</div>
      <div className="grid cols-4" style={{marginTop:10}}>
        <button className="button" onClick={start} disabled={running}>Start</button>
        <button className="button" onClick={pause} disabled={!running}>Pause</button>
        <button className="button" onClick={reset} disabled={running && elapsed===0}>Reset</button>
        <button className="button" onClick={lap} disabled={!running}>Lap</button>
      </div>
      <ul className="list">
        {laps.map(l => (
          <li key={l.idx} className="list-item">
            <span className="muted">Lap {l.idx}</span>
            <strong>{formatTime(l.ms)}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}
