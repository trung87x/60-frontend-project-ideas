import React, { useState } from 'react'
import userData from './data/user.json'
import postsData from './data/posts.json'

function Header({ user }){
  return (<header style={{display:'flex',gap:12,alignItems:'center',borderBottom:'1px solid #eee',padding:12}}>
    <img src='/avatar.jpg' alt='Avatar' style={{width:96,height:96,borderRadius:'50%',objectFit:'cover',border:'3px solid #eee'}}/>
    <div><h1 style={{margin:0,fontSize:28}}>{user.name}</h1><p style={{margin:'4px 0 0',color:'#555'}}>{user.bio}</p></div>
  </header>)
}

export default function App(){
  const [user] = useState(userData)
  const [posts] = useState(postsData)
  return (<main style={{maxWidth:960,margin:'0 auto',padding:16}}>
    <Header user={user} />
    <h2>Bài viết</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
      {posts.map(p => (<article key={p.id} style={{border:'1px solid #eee',borderRadius:8,overflow:'hidden',background:'#fff'}}>
        <img src={p.image} alt={p.caption} style={{width:'100%'}}/><p style={{margin:'8px 12px'}}>{p.caption}</p>
      </article>))}
    </div>
  </main>)
}
