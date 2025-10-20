import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import data from '../data/projects.json'

export default function Home(){
  const [q,setQ] = React.useState('')
  const filtered = data.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <main style={{maxWidth:1100,margin:'0 auto',padding:16}}>
      <Helmet><title>Portfolio CMS — Home</title><meta name="description" content="Danh mục dự án với Router và SEO."/></Helmet>
      <h1>📁 Portfolio</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm dự án…" style={{padding:8,border:'1px solid #ddd',borderRadius:8,width:'100%',maxWidth:360}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12,marginTop:12}}>
        {filtered.map(p => (
          <article key={p.id} style={{background:'#fff',border:'1px solid #eee',borderRadius:12,overflow:'hidden'}}>
            <img src={p.image} alt={p.title} style={{width:'100%'}}/>
            <div style={{padding:12}}>
              <h3 style={{margin:'0 0 4px 0'}}>
                <Link to={`/project/${p.id}`}>{p.title}</Link>
              </h3>
              <p style={{color:'#555',margin:0}}>{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
