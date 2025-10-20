import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../lib/api.js'
import PostCard from '../components/PostCard.jsx'
import Loader from '../components/Loader.jsx'

export default function Posts() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <main className="container"><Loader /></main>
  if (isError) return <main className="container"><p className="notice">Lỗi: {error?.message || 'Không tải được dữ liệu'}</p></main>

  const [q, setQ] = React.useState('')
  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return data || []
    return (data || []).filter(p => (p.title + p.excerpt + p.slug).toLowerCase().includes(s))
  }, [q, data])

  return (
    <main className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{ margin: '8px 0 14px' }}>Danh sách bài viết</h2>
        <button className="button" onClick={() => refetch()}>{isFetching ? 'Đang cập nhật...' : 'Refetch'}</button>
      </div>
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
