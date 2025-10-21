import Link from 'next/link'
import { apiFetch } from '@/lib/api'

export const revalidate = 60

export default async function Home(){
  const items = await apiFetch('/plans?limit=4', { tags: ['plans'] }).catch(()=>[])
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Financial Planning Tool</h1>
        <p className="opacity-80">Next.js Frontend + External Backend API</p>
      </header>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest Plans</h2>
          <Link href="/plans" className="text-sm underline">See all</Link>
        </div>
        <ul className="grid md:grid-cols-2 gap-3">
          {Array.isArray(items) && items.map((p:any)=>(
            <li key={(p.id||p.slug)} className="rounded-xl p-4 border border-white/10">
              <strong>{(p.title || p.name || p.symbol || p.slug)}</strong>
              <p className="text-sm opacity-80">{(p.summary || p.excerpt || p.description || '')}</p>
              <Link className="text-sm underline" href={`/plans/${(p.slug || p.id)}`}>View</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}