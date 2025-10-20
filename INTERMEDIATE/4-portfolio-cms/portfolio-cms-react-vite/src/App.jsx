import React from 'react'

const initial = [
  { id:1, title:'Landing Page', desc:'Trang giới thiệu sản phẩm.', image:'/images/p1.jpg' },
  { id:2, title:'Dashboard', desc:'Phân tích số liệu.', image:'/images/p2.jpg' },
  { id:3, title:'Blog', desc:'Chia sẻ bài viết kỹ thuật.', image:'/images/p3.jpg' },
]

function Card({ p }){
  return (
    <article style={{background:'#fff',border:'1px solid #eee',borderRadius:12,overflow:'hidden'}}>
      <img src={p.image} alt={p.title} style={{width:'100%'}}/>
      <div style={{padding:12}}>
        <h3 style={{margin:'0 0 4px 0'}}>{p.title}</h3>
        <p style={{color:'#555',margin:0}}>{p.desc}</p>
      </div>
    </article>
  )
}

export default function App(){
  const [projects, setProjects] = React.useState(initial)
  const [q, setQ] = React.useState('')
  const filtered = projects.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <main style={{maxWidth:1100,margin:'0 auto',padding:16}}>
      <h1>📁 Portfolio</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm dự án…" style={{padding:8,border:'1px solid #ddd',borderRadius:8,width:'100%',maxWidth:360}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12,marginTop:12}}>
        {filtered.map(p => <Card key={p.id} p={p} />)}
      </div>
    </main>
  )
}
