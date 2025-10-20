import { useQuery } from '@tanstack/react-query'
import { fetchQuotes } from '../api/quotes.js'

export function useQuotes(source){
  return useQuery({
    queryKey: ['quotes', source],
    queryFn: () => fetchQuotes(source),
    staleTime: 1000 * 60 * 5, // 5 phút
    gcTime: 1000 * 60 * 30,   // 30 phút
    refetchOnWindowFocus: false,
  })
}
