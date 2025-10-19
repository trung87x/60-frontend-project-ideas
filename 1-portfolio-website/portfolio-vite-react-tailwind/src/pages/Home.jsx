import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-std grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Xin chào 👋<br/>Tôi là <span className="text-brand-600">[Tên của bạn]</span>
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-prose">
            Đây là **Cấp 4** — Portfolio dùng <strong>Vite + React + Tailwind + React Router</strong>.
            Kiến trúc component, routing, context (dark mode), và data JSON.
          </p>
          <div className="mt-5 flex gap-3">
            <Link to="/projects" className="btn btn-primary">Xem dự án</Link>
            <Link to="/contact" className="btn btn-ghost">Gửi email</Link>
          </div>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            <li>✅ Routing: /, /about, /projects, /projects/:id, /contact</li>
            <li>✅ Dark mode (context + localStorage)</li>
            <li>✅ Tailwind CLI: build nhanh, tree-shake</li>
          </ul>
        </div>
        <div className="card">
          <img className="w-full h-auto" src="https://picsum.photos/seed/vite/960/720" alt="Vite + React" />
        </div>
      </div>
    </section>
  )
}
