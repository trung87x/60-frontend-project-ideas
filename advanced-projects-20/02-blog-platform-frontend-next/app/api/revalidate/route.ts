import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest){
  const secret = req.nextUrl.searchParams.get('secret')
  if(!secret || secret !== env.revalidateSecret){
    return new NextResponse('Invalid secret', { status: 401 })
  }
  const json = await req.json().catch(()=>({}))
  const tags: string[] = Array.isArray(json.tags) ? json.tags : []
  for(const tag of tags){ revalidateTag(tag) }
  return NextResponse.json({ revalidated: true, tags })
}