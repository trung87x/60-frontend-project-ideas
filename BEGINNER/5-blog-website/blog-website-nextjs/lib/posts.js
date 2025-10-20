import fs from 'node:fs/promises'
import path from 'node:path'

const dataPath = path.join(process.cwd(), 'data', 'posts.json')

export async function listPosts() {
  const raw = await fs.readFile(dataPath, 'utf-8')
  const rows = JSON.parse(raw)
  // Ensure required fields
  return rows.map((p, i) => ({
    id: p.id ?? i + 1,
    slug: p.slug ?? `post-${i+1}`,
    title: p.title ?? 'Untitled',
    excerpt: p.excerpt ?? '',
    date: p.date ?? new Date().toISOString(),
    cover: p.cover ?? '',
    content: p.content ?? ''
  }))
}

export async function getPostBySlug(slug) {
  const posts = await listPosts()
  return posts.find(p => p.slug === slug) || null
}
