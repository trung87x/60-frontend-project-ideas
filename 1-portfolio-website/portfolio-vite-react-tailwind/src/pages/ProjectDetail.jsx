import React from 'react'
import { useParams, Link } from 'react-router-dom'
import data from '../projects.json'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = data.find(p => String(p.id) === String(id))
  if (!project) {
    return (
      <div className="container-std py-20">
        <p className="text-red-600">Không tìm thấy dự án.</p>
        <Link to="/projects" className="btn btn-ghost mt-4">← Quay lại</Link>
      </div>
    )
  }
  return (
    <section className="py-16 md:py-20">
      <div className="container-std grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="card">
          <img className="w-full h-auto" src={project.image} alt={project.title} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{project.desc}</p>
          <div className="mt-4 flex gap-3">
            <a className="btn btn-primary" href={project.demo || '#'} target="_blank" rel="noreferrer">Xem demo</a>
            <a className="btn btn-ghost" href={project.repo || '#'} target="_blank" rel="noreferrer">Xem mã nguồn</a>
          </div>
          <Link to="/projects" className="btn btn-ghost mt-6">← Quay lại danh sách</Link>
        </div>
      </div>
    </section>
  )
}
