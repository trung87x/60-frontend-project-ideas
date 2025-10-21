import { cookies } from 'next/headers'
import { env } from './env'

export type FetchOpts = RequestInit & { tags?: string[] }

export async function apiFetch(path: string, opts: FetchOpts = {}){
  const url = `${env.apiBaseUrl}${path}`
  const cookieStore = cookies()
  const token = cookieStore.get('access_token')?.value
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(opts.headers||{}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  const res = await fetch(url, {
    ...opts, headers,
    next: opts.tags ? { tags: opts.tags } : undefined,
    cache: opts.method && opts.method !== 'GET' ? 'no-store' : 'force-cache',
  })
  if(!res.ok){
    const text = await res.text().catch(()=> '')
    throw new Error(`API ${res.status}: ${text || res.statusText}`)
  }
  if(res.status === 204) return null
  return res.json()
}