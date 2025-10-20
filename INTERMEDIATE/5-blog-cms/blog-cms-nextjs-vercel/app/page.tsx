'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type Post = { slug:string; title:string; date:string; tags:string[]; excerpt:string; cover:string }

export default function Page(){
  const [posts, setPosts] = useState<Post[]>([])
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('')
  const [sort, setSort] = useState('newest')

  useEffect(()=>{ fetch('/posts.json').then(r=>r.json()).then(setPosts) }, [])

  const tags = useMemo(()=> Array.from(new Set(posts.flatMap(p=>p.tags))), [posts])
  const items = useMemo(()=>{
    let r = [...posts]
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
  }, [posts, q, tag, sort])

  return (
    <div style={{maxWidth:1100, margin:'0 auto'}}>
      <header style={{textAlign:'center', marginBottom:16}}>
        <h1>📝 Blog CMS — Next.js</h1>
        <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:8}}>
          <input value={q} onChange={e=>setQ((e.target as HTMLInputElement).value)} placeholder="Tìm bài..." />
          <select value={tag} onChange={e=>setTag((e.target as HTMLSelectElement).value)}>
            <option value="">Tất cả tags</option>
            {tags.map(t=> <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={sort} onChange={e=>setSort((e.target as HTMLSelectElement).value)}>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="title-asc">Tiêu đề A→Z</option>
            <option value="title-desc">Tiêu đề Z→A</option>
          </select>
        </div>
      </header>

      <section style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
        {items.map(p => (
          <article key={p.slug} style={{background:'#161a2b',borderRadius:16,overflow:'hidden'}}>
            <Link href={'/posts/'+p.slug} style={{color:'inherit',textDecoration:'none'}}>
              <img src={p.cover} alt={p.title} style={{width:'100%',aspectRatio:'4/3',objectFit:'cover'}}/>
              <div style={{padding:12}}>
                <h3 style={{margin:'4px 0'}}>{p.title}</h3>
                <p style={{opacity:.9}}>{p.excerpt}</p>
                <div style={{display:'flex',justifyContent:'space-between',opacity:.75,fontSize:14,marginTop:8}}>
                  <span>{p.date}</span><span>{p.tags.join(', ')}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
