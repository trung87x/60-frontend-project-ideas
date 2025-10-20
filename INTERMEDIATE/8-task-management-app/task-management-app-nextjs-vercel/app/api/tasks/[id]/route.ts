import { NextResponse } from 'next/server'
import { tasks } from '../../tasks/data'

export async function PATCH(_: Request, { params }:{ params: { id: string } }){
  const id = params.id
  const idx = tasks.findIndex((t:any)=> String(t.id)===String(id))
  if(idx<0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  tasks[idx].done = !tasks[idx].done
  return NextResponse.json(tasks[idx])
}

export async function DELETE(_: Request, { params }:{ params: { id: string } }){
  const id = params.id
  const idx = tasks.findIndex((t:any)=> String(t.id)===String(id))
  if(idx<0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const [removed] = tasks.splice(idx,1)
  return NextResponse.json(removed)
}
