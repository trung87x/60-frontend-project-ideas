import React, { useMemo, useState } from 'react'
import { formatNumber } from '../utils/format.js'

const PRESETS = [5, 8, 10, 15, 20]

export default function Vat() {
  const [base, setBase] = useState('1000')
  const [percent, setPercent] = useState(10)
  const [mode, setMode] = useState('vat') // 'vat' | 'discount' | 'tip'

  const result = useMemo(() => {
    const n = Number(base)
    if (!Number.isFinite(n)) return null
    const p = percent / 100
    if (mode === 'vat') return { add: n * p, total: n * (1 + p) }
    if (mode === 'discount') return { minus: n * p, total: n * (1 - p) }
    if (mode === 'tip') return { tip: n * p, total: n * (1 + p) }
  }, [base, percent, mode])

  return (
    <div className="form">
      <div className="row">
        <input className="input" aria-label="Giá gốc" value={base} onChange={e => setBase(e.target.value)} />
        <select aria-label="Chế độ" value={mode} onChange={e => setMode(e.target.value)}>
          <option value="vat">VAT</option>
          <option value="discount">Giảm giá</option>
          <option value="tip">Tip</option>
        </select>
        <input className="input" type="number" min="0" max="100" aria-label="%" value={percent} onChange={e => setPercent(Number(e.target.value))} />
      </div>
      <div className="row">
        {PRESETS.map(p => (
          <button key={p} className="key" onClick={() => setPercent(p)}>{p}%</button>
        ))}
      </div>

      {result && (
        <div>
          {mode === 'vat' && <p>Thuế VAT: <b>{formatNumber(result.add)}</b></p>}
          {mode === 'discount' && <p>Giảm giá: <b>{formatNumber(result.minus)}</b></p>}
          {mode === 'tip' && <p>Tiền tip: <b>{formatNumber(result.tip)}</b></p>}
          <h3>Tổng cộng: <b>{formatNumber(result.total)}</b></h3>
        </div>
      )}
    </div>
  )
}
