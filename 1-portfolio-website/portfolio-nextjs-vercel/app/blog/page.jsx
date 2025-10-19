import Link from 'next/link'
import { fetchPosts } from '@/lib/data'

export const revalidate = 300

export default async function BlogPage() {
  const posts = await fetchPosts()
  return (
    <section className="py-16 md:py-20">
      <div className="container-std">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Blog (JSONPlaceholder)</h2>
          <a className="btn btn-ghost" href="https://jsonplaceholder.typicode.com" target="_blank">API docs ↗</a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {posts.slice(0, 10).map(p => (
            <article key={p.id} className="card p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{p.body}</p>
              <Link className="text-brand-600 link-underline mt-2 inline-block" href={`/blog/${p.id}`}>Đọc thêm</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
