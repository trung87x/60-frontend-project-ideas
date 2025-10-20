'use client'
import { useEffect, useMemo, useState } from 'react'

const EMO = ['🍎','🐶','🌟','🎈','🚗','🍩','🎮','🎵','🧸','🍀','⚽','🍔','📚','🎁','🧩','🎹']

const pad=(n:number)=> String(n).padStart(2,'0')
const fmt=(ms:number)=>{ const s=Math.floor(ms/1000); return pad(Math.floor(s/60))+':'+pad(s%60) }

export default function Page(){
  const [size, setSize] = useState(4)
  const [deck, setDeck] = useState<any[]>([])
  const [first, setFirst] = useState<any>(null)
  const [second, setSecond] = useState<any>(null)
  const [lock, setLock] = useState(false)
  const [moves, setMoves] = useState(0)
  const [start, setStart] = useState<number>(0)
  const [ms, setMs] = useState(0)
  const [scores, setScores] = useState<any[]>([])

  useEffect(()=>{
    const t = start ? setInterval(()=> setMs(Date.now()-start), 250) : null
    return ()=> t && clearInterval(t as any)
  }, [start])

  async function loadScores(){
    const r = await fetch('/api/leaderboard', { cache: 'no-store' })
    const j = await r.json(); setScores(j.scores)
  }

  function restart(){
    const pairs = (size*size)/2
    const list = EMO.slice(0, pairs)
    const d = [...list, ...list].map((v,i)=>({ id:i, v, flipped:false, matched:false })).sort(()=>Math.random()-0.5)
    setDeck(d); setFirst(null); setSecond(null); setLock(false); setMoves(0); setStart(Date.now()); setMs(0)
  }

  useEffect(()=>{ restart(); loadScores() }, [size])

  function flip(card:any){
    if(lock || card.flipped || card.matched) return
    setDeck(d => d.map(c => c.id===card.id ? {...c, flipped:true} : c))
    if(!first){ setFirst(card); return }
    setSecond(card); setLock(true); setMoves(m=>m+1)
  }

  useEffect(()=>{
    if(!first || !second) return
    if(first.v===second.v){
      setDeck(d=>d.map(c=> (c.v===first.v && c.flipped)? {...c, matched:true}:c))
      setFirst(null); setSecond(null); setLock(false)
    }else{
      const t=setTimeout(()=>{ setDeck(d=>d.map(c=>(c.id===first.id||c.id===second.id)? {...c, flipped:false}:c)); setFirst(null); setSecond(null); setLock(false) },700)
      return ()=> clearTimeout(t as any)
    }
  }, [first, second])

  useEffect(()=>{
    if(deck.length && deck.every(c=>c.matched)){
      fetch('/api/leaderboard', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name:'You', size, ms, moves }) })
        .then(()=>loadScores())
    }
  }, [deck])

  return (
    <main style={{maxWidth:980, margin:'40px auto', padding:24}}>
      <h1>🧠🃏 Card Memory Game — Next.js (Cấp 6)</h1>
      <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
        <label>Kích thước:</label>
        <select value={size} onChange={e=>setSize(parseInt((e.target as HTMLSelectElement).value))}>
          <option value="2">2x2</option>
          <option value="4">4x4</option>
          <option value="6">6x6</option>
        </select>
        <div>⏱️ {fmt(ms)}</div>
        <div>👣 {moves} lần lật</div>
        <button onClick={restart}>↻ Chơi lại</button>
      </div>
      <section style={{display:'grid', gridTemplateColumns:`repeat(${size},1fr)`, gap:10}}>
        {deck.map(card => (
          <div key={card.id} onClick={()=>flip(card)} style={{position:'relative', aspectRatio:'1 / 1', borderRadius:14, border:'1px solid #1f2937', transformStyle:'preserve-3d', transition:'transform .35s', transform: card.flipped ? 'rotateY(180deg)' : 'none', cursor:(card.flipped||card.matched)?'default':'pointer', outline: card.matched?'2px solid #22c55e':'none'}}>
            <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', backfaceVisibility:'hidden'}}>🂠</div>
            <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', backfaceVisibility:'hidden', transform:'rotateY(180deg)'}}>{card.v}</div>
          </div>
        ))}
      </section>
      <section style={{marginTop:16}}>
        <h3>Bảng xếp hạng (mock)</h3>
        <ol>
          {scores.map((s,i)=>(<li key={i}>{i+1}. {s.name} — {s.size}x{s.size} — {fmt(s.ms)} — {s.moves} lần lật</li>))}
        </ol>
      </section>
    </main>
  )
}
