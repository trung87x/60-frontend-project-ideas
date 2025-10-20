import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPost } from '../lib/api.js'
import Loader from '../components/Loader.jsx'

export default function PostDetail() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  })

  if (isLoading) return <main className="container"><Loader /></main>
  if (isError || !data) return <main className="container"><p className="notice">Lỗi: {error?.message || 'Không tìm thấy bài viết'}</p></main>

  const post = data

  return (
    <main className="container">
      <p className="notice"><Link to="/posts">← Quay lại danh sách</Link></p>
      <article className="card" style={{ overflow: 'hidden' }}>
        {post.cover ? <img src={post.cover} alt={post.title} /> : null}
        <div className="body">
          <h1 style={{ marginTop: 0 }}>{post.title}</h1>
          <p className="notice">{new Date(post.date).toLocaleDateString('vi-VN')}</p>
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  )
}
