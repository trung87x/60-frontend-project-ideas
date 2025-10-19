import { fetchRepoDetail } from '@/lib/data'
import Link from 'next/link'

export const revalidate = 300

export default async function ProjectDetail({ params }) {
  const { name } = params
  const data = await fetchRepoDetail(name)
  if (!data) {
    return (<div className="container-std py-20"><p className="text-red-600">Không tìm thấy dự án.</p><Link href="/projects" className="btn btn-ghost mt-4">← Quay lại</Link></div>)
  }
  return (
    <section className="py-16 md:py-20">
      <div className="container-std grid md:grid-cols-2 gap-8">
        <div className="card p-4">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="mt-2">{data.description}</p>
          <p className="mt-2 text-sm">⭐ {data.stargazers_count} • 🍴 {data.forks_count}</p>
          <a className="btn btn-primary mt-4" href={data.html_url} target="_blank">Mở trên GitHub</a>
        </div>
        <div className="card p-4 prose dark:prose-invert max-w-none overflow-auto">
          <h2 className="font-semibold">README (trích)</h2>
          <div dangerouslySetInnerHTML={{__html: data.readme_html || '<em>Không có README.</em>'}} />
        </div>
      </div>
    </section>
  )
}
