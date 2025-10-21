import { apiFetch } from '@/lib/api'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function Dashboard(){
  const session = await getSession()
  const me = await apiFetch('/me').catch(()=>null)
  const myProjects = await apiFetch('/me/projects').catch(()=>[])
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="rounded-xl border border-white/10 p-4">
        <p><strong>User:</strong> {session?.email || session?.sub}</p>
        <p><strong>Name:</strong> {me?.name || '—'}</p>
      </div>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Your Projects</h2>
        <ul className="list-disc pl-6">
          {Array.isArray(myProjects) && myProjects.map((p:any)=> <li key={p.id||p.slug}>{p.title}</li>)}
        </ul>
      </section>
    </div>
  )
}