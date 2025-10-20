import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function User(){
  const { id } = useParams()
  const user = { name:'Nguyễn Văn A', bio:'Front-end Developer • Đà Nẵng' }
  const posts = [
    { id:1, image:'/post-1.jpg', caption:'Ngày đẹp trời ☀️' },
    { id:2, image:'/post-2.jpg', caption:'Code cùng cà phê ☕' },
  ]
  return (
    <HelmetProvider>
      <Helmet>
        <title>{user.name} — Social Profile</title>
        <meta name="description" content={`Hồ sơ của ${user.name}: ${user.bio}`} />
      </Helmet>
      <main style={{maxWidth:960,margin:'0 auto',padding:16}}>
        <header style={{display:'flex',gap:12,alignItems:'center',borderBottom:'1px solid #eee',padding:12}}>
          <img src="/avatar.jpg" alt="Avatar" style={{width:96,height:96,borderRadius:'50%',objectFit:'cover',border:'3px solid #eee'}}/>
          <div><h1 style={{margin:0,fontSize:28}}>{user.name}</h1><p style={{margin:'4px 0 0',color:'#555'}}>{user.bio}</p></div>
        </header>
        <h2>Bài viết</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
          {posts.map(p => (<article key={p.id} style={{border:'1px solid #eee',borderRadius:8,overflow:'hidden',background:'#fff'}}>
            <img src={p.image} alt={p.caption} style={{width:'100%'}}/><p style={{margin:'8px 12px'}}>{p.caption}</p>
          </article>))}
        </div>
      </main>
    </HelmetProvider>
  )
}
