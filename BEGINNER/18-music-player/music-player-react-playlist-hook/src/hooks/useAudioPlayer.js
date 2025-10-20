import { useEffect, useMemo, useRef, useState } from 'react'

export function useAudioPlayer(list = []){
  const audioRef = useRef(new Audio())
  const [idx, setIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [mode, setMode] = useState({ loop:false, shuffle:false })

  const current = list[idx] ?? null

  useEffect(()=>{
    const a = audioRef.current
    if(!current) return
    a.src = current.url
    a.load()
    setCurrentTime(0); setDuration(0)
    if(isPlaying) a.play().catch(()=>{})
  }, [idx, current?.url])

  useEffect(()=>{
    const a = audioRef.current
    const onLoaded = ()=> setDuration(a.duration || 0)
    const onTime = ()=> setCurrentTime(a.currentTime || 0)
    const onEnded = ()=> next()
    a.addEventListener('loadedmetadata', onLoaded)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('ended', onEnded)
    return ()=>{
      a.removeEventListener('loadedmetadata', onLoaded)
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('ended', onEnded)
    }
  }, [])

  async function play(){ await audioRef.current.play(); setIsPlaying(true) }
  function pause(){ audioRef.current.pause(); setIsPlaying(false) }
  function seek(t){ audioRef.current.currentTime = t; setCurrentTime(t) }

  function next(){
    if(mode.loop) return seek(0)
    if(mode.shuffle){
      const n = Math.floor(Math.random()*list.length)
      setIdx(n)
    }else{
      setIdx(i => (i+1) % list.length)
    }
  }
  function prev(){ seek(0) }

  return {
    ref: audioRef, list, idx, setIdx, current,
    isPlaying, play, pause, seek, next, prev,
    currentTime, duration, mode, setMode
  }
}
