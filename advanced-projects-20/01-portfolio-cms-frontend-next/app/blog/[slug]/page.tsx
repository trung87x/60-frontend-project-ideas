import { apiFetch } from '@/lib/api'

type Props = { params: { slug: string } }
export const revalidate = 300

export default async function PostDetail({ params }: Props){
  const post = await apiFetch(`/posts/${params.slug}`, { tags: [`post:${params.slug}`] }).catch(()=>null)
  if(!post) return <div>Không tìm thấy bài viết.</div>
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{post.title}</h1>
      <p><em>{new Date(post.publishedAt).toLocaleString()}</em></p>
      <div dangerouslySetInnerHTML={{__html: post.bodyHtml || post.body}} />
    </article>
  )
}