import { listPosts } from '@/lib/posts'

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const posts = await listPosts()
  const postEntries = posts.map(p => ({
    url: `${base}/post/${p.slug}`,
    lastModified: p.date,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/posts`, changeFrequency: 'weekly', priority: 0.8 },
    ...postEntries,
  ]
}
