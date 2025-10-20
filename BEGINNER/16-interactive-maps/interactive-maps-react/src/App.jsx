import React, { useEffect, useRef, useState } from 'react'

const PRESETS = {
  'hanoi': [21.028511, 105.804817],
  'saigon': [10.77653, 106.700981],
  'danang': [16.0544, 108.2022],
}

export default function App(){
  const mapRef = useRef(null)
  const mapInst = useRef(null)
  const [q, setQ] = useState('')
  const markers = useRef([])

  useEffect(()=>{
    mapInst.current = L.map('map').setView([21.028511, 105.804817], 12)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap' }).addTo(mapInst.current)
    mapInst.current.on('click', e => addMarker(e.latlng.lat, e.latlng.lng))
    return ()=> mapInst.current.remove()
  }, [])

  function addMarker(lat, lng, label){
    const m = L.marker([lat,lng]).addTo(mapInst.current).bindPopup(label || `${lat.toFixed(4)}, ${lng.toFixed(4)}`)
    markers.current.push(m)
  }
  function clearMarkers(){
    markers.current.forEach(m => mapInst.current.removeLayer(m))
    markers.current = []
  }
  function search(){
    const key = q.toLowerCase().replaceAll(' ', '')
    const hit = PRESETS[key]
    if(hit){ mapInst.current.setView(hit, 12); addMarker(hit[0], hit[1], '📍 '+q) }
    else alert('Không tìm thấy trong demo (thử: hanoi/saigon/danang)')
  }
  function locate(){
    if(!navigator.geolocation){ alert('Không hỗ trợ Geolocation'); return }
    navigator.geolocation.getCurrentPosition(p => { const {latitude,longitude}=p.coords; mapInst.current.setView([latitude,longitude], 14); addMarker(latitude,longitude,'📍 Vị trí của tôi') })
  }

  return (
    <main style={{maxWidth:980, margin:'40px auto', padding:24, fontFamily:'system-ui'}}>
      <h1>🗺️ Interactive Maps — React (Cấp 4)</h1>
      <div style={{display:'flex', gap:8, marginBottom:8}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="hanoi / saigon / danang" style={{flex:1, padding:'10px 12px', border:'1px solid #374151', borderRadius:10, background:'#0b1220', color:'#e5e7eb'}} />
        <button onClick={search}>Tìm</button>
        <button onClick={locate}>Vị trí của tôi</button>
        <button onClick={clearMarkers}>Xoá marker</button>
      </div>
      <div id="map"></div>
    </main>
  )
}
