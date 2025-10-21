import Link from 'next/link'
type Props = { post: any }
export default function PostCard({ post }: Props){
  return (
    <Link href={`/blog/${post.slug}`} className="block rounded-xl p-4 border border-white/10 hover:border-white/20">
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-sm opacity-80">{post.excerpt}</p>
      <p className="text-xs opacity-60 mt-1">{new Date(post.publishedAt).toLocaleDateString()}</p>
    </Link>
  )
}