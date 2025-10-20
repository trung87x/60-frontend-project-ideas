import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <img className="w-full h-44 object-cover" src={project.image} alt={project.title} />
      <div className="p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{project.desc}</p>
        <div className="mt-2 flex gap-3">
          <Link className="text-brand-600 link-underline" to={`/projects/${project.id}`}>Chi tiết</Link>
          <a className="text-brand-600 link-underline" href={project.demo || '#'} target="_blank" rel="noreferrer">Demo</a>
        </div>
      </div>
    </article>
  )
}
