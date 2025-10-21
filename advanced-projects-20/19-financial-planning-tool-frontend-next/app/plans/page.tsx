import { apiFetch } from '@/lib/api'

export const revalidate = 60

export default async function Page(){
  const items = await apiFetch('/plans', { tags: ['plans'] }).catch(()=>[])
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Plans</h1>
      <ul className="grid md:grid-cols-2 gap-3">
        {Array.isArray(items) && items.map((p:any)=>(
          <li key={(p.id||p.slug)} className="rounded-xl p-4 border border-white/10">
            <div className="font-semibold">{(p.title || p.name || p.symbol || p.slug)}</div>
            <div className="text-sm opacity-80">{(p.summary || p.excerpt || p.description || '')}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}