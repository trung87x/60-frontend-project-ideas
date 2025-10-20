import React from 'react'
import { usePosts } from '../services/usePosts.js'
import { Link } from 'react-router-dom'

export default function Blog() {
  const { data, isLoading, isError } = usePosts()
  return (
    <section className="py-16 md:py-20">
      <div className="container-std">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Blog (JSONPlaceholder)</h2>
          <a className="btn btn-ghost" href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noreferrer">API docs ↗</a>
        </div>
        {isLoading && <div className="mt-6 h-6 w-40 skeleton" />}
        {isError && <div className="mt-6 p-4 rounded-xl border border-red-700 bg-red-900/20 text-red-200">Không tải được bài viết.</div>}
        {data && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.slice(0,10).map(p => (
              <article key={p.id} className="card p-4">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{p.body}</p>
                <Link className="text-brand-600 link-underline mt-2 inline-block" to={`/blog/${p.id}`}>Đọc thêm</Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
