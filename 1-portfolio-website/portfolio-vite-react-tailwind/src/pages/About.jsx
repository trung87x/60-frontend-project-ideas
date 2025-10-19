import React from 'react'

export default function About() {
  return (
    <section className="py-16 md:py-20 bg-white/50 dark:bg-slate-900/40">
      <div className="container-std grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Giới thiệu</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Mình theo đuổi UI rõ ràng, dễ maintain, tập trung vào thiết kế theo hệ thống (spacing,
            color, radius) và accessibility. Ở cấp 4, code được chia nhỏ thành components/pages,
            dễ dàng mở rộng về sau.
          </p>
        </div>
        <div className="card">
          <img className="w-full h-auto" src="https://picsum.photos/seed/about-vite/960/720" alt="About" />
        </div>
      </div>
    </section>
  )
}
