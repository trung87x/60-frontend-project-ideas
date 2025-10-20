import { useEffect, useRef, useState } from 'react'

async function reverseName(lat, lon){
  const url = new URL('https://geocoding-api.open-meteo.com/v1/reverse')
  url.search = new URLSearchParams({ latitude: lat, longitude: lon, language: 'vi' })
  const r = await fetch(url); if(!r.ok) return ''
  const d = await r.json(); return d?.results?.[0]?.name || ''
}
async function fetchWeather(lat, lon, unit='C'){
  const tempParam = unit === 'F' ? 'fahrenheit' : 'celsius'
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.search = new URLSearchParams({
    latitude: lat, longitude: lon, timezone: 'auto',
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code',
    temperature_unit: tempParam
  })
  const res = await fetch(url); if(!res.ok) throw new Error('Weather failed')
  return await res.json()
}

export function useGeoWeather(unit='C'){
  const [state, setState] = useState({ loading:true, error:'', name:'', data:null })
  const watchId = useRef(null)

  useEffect(()=>{
    let cancelled = false
    if(!navigator.geolocation){ setState({ loading:false, error:'Trình duyệt không hỗ trợ geolocation.', name:'', data:null }); return }
    const cached = localStorage.getItem('geo:last')
    if(cached){
      try{
        const o = JSON.parse(cached)
        setState({ loading:false, error:'', name:o.name, data:o.data })
      }catch{}
    }
    const handler = async (pos)=>{
      try{
        setState(s=>({...s, loading:true, error:''}))
        const lat = pos.coords.latitude; const lon = pos.coords.longitude
        const [name, data] = await Promise.all([reverseName(lat, lon), fetchWeather(lat, lon, unit)])
        if(cancelled) return
        setState({ loading:false, error:'', name, data })
        localStorage.setItem('geo:last', JSON.stringify({ name, data }))
      }catch(e){
        if(!cancelled) setState({ loading:false, error:'Không lấy được dữ liệu thời tiết', name:'', data:null })
      }
    }
    navigator.geolocation.getCurrentPosition(handler, (err)=>{
      setState({ loading:false, error: err.message, name:'', data:null })
    }, { enableHighAccuracy:true, timeout:10000, maximumAge:0 })
    watchId.current = navigator.geolocation.watchPosition(handler)

    return ()=>{
      cancelled = true
      if(watchId.current) navigator.geolocation.clearWatch(watchId.current)
    }
  }, [unit])

  return state
}
