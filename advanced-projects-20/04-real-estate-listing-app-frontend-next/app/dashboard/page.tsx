import { apiFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Dashboard(){
  const me = await apiFetch('/me').catch(()=>null)
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="rounded-xl border border-white/10 p-4">
        <p><strong>User:</strong> {me?.email || '—'}</p>
        <p><strong>Name:</strong> {me?.name || '—'}</p>
      </div>
    </div>
  )
}