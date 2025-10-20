import React, { useEffect, useMemo, useState } from 'react'

const EMOJIS = ['🍎','🐶','🌟','🎈','🚗','🍩','🎮','🎵']

function useTimer(running){
  const [ms, setMs] = useState(0)
  useEffect(()=>{
    if(!running){ return }
    const s = Date.now()
    const t = setInterval(()=> setMs(Date.now()-s), 250)
    return ()=> clearInterval(t)
  }, [running])
  return ms
}

const pad = n => String(n).padStart(2,'0')
const fmt = ms => { const s = Math.floor(ms/1000); return pad(Math.floor(s/60))+':'+pad(s%60) }

export default function App(){
  const [deck, setDeck] = useState([])
  const [first, setFirst] = useState(null)
  const [second, setSecond] = useState(null)
  const [lock, setLock] = useState(false)
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)

  const ms = useTimer(!won && deck.length>0)

  useEffect(()=>{ restart() }, [])

  function restart(){
    const d = [...EMOJIS, ...EMOJIS]
      .map((v,i)=>({ id:i, v, flipped:false, matched:false }))
      .sort(()=>Math.random()-0.5)
    setDeck(d); setFirst(null); setSecond(null); setLock(false); setMoves(0); setWon(false)
  }

  function flip(card){
    if(lock || card.flipped || card.matched) return
    const next = deck.map(c => c.id===card.id ? {...c, flipped: true} : c)
    setDeck(next)
    if(!first){ setFirst(card); return }
    setSecond(card); setLock(true); setMoves(m=>m+1)
  }

  useEffect(()=>{
    if(!first || !second) return
    if(first.v === second.v){
      setDeck(d => d.map(c => (c.v===first.v && c.flipped) ? {...c, matched:true} : c))
      setFirst(null); setSecond(null); setLock(false)
    }else{
      const t = setTimeout(()=>{
        setDeck(d => d.map(c => (c.id===first.id || c.id===second.id) ? {...c, flipped:false} : c))
        setFirst(null); setSecond(null); setLock(false)
      }, 700)
      return ()=> clearTimeout(t)
    }
  }, [first, second])

  useEffect(()=>{
    if(deck.length && deck.every(c=>c.matched)){
      setWon(true)
    }
  }, [deck])

  return (
    <main style={{maxWidth:840, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>🧠🃏 Card Memory Game — React (Cấp 4)</h1>
      <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
        <div>⏱️ {fmt(ms)}</div>
        <div>👣 {moves} lần lật</div>
        <button onClick={restart}>↻ Chơi lại</button>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10}}>
        {deck.map(card => (
          <div key={card.id} onClick={()=>flip(card)}
               style={{
                 position:'relative', aspectRatio:'1 / 1', borderRadius:14, border:'1px solid #1f2937',
                 transformStyle:'preserve-3d', transition:'transform .35s', transform: card.flipped ? 'rotateY(180deg)' : 'none',
                 cursor: (lock||card.flipped||card.matched)?'default':'pointer', outline: card.matched?'2px solid #22c55e':'none'
               }}>
            <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', backfaceVisibility:'hidden'}}>🂠</div>
            <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', backfaceVisibility:'hidden', transform:'rotateY(180deg)'}}>{card.v}</div>
          </div>
        ))}
      </section>
      {won && <p style={{marginTop:10}}>✅ Hoàn thành trong {moves} lần lật, thời gian {fmt(ms)}</p>}
    </main>
  )
}
