import { NextResponse } from 'next/server'

export async function GET(){
  const rates = {
  "USD": 1.0,
  "EUR": 0.92,
  "VND": 25400.0,
  "JPY": 151.2,
  "GBP": 0.78,
  "AUD": 1.52,
  "CAD": 1.37,
  "KRW": 1380.0
}
  const date = new Date().toISOString().slice(0,10)
  return NextResponse.json({ base: 'USD', date, rates })
}
