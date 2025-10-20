'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

declare global { interface Window { L: any } }

function Toolbar({ q, setQ, cat, setCat, cats }:{ q:string,setQ:(v:string)=>void,cat:string,setCat:(v:string)=>void,cats:string[] }){
  return (
    <div style={{display:'flex',gap:12,flexWrap:'wrap',background:'#0f1220',padding:12,borderRadius:12}}>
      <input value={q} onChange={e=>setQ((e.target as HTMLInputElement).value)} placeholder="Tìm địa điểm..." />
      <select value={cat} onChange={e=>setCat((e.target as HTMLSelectElement).value)}>
        <option value="">Tất cả loại</option>
        {cats.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  )
}

function MapView({ items }:{ items:any[] }){
  const ref = useRef<HTMLDivElement | null>(null)
  const layerRef = useRef<{map:any, layer:any} | null>(null)

  useEffect(()=>{
    if(!ref.current) return
    if(!layerRef.current){
      const map = window.L.map(ref.current).setView([16.3, 106.0], 5.5)
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap' }).addTo(map)
      layerRef.current = { map, layer: window.L.layerGroup().addTo(map) }
    }
    const { map, layer } = layerRef.current
    layer.clearLayers()
    for(const p of items){
      const c = window.L.circleMarker([p.lat, p.lon], { radius: Math.max(6, p.value/12), color:'#a78bfa', fillColor:'#60a5fa', fillOpacity:0.6 })
      c.bindPopup(`<b>${p.name}</b><br>Loại: ${p.category}<br>Điểm: ${p.value}<br><a href='/place/${p.id}'>Xem chi tiết</a>`)
      c.addTo(layer)
    }
  }, [items])

  return <div id="map" ref={ref} style={{height:'70vh',borderRadius:16,overflow:'hidden',boxShadow:'0 10px 30px rgba(0,0,0,.35)'}}/>
}

export default function Page(){
  const [data, setData] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')

  useEffect(()=>{ fetch('/api/places').then(r=>r.json()).then(setData) }, [])

  const cats = useMemo(()=> Array.from(new Set(data.map(p=>p.category))), [data])
  const items = useMemo(()=>{
    let r = [...data]
    const term = q.trim().toLowerCase()
    if(term) r = r.filter(p => (p.name + ' ' + p.category).toLowerCase().includes(term))
    if(cat) r = r.filter(p => p.category === cat)
    return r
  }, [data, q, cat])

  return (
    <div style={{maxWidth:1100, margin:'0 auto'}}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <header style={{textAlign:'center', marginBottom:12}}><h1>🗺️ Maps — Next.js</h1></header>
      <Toolbar q={q} setQ={setQ} cat={cat} setCat={setCat} cats={cats} />
      <div style={{marginTop:12}}><MapView items={items} /></div>

      <section style={{marginTop:16,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {items.map(p => (
          <article key={p.id} style={{background:'#161a2b',borderRadius:12,padding:12}}>
            <h3 style={{margin:'4px 0'}}>{p.name}</h3>
            <div style={{opacity:.8,fontSize:14}}>Loại: {p.category} • Điểm: {p.value}</div>
            <Link href={'/place/'+p.id} style={{display:'inline-block',marginTop:8,background:'linear-gradient(90deg,#7c3aed,#06b6d4)',color:'#fff',padding:'6px 10px',borderRadius:8,textDecoration:'none'}}>Xem chi tiết</Link>
          </article>
        ))}
      </section>
    </div>
  )
}
