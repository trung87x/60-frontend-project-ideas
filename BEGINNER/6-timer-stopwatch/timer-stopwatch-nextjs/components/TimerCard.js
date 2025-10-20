'use client'
import useTimer, { formatHMS } from '@/lib/hooks/useTimer'

const clamp=(n,min,max)=>Math.min(max,Math.max(min,n))

export default function TimerCard({ onRemove }){
  const { minutes, seconds, setMinutes, setSeconds, running, left, start, pause, reset } = useTimer(1,30)

  return (
    <section className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="m-0 text-lg font-semibold">Timer</h3>
        {onRemove ? <button className="button" onClick={onRemove}>✖</button> : null}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <label className="text-sm text-muted grid gap-1">
          Phút
          <input className="input" type="number" min="0" step="1" value={minutes} onChange={e=>setMinutes(clamp(parseInt(e.target.value||'0',10),0,99))} disabled={running} />
        </label>
        <label className="text-sm text-muted grid gap-1">
          Giây
          <input className="input" type="number" min="0" max="59" step="1" value={seconds} onChange={e=>setSeconds(clamp(parseInt(e.target.value||'0',10),0,59))} disabled={running} />
        </label>
      </div>
      <div className="display" aria-live="polite">{formatHMS(left)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button className="button" onClick={start} disabled={running}>Start</button>
        <button className="button" onClick={pause} disabled={!running}>Pause</button>
        <button className="button" onClick={reset} disabled={running}>Reset</button>
      </div>
    </section>
  )
}
