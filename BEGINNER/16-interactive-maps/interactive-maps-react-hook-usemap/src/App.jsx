import React, { useState } from 'react'
import { useMap } from './useMap'

const PRESETS = {
  'hanoi': [21.028511, 105.804817],
  'saigon': [10.77653, 106.700981],
  'danang': [16.0544, 108.2022],
}

export default function App(){
  const { add, clear, drawRoute } = useMap()
  const [q, setQ] = useState('')

  function search(){
    const key = q.toLowerCase().replaceAll(' ', '')
    const hit = PRESETS[key]
    if(hit){ add(hit[0], hit[1], '📍 '+q) }
    else alert('Không tìm thấy trong demo (hanoi/saigon/danang)')
  }
  function locate(){
    if(!navigator.geolocation){ alert('Không hỗ trợ Geolocation'); return }
    navigator.geolocation.getCurrentPosition(p => { const {latitude,longitude}=p.coords; add(latitude,longitude,'📍 Vị trí của tôi') })
  }

  return (
    <main style={{maxWidth:980, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>🗺️ Interactive Maps — Cấp 5 (useMap + route + lưu marker)</h1>
      <div style={{display:'flex', gap:8, marginBottom:8}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="hanoi / saigon / danang" style={{flex:1, padding:'10px 12px', border:'1px solid #374151', borderRadius:10, background:'#0b1220', color:'#e5e7eb'}} />
        <button onClick={search}>Thêm điểm</button>
        <button onClick={locate}>Vị trí của tôi</button>
        <button onClick={drawRoute}>Vẽ đường nối</button>
        <button onClick={clear}>Xoá tất cả</button>
      </div>
      <div id="map" style={{height:540, border:'1px solid #1f2937', borderRadius:16}}></div>
    </main>
  )
}
