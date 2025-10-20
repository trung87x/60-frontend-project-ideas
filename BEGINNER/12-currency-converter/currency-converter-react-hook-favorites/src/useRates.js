import { useEffect, useState } from 'react'
const DEFAULT = {"USD": 1.0, "EUR": 0.92, "VND": 25400.0, "JPY": 151.2, "GBP": 0.78, "AUD": 1.52, "CAD": 1.37, "KRW": 1380.0};
const KEY_RATES = 'rates-cache-v1'
export function useRates(){
  const [rates, setRates] = useState(()=>{
    try{ const saved = JSON.parse(localStorage.getItem(KEY_RATES)); return saved?.data || DEFAULT }catch{ return DEFAULT }
  })
  const [date, setDate] = useState(()=>{
    try{ const saved = JSON.parse(localStorage.getItem(KEY_RATES)); return saved?.date || new Date().toISOString().slice(0,10) }catch{ return new Date().toISOString().slice(0,10) }
  })
  const [loading, setLoading] = useState(false)
  async function refresh(){
    setLoading(true); await new Promise(r=>setTimeout(r, 600))
    const data = rates; const today = new Date().toISOString().slice(0,10)
    localStorage.setItem(KEY_RATES, JSON.stringify({ date: today, data }))
    setDate(today); setRates(data); setLoading(false)
  }
  return { rates, date, refresh, loading }
}
