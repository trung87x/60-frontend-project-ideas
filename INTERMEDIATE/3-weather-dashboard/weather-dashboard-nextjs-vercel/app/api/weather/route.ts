import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  for(const [k,v] of searchParams.entries()){ url.searchParams.set(k, v) }
  // Force timezone auto
  if(!url.searchParams.get('timezone')) url.searchParams.set('timezone', 'auto')
  const res = await fetch(url.toString(), { next: { revalidate: 300 } })
  const data = await res.json()
  return NextResponse.json(data)
}
