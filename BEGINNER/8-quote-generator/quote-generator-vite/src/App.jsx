import React, { useMemo, useCallback, useEffect, useState } from 'react'
import QuoteCard from './components/QuoteCard.jsx'
import Actions from './components/Actions.jsx'
import { useRandomQuote } from './hooks/useRandomQuote.js'
import quotes from './data/quotes.js'

export default function App(){
  const { next } = useRandomQuote(quotes)
  const [quote, setQuote] = useState(() => next())

  const tweetUrl = useMemo(() => {
    const u = new URL('https://twitter.com/intent/tweet')
    u.searchParams.set('text', `“${quote?.text || ''}” — ${quote?.author || 'Unknown'}`)
    return u.toString()
  }, [quote])

  const copy = useCallback(() => {
    const content = `“${quote?.text || ''}” — ${quote?.author || 'Unknown'}`
    if (navigator.clipboard?.writeText){
      navigator.clipboard.writeText(content)
    } else {
      const ta = document.createElement('textarea')
      ta.value = content
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
  }, [quote])

  const newQuote = useCallback(() => setQuote(next()), [next])

  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
      if (typing) return
      if (e.code === 'Space'){ e.preventDefault(); newQuote() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [newQuote])

  return (
    <main className="container">
      <header className="header">
        <h1>✨ Quote Generator</h1>
        <p className="subtitle">Cấp 4 — React + Vite</p>
      </header>
      <section className="card" aria-live="polite">
        <QuoteCard quote={quote} />
        <Actions onNew={newQuote} onCopy={copy} tweetUrl={tweetUrl} />
        <p className="hint">Mẹo: bấm <kbd>Space</kbd> để random quote.</p>
      </section>
      <footer className="footer">
        <a href="#" aria-disabled className="muted">trung87.link</a>
      </footer>
    </main>
  )
}
