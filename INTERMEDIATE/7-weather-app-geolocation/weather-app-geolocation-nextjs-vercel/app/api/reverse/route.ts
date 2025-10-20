import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('latitude') || ''
  const lon = searchParams.get('longitude') || ''
  const url = new URL('https://geocoding-api.open-meteo.com/v1/reverse')
  url.searchParams.set('latitude', lat)
  url.searchParams.set('longitude', lon)
  url.searchParams.set('language', 'vi')
  const res = await fetch(url.toString(), { next: { revalidate: 600 } })
  const data = await res.json()
  return NextResponse.json(data)
}
