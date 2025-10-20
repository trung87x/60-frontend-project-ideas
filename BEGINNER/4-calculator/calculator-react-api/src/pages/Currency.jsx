import React, { useEffect, useMemo, useState } from 'react'
import { useExchange } from '../hooks/useExchange.js'
import { formatNumber } from '../utils/format.js'

export default function Currency() {
  const [amount, setAmount] = useState('100')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('VND')

  const { data, loading, error, refetch } = useExchange(from)

  // debounce input
  const [debounced, setDebounced] = useState(amount)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(amount), 300)
    return () => clearTimeout(id)
  }, [amount])

  const rate = data?.rates?.[to] ?? null
  const converted = useMemo(() => {
    if (!rate) return null
    const n = Number(debounced)
    if (!Number.isFinite(n)) return null
    return n * rate
  }, [debounced, rate])

  return (
    <div className="form" aria-busy={loading ? 'true' : 'false'}>
      <div className="row">
        <input className="input" aria-label="Số lượng" value={amount} onChange={e => setAmount(e.target.value)} />
        <select aria-label="Từ" value={from} onChange={e => setFrom(e.target.value)}>
          {COMMONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select aria-label="Sang" value={to} onChange={e => setTo(e.target.value)}>
          {COMMONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="key" onClick={() => refetch()}>↻</button>
      </div>

      {loading && <p className="badge">Đang tải tỉ giá…</p>}
      {error && <p className="err">Lỗi: {String(error)}</p>}
      {(!loading && !error && rate) && (
        <div>
          <p className="badge">1 {from} = <b>{formatNumber(rate)}</b> {to}</p>
          <h3>Kết quả: {converted != null ? <b>{formatNumber(converted)}</b> : '-'}</h3>
        </div>
      )}
      <p className="badge">Last updated: {data?.date || '-'}</p>
    </div>
  )
}

const COMMONS = ['USD','EUR','GBP','JPY','CNY','KRW','VND','AUD','CAD','SGD','THB']
