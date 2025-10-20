import React, { useMemo, useState } from 'react'

const POSTS = [
  {
    "slug": "intro-tailwind",
    "title": "Bắt đầu với TailwindCSS",
    "date": "2025-09-10",
    "tags": [
      "css",
      "tailwind"
    ],
    "excerpt": "Tại sao Tailwind lại hot? Cùng tạo UI nhanh với utility-first.",
    "cover": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "slug": "react-hooks-101",
    "title": "React Hooks 101",
    "date": "2025-08-22",
    "tags": [
      "react",
      "hooks"
    ],
    "excerpt": "useState, useEffect và tư duy hàm trong React hiện đại.",
    "cover": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "slug": "nextjs-seo",
    "title": "SEO cơ bản với Next.js",
    "date": "2025-07-15",
    "tags": [
      "nextjs",
      "seo"
    ],
    "excerpt": "Meta tags, Open Graph, sitemap cho site Next.js của bạn.",
    "cover": "https://images.unsplash.com/photo-1497493292307-31c376b6e479?q=80&w=1200&auto=format&fit=crop"
  },
  {
    "slug": "markdown-writing",
    "title": "Viết blog bằng Markdown",
    "date": "2025-06-18",
    "tags": [
      "markdown",
      "writing"
    ],
    "excerpt": "Markdown là gì và cách dùng trong blog CMS tối giản.",
    "cover": "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop"
  }
];

function Toolbar({ q, setQ, tag, setTag, sort, setSort, tags }){
  return (
    <div style={{display:'flex',gap:12,flexWrap:'wrap',background:'#0b1020',padding:12,borderRadius:12}}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm bài..." />
      <select value={tag} onChange={e=>setTag(e.target.value)}>
        <option value="">Tất cả tags</option>
        {tags.map(t=> <option key={t} value={t}>{t}</option>)}
      </select>
      <select value={sort} onChange={e=>setSort(e.target.value)}>
        <option value="newest">Mới nhất</option>
        <option value="oldest">Cũ nhất</option>
        <option value="title-asc">Tiêu đề A→Z</option>
        <option value="title-desc">Tiêu đề Z→A</option>
      </select>
    </div>
  )
}

function Card({ p }){
  return (
    <article style={{background:'#161a2b',borderRadius:16,overflow:'hidden',boxShadow:'0 10px 30px rgba(0,0,0,.35)'}}>
      <img src={p.cover} alt={p.title} style={{width:'100%',aspectRatio:'4/3',objectFit:'cover'}}/>
      <div style={{padding:12}}>
        <h3 style={{margin:'4px 0'}}>{p.title}</h3>
        <p style={{opacity:.9}}>{p.excerpt}</p>
        <div style={{display:'flex',justifyContent:'space-between',opacity:.75,fontSize:14,marginTop:8}}>
          <span>{p.date}</span><span>{p.tags.join(', ')}</span>
        </div>
      </div>
    </article>
  )
}

export default function App(){
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('')
  const [sort, setSort] = useState('newest')

  const tags = useMemo(()=> Array.from(new Set(POSTS.flatMap(p=>p.tags))), [])
  const items = useMemo(()=>{
    let r = [...POSTS]
    const term = q.trim().toLowerCase()
    if(term) r = r.filter(p => (p.title+' '+p.excerpt+' '+p.tags.join(' ')).toLowerCase().includes(term))
    if(tag) r = r.filter(p => p.tags.includes(tag))
    switch(sort){
      case 'newest': r.sort((a,b)=> b.date.localeCompare(a.date)); break;
      case 'oldest': r.sort((a,b)=> a.date.localeCompare(b.date)); break;
      case 'title-asc': r.sort((a,b)=> a.title.localeCompare(b.title)); break;
      case 'title-desc': r.sort((a,b)=> b.title.localeCompare(a.title)); break;
    }
    return r
  }, [q, tag, sort])

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:'24px 0'}}>
      <header style={{textAlign:'center',padding:24}}>
        <h1>📝 Blog CMS — React</h1>
      </header>
      <main style={{width:'min(1100px,92vw)',margin:'0 auto'}}>
        <Toolbar q={q} setQ={setQ} tag={tag} setTag={setTag} sort={sort} setSort={setSort} tags={tags} />
        <section style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:16}}>
          {items.map(p => <Card key={p.slug} p={p} />)}
        </section>
      </main>
    </div>
  )
}
