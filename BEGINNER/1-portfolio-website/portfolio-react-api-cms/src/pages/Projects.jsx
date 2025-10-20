import React from 'react'
import { useProjects } from '../services/useProjects.js'
import { Link } from 'react-router-dom'

export default function Projects() {
  const { data, isLoading, isError, error } = useProjects()

  return (
    <section className="py-16 md:py-20">
      <div className="container-std">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Dự án (GitHub)</h2>
          <a className="btn btn-ghost" href={`https://github.com/${import.meta.env.VITE_GITHUB_USER || 'vercel'}`} target="_blank" rel="noreferrer">Mở GitHub ↗</a>
        </div>

        {isLoading && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="card p-4">
                <div className="h-6 w-40 skeleton" />
                <div className="h-4 w-64 mt-2 skeleton" />
                <div className="h-4 w-24 mt-4 skeleton" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="mt-6 p-4 rounded-xl border border-red-700 bg-red-900/20 text-red-200">
            Lỗi tải dự án: {String(error?.message || error)}
          </div>
        )}

        {data && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map(repo => (
              <article key={repo.id} className="card p-4">
                <h3 className="font-semibold">{repo.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{repo.description}</p>
                <div className="mt-3 flex gap-3">
                  <Link className="text-brand-600 link-underline" to={`/projects/${repo.name}`}>Chi tiết</Link>
                  <a className="text-brand-600 link-underline" href={repo.html_url} target="_blank" rel="noreferrer">Repo</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
