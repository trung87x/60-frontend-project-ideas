const BASE = (import.meta.env.VITE_EXCHANGE_API_BASE || 'https://api.exchangerate.host')

export async function fetchRates(base = 'USD', signal, retry = 2) {
  const url = `${BASE}/latest?base=${encodeURIComponent(base)}`
  try {
    const res = await fetch(url, { signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!data || !data.rates) throw new Error('Invalid response')
    return data
  } catch (err) {
    if (retry > 0 && (err.name === 'TypeError' || err.message.startsWith('HTTP'))) {
      await new Promise(r => setTimeout(r, 500))
      return fetchRates(base, signal, retry - 1)
    }
    throw err
  }
}
