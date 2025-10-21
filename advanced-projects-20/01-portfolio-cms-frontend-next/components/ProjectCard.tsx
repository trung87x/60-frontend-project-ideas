import Link from 'next/link'
type Props = { project: any }
export default function ProjectCard({ project }: Props){
  return (
    <Link href={`/projects/${project.slug}`} className="block rounded-xl p-4 border border-white/10 hover:border-white/20">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="text-sm opacity-80">{project.summary}</p>
    </Link>
  )
}