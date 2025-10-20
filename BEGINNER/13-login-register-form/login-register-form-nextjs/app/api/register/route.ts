import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest){
  const { name, email, password } = await req.json()
  if(!name || !email || !password) return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 })
  if(password.length < 6) return NextResponse.json({ error: 'Mật khẩu >= 6 ký tự' }, { status: 400 })
  // mock create
  await new Promise(r=>setTimeout(r, 400))
  return NextResponse.json({ message: 'Đăng ký thành công (mock)' })
}
