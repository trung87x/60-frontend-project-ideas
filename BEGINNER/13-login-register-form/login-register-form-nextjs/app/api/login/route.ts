import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest){
  const { email, password } = await req.json()
  if(!email || !password) return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 })
  if(password.length < 6) return NextResponse.json({ error: 'Mật khẩu >= 6 ký tự' }, { status: 400 })
  // mock verify
  return NextResponse.json({ token: 'mock-token-' + Math.random().toString(36).slice(2) })
}
