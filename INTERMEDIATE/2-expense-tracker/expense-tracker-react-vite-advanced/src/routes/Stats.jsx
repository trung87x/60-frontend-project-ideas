import React from 'react'
import { Helmet } from 'react-helmet-async'

const sample = [
  { title:'Bánh mì', amount:15000, date:'2025-10-01', category:'Food' },
  { title:'Xe bus', amount:7000, date:'2025-10-01', category:'Transport' },
  { title:'Áo thun', amount:120000, date:'2025-10-02', category:'Shopping' },
  { title:'Cơm trưa', amount:35000, date:'2025-10-03', category:'Food' },
]

function groupByMonth(items){
  const map = new Map()
  for(const it of items){
    const m = it.date.slice(0,7)
    map.set(m, (map.get(m)||0) + Number(it.amount||0))
  }
  return Array.from(map.entries()).map(([month,total])=>({month,total}))
}

export default function Stats(){
  const rows = groupByMonth(sample)
  const total = rows.reduce((s,r)=>s+r.total,0)
  return (
    <main style={{maxWidth:900,margin:'0 auto',padding:16}}>
      <Helmet><title>Expense Tracker — Stats</title></Helmet>
      <h1>📊 Thống kê theo tháng</h1>
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:12}}>
        <thead><tr><th style={{textAlign:'left',borderBottom:'1px solid #ddd',padding:'8px 0'}}>Tháng</th><th style={{textAlign:'right',borderBottom:'1px solid #ddd',padding:'8px 0'}}>Tổng chi</th></tr></thead>
        <tbody>
          {rows.map(r=>(<tr key={r.month}><td style={{padding:'8px 0'}}>{r.month}</td><td style={{textAlign:'right'}}>{r.total.toLocaleString()} đ</td></tr>))}
          <tr><td style={{paddingTop:8,fontWeight:600}}>Tổng</td><td style={{textAlign:'right',paddingTop:8,fontWeight:600}}>{total.toLocaleString()} đ</td></tr>
        </tbody>
      </table>
    </main>
  )
}
