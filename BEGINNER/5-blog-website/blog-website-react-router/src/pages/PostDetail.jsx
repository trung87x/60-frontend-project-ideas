import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '../components/Loader.jsx'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    let active = true
    setLoading(true)
    fetch('/posts.json')
      .then(r => r.json())
      .then(list => {
        if(!active) return
        const found = list.find(p => String(p.id) === String(id))
        if (!found) throw new Error('Không tìm thấy bài viết')
        setPost(found); setLoading(false)
      })
      .catch(e => { if(active){ setError(e.message || 'Lỗi tải dữ liệu'); setLoading(false) } })
    return () => { active = false }
  }, [id])

  if (loading) return <main className="container"><Loader /></main>
  if (error) return <main className="container"><p className="notice">Lỗi: {error}</p></main>

  return (
    <main className="container">
      <p className="notice"><Link to="/posts">← Quay lại danh sách</Link></p>
      <article className="card" style={{ overflow: 'hidden' }}>
        <img src={post.cover} alt={post.title} />
        <div className="body">
          <h1 style={{ marginTop: 0 }}>{post.title}</h1>
          <p className="notice">{new Date(post.date).toLocaleDateString('vi-VN')}</p>
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  )
}
