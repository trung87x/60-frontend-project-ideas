import React, { useEffect, useState } from 'react'
import { useAudioPlayer } from './hooks/useAudioPlayer.js'

function fmt(t){ if(!isFinite(t)) return "00:00"; const m = Math.floor(t/60).toString().padStart(2,'0'); const s = Math.floor(t%60).toString().padStart(2,'0'); return `${m}:${s}` }

export default function App(){
  const [playlist, setPlaylist] = useState([])
  useEffect(()=>{ fetch('/playlist.json').then(r=>r.json()).then(setPlaylist) }, [])
  const p = useAudioPlayer(playlist)

  if(!p.current) return <p style={{color:'white'}}>Đang tải playlist...</p>

  return (
    <div style={{minHeight:'100dvh',display:'grid',placeItems:'center',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:24}}>
      <div style={{display:'grid',gap:16,gridTemplateColumns:'1fr',width:'min(960px,96vw)'}}>
        <Player p={p} />
        <Playlist list={playlist} idx={p.idx} onPick={p.setIdx} />
      </div>
    </div>
  )
}

function Player({ p }){
  return (
    <div style={{background:'#161a2b',borderRadius:20,padding:24,boxShadow:'0 15px 40px rgba(0,0,0,.35)'}}>
      <img alt="cover" src={p.current.cover} style={{width:'100%',aspectRatio:'1/1',borderRadius:16,objectFit:'cover'}} />
      <h2 style={{margin:'12px 0 2px'}}>{p.current.title}</h2>
      <p style={{margin:0,color:'#94a3b8'}}>{p.current.artist}</p>

      <div style={{display:'flex',alignItems:'center',gap:12,margin:'14px 0'}}>
        <span>{fmt(p.currentTime)}</span>
        <input type="range" min="0" max={p.duration} step="0.1" value={p.currentTime} onChange={(e)=>p.seek(Number(e.target.value))} style={{flex:1}}/>
        <span>{fmt(p.duration)}</span>
      </div>

      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        <button onClick={p.prev}>Prev</button>
        {p.isPlaying ? <button onClick={p.pause} style={btn()}>Pause</button> : <button onClick={p.play} style={btn()}>Play</button>}
        <button onClick={p.next}>Next</button>
        <button onClick={()=> p.setMode(m=>({...m, loop:!m.loop}))}>Loop: {p.mode.loop ? 'On':'Off'}</button>
        <button onClick={()=> p.setMode(m=>({...m, shuffle:!m.shuffle}))}>Shuffle: {p.mode.shuffle ? 'On':'Off'}</button>
      </div>
    </div>
  )
}

function Playlist({ list, idx, onPick }){
  return (
    <div style={{background:'#0f1220',borderRadius:16,padding:16}}>
      <h3>Playlist</h3>
      <ul style={{listStyle:'none',margin:0,padding:0,display:'grid',gap:8}}>
        {list.map((s,i)=> (
          <li key={i} onClick={()=>onPick(i)} style={{display:'grid',gridTemplateColumns:'56px 1fr auto',gap:12,alignItems:'center',padding:8,borderRadius:12,background:i===idx?'#1b1f36':'#14172a',cursor:'pointer'}}>
            <img src={s.cover} alt="" style={{width:56,height:56,objectFit:'cover',borderRadius:10}}/>
            <div><div style={{fontWeight:600}}>{s.title}</div><div style={{color:'#94a3b8',fontSize:14}}>{s.artist}</div></div>
            <span style={{opacity:.7}}>▶</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function btn(){ return {padding:'10px 14px',borderRadius:999,background:'linear-gradient(90deg,#7c3aed,#06b6d4)',border:'none',color:'white'} }
