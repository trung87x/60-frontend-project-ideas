import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const qc = new QueryClient()

async function fetchProjects(){
  const res = await fetch('/projects.json')
  if(!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

function Grid(){
  const { data = [], isLoading, error } = useQuery({ queryKey:['projects'], queryFn:fetchProjects })
  const [q,setQ] = React.useState('')
  const filtered = data.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))

  if(isLoading) return <p>Đang tải…</p>
  if(error) return <p>Lỗi tải dữ liệu</p>

  return (
    <>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm dự án…" style={{padding:8,border:'1px solid #ddd',borderRadius:8,width:'100%',maxWidth:360}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12,marginTop:12}}>
        {filtered.map(p => (
          <article key={p.id} style={{background:'#fff',border:'1px solid #eee',borderRadius:12,overflow:'hidden'}}>
            <img src={p.image} alt={p.title} style={{width:'100%'}}/>
            <div style={{padding:12}}>
              <h3 style={{margin:'0 0 4px 0'}}>{p.title}</h3>
              <p style={{color:'#555',margin:0}}>{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export default function App(){
  return (
    <QueryClientProvider client={qc}>
      <main style={{maxWidth:1100,margin:'0 auto',padding:16}}>
        <h1>📁 Portfolio</h1>
        <Grid/>
      </main>
    </QueryClientProvider>
  )
}
