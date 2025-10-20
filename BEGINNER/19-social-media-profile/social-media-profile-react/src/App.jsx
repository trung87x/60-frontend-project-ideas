import React, { useState } from 'react'

function ProfileHeader({ user }){
  return (
    <header style={{display:'flex',gap:12,alignItems:'center',borderBottom:'1px solid #eee',padding:12}}>
      <img src='/avatar.jpg' alt='Avatar' style={{width:96,height:96,borderRadius:'50%',objectFit:'cover',border:'3px solid #eee'}}/>
      <div><h1 style={{margin:0,fontSize:28}}>{user.name}</h1><p style={{margin:'4px 0 0',color:'#555'}}>{user.bio}</p></div>
    </header>
  )
}

function Post({ item }){
  return (<article style={{border:'1px solid #eee',borderRadius:8,overflow:'hidden',background:'#fff'}}>
    <img src={item.image} alt={item.caption} style={{width:'100%'}}/>
    <p style={{margin:'8px 12px'}}>{item.caption}</p>
  </article>)
}

export default function App(){
  const [following, setFollowing] = useState(false)
  const user = { name:'Nguyễn Văn A', bio:'Front-end Developer • Đà Nẵng' }
  const posts = [
    { id:1, image:'/posts/1.jpg', caption:'Ngày đẹp trời ☀️' },
    { id:2, image:'/posts/2.jpg', caption:'Code cùng cà phê ☕' },
  ]
  return (
    <main style={{maxWidth:960,margin:'0 auto',padding:16}}>
      <ProfileHeader user={user} />
      <button onClick={()=>setFollowing(f=>!f)} style={{marginTop:12,padding:'8px 12px',borderRadius:8,border:'1px solid #ddd'}}>
        {following ? 'Đang theo dõi' : 'Theo dõi'}
      </button>
      <h2>Bài viết</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {posts.map(p => <Post key={p.id} item={p}/>)}
      </div>
    </main>
  )
}
