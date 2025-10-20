import React, { useMemo, useState } from 'react'

const RATES = {"USD": 1.0, "EUR": 0.92, "VND": 25400.0, "JPY": 151.2, "GBP": 0.78, "AUD": 1.52, "CAD": 1.37, "KRW": 1380.0};
const currencies = Object.keys(RATES)
const fmt = (n, cur) => new Intl.NumberFormat('vi-VN', { style:'currency', currency:cur }).format(n)

export default function App(){
  const [amount, setAmount] = useState(100)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('VND')

  const result = useMemo(()=>{
    const usd = amount / RATES[from]
    return usd * RATES[to]
  }, [amount, from, to])

  return (
    <main style={{maxWidth:720, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>💱 Currency Converter — React (Cấp 4)</h1>
      <div style={{display:'grid', gap:10}}>
        <label>Số tiền</label>
        <input type="number" value={amount} onChange={e=>setAmount(parseFloat(e.target.value||'0'))} />
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div>
            <label>Từ</label>
            <select value={from} onChange={e=>setFrom(e.target.value)}>
              {currencies.map(c=> <option key={c}>{c}</option> )}
            </select>
          </div>
          <div>
            <label>Sang</label>
            <select value={to} onChange={e=>setTo(e.target.value)}>
              {currencies.map(c=> <option key={c}>{c}</option> )}
            </select>
          </div>
        </div>
        <div>✔ {fmt(amount, from)} = <b>{fmt(result, to)}</b></div>
        <div><button onClick={()=>{ const x=from; setFrom(to); setTo(x) }}>⇄ Đổi chiều</button></div>
      </div>
    </main>
  )
}
