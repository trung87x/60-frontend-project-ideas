import { NextResponse } from 'next/server'
import data from '@/data/questions.json'

export async function GET(){
  return NextResponse.json(data)
}
