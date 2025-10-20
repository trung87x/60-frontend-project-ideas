const PID = import.meta.env.VITE_SANITY_PROJECT_ID
const DATASET = import.meta.env.VITE_SANITY_DATASET
const APIV = import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01'

const hasSanity = PID && DATASET

// GROQ queries
const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc){ 
  "id": _id, 
  "slug": slug.current, 
  "title": title, 
  "excerpt": coalesce(excerpt, ""), 
  "date": publishedAt, 
  "cover": coalesce(cover.asset->url, ""), 
  "content": body[0].children[].text 
}`

export async function fetchPosts() {
  if (hasSanity) {
    const url = `https://${PID}.api.sanity.io/v${APIV}/data/query/${DATASET}?query=${encodeURIComponent(POSTS_QUERY)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Sanity fetch failed')
    const json = await res.json()
    const rows = json?.result || []
    // Normalize missing cover by empty string (handled in UI)
    return rows.map((p, i) => ({
      id: p.id || i + 1,
      slug: p.slug || '',
      title: p.title || 'Untitled',
      excerpt: p.excerpt || '',
      date: p.date || new Date().toISOString(),
      cover: p.cover || '',
      content: Array.isArray(p.content) ? p.content.join('\n') : (p.content || '')
    }))
  }
  // Fallback to local JSON
  const res = await fetch('/posts.json')
  if (!res.ok) throw new Error('posts.json missing')
  return await res.json()
}

export async function fetchPost(idOrSlug) {
  const all = await fetchPosts()
  return all.find(p => String(p.id) === String(idOrSlug) || p.slug === idOrSlug) || null
}
