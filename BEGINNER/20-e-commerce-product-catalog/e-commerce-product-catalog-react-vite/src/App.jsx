import React, { useMemo, useState } from 'react'

const DATA = [
  {
    "id": 1,
    "title": "Aurora Headphones",
    "price": 89.99,
    "rating": 4.5,
    "category": "Audio",
    "brand": "Aurora",
    "thumbnail": "https://images.unsplash.com/photo-1518441315231-1d8fdbdcd0f1?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "id": 2,
    "title": "SwiftWatch S2",
    "price": 129.0,
    "rating": 4.2,
    "category": "Wearables",
    "brand": "Swift",
    "thumbnail": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "id": 3,
    "title": "Nimbus Keyboard",
    "price": 59.0,
    "rating": 4.7,
    "category": "Accessories",
    "brand": "Nimbus",
    "thumbnail": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "id": 4,
    "title": "Photon Desk Lamp",
    "price": 39.5,
    "rating": 4.1,
    "category": "Home",
    "brand": "Photon",
    "thumbnail": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "id": 5,
    "title": "ZenBook Stand",
    "price": 24.9,
    "rating": 4.0,
    "category": "Accessories",
    "brand": "Zen",
    "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "id": 6,
    "title": "PixelCam Mini",
    "price": 159.0,
    "rating": 4.6,
    "category": "Cameras",
    "brand": "PixelCam",
    "thumbnail": "https://images.unsplash.com/photo-1526178618720-6a4bd4a73ca0?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "id": 7,
    "title": "Echo Speaker",
    "price": 49.0,
    "rating": 4.3,
    "category": "Audio",
    "brand": "Echo",
    "thumbnail": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "id": 8,
    "title": "Glide Mouse",
    "price": 19.9,
    "rating": 4.1,
    "category": "Accessories",
    "brand": "Glide",
    "thumbnail": "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "id": 9,
    "title": "Voyager Backpack",
    "price": 69.0,
    "rating": 4.8,
    "category": "Travel",
    "brand": "Voyager",
    "thumbnail": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "id": 10,
    "title": "Crescent Monitor 27\"",
    "price": 229.0,
    "rating": 4.4,
    "category": "Displays",
    "brand": "Crescent",
    "thumbnail": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop"
  }
];

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
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [sort, setSort] = useState('')

  const cats = useMemo(()=> Array.from(new Set(DATA.map(p=>p.category))), [])
  const items = useMemo(()=>{
    let r = [...DATA]
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
  }, [q, cat, sort])

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:'24px 0'}}>
      <header style={{textAlign:'center',padding:24}}>
        <h1>🛍️ Catalog — React</h1>
        <p>Component hóa: Toolbar, Card</p>
      </header>
      <main style={{width:'min(1100px,92vw)',margin:'0 auto'}}>
        <Toolbar q={q} setQ={setQ} cat={cat} setCat={setCat} sort={sort} setSort={setSort} cats={cats} />
        <section style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginTop:16}}>
          {items.map(p => <Card key={p.id} p={p} />)}
        </section>
      </main>
    </div>
  )
}
