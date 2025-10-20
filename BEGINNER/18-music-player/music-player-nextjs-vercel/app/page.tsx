'use client'
import React, { useEffect, useRef, useState } from 'react'

type Song = { title:string; artist:string; cover:string; url:string }

function fmt(t:number){ if(!isFinite(t)) return '00:00'; const m = Math.floor(t/60).toString().padStart(2,'0'); const s = Math.floor(t%60).toString().padStart(2,'0'); return `${m}:${s}` }

export default function Page(){
  const [list, setList] = useState<Song[]>([])
  const [idx, setIdx] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(()=>{
    fetch('/music/playlist.json').then(r=>r.json()).then(setList)
  }, [])

  useEffect(()=>{
    const a = audioRef.current
    if(!a || !list[idx]) return
    a.src = list[idx].url
    a.load()
    setCurrentTime(0); setDuration(0)
    if(isPlaying) a.play().catch(()=>{})
  }, [idx, list])

  useEffect(()=>{
    const a = audioRef.current
    if(!a) return
    const onLoaded = ()=> setDuration(a.duration || 0)
    const onTime = ()=> setCurrentTime(a.currentTime || 0)
    a.addEventListener('loadedmetadata', onLoaded)
    a.addEventListener('timeupdate', onTime)
    return ()=>{
      a.removeEventListener('loadedmetadata', onLoaded)
      a.removeEventListener('timeupdate', onTime)
    }
  }, [])

  const cur = list[idx]

  return (
    <div style={{display:'grid',gap:16,gridTemplateColumns:'1fr 1fr',maxWidth:1100,margin:'0 auto'}}>
      <section style={{background:'#161a2b',borderRadius:20,padding:24}}>
        <h1 style={{marginTop:0}}>Music Player — Next.js</h1>
        {cur ? (
          <>
            <img src={cur.cover} alt="" style={{width:'100%',aspectRatio:'1/1',borderRadius:16,objectFit:'cover'}}/>
            <h2 style={{margin:'12px 0 2px'}}>{cur.title}</h2>
            <p style={{margin:0,opacity:.8}}>{cur.artist}</p>
            <audio ref={audioRef} preload="metadata" />
            <div style={{display:'flex',alignItems:'center',gap:12,margin:'14px 0'}}>
              <span>{fmt(currentTime)}</span>
              <input type="range" min={0} max={duration} step={0.1} value={currentTime} onChange={(e)=>{
                const t = Number((e.target as HTMLInputElement).value)
                if(audioRef.current){ audioRef.current.currentTime = t }
                setCurrentTime(t)
              }} style={{flex:1}}/>
              <span>{fmt(duration)}</span>
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'center'}}>
              <button onClick={()=> audioRef.current && (audioRef.current.currentTime = 0)}>Prev</button>
              {isPlaying
                ? <button onClick={()=>{ audioRef.current?.pause(); setIsPlaying(false) }} style={btn()}>Pause</button>
                : <button onClick={()=>{ audioRef.current?.play(); setIsPlaying(true) }} style={btn()}>Play</button>
              }
              <button onClick={()=> setIdx(i=> (i+1) % list.length)}>Next</button>
            </div>
          </>
        ) : <p>Đang tải playlist...</p>}
      </section>

      <aside style={{background:'#0f1220',borderRadius:20,padding:16}}>
        <h3>Playlist</h3>
        <ul style={{listStyle:'none',margin:0,padding:0,display:'grid',gap:8}}>
          {list.map((s,i)=> (
            <li key={i} onClick={()=> setIdx(i)} style={{display:'grid',gridTemplateColumns:'56px 1fr auto',gap:12,alignItems:'center',padding:8,borderRadius:12,background:i===idx?'#1b1f36':'#14172a',cursor:'pointer'}}>
              <img src={s.cover} alt="" style={{width:56,height:56,objectFit:'cover',borderRadius:10}}/>
              <div><div style={{fontWeight:600}}>{s.title}</div><div style={{opacity:.75,fontSize:14}}>{s.artist}</div></div>
              <span>▶</span>
            </li>
          ))}
        </ul>
        <p style={{opacity:.75,marginTop:16}}>👉 Thả file `.mp3` vào <code>/public/music</code> và cập nhật <code>playlist.json</code>.</p>
      </aside>
    </div>
  )
}

function btn(){ return {padding:'10px 14px',borderRadius:999,background:'linear-gradient(90deg,#7c3aed,#06b6d4)',border:'none',color:'white'} }
