import React from 'react'

export const TimersContext = React.createContext(null)

let nextId = 1

export default function TimersProvider({ children }) {
  const [stopwatches, setStopwatches] = React.useState([{ id: nextId++ }])
  const [timers, setTimers] = React.useState([{ id: nextId++ }])

  const addStopwatch = () => setStopwatches(list => [...list, { id: nextId++ }])
  const addTimer = () => setTimers(list => [...list, { id: nextId++ }])
  const removeStopwatch = (id) => setStopwatches(list => list.filter(x => x.id !== id))
  const removeTimer = (id) => setTimers(list => list.filter(x => x.id !== id))

  const value = React.useMemo(() => ({
    stopwatches, timers, addStopwatch, addTimer, removeStopwatch, removeTimer
  }), [stopwatches, timers])

  return <TimersContext.Provider value={value}>{children}</TimersContext.Provider>
}
