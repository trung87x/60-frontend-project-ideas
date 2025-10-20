'use client'
import useStopwatch, { formatTime } from '@/lib/hooks/useStopwatch'

export default function StopwatchCard({ onRemove }){
  const { ms, running, start, pause, reset } = useStopwatch(0)
  return (
    <section className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="m-0 text-lg font-semibold">Stopwatch</h3>
        {onRemove ? <button className="button" onClick={onRemove}>✖</button> : null}
      </div>
      <div className="display" aria-live="polite">{formatTime(ms)}</div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button className="button" onClick={start} disabled={running}>Start</button>
        <button className="button" onClick={pause} disabled={!running}>Pause</button>
        <button className="button" onClick={reset} disabled={running}>Reset</button>
        {/* Lap có thể bổ sung ở bản nâng cấp */}
      </div>
    </section>
  )
}
