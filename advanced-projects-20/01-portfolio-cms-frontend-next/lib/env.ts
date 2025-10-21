export const env = {
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:4000',
  publicApiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  revalidateSecret: process.env.REVALIDATE_SECRET || '',
  jwtPublicKey: (process.env.JWT_PUBLIC_KEY || '').replace(/\\n/g, '\n'),
}