import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  const body = await req.json()
  const { name, email, message } = body || {}
  if(!name || !email || !message){
    return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 })
  }
  // mock save
  await new Promise(r => setTimeout(r, 500))
  return NextResponse.json({ message: 'Đã nhận liên hệ! (mock)' })
}
