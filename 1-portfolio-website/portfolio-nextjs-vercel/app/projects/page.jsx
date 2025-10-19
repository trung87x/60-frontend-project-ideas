import Link from 'next/link'
import { fetchRepos } from '@/lib/data'
import Card from '@/components/Card'

export const revalidate = 300

export default async function ProjectsPage() {
  const repos = await fetchRepos()
  return (
    <section className="py-16 md:py-20">
      <div className="container-std">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Dự án (GitHub)</h2>
          <a className="btn btn-ghost" href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USER || 'vercel'}`} target="_blank">Mở GitHub ↗</a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map(repo => (
            <Card key={repo.id} title={repo.name} actions={<><Link className="text-brand-600 link-underline" href={`/projects/${repo.name}`}>Chi tiết</Link><a className="text-brand-600 link-underline" href={repo.html_url} target="_blank">Repo</a></>}>
              <p className="line-clamp-3">{repo.description || 'Không có mô tả.'}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
