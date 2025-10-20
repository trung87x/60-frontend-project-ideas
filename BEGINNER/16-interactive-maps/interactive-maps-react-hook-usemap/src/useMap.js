import { useEffect, useRef, useState } from 'react'
const KEY = 'usemap-state-v1'

export function useMap(){
  const mapRef = useRef(null)
  const mapInst = useRef(null)
  const [markers, setMarkers] = useState([])
  const routeRef = useRef(null)

  useEffect(()=>{
    mapInst.current = L.map('map').setView([21.028511, 105.804817], 12)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'&copy; OpenStreetMap' }).addTo(mapInst.current)
    mapInst.current.on('click', e => add(e.latlng.lat, e.latlng.lng))
    // restore
    try{
      const saved = JSON.parse(localStorage.getItem(KEY))
      if(saved?.markers?.length){
        saved.markers.forEach(m => add(m.lat, m.lng, m.label))
      }
    }catch{}
    return ()=> mapInst.current.remove()
  }, [])

  function add(lat, lng, label){
    const m = L.marker([lat,lng]).addTo(mapInst.current).bindPopup(label || `${lat.toFixed(4)}, ${lng.toFixed(4)}`)
    setMarkers(ms => {
      const next = [...ms, { lat, lng, label }]
      localStorage.setItem(KEY, JSON.stringify({ markers: next }))
      return next
    })
    return m
  }
  function clear(){
    markers.forEach(m => {
      // remove by finding layers at that position; simple approach: reset map (quick)
    })
    mapInst.current.eachLayer(layer => {
      if(layer instanceof L.Marker) mapInst.current.removeLayer(layer)
      if(layer instanceof L.Polyline) mapInst.current.removeLayer(layer)
    })
    setMarkers([])
    localStorage.removeItem(KEY)
  }
  function drawRoute(){
    if(routeRef.current) { mapInst.current.removeLayer(routeRef.current); routeRef.current = null }
    if(markers.length < 2) return
    const latlngs = markers.map(m => [m.lat, m.lng])
    routeRef.current = L.polyline(latlngs, { color: '#10b981' }).addTo(mapInst.current)
    mapInst.current.fitBounds(routeRef.current.getBounds(), { padding:[20,20] })
  }
  return { map: mapInst, add, clear, markers, drawRoute }
}
