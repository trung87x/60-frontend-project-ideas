'use client'
import { useEffect, useMemo, useState } from 'react'
type Rates = Record<string, number>
const fmt = (n:number, cur:string)=> new Intl.NumberFormat('vi-VN',{style:'currency',currency:cur}).format(n)
export default function Page(){
  const [rates, setRates] = useState<Rates>({})
  const [date, setDate] = useState<string>('')
  const [amount, setAmount] = useState<number>(100)
  const [from, setFrom] = useState<string>('USD')
  const [to, setTo] = useState<string>('VND')
  async function load(){ const res = await fetch('/api/rates', { cache:'no-store' }); const data = await res.json(); setRates(data.rates); setDate(data.date) }
  useEffect(()=>{ load() }, [])
  const result = useMemo(()=>{ if(!rates[from] || !rates[to]) return 0; const usd = amount / rates[from]; return usd * rates[to] }, [amount, from, to, rates])
  const currencies = Object.keys(rates)
  return (
    <main style={{maxWidth:780, margin:'40px auto', padding:24}}>
      <h1>💱 Currency Converter — Next.js (Cấp 6)</h1>
      <p style={{opacity:.8}}>Tỷ giá ngày: <b>{date || 'đang tải...'}</b></p>
      <div style={{display:'grid', gap:10}}>
        <label>Số tiền</label>
        <input type="number" value={amount} onChange={e=>setAmount(parseFloat((e.target as HTMLInputElement).value||'0'))} />
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div><label>Từ</label><select value={from} onChange={e=>setFrom((e.target as HTMLSelectElement).value)}>{currencies.map(c=><option key={c}>{c}</option>)}</select></div>
          <div><label>Sang</label><select value={to} onChange={e=>setTo((e.target as HTMLSelectElement).value)}>{currencies.map(c=><option key={c}>{c}</option>)}</select></div>
        </div>
        <div>✔ {fmt(amount, from)} = <b>{fmt(result, to)}</b></div>
        <div><button onClick={()=>{ const x=from; setFrom(to); setTo(x) }}>⇄ Đổi chiều</button><button onClick={load} style={{marginLeft:8}}>↻ Làm mới</button></div>
      </div>
    </main>
  )
}
