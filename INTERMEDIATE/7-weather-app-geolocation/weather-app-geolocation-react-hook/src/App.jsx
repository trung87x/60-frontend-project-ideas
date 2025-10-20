import React, { useState } from 'react'
import { useGeoWeather } from './useGeoWeather.js'

function wcToIcon(w){ const m = {0:'☀️',1:'🌤️',2:'⛅',3:'☁️',45:'🌫️',48:'🌫️',51:'🌦️',61:'🌧️',71:'❄️',80:'🌧️',95:'⛈️'}; return m[w] || '🌡️' }

export default function App(){
  const [unit, setUnit] = useState('C')
  const { loading, error, name, data } = useGeoWeather(unit)

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:24}}>
      <header style={{textAlign:'center'}}>
        <h1>📍 Weather (Hook + WatchPosition)</h1>
        <div style={{marginTop:8}}>
          <label>
            Đơn vị:&nbsp;
            <select value={unit} onChange={e=>setUnit(e.target.value)}>
              <option value="C">°C</option>
              <option value="F">°F</option>
            </select>
          </label>
        </div>
      </header>

      {loading && <p style={{textAlign:'center'}}>Đang lấy vị trí & dữ liệu…</p>}
      {error && <p style={{textAlign:'center', color:'#fca5a5'}}>{error}</p>}

      {data && (
        <main style={{width:'min(1100px,92vw)',margin:'16px auto',display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
          <section style={{background:'#161a2b',borderRadius:16,padding:24,textAlign:'center',fontSize:42,fontWeight:800}}>
            {wcToIcon(data.current.weather_code)}<br/>{Math.round(data.current.temperature_2m)}°{unit}
            <div style={{opacity:.8,fontSize:16,marginTop:8}}>{name}</div>
          </section>
          <aside style={{background:'#0f1220',borderRadius:16,padding:16}}>
            <h3>Chỉ số</h3>
            <div>Độ ẩm: {data.current.relative_humidity_2m}%</div>
            <div>Gió: {data.current.wind_speed_10m} m/s</div>
            <div>Thể cảm: {Math.round(data.current.apparent_temperature)}°{unit}</div>
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
