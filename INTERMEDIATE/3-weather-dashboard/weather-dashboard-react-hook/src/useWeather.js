import { useEffect, useState } from 'react'

export function useWeather(city, unit='C'){
  const [state, setState] = useState({ loading: true, error: '', place: null, data: null })

  useEffect(()=>{
    if(!city) return
    let cancelled = false
    ;(async ()=>{
      try{
        setState(s=>({...s, loading:true, error:''}))
        const cacheKey = `weather:${city}:${unit}`
        const hit = localStorage.getItem(cacheKey)
        if(hit){
          const parsed = JSON.parse(hit)
          const age = Date.now() - parsed.ts
          if(age < 15*60*1000){ // 15 phút
            if(!cancelled) setState({ loading:false, error:'', place: parsed.place, data: parsed.data })
            return
          }
        }
        const geoUrl = new URL('https://geocoding-api.open-meteo.com/v1/search')
        geoUrl.search = new URLSearchParams({ name: city, count: 1, language: 'vi' })
        const gres = await fetch(geoUrl); if(!gres.ok) throw new Error('Geocode failed')
        const g = await gres.json(); if(!g.results?.length) throw new Error('Không tìm thấy thành phố')
        const r = g.results[0]; const place = { name: `${r.name}, ${r.country_code}`, lat: r.latitude, lon: r.longitude }

        const tempParam = unit === 'F' ? 'fahrenheit' : 'celsius'
        const url = new URL('https://api.open-meteo.com/v1/forecast')
        url.search = new URLSearchParams({
          latitude: place.lat, longitude: place.lon, timezone: 'auto',
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
          daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum',
          temperature_unit: tempParam
        })
        const res = await fetch(url); if(!res.ok) throw new Error('Weather failed')
        const data = await res.json()
        if(cancelled) return
        setState({ loading:false, error:'', place, data })
        localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), place, data }))
      }catch(e){
        if(!cancelled) setState({ loading:false, error: e.message, place:null, data:null })
      }
    })()
    return ()=>{ cancelled = true }
  }, [city, unit])

  return state
}
