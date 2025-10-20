import React from 'react'
import { TimersContext } from '../context/TimersContext.jsx'
import StopwatchCard from './StopwatchCard.jsx'
import TimerCard from './TimerCard.jsx'

export default function Dashboard(){
  const { stopwatches, timers, addStopwatch, addTimer, removeStopwatch, removeTimer } = React.useContext(TimersContext)

  return (
    <div className="grid cols-2">
      <section>
        <div className="toolbar">
          <button className="button" onClick={addStopwatch}>+ Thêm Stopwatch</button>
          <span className="badge">{stopwatches.length} chiếc</span>
        </div>
        <div className="grid" style={{gap:12}}>
          {stopwatches.map(sw => (
            <StopwatchCard key={sw.id} onRemove={()=>removeStopwatch(sw.id)} />
          ))}
        </div>
      </section>

      <section>
        <div className="toolbar">
          <button className="button" onClick={addTimer}>+ Thêm Timer</button>
          <span className="badge">{timers.length} chiếc</span>
        </div>
        <div className="grid" style={{gap:12}}>
          {timers.map(tm => (
            <TimerCard key={tm.id} onRemove={()=>removeTimer(tm.id)} />
          ))}
        </div>
      </section>
    </div>
  )
}
