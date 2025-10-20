import Image from 'next/image'
import { listPosts, getPostBySlug } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = await listPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/post/${post.slug}`,
      images: post.cover ? [post.cover] : ['/opengraph-image.png'],
    },
    alternates: { canonical: `/post/${post.slug}` }
  }
}

export default async function PostDetail({ params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return <main className="container"><p>Không tìm thấy bài viết.</p></main>
  return (
    <main className="container">
      <article className="card" style={{ overflow:'hidden' }}>
        {post.cover ? <Image src={post.cover} alt={post.title} width={1200} height={630} style={{ width:'100%', height:180, objectFit:'cover' }} /> : null}
        <div className="body">
          <h1 style={{ marginTop:0 }}>{post.title}</h1>
          <p className="badge">{new Date(post.date).toLocaleDateString('vi-VN')}</p>
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  )
}
