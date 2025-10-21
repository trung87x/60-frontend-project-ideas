import { apiFetch } from '@/lib/api'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export default async function BlogPage(){
  const posts = await apiFetch('/posts', { tags: ['posts'] }).catch(()=>[])
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Blog</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {Array.isArray(posts) && posts.map((p:any)=> <PostCard key={p.id||p.slug} post={p}/>)}
      </div>
    </div>
  )
}