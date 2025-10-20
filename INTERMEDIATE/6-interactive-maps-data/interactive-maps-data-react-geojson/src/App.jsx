import React, { useEffect, useMemo, useRef, useState } from 'react'

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

function MapView({ geojson, onPick }){
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
    if(!geojson) return
    const gj = window.L.geoJSON(geojson, {
      pointToLayer: (f, latlng) => window.L.circleMarker(latlng, {
        radius: Math.max(6, f.properties.value/12),
        color: '#a78bfa', fillColor: '#60a5fa', fillOpacity: .6
      }),
      onEachFeature: (f, l) => {
        l.bindPopup(`<b>${f.properties.name}</b><br>Loại: ${f.properties.category}<br>Điểm: ${f.properties.value}`)
        l.on('click', () => onPick?.(f.properties))
      }
    }).addTo(layer)
    map.fitBounds(gj.getBounds(), { padding: [20,20] })
  }, [geojson, onPick])

  return <div ref={ref} style={{height:'70vh',borderRadius:16,overflow:'hidden',boxShadow:'0 10px 30px rgba(0,0,0,.35)'}}/>
}

export default function App(){
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [geojson, setGeojson] = useState(null)
  const [active, setActive] = useState(null)

  useEffect(()=>{ fetch('/data.geojson').then(r=>r.json()).then(setGeojson) }, [])

  const cats = useMemo(()=> geojson ? Array.from(new Set(geojson.features.map(f=>f.properties.category))) : [], [geojson])

  const filtered = useMemo(()=>{
    if(!geojson) return null
    const term = q.trim().toLowerCase()
    const feats = geojson.features.filter(f => {
      const okQ = term ? (f.properties.name + ' ' + f.properties.category).toLowerCase().includes(term) : true
      const okC = cat ? f.properties.category === cat : true
      return okQ && okC
    })
    return { type:'FeatureCollection', features: feats }
  }, [geojson, q, cat])

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:'24px 0'}}>
      <header style={{textAlign:'center',padding:24}}><h1>🗺️ Maps — React + GeoJSON</h1></header>
      <main style={{width:'min(1100px,92vw)',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
        <div>
          <Toolbar q={q} setQ={setQ} cat={cat} setCat={setCat} cats={cats} />
          <div style={{marginTop:12}}><MapView geojson={filtered} onPick={setActive} /></div>
        </div>
        <aside style={{background:'#0f1220',borderRadius:16,padding:16,minHeight:'70vh'}}>
          <h3>Thông tin</h3>
          {active ? (
            <div>
              <p><strong>{active.name}</strong></p>
              <p>Loại: {active.category}</p>
              <p>Điểm: {active.value}</p>
            </div>
          ) : <p>Nhấn vào một điểm trên bản đồ để xem chi tiết.</p>}
        </aside>
      </main>
    </div>
  )
}
