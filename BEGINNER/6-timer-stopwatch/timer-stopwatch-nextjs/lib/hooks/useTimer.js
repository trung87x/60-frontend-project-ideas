'use client'
import { useMemo, useEffect, useRef, useState } from 'react'

const clamp=(n,min,max)=>Math.min(max,Math.max(min,n))
const pad=(n,w=2)=>String(n).padStart(w,'0')
export const formatHMS=(ms)=>{
  const sign=ms<0?'-':''
  ms=Math.abs(ms)
  const h=Math.floor(ms/3600000)
  const m=Math.floor((ms%3600000)/60000)
  const s=Math.floor((ms%60000)/1000)
  return `${sign}${pad(h)}:${pad(m)}:${pad(s)}`
}

export default function useTimer(defaultMinutes=1, defaultSeconds=30){
  const [minutes,setMinutes]=useState(defaultMinutes)
  const [seconds,setSeconds]=useState(defaultSeconds)
  const [running,setRunning]=useState(false)
  const [left,setLeft]=useState((defaultMinutes*60+defaultSeconds)*1000)
  const endAtRef=useRef(null)
  const rafRef=useRef(null)

  const totalMs=useMemo(()=> (clamp(minutes,0,99)*60 + clamp(seconds,0,59))*1000, [minutes,seconds])

  useEffect(()=>{ if(!running) setLeft(totalMs) },[totalMs,running])

  useEffect(()=>{
    if(!running) return
    const tick=()=>{
      const l=Math.max(0,endAtRef.current-Date.now())
      setLeft(l)
      if(l<=0){
        setRunning(false)
        try{ const old=document.title; document.title='⏰ Hết giờ!'; setTimeout(()=>document.title=old,1500) }catch{}
        alert('⏰ Hết giờ!')
        return
      }
      rafRef.current=requestAnimationFrame(tick)
    }
    rafRef.current=requestAnimationFrame(tick)
    return ()=>cancelAnimationFrame(rafRef.current)
  },[running])

  const start=()=>{
    if(running) return
    const base=left>0?left:totalMs
    if(base<=0){ alert('Vui lòng nhập thời gian lớn hơn 0'); return }
    endAtRef.current=Date.now()+base
    setRunning(true)
  }
  const pause=()=>{ if(!running) return; cancelAnimationFrame(rafRef.current); setLeft(Math.max(0,endAtRef.current-Date.now())); setRunning(false) }
  const reset=()=>{ cancelAnimationFrame(rafRef.current); setRunning(false); setLeft(totalMs) }

  return { minutes, seconds, setMinutes, setSeconds, running, left, start, pause, reset }
}
