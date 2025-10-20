import { NextResponse } from 'next/server'
import { tasks } from './data'

export async function GET(){ return NextResponse.json(tasks) }

export async function POST(req: Request){
  const body = await req.json()
  const id = Math.random().toString(36).slice(2,9)
  const t = { id, title: body.title||'', due: body.due||'', priority: body.priority||'medium', done: false }
  tasks.unshift(t as any)
  return NextResponse.json(t, { status: 201 })
}
