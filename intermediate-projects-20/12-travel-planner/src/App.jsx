import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import 'leaflet/dist/leaflet.css'

export default function App(){
  const [q,setQ]=React.useState('Hanoi')
  const { data } = useQuery({
    queryKey:['geo', q],
    queryFn: async()=> (await axios.get('https://nominatim.openstreetmap.org/search', { params:{ q, format:'json', limit:1 } })).data,
  })
  const pos = data?.[0] ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : [21.03,105.85]

  return (
    <div className="container">
      <h1>Travel Planner</h1>
      <div className="row">
        <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Thành phố…"/>
      </div>
      <div className="card" style={{marginTop:12}}>
        <MapContainer center={pos} zoom={11} style={{height: '480px', width:'100%'}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={pos}><Popup>{q}</Popup></Marker>
        </MapContainer>
      </div>
      <small>Geocoding: Nominatim (OSM). Vui lòng dùng hợp lý (rate-limit).</small>
    </div>
  )
}
