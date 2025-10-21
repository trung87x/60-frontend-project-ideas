import { apiFetch } from '@/lib/api'

type Props = { params: { slug: string } }
export const revalidate = 300

export default async function Detail({ params }: Props){
  const item = await apiFetch('/apods/' + params.slug, { tags: ['apods:' + params.slug] }).catch(()=>null)
  if(!item) return <div>Không tìm thấy.</div>
  return (
    <article className="space-y-3">
      <h1 className="text-2xl font-bold">{(item.title || item.name || item.symbol || item.slug)}</h1>
      <p className="opacity-80">{(item.summary || item.excerpt || item.description || '')}</p>
      {item.bodyHtml && <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{__html: item.bodyHtml}}/>}
    </article>
  )
}