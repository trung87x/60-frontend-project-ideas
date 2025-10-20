'use client'
import React, { useEffect, useState } from 'react'

function wcToIcon(w:number){ const m:any = {0:'☀️',1:'🌤️',2:'⛅',3:'☁️',45:'🌫️',48:'🌫️',51:'🌦️',61:'🌧️',71:'❄️',80:'🌧️',95:'⛈️'}; return m[w] || '🌡️' }

async function getName(lat:number, lon:number){
  const url = new URL('/api/reverse', window.location.origin)
  url.search = new URLSearchParams({ latitude: String(lat), longitude: String(lon) }).toString()
  const r = await fetch(url.toString()); if(!r.ok) return ''
  const d = await r.json(); return d?.results?.[0]?.name || ''
}
async function getWeather(lat:number, lon:number){
  const url = new URL('/api/weather', window.location.origin)
  url.search = new URLSearchParams({
    latitude: String(lat), longitude: String(lon),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code',
    timezone: 'auto'
  }).toString()
  const r = await fetch(url.toString()); if(!r.ok) throw new Error('Weather failed')
  return await r.json()
}

export default function Page(){
  const [name, setName] = useState('')
  const [data, setData] = useState<any | null>(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    if(!navigator.geolocation){ setError('Trình duyệt không hỗ trợ geolocation.'); return }
    navigator.geolocation.getCurrentPosition(async (p)=>{
      try{
        const { latitude: lat, longitude: lon } = p.coords
        const [n, d] = await Promise.all([getName(lat, lon), getWeather(lat, lon)])
        setName(n); setData(d)
      }catch(e:any){ setError('Không lấy được dữ liệu thời tiết') }
    }, (err)=> setError(err.message), { enableHighAccuracy:true, timeout:10000, maximumAge:0 })
  }, [])

  return (
    <div style={{maxWidth:1100, margin:'0 auto'}}>
      <header style={{textAlign:'center', marginBottom:16}}><h1>📍 Weather — Next.js + Geolocation</h1></header>
      {!data ? <p style={{textAlign:'center'}}>{error || 'Đang lấy vị trí & dữ liệu…'}</p> : (
        <>
          <section style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
            <div style={{background:'#161a2b',borderRadius:16,padding:24,textAlign:'center',fontSize:42,fontWeight:800}}>
              {wcToIcon(data.current.weather_code)}<br/>{Math.round(data.current.temperature_2m)}°C
              <div style={{opacity:.8,fontSize:16,marginTop:8}}>{name}</div>
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
              {data.daily.time.slice(0,5).map((d:string,i:number)=> (
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
