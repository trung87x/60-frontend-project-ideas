import { useEffect, useMemo, useState } from 'react'
const EMO = ['🍎','🐶','🌟','🎈','🚗','🍩','🎮','🎵','🧸','🍀','⚽','🍔','📚','🎁','🧩','🎹']
const KEY_BEST = 'memory-best'
export function useMemory(size=4){
  const pairs = (size*size)/2
  const [deck, setDeck] = useState([])
  const [first, setFirst] = useState(null)
  const [second, setSecond] = useState(null)
  const [lock, setLock] = useState(false)
  const [moves, setMoves] = useState(0)
  const [start, setStart] = useState(0)
  const [ms, setMs] = useState(0)
  const best = useMemo(()=>{
    try{ return JSON.parse(localStorage.getItem(KEY_BEST)) || {} }catch{ return {} }
  }, [])
  useEffect(()=>{
    const t = start ? setInterval(()=> setMs(Date.now()-start), 250) : null
    return ()=> t && clearInterval(t)
  }, [start])

  function restart(){
    const list = EMO.slice(0, pairs)
    const d = [...list, ...list].map((v,i)=>({ id:i, v, flipped:false, matched:false })).sort(()=>Math.random()-0.5)
    setDeck(d); setFirst(null); setSecond(null); setLock(false); setMoves(0); setStart(Date.now()); setMs(0)
  }
  useEffect(()=>{ restart() }, [size])

  function flip(card){
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
      const t=setTimeout(()=>{ setDeck(d=>d.map(c=> (c.id===first.id||c.id===second.id)? {...c, flipped:false}:c)); setFirst(null); setSecond(null); setLock(false) },700)
      return ()=> clearTimeout(t)
    }
  }, [first, second])

  useEffect(()=>{
    if(deck.length && deck.every(c=>c.matched)){
      const key = String(size)
      const current = { moves, ms }
      const b = JSON.parse(localStorage.getItem(KEY_BEST) || '{}')
      const prev = b[key]
      if(!prev || current.ms < prev.ms || (current.ms===prev.ms && current.moves < prev.moves)){
        b[key] = current
        localStorage.setItem(KEY_BEST, JSON.stringify(b))
      }
    }
  }, [deck, size, moves, ms])

  return { deck, flip, moves, ms, restart }
}
