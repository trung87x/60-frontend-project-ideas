import React, { useMemo, useState } from 'react'
import { useRates } from './useRates'
const fmt = (n, cur) => new Intl.NumberFormat('vi-VN', { style:'currency', currency:cur }).format(n)
export default function App(){
  const { rates, date, refresh, loading } = useRates()
  const currencies = Object.keys(rates)
  const [amount, setAmount] = useState(100)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('VND')
  const [favorites, setFavorites] = useState(()=>{ try{ return JSON.parse(localStorage.getItem('fav-pairs')) || [['USD','VND'], ['EUR','USD']] }catch{ return [['USD','VND']] } })
  const result = useMemo(()=>{ const usd = amount / rates[from]; return usd * rates[to] }, [amount, from, to, rates])
  const addFav = () => {
    const key = from+'->'+to
    if(!favorites.some(([a,b])=> a+'->'+b===key)){
      const next = [...favorites, [from,to]]
      setFavorites(next); localStorage.setItem('fav-pairs', JSON.stringify(next))
    }
  }
  return (
    <main style={{maxWidth:780, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>💱 Currency Converter — Cấp 5 (useRates + Favorites)</h1>
      <p style={{opacity:.8}}>Tỷ giá ngày: <b>{date}</b> {loading && '…đang làm mới'}</p>
      <div style={{display:'grid', gap:10}}>
        <label>Số tiền</label>
        <input type="number" value={amount} onChange={e=>setAmount(parseFloat(e.target.value||'0'))} />
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div><label>Từ</label><select value={from} onChange={e=>setFrom(e.target.value)}>{currencies.map(c=><option key={c}>{c}</option>)}</select></div>
          <div><label>Sang</label><select value={to} onChange={e=>setTo(e.target.value)}>{currencies.map(c=><option key={c}>{c}</option>)}</select></div>
        </div>
        <div>✔ {fmt(amount, from)} = <b>{fmt(result, to)}</b></div>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>{ const x=from; setFrom(to); setTo(x) }}>⇄ Đổi chiều</button>
          <button onClick={addFav}>★ Lưu cặp ưa thích</button>
          <button onClick={refresh}>↻ Làm mới tỷ giá (mock)</button>
        </div>
        <section>
          <h3>Cặp ưa thích</h3>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {favorites.map(([a,b],i)=>(
              <button key={i} onClick={()=>{ setFrom(a); setTo(b) }} style={{border:'1px solid #ccc', borderRadius:10, padding:'6px 10px'}}>{a} → {b}</button>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
