import React, { useEffect, useMemo, useState } from 'react'

function useProducts(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    fetch('/products.json').then(r=>r.json()).then(d=>{ setData(d); setLoading(false) })
  }, [])
  return { data, loading }
}

function Toolbar({ q, setQ, cat, setCat, sort, setSort, cats }){
  return (
    <div style={{display:'flex',gap:12,flexWrap:'wrap',background:'#0f1220',padding:12,borderRadius:12}}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm sản phẩm..." />
      <select value={cat} onChange={e=>setCat(e.target.value)}>
        <option value="">Tất cả danh mục</option>
        {cats.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={sort} onChange={e=>setSort(e.target.value)}>
        <option value="">Sắp xếp</option>
        <option value="price-asc">Giá ↑</option>
        <option value="price-desc">Giá ↓</option>
        <option value="title-asc">Tên A→Z</option>
        <option value="title-desc">Tên Z→A</option>
        <option value="rating-desc">Đánh giá cao</option>
      </select>
    </div>
  )
}

function Card({ p }){
  return (
    <article style={{background:'#161a2b',borderRadius:16,overflow:'hidden',boxShadow:'0 10px 30px rgba(0,0,0,.35)'}}>
      <img src={p.thumbnail} alt={p.title} style={{width:'100%',aspectRatio:'4/3',objectFit:'cover'}}/>
      <div style={{padding:12}}>
        <h3 style={{margin:'4px 0'}}>{p.title}</h3>
        <div style={{display:'flex',justifyContent:'space-between',opacity:.85}}>
          <span style={{color:'#a78bfa',fontWeight:700}}>${p.price.toFixed(2)}</span>
          <span>{p.category} • ★{p.rating}</span>
        </div>
      </div>
    </article>
  )
}

export default function App(){
  const { data, loading } = useProducts()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 8

  const cats = useMemo(()=> Array.from(new Set(data.map(p=>p.category))), [data])
  const items = useMemo(()=>{
    let r = [...data]
    const term = q.trim().toLowerCase()
    if(term) r = r.filter(p => (p.title+' '+p.brand+' '+p.category).toLowerCase().includes(term))
    if(cat) r = r.filter(p => p.category === cat)
    switch(sort){
      case 'price-asc': r.sort((a,b)=>a.price-b.price); break;
      case 'price-desc': r.sort((a,b)=>b.price-a.price); break;
      case 'title-asc': r.sort((a,b)=>a.title.localeCompare(b.title)); break;
      case 'title-desc': r.sort((a,b)=>b.title.localeCompare(a.title)); break;
      case 'rating-desc': r.sort((a,b)=>b.rating-a.rating); break;
    }
    return r
  }, [data, q, cat, sort])

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const pageItems = items.slice((page-1)*pageSize, (page)*pageSize)

  useEffect(()=>{ setPage(1) }, [q, cat, sort])

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:'24px 0'}}>
      <header style={{textAlign:'center',padding:24}}>
        <h1>🛍️ Catalog — React + API</h1>
        <p>Fetch JSON, phân trang</p>
      </header>
      <main style={{width:'min(1100px,92vw)',margin:'0 auto'}}>
        <Toolbar q={q} setQ={setQ} cat={cat} setCat={setCat} sort={sort} setSort={setSort} cats={cats} />
        {loading ? <p>Đang tải...</p> : (
          <>
            <section style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginTop:16}}>
              {pageItems.map(p => <Card key={p.id} p={p} />)}
            </section>
            <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:16}}>
              <button onClick={()=> setPage(p=> Math.max(1,p-1))} disabled={page===1}>Trước</button>
              <span>Trang {page}/{totalPages}</span>
              <button onClick={()=> setPage(p=> Math.min(totalPages,p+1))} disabled={page===totalPages}>Sau</button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
