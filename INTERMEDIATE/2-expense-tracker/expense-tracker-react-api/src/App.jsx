import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const qc = new QueryClient()

async function fetchExpenses(){
  const res = await fetch('/expenses.json')
  if(!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

function List(){
  const { data = [], isLoading, error, refetch } = useQuery({ queryKey:['expenses'], queryFn:fetchExpenses })
  const [filter,setFilter]=React.useState('All')
  const filtered = data.filter(i => filter==='All' ? true : i.category===filter)
  const total = filtered.reduce((s,i)=>s+Number(i.amount||0),0)

  if(isLoading) return <p>Đang tải…</p>
  if(error) return <p>Lỗi tải dữ liệu</p>
  return (
    <section>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <span>Lọc:</span>
        {['All','Food','Transport','Shopping','Other'].map(c=> (
          <button key={c} onClick={()=>setFilter(c)} style={{padding:'6px 10px',border:'1px solid #ddd',borderRadius:8, background: c===filter?'#e2e8f0':'#fff'}}>{c}</button>
        ))}
        <div style={{marginLeft:'auto', color:'#0ea5e9'}}>Tổng: <strong>{total.toLocaleString()}</strong> đ</div>
        <button onClick={()=>refetch()} style={{marginLeft:8,border:'1px solid #ddd',borderRadius:6,padding:'6px 10px'}}>Refresh</button>
      </div>
      <ul style={{listStyle:'none',padding:0,marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
        {filtered.map((it,idx)=>(
          <li key={idx} style={{display:'flex',justifyContent:'space-between',border:'1px solid #eee',padding:10,borderRadius:10}}>
            <div>
              <div style={{fontWeight:600}}>{it.title} — <span style={{color:'#16a34a'}}>{it.category}</span></div>
              <div style={{color:'#64748b',fontSize:12}}>{it.date}</div>
            </div>
            <strong>{Number(it.amount).toLocaleString()}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function App(){
  return (
    <QueryClientProvider client={qc}>
      <main style={{maxWidth:900,margin:'0 auto',padding:16}}>
        <h1>💸 Expense Tracker</h1>
        <List/>
      </main>
    </QueryClientProvider>
  )
}
