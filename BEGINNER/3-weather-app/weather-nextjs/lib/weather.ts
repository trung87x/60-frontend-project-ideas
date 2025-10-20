export type Units = 'metric' | 'imperial'

export interface Current {
  city: string
  country: string
  temp: number
  desc: string
  icon: string
  humidity: number
  windStr: string
  time: string
}

export interface ForecastItem {
  time: string
  temp: number
  icon: string
  desc: string
}

const KEY = process.env.OPENWEATHER_API_KEY as string

function fmtWind(speed: number, units: Units){
  return units === 'metric' ? `${Math.round(speed*3.6)} km/h` : `${Math.round(speed)} mph`
}

export async function fetchCurrent(city: string, units: Units): Promise<Current> {
  if (!KEY) throw new Error('Missing OPENWEATHER_API_KEY')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${KEY}&lang=vi`
  const res = await fetch(url, { next: { revalidate: 600 } }) // ISR 10 phút
  if (!res.ok) throw new Error('HTTP ' + res.status)
  const d = await res.json()
  return {
    city: d.name,
    country: d.sys?.country ?? '',
    temp: Math.round(d.main?.temp ?? 0),
    desc: d.weather?.[0]?.description ?? '',
    icon: d.weather?.[0]?.icon ?? '01d',
    humidity: d.main?.humidity ?? 0,
    windStr: fmtWind(d.wind?.speed ?? 0, units),
    time: new Date(d.dt*1000).toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'}),
  }
}

export async function fetchForecast(city: string, units: Units): Promise<ForecastItem[]> {
  if (!KEY) throw new Error('Missing OPENWEATHER_API_KEY')
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${KEY}&lang=vi`
  const res = await fetch(url, { next: { revalidate: 600 } })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  const d = await res.json()
  return (d.list ?? []).slice(0,5).map((item: any) => ({
    time: new Date(item.dt*1000).toLocaleTimeString('vi-VN', {hour:'2-digit', minute:'2-digit'}),
    temp: Math.round(item.main?.temp ?? 0),
    icon: item.weather?.[0]?.icon ?? '01d',
    desc: item.weather?.[0]?.description ?? '',
  }))
}
