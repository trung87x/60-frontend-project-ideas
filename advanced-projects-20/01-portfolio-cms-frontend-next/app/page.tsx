import { apiFetch } from '@/lib/api'
import ProjectCard from '@/components/ProjectCard'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const revalidate = 60

export default async function Home(){
  const [projects, posts] = await Promise.all([
    apiFetch('/projects?limit=4', { tags: ['projects'] }).catch(()=>[]),
    apiFetch('/posts?limit=4', { tags: ['posts'] }).catch(()=>[]),
  ])
  return (
    <div className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Portfolio CMS Frontend</h1>
        <p className="opacity-80">Next.js 14 + External Backend API</p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest Projects</h2>
          <Link href="/projects" className="text-sm underline">See all</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {Array.isArray(projects) && projects.map((p:any)=> <ProjectCard key={p.id||p.slug} project={p}/>)}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest Posts</h2>
          <Link href="/blog" className="text-sm underline">See all</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {Array.isArray(posts) && posts.map((p:any)=> <PostCard key={p.id||p.slug} post={p}/>)}
        </div>
      </section>
    </div>
  )
}