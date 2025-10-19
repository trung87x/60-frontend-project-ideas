import { useQuery } from '@tanstack/react-query'

const BASE = import.meta.env.VITE_POSTS_API || 'https://jsonplaceholder.typicode.com'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch(`${BASE}/posts`)
      if (!res.ok) throw new Error('Posts API error ' + res.status)
      return res.json()
    },
    staleTime: 60_000,
  })
}

export function usePost(id) {
  return useQuery({
    queryKey: ['post', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`${BASE}/posts/${id}`)
      if (!res.ok) throw new Error('Post API error ' + res.status)
      return res.json()
    },
  })
}
