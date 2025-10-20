export function formatNumber(nStr) {
  if (nStr === 'Error') return 'Error'
  if (nStr === '-') return '-'
  const n = Number(nStr)
  if (!Number.isFinite(n)) return 'Error'
  const [int, frac] = String(nStr).split('.')
  const intFmt = Number(int).toLocaleString('en-US')
  return frac !== undefined ? `${intFmt}.${frac.slice(0, 12)}` : intFmt
}
