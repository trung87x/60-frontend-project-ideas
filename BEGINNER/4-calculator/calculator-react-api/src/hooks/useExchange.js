import { useEffect, useRef, useState } from 'react'
import { fetchRates } from '../services/exchange.js'

export function useExchange(base) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const ctrlRef = useRef(null)

  async function run(b = base) {
    setLoading(true)
    setError(null)
    ctrlRef.current?.abort()
    const ctrl = new AbortController()
    ctrlRef.current = ctrl
    try {
      const res = await fetchRates(b, ctrl.signal)
      setData(res)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    run(base)
    return () => ctrlRef.current?.abort()
  }, [base])

  return { data, loading, error, refetch: () => run(base) }
}
