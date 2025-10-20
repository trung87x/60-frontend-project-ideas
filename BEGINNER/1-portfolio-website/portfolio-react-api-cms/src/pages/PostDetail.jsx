import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePost } from '../services/usePosts.js'

export default function PostDetail() {
  const { id } = useParams()
  const { data, isLoading, isError } = usePost(id)
  return (
    <section className="py-16 md:py-20">
      <div className="container-std">
        <Link to="/blog" className="btn btn-ghost">← Quay lại</Link>
        {isLoading && <div className="mt-6 h-6 w-40 skeleton" />}
        {isError && <div className="mt-6 p-4 rounded-xl border border-red-700 bg-red-900/20 text-red-200">Không tải được bài viết.</div>}
        {data && (
          <article className="mt-6 prose dark:prose-invert max-w-none">
            <h1 className="text-3xl font-extrabold">{data.title}</h1>
            <p className="mt-3 whitespace-pre-line">{data.body}</p>
          </article>
        )}
      </div>
    </section>
  )
}
