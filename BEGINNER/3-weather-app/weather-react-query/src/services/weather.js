const API = 'openweathermap'
const KEY = import.meta.env.VITE_WEATHER_API_KEY || ''
function toIconUrl(icon){ return `https://openweathermap.org/img/wn/${icon}@2x.png` }
function fmtWind(speed, units){ return units === 'metric' ? `${Math.round(speed*3.6)} km/h` : `${Math.round(speed)} mph` }

export async function fetchCurrent(city, units){
  if (!KEY) throw new Error('Thiếu VITE_WEATHER_API_KEY')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${KEY}&lang=vi`
  const res = await fetch(url); if(!res.ok) throw new Error('HTTP ' + res.status)
  const d = await res.json()
  return {
    city: d.name, country: d.sys?.country ?? '',
    temp: Math.round(d.main?.temp ?? 0),
    desc: d.weather?.[0]?.description ?? '',
    icon: d.weather?.[0]?.icon ?? '01d',
    humidity: d.main?.humidity ?? 0,
    windStr: fmtWind(d.wind?.speed ?? 0, units),
    time: new Date(d.dt*1000).toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'}),
  }
}

export async function fetchForecast(city, units){
  if (!KEY) throw new Error('Thiếu VITE_WEATHER_API_KEY')
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${KEY}&lang=vi`
  const res = await fetch(url); if(!res.ok) throw new Error('HTTP ' + res.status)
  const d = await res.json()
  return (d.list ?? []).slice(0,5).map(item => ({
    time: new Date(item.dt*1000).toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'}),
    temp: Math.round(item.main?.temp ?? 0),
    icon: item.weather?.[0]?.icon ?? '01d',
    desc: item.weather?.[0]?.description ?? '',
  }))
}
