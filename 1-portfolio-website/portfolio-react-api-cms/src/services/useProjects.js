import { useQuery } from '@tanstack/react-query'

const GH = (username) => `https://api.github.com/users/${username}/repos?per_page=30&sort=updated`
// For README HTML we use ?download=1 via raw, but GitHub API can render HTML if Accept header set.
// We'll fetch HTML via /repos/{user}/{repo}/readme with accept header.

export function useProjects() {
  const user = import.meta.env.VITE_GITHUB_USER || 'vercel'
  return useQuery({
    queryKey: ['repos', user],
    queryFn: async () => {
      const res = await fetch(GH(user))
      if (!res.ok) throw new Error('GitHub API error ' + res.status)
      const data = await res.json()
      // pick only useful fields
      return data.map(r => ({
        id: r.id, name: r.name, description: r.description, html_url: r.html_url, forks_count: r.forks_count, stargazers_count: r.stargazers_count
      }))
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useProjectDetail(name) {
  const user = import.meta.env.VITE_GITHUB_USER || 'vercel'
  return useQuery({
    queryKey: ['repo', user, name],
    queryFn: async () => {
      const repoRes = await fetch(`https://api.github.com/repos/${user}/${name}`)
      if (!repoRes.ok) throw new Error('Repo not found')
      const repo = await repoRes.json()
      let readme_html = ''
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${user}/${name}/readme`, {
          headers: { 'Accept': 'application/vnd.github.v3.html' }
        })
        if (readmeRes.ok) readme_html = await readmeRes.text()
      } catch (e) {}
      return { ...repo, readme_html }
    },
  })
}
