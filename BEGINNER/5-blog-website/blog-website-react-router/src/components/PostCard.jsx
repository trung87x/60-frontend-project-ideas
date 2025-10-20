import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <article className="card">
      <img src={post.cover} alt={post.title} />
      <div className="body">
        <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span className="badge">#{post.slug}</span>
          <span className="badge">{new Date(post.date).toLocaleDateString('vi-VN')}</span>
        </div>
      </div>
    </article>
  )
}
