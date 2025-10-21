import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'

export async function POST(req: NextRequest){
  const body = await req.json()
  const r = await fetch(`${env.apiBaseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const text = await r.text()
  if(!r.ok) return new NextResponse(text || 'Login failed', { status: r.status })
  const { access_token, expires_in = 60*60 } = JSON.parse(text)
  const res = NextResponse.json({ ok: true })
  res.cookies.set('access_token', access_token, {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/',
    maxAge: Number(expires_in)
  })
  return res
}