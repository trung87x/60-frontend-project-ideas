import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const { text } = await req.json()
  const now = new Date().toLocaleTimeString()
  let reply = 'Bạn nói: ' + (text || '')
  const t = (text || '').toLowerCase()
  if(t.includes('chào')) reply = 'Chào bạn! 👋'
  if(t.includes('giờ')) reply = 'Bây giờ là: ' + now
  return NextResponse.json({ reply, time: now })
}
