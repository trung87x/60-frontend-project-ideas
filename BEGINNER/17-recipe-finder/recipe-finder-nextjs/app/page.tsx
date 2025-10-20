'use client'
import { useEffect, useMemo, useState } from 'react'

type Recipe = { id:number, title:string, time:number, servings:number, tags:string[], ingredients:string[], steps:string[] }

export default function Page(){
  const [items, setItems] = useState<Recipe[]>([])
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('')
  const [open, setOpen] = useState<Recipe | null>(null)

  async function load(){
    const url = `/api/recipes?q=${encodeURIComponent(q)}&tag=${encodeURIComponent(tag)}`
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    setItems(data.items)
  }
  useEffect(()=>{ load() }, [q, tag])

  const tags = useMemo(()=> Array.from(new Set(items.flatMap(r=>r.tags))), [items])

  return (
    <main style={{maxWidth:980, margin:'40px auto', padding:24}}>
      <h1>🍳 Recipe Finder — Next.js (Cấp 6)</h1>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input value={q} onChange={e=>setQ((e.target as HTMLInputElement).value)} placeholder="Tìm công thức..." style={{flex:1,padding:'10px 12px',borderRadius:10,border:'1px solid #374151'}}/>
        <select value={tag} onChange={e=>setTag((e.target as HTMLSelectElement).value)}>
          <option value="">Tất cả</option>
          {tags.map(t=> <option key={t}>{t}</option>)}
        </select>
      </div>
      <section style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {items.map(r=>(
          <article key={r.id} style={{background:'#f6f6f6',border:'1px solid #ddd',borderRadius:16,padding:16,display:'grid',gap:8}}>
            <h3>{r.title}</h3>
            <p>⏱️ {r.time} phút • 👥 {r.servings} khẩu phần</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
              {r.tags.map(t=>(<span key={t} style={{fontSize:12,border:'1px solid #ddd',borderRadius:999,padding:'4px 8px'}}>#{t}</span>))}
            </div>
            <button onClick={()=>setOpen(r)}>Xem</button>
          </article>
        ))}
      </section>

      {open && (
        <dialog open style={{padding:0,border:'none',background:'transparent'}} onClose={()=>setOpen(null)}>
          <article style={{maxWidth:640,background:'#fff',border:'1px solid #ddd',borderRadius:16,padding:16}}>
            <h2 style={{margin:'0 0 8px'}}>{open.title}</h2>
            <p>⏱️ {open.time} phút • 👥 {open.servings} khẩu phần</p>
            <h4>Nguyên liệu</h4>
            <ul>{open.ingredients.map((i,idx)=>(<li key={idx}>{i}</li>))}</ul>
            <h4>Các bước</h4>
            <ol>{open.steps.map((s,idx)=>(<li key={idx}>{s}</li>))}</ol>
            <div style={{marginTop:8}}><button onClick={()=>setOpen(null)}>Đóng</button></div>
          </article>
        </dialog>
      )}
    </main>
  )
}
