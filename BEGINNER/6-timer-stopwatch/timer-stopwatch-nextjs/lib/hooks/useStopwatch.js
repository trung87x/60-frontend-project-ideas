'use client'
import { useEffect, useRef, useState } from 'react'

const pad=(n,w=2)=>String(n).padStart(w,'0')
export const formatTime=(ms)=>{
  const sign=ms<0?'-':''
  ms=Math.abs(ms)
  const h=Math.floor(ms/3600000)
  const m=Math.floor((ms%3600000)/60000)
  const s=Math.floor((ms%60000)/1000)
  const ms3=Math.floor(ms%1000)
  return `${sign}${pad(h)}:${pad(m)}:${pad(s)}.${String(ms3).padStart(3,'0')}`
}

export default function useStopwatch(initial=0){
  const [running,setRunning]=useState(false)
  const [elapsed,setElapsed]=useState(initial)
  const startAtRef=useRef(null)
  const rafRef=useRef(null)

  const ms = running ? (elapsed + (Date.now() - startAtRef.current)) : elapsed

  useEffect(()=>{
    if(!running) return
    const tick=()=>{ setElapsed(e=>e); rafRef.current=requestAnimationFrame(tick) }
    rafRef.current=requestAnimationFrame(tick)
    return ()=>cancelAnimationFrame(rafRef.current)
  },[running])

  const start=()=>{ if(running) return; startAtRef.current=Date.now(); setRunning(true) }
  const pause=()=>{ if(!running) return; cancelAnimationFrame(rafRef.current); setElapsed(e=>e+(Date.now()-startAtRef.current)); setRunning(false) }
  const reset=()=>{ cancelAnimationFrame(rafRef.current); setRunning(false); setElapsed(0) }

  return { ms, running, start, pause, reset }
}
