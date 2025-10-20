import { NextRequest, NextResponse } from 'next/server'

let scores: { name: string; size: number; ms: number; moves: number }[] = [
  { name: 'Alice', size: 4, ms: 42000, moves: 20 },
  { name: 'Bob', size: 4, ms: 51000, moves: 22 },
]

export async function GET() {
  return NextResponse.json({ scores: scores.sort((a,b)=> a.ms-b.ms || a.moves-b.moves).slice(0, 10) })
}
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, size, ms, moves } = body || {}
  if(!name || !ms || !moves || !size){ return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 }) }
  scores.push({ name, size, ms, moves })
  return NextResponse.json({ ok: true })
}
