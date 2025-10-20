import { useEffect, useRef, useState } from 'react'

const pad = n => String(n).padStart(2,'0')

export function useCountdown(targetDate){
  const [state, setState] = useState({ d:'00', h:'00', m:'00', s:'00', isExpired:false })
  const ref = useRef(null)

  useEffect(()=>{
    if(!targetDate) return
    const tick = ()=>{
      const t = new Date(targetDate).getTime(), now = Date.now()
      let diff = Math.max(0, t - now)
      const d = Math.floor(diff/86400000); diff-=d*86400000
      const h = Math.floor(diff/3600000);  diff-=h*3600000
      const m = Math.floor(diff/60000);    diff-=m*60000
      const s = Math.floor(diff/1000)
      setState({ d:pad(d), h:pad(h), m:pad(m), s:pad(s), isExpired: t-now<=0 })
    }
    tick()
    ref.current = setInterval(tick, 1000)
    return ()=> clearInterval(ref.current)
  }, [targetDate])

  return state
}
