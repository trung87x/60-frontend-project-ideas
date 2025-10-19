import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container-std grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Cấp 6 — <span className="text-brand-600">Next.js / Vercel</span></h1>
              <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-prose">Triển khai thực tế: App Router, Tailwind, <strong>ISR</strong>, sitemap/robots, metadata SEO, và dynamic routes.</p>
              <div className="mt-5 flex gap-3">
                <Link href="/projects" className="btn btn-primary">Xem dự án</Link>
                <Link href="/blog" className="btn btn-ghost">Xem blog</Link>
              </div>
              <ul className="mt-6 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                <li>✅ SEO: metadata, OpenGraph, Twitter, sitemap, robots</li>
                <li>✅ Build nhanh trên Vercel, ISR 5 phút</li>
                <li>✅ Dark mode client component</li>
              </ul>
            </div>
            <div className="card">
              <img className="w-full h-auto" src="https://picsum.photos/seed/next/960/720" alt="Next.js" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
