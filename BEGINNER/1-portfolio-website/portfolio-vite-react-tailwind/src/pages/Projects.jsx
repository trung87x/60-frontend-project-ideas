import React from 'react'
import { Link } from 'react-router-dom'
import data from '../projects.json'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Projects() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-std">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Dự án</h2>
          <Link to="/" className="btn btn-ghost">← Trang chủ</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
