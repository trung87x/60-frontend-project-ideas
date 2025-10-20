import React, { useState } from 'react'
import { useMemory } from './useMemory'

const pad=n=>String(n).padStart(2,'0')
const fmt=ms=>{ const s=Math.floor(ms/1000); return pad(Math.floor(s/60))+':'+pad(s%60) }

export default function App(){
  const [size, setSize] = useState(4)
  const { deck, flip, moves, ms, restart } = useMemory(size)

  return (
    <main style={{maxWidth:900, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>🧠🃏 Card Memory Game — Cấp 5 (useMemory + best score)</h1>
      <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
        <label>Kích thước:</label>
        <select value={size} onChange={e=>setSize(parseInt(e.target.value))}>
          <option value="2">2x2 (nhanh)</option>
          <option value="4">4x4 (chuẩn)</option>
          <option value="6">6x6 (khó)</option>
        </select>
        <div>⏱️ {fmt(ms)}</div>
        <div>👣 {moves} lần lật</div>
        <button onClick={restart}>↻ Chơi lại</button>
      </div>
      <section style={{display:'grid', gridTemplateColumns:`repeat(${size},1fr)`, gap:10}}>
        {deck.map(card => (
          <div key={card.id} onClick={()=>flip(card)}
               style={{position:'relative', aspectRatio:'1 / 1', borderRadius:14, border:'1px solid #1f2937', transformStyle:'preserve-3d', transition:'transform .35s', transform: card.flipped ? 'rotateY(180deg)' : 'none', cursor:(card.flipped||card.matched)?'default':'pointer', outline: card.matched?'2px solid #22c55e':'none'}}>
            <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', backfaceVisibility:'hidden'}}>🂠</div>
            <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', backfaceVisibility:'hidden', transform:'rotateY(180deg)'}}>{card.v}</div>
          </div>
        ))}
      </section>
    </main>
  )
}
