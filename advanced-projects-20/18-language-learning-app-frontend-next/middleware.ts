import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest){
  const { pathname } = req.nextUrl
  const protectedPaths = ['/dashboard']
  if(protectedPaths.some(p => pathname.startsWith(p))){
    const token = req.cookies.get('access_token')?.value
    if(!token){
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
export const config = { matcher: ['/dashboard'] }