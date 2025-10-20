'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type Product = { id:number; title:string; price:number; rating:number; category:string; brand:string; thumbnail:string }

export default function Page(){
  const [data, setData] = useState<Product[]>([])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 8

  useEffect(()=>{ fetch('/products.json').then(r=>r.json()).then(setData) }, [])

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
  const pageItems = items.slice((page-1)*pageSize, page*pageSize)

  return (
    <div style={{maxWidth:1100,margin:'0 auto'}}>
      <header style={{textAlign:'center',marginBottom:16}}>
        <h1>🛍️ Catalog — Next.js</h1>
        <p>SEO tốt, route chi tiết sản phẩm</p>
      </header>

      <div style={{display:'flex',gap:12,flexWrap:'wrap',background:'#0f1220',padding:12,borderRadius:12}}>
        <input value={q} onChange={e=>setQ((e.target as HTMLInputElement).value)} placeholder="Tìm sản phẩm..." />
        <select value={cat} onChange={e=>setCat((e.target as HTMLSelectElement).value)}>
          <option value="">Tất cả danh mục</option>
          {cats.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort((e.target as HTMLSelectElement).value)}>
          <option value="">Sắp xếp</option>
          <option value="price-asc">Giá ↑</option>
          <option value="price-desc">Giá ↓</option>
          <option value="title-asc">Tên A→Z</option>
          <option value="title-desc">Tên Z→A</option>
          <option value="rating-desc">Đánh giá cao</option>
        </select>
      </div>

      <section style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginTop:16}}>
        {pageItems.map(p => (
          <article key={p.id} style={{background:'#161a2b',borderRadius:16,overflow:'hidden',boxShadow:'0 10px 30px rgba(0,0,0,.35)'}}>
            <Link href={'/product/'+p.id} style={{color:'inherit',textDecoration:'none'}}>
              <img src={p.thumbnail} alt={p.title} style={{width:'100%',aspectRatio:'4/3',objectFit:'cover'}} />
              <div style={{padding:12}}>
                <h3 style={{margin:'4px 0'}}>{p.title}</h3>
                <div style={{display:'flex',justifyContent:'space-between',opacity:.85}}>
                  <span style={{color:'#a78bfa',fontWeight:700}}>${p.price.toFixed(2)}</span>
                  <span>{p.category} • ★{p.rating}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>

      <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:16}}>
        <button onClick={()=> setPage(p=> Math.max(1,p-1))} disabled={page===1}>Trước</button>
        <span>Trang {page}/{totalPages}</span>
        <button onClick={()=> setPage(p=> Math.min(totalPages,p+1))} disabled={page===totalPages}>Sau</button>
      </div>
    </div>
  )
}
