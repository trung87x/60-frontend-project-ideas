import React, { useEffect, useMemo, useRef, useState } from 'react'

const DATA = [
  {
    "id": 1,
    "name": "Hà Nội",
    "lat": 21.0278,
    "lon": 105.8342,
    "category": "City",
    "value": 92
  },
  {
    "id": 2,
    "name": "Hồ Chí Minh",
    "lat": 10.8231,
    "lon": 106.6297,
    "category": "City",
    "value": 98
  },
  {
    "id": 3,
    "name": "Đà Nẵng",
    "lat": 16.0544,
    "lon": 108.2022,
    "category": "City",
    "value": 85
  },
  {
    "id": 4,
    "name": "Huế",
    "lat": 16.4637,
    "lon": 107.5909,
    "category": "Heritage",
    "value": 74
  },
  {
    "id": 5,
    "name": "Cần Thơ",
    "lat": 10.0452,
    "lon": 105.7469,
    "category": "City",
    "value": 63
  },
  {
    "id": 6,
    "name": "Nha Trang",
    "lat": 12.2388,
    "lon": 109.1967,
    "category": "Resort",
    "value": 80
  },
  {
    "id": 7,
    "name": "Hạ Long",
    "lat": 20.9714,
    "lon": 107.0448,
    "category": "Nature",
    "value": 77
  },
  {
    "id": 8,
    "name": "Đà Lạt",
    "lat": 11.9404,
    "lon": 108.4583,
    "category": "Resort",
    "value": 70
  },
  {
    "id": 9,
    "name": "Hải Phòng",
    "lat": 20.8449,
    "lon": 106.6881,
    "category": "Port",
    "value": 68
  },
  {
    "id": 10,
    "name": "Vinh",
    "lat": 18.6796,
    "lon": 105.6813,
    "category": "City",
    "value": 55
  },
  {
    "id": 11,
    "name": "Quy Nhơn",
    "lat": 13.7829,
    "lon": 109.2196,
    "category": "Resort",
    "value": 66
  },
  {
    "id": 12,
    "name": "Phú Quốc",
    "lat": 10.2899,
    "lon": 103.984,
    "category": "Island",
    "value": 72
  }
];

function Toolbar({ q, setQ, cat, setCat, cats }){
  return (
    <div style={{display:'flex',gap:12,flexWrap:'wrap',background:'#0f1220',padding:12,borderRadius:12}}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm địa điểm..." />
      <select value={cat} onChange={e=>setCat(e.target.value)}>
        <option value="">Tất cả loại</option>
        {cats.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  )
}

function MapView({ items }){
  const ref = useRef(null)
  const layerRef = useRef(null)

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
      c.bindPopup(`<b>${p.name}</b><br>Loại: ${p.category}<br>Điểm: ${p.value}`)
      c.addTo(layer)
    }
  }, [items])

  return <div ref={ref} style={{height:'70vh',borderRadius:16,overflow:'hidden',boxShadow:'0 10px 30px rgba(0,0,0,.35)'}}/>
}

export default function App(){
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const cats = useMemo(()=> Array.from(new Set(DATA.map(p=>p.category))), [])
  const items = useMemo(()=>{
    let r = [...DATA]
    const term = q.trim().toLowerCase()
    if(term) r = r.filter(p => (p.name + ' ' + p.category).toLowerCase().includes(term))
    if(cat) r = r.filter(p => p.category === cat)
    return r
  }, [q, cat])

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:'24px 0'}}>
      <header style={{textAlign:'center',padding:24}}><h1>🗺️ Maps — React</h1></header>
      <main style={{width:'min(1100px,92vw)',margin:'0 auto'}}>
        <Toolbar q={q} setQ={setQ} cat={cat} setCat={setCat} cats={cats} />
        <div style={{marginTop:12}}><MapView items={items} /></div>
      </main>
    </div>
  )
}
