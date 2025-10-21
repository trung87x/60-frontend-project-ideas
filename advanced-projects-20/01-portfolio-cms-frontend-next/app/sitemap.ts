import { MetadataRoute } from 'next'
import { env } from '@/lib/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
  const base = env.siteUrl
  // static core routes; dynamic routes should be added by calling backend if desired
  return [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/projects`, changeFrequency: 'daily' },
    { url: `${base}/blog`, changeFrequency: 'daily' },
  ]
}