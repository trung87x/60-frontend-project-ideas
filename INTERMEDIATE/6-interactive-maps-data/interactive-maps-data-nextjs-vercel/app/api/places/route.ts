import { NextResponse } from 'next/server'
import data from '@/data/places.json'

export async function GET(){
  return NextResponse.json(data)
}
