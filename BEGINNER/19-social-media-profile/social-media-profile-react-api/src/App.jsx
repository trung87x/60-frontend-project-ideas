import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const qc = new QueryClient()

async function fetchUser(){
  const res = await fetch('https://dummyjson.com/users/1')
  if(!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}
async function fetchPosts(){
  const res = await fetch('https://dummyjson.com/posts/user/1')
  if(!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

function Header({ user }){
  return (<header style={{display:'flex',gap:12,alignItems:'center',borderBottom:'1px solid #eee',padding:12}}>
    <img src={user?.image || 'https://i.pravatar.cc/150?img=1'} alt='Avatar' style={{width:96,height:96,borderRadius:'50%',objectFit:'cover',border:'3px solid #eee'}}/>
    <div><h1 style={{margin:0,fontSize:28}}>{user?.firstName} {user?.lastName}</h1><p style={{margin:'4px 0 0',color:'#555'}}>{user?.company?.title || '—'}</p></div>
  </header>)
}

function Posts({ items }){
  return (<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12,marginTop:12}}>
    {items.map(p => (<article key={p.id} style={{border:'1px solid #eee',borderRadius:8,overflow:'hidden',background:'#fff',padding:'8px 12px'}}>
      <p style={{margin:0,fontWeight:600}}>{p.title}</p><p style={{margin:'6px 0 0',color:'#444'}}>{p.body}</p>
    </article>))}
  </div>)
}

function Profile(){
  const { data:user, isLoading:lu, error:eu } = useQuery({ queryKey:['user',1], queryFn:fetchUser })
  const { data:postsRes, isLoading:lp, error:ep } = useQuery({ queryKey:['posts',1], queryFn:fetchPosts })
  if(lu || lp) return <p>Đang tải…</p>
  if(eu || ep) return <p>Lỗi tải dữ liệu.</p>
  return (<main style={{maxWidth:960,margin:'0 auto',padding:16}}>
    <Header user={user} />
    <h2>Bài viết</h2>
    <Posts items={postsRes.posts || []} />
  </main>)
}

export default function App(){
  return (<QueryClientProvider client={qc}><Profile/></QueryClientProvider>)
}
