import React from 'react'
import { useEffect, useState } from 'react'
import { fetchCurrent, fetchForecast } from './services/weather.js'

function SearchBar({ city, setCity, onSubmit }){
  return (
    <form className="search" role="search" onSubmit={(e)=>{ e.preventDefault(); onSubmit(); }}>
      <label htmlFor="city" className="sr-only">Thành phố</label>
      <input id="city" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Nhập thành phố, ví dụ: Ho Chi Minh" />
      <button className="btn btn--primary" type="submit">Tìm</button>
    </form>
  )
}

function UnitToggle({ units, onChange }){
  return (
    <div className="unit-toggle" role="group" aria-label="Đổi đơn vị nhiệt độ">
      <button className={'btn ' + (units==='metric'?'active':'')} onClick={()=>onChange('metric')}>°C</button>
      <button className={'btn ' + (units==='imperial'?'active':'')} onClick={()=>onChange('imperial')}>°F</button>
    </div>
  )
}

function toIconUrl(icon){ return `https://openweathermap.org/img/wn/${icon}@2x.png` }

function CurrentCard({ data, loading, error }){
  if (loading) return <section className="card current skeleton" style={{height:180}} aria-busy="true" />
  if (error) return <section className="card current"><h2 className="section-title">Thời tiết hiện tại</h2><p className="error">Không tải được dữ liệu.</p></section>
  if (!data) return null
  return (
    <section className="card current" aria-labelledby="current-title">
      <h2 id="current-title" className="section-title">Thời tiết hiện tại</h2>
      <div className="current__top">
        <div>
          <div className="current__location"><span className="current__city">{data.city}</span> <span className="current__country">{data.country}</span></div>
          <div className="current__temp"><span className="current__value">{data.temp}</span><span className="unit">°</span></div>
          <p className="current__desc" style={{textTransform:'capitalize'}}>{data.desc}</p>
        </div>
        <div><img className="current__icon" src={toIconUrl(data.icon)} alt={data.desc}/></div>
      </div>
      <div className="current__meta">
        <div className="meta__item"><span>Độ ẩm:</span> <strong>{data.humidity}%</strong></div>
        <div className="meta__item"><span>Gió:</span> <strong>{data.windStr}</strong></div>
        <div className="meta__item"><span>Cập nhật:</span> <strong>{data.time}</strong></div>
      </div>
    </section>
  )
}

function ForecastList({ data, loading, error }){
  return (
    <section className={'card forecast ' + (loading?'skeleton':'')} aria-labelledby="forecast-title">
      <h2 id="forecast-title" className="section-title">Dự báo 5 phiên</h2>
      {error && <p className="error">Không tải được dự báo.</p>}
      {!loading && !error && data?.length > 0 && (
        <ul className="forecast__list">
          {data.map((it, idx)=>(
            <li className="forecast__item" key={idx}>
              <img className="forecast__icon" src={toIconUrl(it.icon)} alt={it.desc} />
              <div className="forecast__time">{it.time}</div>
              <div className="forecast__temp">{it.temp}°</div>
              <div className="forecast__desc" style={{textTransform:'capitalize'}}>{it.desc}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function App(){
  const [city, setCity] = useState(import.meta.env.VITE_DEFAULT_CITY || 'Ho Chi Minh')
  const [units, setUnits] = useState(import.meta.env.VITE_DEFAULT_UNITS || 'metric')
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loadingCur, setLoadingCur] = useState(false)
  const [loadingFor, setLoadingFor] = useState(false)
  const [errCur, setErrCur] = useState(null)
  const [errFor, setErrFor] = useState(null)

  async function loadAll(){
    setLoadingCur(true); setErrCur(null)
    setLoadingFor(true); setErrFor(null)
    try{
      const [c, f] = await Promise.all([
        fetchCurrent(city, units),
        fetchForecast(city, units)
      ])
      setCurrent(c); setForecast(f)
    }catch(e){ setErrCur(e); setErrFor(e) }
    finally{ setLoadingCur(false); setLoadingFor(false) }
  }

  useEffect(()=>{ loadAll() }, [city, units])

  return (
    <>
      <header>
        <div className="container row header__row">
          <h1>Weather <span className="brand">App</span> — <span style={{opacity:.7}}>{import.meta.env.VITE_APP_LABEL || 'Vite'}</span></h1>
          <div className="row" style={{gridTemplateColumns:'1fr auto', alignItems:'center'}}>
            <SearchBar city={city} setCity={setCity} onSubmit={loadAll} />
            <UnitToggle units={units} onChange={setUnits}/>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container grid">
          <CurrentCard data={current} loading={loadingCur} error={errCur} />
          <ForecastList data={forecast} loading={loadingFor} error={errFor} />
        </div>
      </main>

      <footer>
        <div className="container footer__row">
          <p>© 2025 Weather App — Vite</p>
          <UnitToggle units={units} onChange={setUnits}/>
        </div>
      </footer>
    </>
  )
}
