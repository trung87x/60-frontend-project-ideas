import { MetadataRoute } from 'next'
import { env } from '@/lib/env'
export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
  const base = env.siteUrl
  return [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/conversations`, changeFrequency: 'daily' },
  ]
}