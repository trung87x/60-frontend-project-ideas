import React, { useEffect, useState } from 'react'

function wcToIcon(w){ const m = {0:'☀️',1:'🌤️',2:'⛅',3:'☁️',45:'🌫️',48:'🌫️',51:'🌦️',61:'🌧️',71:'❄️',80:'🌧️',95:'⛈️'}; return m[w] || '🌡️' }

async function reverseName(lat, lon){
  const url = new URL('https://geocoding-api.open-meteo.com/v1/reverse')
  url.search = new URLSearchParams({ latitude: lat, longitude: lon, language: 'vi' })
  const r = await fetch(url); if(!r.ok) return ''
  const d = await r.json(); return d?.results?.[0]?.name || ''
}
async function fetchWeather(lat, lon){
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.search = new URLSearchParams({
    latitude: lat, longitude: lon, timezone: 'auto',
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code'
  })
  const res = await fetch(url); if(!res.ok) throw new Error('Weather failed')
  return await res.json()
}

export default function App(){
  const [pos, setPos] = useState(null)
  const [name, setName] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    if(!navigator.geolocation){ setError('Trình duyệt không hỗ trợ geolocation.'); return }
    navigator.geolocation.getCurrentPosition(async (p)=>{
      const lat = p.coords.latitude; const lon = p.coords.longitude
      setPos({lat, lon}); setError('')
      try{
        const [n, d] = await Promise.all([reverseName(lat, lon), fetchWeather(lat, lon)])
        setName(n); setData(d)
      }catch(e){ setError('Không lấy được dữ liệu thời tiết') }
    }, (err)=> setError(err.message), { enableHighAccuracy:true, timeout:10000, maximumAge:0 })
  }, [])

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:24}}>
      <header style={{textAlign:'center'}}><h1>📍 Weather (React)</h1></header>
      {!data ? (<p style={{textAlign:'center'}}>{error || 'Đang lấy vị trí & dữ liệu…'}</p>) : (
        <main style={{width:'min(1100px,92vw)',margin:'16px auto',display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
          <section style={{background:'#161a2b',borderRadius:16,padding:24,textAlign:'center',fontSize:42,fontWeight:800}}>
            {wcToIcon(data.current.weather_code)}<br/>{Math.round(data.current.temperature_2m)}°C
            <div style={{opacity:.8,fontSize:16,marginTop:8}}>{name}</div>
          </section>
          <aside style={{background:'#0f1220',borderRadius:16,padding:16}}>
            <h3>Chỉ số</h3>
            <div>Độ ẩm: {data.current.relative_humidity_2m}%</div>
            <div>Gió: {data.current.wind_speed_10m} m/s</div>
            <div>Thể cảm: {Math.round(data.current.apparent_temperature)}°C</div>
          </aside>

          <section style={{gridColumn:'1/-1',background:'#0f1220',borderRadius:16,padding:16}}>
            <h3>Dự báo 5 ngày</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}}>
              {data.daily.time.slice(0,5).map((d,i)=> (
                <div key={d} style={{border:'1px solid #283055',borderRadius:12,padding:12,textAlign:'center'}}>
                  <div>{wcToIcon(data.daily.weather_code[i])}</div>
                  <div style={{opacity:.8,fontSize:12}}>{d}</div>
                  <div style={{fontWeight:700}}>{Math.round(data.daily.temperature_2m_max[i])}°/{Math.round(data.daily.temperature_2m_min[i])}°</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  )
}
