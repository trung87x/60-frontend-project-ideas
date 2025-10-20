'use client'
import { useEffect, useRef, useState } from 'react'

declare const L: any

export default function Page(){
  const mapRef = useRef<any>(null)
  const mapInst = useRef<any>(null)
  const [places, setPlaces] = useState<any[]>([])

  useEffect(()=>{
    mapInst.current = L.map('map').setView([21.028511, 105.804817], 12)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap' }).addTo(mapInst.current)
    fetch('/api/places', { cache: 'no-store' }).then(r=>r.json()).then(j=>{
      setPlaces(j.places || [])
      ;(j.places||[]).forEach((p:any)=> L.marker([p.lat, p.lng]).addTo(mapInst.current).bindPopup(p.name+' — '+p.city) )
    })
    return ()=> mapInst.current.remove()
  }, [])

  return (
    <main style={{maxWidth:980, margin:'40px auto', padding:24}}>
      <h1>🗺️ Interactive Maps — Next.js (Cấp 6)</h1>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <div id="map" style={{height:540, border:'1px solid #1f2937', borderRadius:16}}></div>
      <section style={{marginTop:12}}>
        <h3>Địa điểm (mock API)</h3>
        <ul>{places.map(p=><li key={p.id}>{p.name} — {p.city}</li>)}</ul>
      </section>
    </main>
  )
}
