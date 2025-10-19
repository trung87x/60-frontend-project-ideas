import { fetchRepos, fetchPosts } from '@/lib/data'

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const routes = ['', '/projects', '/blog', '/contact'].map(p => ({ url: `${base}${p}`, lastModified: new Date().toISOString() }))
  const [repos, posts] = await Promise.all([fetchRepos(), fetchPosts()])
  const projectRoutes = repos.map(r => ({ url: `${base}/projects/${r.name}`, lastModified: r.pushed_at || new Date().toISOString() }))
  const blogRoutes = posts.slice(0, 20).map(p => ({ url: `${base}/blog/${p.id}`, lastModified: new Date().toISOString() }))
  return [...routes, ...projectRoutes, ...blogRoutes]
}
