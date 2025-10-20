import React from 'react'
import PostCard from '../components/PostCard.jsx'
import Loader from '../components/Loader.jsx'

export default function Posts() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [q, setQ] = React.useState('')

  React.useEffect(() => {
    let active = true
    setLoading(true)
    fetch('/posts.json')
      .then(r => r.json())
      .then(d => { if(active){ setData(d); setLoading(false) } })
      .catch(e => { if(active){ setError(e.message || 'Lỗi tải dữ liệu'); setLoading(false) } })
    return () => { active = false }
  }, [])

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return data
    return data.filter(p => (p.title + p.excerpt + p.slug).toLowerCase().includes(s))
  }, [q, data])

  if (loading) return <main className="container"><Loader /></main>
  if (error) return <main className="container"><p className="notice">Lỗi: {error}</p></main>

  return (
    <main className="container">
      <h2 style={{ margin: '8px 0 14px' }}>Danh sách bài viết</h2>
      <div className="search">
        <input placeholder="Tìm bài viết..." value={q} onChange={e => setQ(e.target.value)} />
        <button className="button" onClick={() => setQ('')}>Xoá</button>
      </div>
      <div className="grid">
        {filtered.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </main>
  )
}
