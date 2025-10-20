import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProjectDetail } from '../services/useProjects.js'

export default function ProjectDetail() {
  const { name } = useParams()
  const { data, isLoading, isError } = useProjectDetail(name)

  return (
    <section className="py-16 md:py-20">
      <div className="container-std">
        <Link to="/projects" className="btn btn-ghost">← Quay lại</Link>
        {isLoading && <div className="mt-6 h-6 w-40 skeleton" />}
        {isError && <div className="mt-6 p-4 rounded-xl border border-red-700 bg-red-900/20 text-red-200">Không tải được chi tiết.</div>}
        {data && (
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <div className="card p-4">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{data.description}</p>
              <p className="mt-2 text-sm">⭐ {data.stargazers_count} • 🍴 {data.forks_count}</p>
              <a className="btn btn-primary mt-4" href={data.html_url} target="_blank" rel="noreferrer">Mở trên GitHub</a>
            </div>
            <div className="card p-4 overflow-auto">
              <h2 className="font-semibold mb-2">README (trích):</h2>
              <div dangerouslySetInnerHTML={{__html: data.readme_html || '<em>Không có README.</em>'}} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
