import React, { useEffect, useMemo, useState } from 'react'

function mdToHtml(md){
  // very naive markdown -> HTML (headings, bold, italic, code block)
  let html = md
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/\n/g, '<br>')
  return html
}

export default function App(){
  const [posts, setPosts] = useState([])
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('')
  const [sort, setSort] = useState('newest')
  const [active, setActive] = useState(null) // slug -> content

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

  async function openPost(slug){
    const res = await fetch('/posts/'+slug+'.md')
    const text = await res.text()
    setActive({ slug, html: mdToHtml(text) })
  }

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:'24px 0'}}>
      <header style={{textAlign:'center',padding:24}}>
        <h1>📝 Blog CMS — React + Markdown</h1>
        <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:8}}>
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
      </header>

      <main style={{width:'min(1100px,92vw)',margin:'0 auto'}}>
        <section style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {items.map(p => (
            <article key={p.slug} style={{background:'#161a2b',borderRadius:16,overflow:'hidden'}}>
              <img src={p.cover} alt={p.title} style={{width:'100%',aspectRatio:'4/3',objectFit:'cover'}}/>
              <div style={{padding:12}}>
                <h3 style={{margin:'4px 0'}}>{p.title}</h3>
                <p style={{opacity:.9}}>{p.excerpt}</p>
                <div style={{display:'flex',justifyContent:'space-between',opacity:.75,fontSize:14,marginTop:8}}>
                  <span>{p.date}</span><span>{p.tags.join(', ')}</span>
                </div>
                <button onClick={()=>openPost(p.slug)} style={{marginTop:10,padding:'8px 12px',borderRadius:10,border:'none',background:'linear-gradient(90deg,#7c3aed,#06b6d4)',color:'#fff'}}>Đọc bài</button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {active && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',display:'grid',placeItems:'center'}} onClick={()=>setActive(null)}>
          <div style={{width:'min(900px,90vw)',maxHeight:'80dvh',overflow:'auto',background:'#0b1020',border:'1px solid #243',borderRadius:12,padding:16}} onClick={e=>e.stopPropagation()}>
            <div dangerouslySetInnerHTML={{__html: active.html}}/>
          </div>
        </div>
      )}
    </div>
  )
}
