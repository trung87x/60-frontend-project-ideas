'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

declare global { interface Window { L: any } }

export default function PlacePage(){
  const { id } = useParams() as { id: string }
  const [item, setItem] = useState<any | null>(null)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapState = useRef<{map:any, marker:any} | null>(null)

  useEffect(()=>{
    fetch('/api/places').then(r=>r.json()).then((arr:any[])=>{
      const it = arr.find(x => String(x.id) === String(id))
      setItem(it || null)
      if(mapRef.current && it){
        if(!mapState.current){
          const map = window.L.map(mapRef.current).setView([it.lat, it.lon], 11)
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap' }).addTo(map)
          const marker = window.L.marker([it.lat, it.lon]).addTo(map)
          marker.bindPopup(`<b>${it.name}</b>`).openPopup()
          mapState.current = { map, marker }
        }else{
          const { map, marker } = mapState.current
          map.setView([it.lat, it.lon], 11)
          marker.setLatLng([it.lat, it.lon]).bindPopup(`<b>${it.name}</b>`).openPopup()
        }
      }
    })
  }, [id])

  return (
    <div style={{maxWidth:900, margin:'0 auto'}}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <Link href="/">← Về trang chính</Link>
      {item ? (
        <div style={{marginTop:12}}>
          <h1 style={{margin:'8px 0'}}>{item.name}</h1>
          <div style={{opacity:.8}}>Loại: {item.category} • Điểm: {item.value}</div>
          <div ref={mapRef} style={{height:'60vh',borderRadius:12,overflow:'hidden',marginTop:12,boxShadow:'0 10px 30px rgba(0,0,0,.35)'}} />
          <pre style={{background:'#0b1020',border:'1px solid #243',borderRadius:12,padding:12,marginTop:12,whiteSpace:'pre-wrap'}}>{JSON.stringify(item, null, 2)}</pre>
        </div>
      ) : <p>Không tìm thấy địa điểm.</p>}
    </div>
  )
}
