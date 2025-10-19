import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-std grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Cấp 5 — <span className="text-brand-600">React + API/CMS</span>
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-prose">
            Dự án portfolio với <strong>data động</strong>: fetch từ REST API (GitHub) và JSONPlaceholder,
            sẵn kiến trúc <strong>services + adapters</strong> để gắn CMS (Sanity/Contentful) về sau.
          </p>
          <div className="mt-5 flex gap-3">
            <Link to="/projects" className="btn btn-primary">Xem dự án</Link>
            <Link to="/blog" className="btn btn-ghost">Xem blog</Link>
          </div>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            <li>✅ TanStack Query — cache, loading, error retry</li>
            <li>✅ GitHub API: lấy repos theo user</li>
            <li>✅ JSONPlaceholder: bài viết mẫu</li>
          </ul>
        </div>
        <div className="card">
          <img className="w-full h-auto" src="https://picsum.photos/seed/api-cms/960/720" alt="API/CMS" />
        </div>
      </div>
    </section>
  )
}
