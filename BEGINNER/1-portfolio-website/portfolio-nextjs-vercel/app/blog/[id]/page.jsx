import { fetchPost } from '@/lib/data'
import Link from 'next/link'

export const revalidate = 300

export default async function PostDetail({ params }) {
  const { id } = params
  const data = await fetchPost(id)
  if (!data) {
    return (<div className="container-std py-20"><p className="text-red-600">Không tải được bài viết.</p><Link href="/blog" className="btn btn-ghost mt-4">← Quay lại</Link></div>)
  }
  return (
    <section className="py-16 md:py-20">
      <div className="container-std">
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-extrabold">{data.title}</h1>
          <p className="mt-3 whitespace-pre-line">{data.body}</p>
        </article>
      </div>
    </section>
  )
}
