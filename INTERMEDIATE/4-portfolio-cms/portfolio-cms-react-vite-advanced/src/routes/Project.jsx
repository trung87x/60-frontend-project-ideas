import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import data from '../data/projects.json'

export default function Project(){
  const { id } = useParams()
  const p = data.find(x => String(x.id) === String(id))
  if(!p) return <main style={{maxWidth:900,margin:'0 auto',padding:16}}><p>Không tìm thấy dự án.</p></main>
  return (
    <main style={{maxWidth:900,margin:'0 auto',padding:16}}>
      <Helmet><title>{p.title} — Portfolio</title><meta name="description" content={p.desc}/></Helmet>
      <p><Link to="/">&larr; Quay lại</Link></p>
      <img src={p.image} alt={p.title} style={{width:'100%',borderRadius:12,border:'1px solid #eee'}}/>
      <h1>{p.title}</h1>
      <p style={{color:'#444'}}>{p.body}</p>
    </main>
  )
}
