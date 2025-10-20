'use client'
import React, { useEffect, useState } from 'react'

function wcToIcon(w){ const m = {0:'☀️',1:'🌤️',2:'⛅',3:'☁️',45:'🌫️',48:'🌫️',51:'🌦️',61:'🌧️',71:'❄️',80:'🌧️',95:'⛈️'}; return m[w] || '🌡️' }

async function geocodeCity(name){
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.search = new URLSearchParams({ name, count: 1, language: 'vi' })
  const res = await fetch(url); if(!res.ok) throw new Error('Geocode failed')
  const data = await res.json()
  if(!data.results?.length) throw new Error('Không tìm thấy thành phố')
  const r = data.results[0]
  return { name: `${r.name}, ${r.country_code}`, lat: r.latitude, lon: r.longitude }
}

async function fetchWeather(lat:number, lon:number){
  const url = new URL('/api/weather', window.location.origin)
  url.search = new URLSearchParams({
    latitude: String(lat), longitude: String(lon),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum',
    timezone: 'auto'
  })
  const res = await fetch(url.toString())
  if(!res.ok) throw new Error('Weather failed')
  return await res.json()
}

export default function Page(){
  const [city, setCity] = useState('Hanoi')
  const [place, setPlace] = useState<{name:string, lat:number, lon:number} | null>(null)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')

  async function search(){
    try{
      setError(''); setData(null)
      const p = await geocodeCity(city)
      setPlace(p)
      const d = await fetchWeather(p.lat, p.lon)
      setData(d)
    }catch(e:any){ setError(e.message || 'Lỗi') }
  }

  useEffect(()=>{ search() }, [])

  return (
    <div style={{maxWidth:1100, margin:'0 auto'}}>
      <header style={{textAlign:'center', marginBottom:16}}>
        <h1>⛅ Weather Dashboard — Next.js</h1>
        <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:8}}>
          <input value={city} onChange={e=>setCity((e.target as HTMLInputElement).value)} placeholder="Nhập thành phố" />
          <button onClick={search} style={{background:'linear-gradient(90deg,#7c3aed,#06b6d4)',border:'none',color:'#fff',padding:'8px 12px',borderRadius:10}}>Tìm</button>
        </div>
        {place && <p style={{opacity:.8,marginTop:8}}>📍 {place.name} ({place.lat.toFixed(2)}, {place.lon.toFixed(2)})</p>}
        {error && <p style={{color:'#fca5a5'}}>{error}</p>}
      </header>

      {!data ? <p>Đang tải...</p> : (
        <>
          <section style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
            <div style={{background:'#161a2b',borderRadius:16,padding:24,textAlign:'center',fontSize:42,fontWeight:800}}>
              {wcToIcon(data.current.weather_code)}<br/>{Math.round(data.current.temperature_2m)}°C
            </div>
            <aside style={{background:'#0f1220',borderRadius:16,padding:16}}>
              <h3>Chỉ số</h3>
              <div>Độ ẩm: {data.current.relative_humidity_2m}%</div>
              <div>Gió: {data.current.wind_speed_10m} m/s</div>
              <div>Thể cảm: {Math.round(data.current.apparent_temperature)}°C</div>
            </aside>
          </section>

          <section style={{background:'#0f1220',borderRadius:16,padding:16,marginTop:16}}>
            <h3>Dự báo 5 ngày</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}}>
              {data.daily.time.slice(0,5).map((d:string, i:number)=> (
                <div key={d} style={{border:'1px solid #283055',borderRadius:12,padding:12,textAlign:'center'}}>
                  <div>{wcToIcon(data.daily.weather_code[i])}</div>
                  <div style={{opacity:.8,fontSize:12}}>{d}</div>
                  <div style={{fontWeight:700}}>{Math.round(data.daily.temperature_2m_max[i])}°/{Math.round(data.daily.temperature_2m_min[i])}°</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
