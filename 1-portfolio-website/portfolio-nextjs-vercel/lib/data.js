const GH_USER = process.env.NEXT_PUBLIC_GITHUB_USER || 'vercel'
const POSTS_BASE = process.env.NEXT_PUBLIC_POSTS_API || 'https://jsonplaceholder.typicode.com'

export async function fetchRepos() {
  const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=30&sort=updated`, { next: { revalidate: 300 } })
  if (!res.ok) return []
  const data = await res.json()
  return data.map(r => ({ id: r.id, name: r.name, description: r.description, html_url: r.html_url, pushed_at: r.pushed_at, stargazers_count: r.stargazers_count, forks_count: r.forks_count }))
}

export async function fetchRepoDetail(name) {
  try {
    const repoRes = await fetch(`https://api.github.com/repos/${GH_USER}/${name}`, { next: { revalidate: 300 } })
    if (!repoRes.ok) return null
    const repo = await repoRes.json()
    let readme_html = ''
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${GH_USER}/${name}/readme`, { headers: { 'Accept': 'application/vnd.github.v3.html' }, next: { revalidate: 300 } })
      if (readmeRes.ok) readme_html = await readmeRes.text()
    } catch {}
    return { ...repo, readme_html }
  } catch { return null }
}

export async function fetchPosts() {
  const res = await fetch(`${POSTS_BASE}/posts`, { next: { revalidate: 300 } })
  if (!res.ok) return []
  return res.json()
}
export async function fetchPost(id) {
  const res = await fetch(`${POSTS_BASE}/posts/${id}`, { next: { revalidate: 300 } })
  if (!res.ok) return null
  return res.json()
}
