import React, { useEffect, useState } from 'react'

export default function QuoteCard({ quote }){
  const [phase, setPhase] = useState('fade-in')
  useEffect(() => {
    setPhase('fade-out')
    const t = setTimeout(() => setPhase('fade-in'), 160)
    return () => clearTimeout(t)
  }, [quote?.text])
  return (
    <div className="quote-wrap">
      <svg className="quote-mark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.17 6C4.88 6 3 7.88 3 10.17v7.66C3 19.88 4.88 21.76 7.17 21.76h.01c2.29 0 4.17-1.88 4.17-4.17v-7.6C11.35 7.88 9.47 6 7.18 6h-.01Zm9.65 0C14.52 6 12.64 7.88 12.64 10.17v7.66c0 2.29 1.88 4.17 4.17 4.17h.01c2.29 0 4.17-1.88 4.17-4.17v-7.6C21 7.88 19.12 6 16.83 6h-.01Z"/>
      </svg>
      <blockquote className={\`quote-text \${phase}\`}>{quote ? `“${quote.text}”` : '—'}</blockquote>
      <cite className="quote-author">— <span>{quote?.author || 'Unknown'}</span></cite>
    </div>
  )
}
