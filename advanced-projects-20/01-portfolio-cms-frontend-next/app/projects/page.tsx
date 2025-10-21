import { apiFetch } from '@/lib/api'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 60

export default async function ProjectsPage(){
  const projects = await apiFetch('/projects', { tags: ['projects'] }).catch(()=>[])
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {Array.isArray(projects) && projects.map((p:any)=> <ProjectCard key={p.id||p.slug} project={p}/>)}
      </div>
    </div>
  )
}