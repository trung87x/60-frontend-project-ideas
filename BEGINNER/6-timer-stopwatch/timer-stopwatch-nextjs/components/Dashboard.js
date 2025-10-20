'use client'
import { useState } from 'react'
import StopwatchCard from '@/components/StopwatchCard'
import TimerCard from '@/components/TimerCard'

let nextId = 1

export default function Dashboard(){
  const [stopwatches, setStopwatches] = useState([{ id: nextId++ }])
  const [timers, setTimers] = useState([{ id: nextId++ }])

  return (
    <div className="container py-8 grid-gap md:grid-cols-2">
      <section>
        <div className="flex items-center gap-2 mb-3">
          <button className="button" onClick={() => setStopwatches(list => [...list, { id: nextId++ }])}>+ Thêm Stopwatch</button>
          <span className="muted">{stopwatches.length} chiếc</span>
        </div>
        <div className="grid gap-4">
          {stopwatches.map(sw => (
            <StopwatchCard key={sw.id} onRemove={() => setStopwatches(list => list.filter(x => x.id !== sw.id))} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <button className="button" onClick={() => setTimers(list => [...list, { id: nextId++ }])}>+ Thêm Timer</button>
          <span className="muted">{timers.length} chiếc</span>
        </div>
        <div className="grid gap-4">
          {timers.map(tm => (
            <TimerCard key={tm.id} onRemove={() => setTimers(list => list.filter(x => x.id !== tm.id))} />
          ))}
        </div>
      </section>
    </div>
  )
}
