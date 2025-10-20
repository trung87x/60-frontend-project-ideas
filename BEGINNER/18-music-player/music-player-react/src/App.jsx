import React, { useRef, useState, useEffect } from 'react'

function fmt(t){ if(!isFinite(t)) return "00:00"; const m = Math.floor(t/60).toString().padStart(2,'0'); const s = Math.floor(t%60).toString().padStart(2,'0'); return `${m}:${s}` }

export default function App(){
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(()=>{
    const a = audioRef.current
    const onLoaded = ()=> setDuration(a.duration || 0)
    const onTime = ()=> setCurrentTime(a.currentTime || 0)
    a.addEventListener('loadedmetadata', onLoaded)
    a.addEventListener('timeupdate', onTime)
    return ()=>{
      a.removeEventListener('loadedmetadata', onLoaded)
      a.removeEventListener('timeupdate', onTime)
    }
  }, [])

  async function toggle(){
    const a = audioRef.current
    if(a.paused){ await a.play(); setIsPlaying(true) } else { a.pause(); setIsPlaying(false) }
  }

  return (
    <div style={{minHeight:'100dvh',display:'grid',placeItems:'center',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb'}}>
      <div style={{width:'min(420px,92vw)',background:'#161a2b',borderRadius:20,padding:24,boxShadow:'0 15px 40px rgba(0,0,0,.35)'}}>
        <img alt="cover" src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop" style={{width:'100%',aspectRatio:'1/1',borderRadius:16,objectFit:'cover'}} />
        <h1 style={{margin:'16px 0 4px',fontSize:20,fontWeight:700}}>Sample — React Player</h1>
        <p style={{margin:0,color:'#94a3b8'}}>Public Domain</p>

        <audio ref={audioRef} preload="metadata" src="https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther30.mp3" />
        <div style={{display:'flex',alignItems:'center',gap:12,margin:'14px 0'}}>
          <span className="time">{fmt(currentTime)}</span>
          <input type="range" min="0" max={duration} step="0.1" value={currentTime} onChange={(e)=>{
            const a = audioRef.current
            a.currentTime = Number(e.target.value)
            setCurrentTime(a.currentTime)
          }} style={{flex:1}} />
          <span className="time">{fmt(duration)}</span>
        </div>

        <div style={{display:'flex',justifyContent:'center',gap:16}}>
          <button onClick={()=> audioRef.current.currentTime = 0}>Prev</button>
          <button onClick={toggle} style={{padding:'10px 14px',borderRadius:999,background:'linear-gradient(90deg,#7c3aed,#06b6d4)',border:'none',color:'white'}}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={()=> audioRef.current.currentTime = Math.min((audioRef.current.currentTime+10), duration)}>Next</button>
        </div>
      </div>
    </div>
  )
}
