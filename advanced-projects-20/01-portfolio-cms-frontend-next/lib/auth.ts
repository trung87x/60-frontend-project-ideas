import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { env } from './env'

export type Session = { sub: string; email?: string; name?: string; roles?: string[] } | null

export async function getSession(): Promise<Session>{
  const token = cookies().get('access_token')?.value
  if(!token || !env.jwtPublicKey) return null
  try {
    const { payload } = await jwtVerify(token, await import('jose').then(j=>j.createLocalJWKSet({keys:[{kty:'RSA', alg:'RS256'}]})).catch(()=>new TextEncoder().encode(env.jwtPublicKey)))
    // Fallback: try PEM public key
  } catch {}
  try {
    const { payload } = await jwtVerify(token, await import('jose').then(()=>{
      // Decode PEM
      const { importSPKI } = require('jose')
      return importSPKI(env.jwtPublicKey, 'RS256')
    }))
    return {
      sub: String(payload.sub||''),
      email: payload.email as string | undefined,
      name: payload.name as string | undefined,
      roles: (payload.roles as string[]) || []
    }
  } catch {
    return null
  }
}