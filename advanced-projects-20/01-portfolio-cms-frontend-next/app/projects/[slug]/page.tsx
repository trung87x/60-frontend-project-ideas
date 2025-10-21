import { apiFetch } from '@/lib/api'

type Props = { params: { slug: string } }
export const revalidate = 300

export default async function ProjectDetail({ params }: Props){
  const project = await apiFetch(`/projects/${params.slug}`, { tags: [`project:${params.slug}`] }).catch(()=>null)
  if(!project) return <div>Không tìm thấy dự án.</div>
  return (
    <article className="space-y-4">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="opacity-80">{project.summary}</p>
      <div className="flex gap-3 text-sm">
        {project.repo && <a className="underline" href={project.repo} target="_blank">Repository</a>}
        {project.demo && <a className="underline" href={project.demo} target="_blank">Live Demo</a>}
      </div>
    </article>
  )
}