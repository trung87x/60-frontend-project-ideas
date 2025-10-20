import React from 'react'
import useStopwatch, { formatTime } from '../hooks/useStopwatch.js'

export default function StopwatchCard({ onRemove }) {
  const { ms, running, start, pause, reset } = useStopwatch(0)
  const [laps, setLaps] = React.useState([])

  const lap = () => setLaps(ls => [{ idx: ls.length + 1, ms }, ...ls])

  return (
    <section className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <h3 style={{margin:0}}>Stopwatch</h3>
        <button className="button" onClick={onRemove}>✖</button>
      </div>
      <div className="display" aria-live="polite">{formatTime(ms)}</div>
      <div className="row">
        <button className="button" onClick={start} disabled={running}>Start</button>
        <button className="button" onClick={pause} disabled={!running}>Pause</button>
        <button className="button" onClick={reset} disabled={running}>Reset</button>
        <button className="button" onClick={lap} disabled={!running}>Lap</button>
      </div>
      <ul className="list">
        {laps.map(l => (
          <li key={l.idx} className="item">
            <span className="badge">Lap {l.idx}</span>
            <strong>{formatTime(l.ms)}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}
