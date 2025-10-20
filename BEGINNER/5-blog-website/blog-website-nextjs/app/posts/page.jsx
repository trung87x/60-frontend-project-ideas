import Image from 'next/image'
import Link from 'next/link'
import { listPosts } from '@/lib/posts'

export const dynamic = 'force-static' // ok cho demo (có thể chuyển sang 'force-dynamic')

export const metadata = {
  title: 'Danh sách bài viết',
  description: 'Tổng hợp các bài viết mới nhất',
}

export default async function PostsPage() {
  const posts = await listPosts()
  return (
    <main className="container">
      <h2 style={{ margin: '8px 0 14px' }}>Danh sách bài viết</h2>
      <div className="grid">
        {posts.map(p => (
          <article key={p.slug} className="card">
            {p.cover ? (
              <Image src={p.cover} alt={p.title} width={960} height={540} style={{ width:'100%', height:180, objectFit:'cover' }} />
            ) : null}
            <div className="body">
              <h3><Link href={`/post/${p.slug}`}>{p.title}</Link></h3>
              <p>{p.excerpt}</p>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:10 }}>
                <span className="badge">#{p.slug}</span>
                <span className="badge">{new Date(p.date).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
