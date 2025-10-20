'use client'
import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ResultPage(){
  const sp = useSearchParams()
  const router = useRouter()
  const score = Number(sp.get('score') || 0)
  const total = Number(sp.get('total') || 0)
  const pct = total ? Math.round(score/total*100) : 0

  return (
    <div style={{maxWidth:700, margin:'0 auto', textAlign:'center'}}>
      <h1>Kết quả</h1>
      <div style={{fontSize:42, fontWeight:800, marginTop:12}}>{score}/{total} — {pct}%</div>
      <button onClick={()=> router.push('/')} style={{marginTop:12,background:'linear-gradient(90deg,#7c3aed,#06b6d4)',color:'#fff',padding:'8px 12px',borderRadius:10}}>Làm lại</button>
    </div>
  )
}
