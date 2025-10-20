import React, { useMemo, useCallback, useEffect, useState } from 'react'
import QuoteCard from './components/QuoteCard.jsx'
import Actions from './components/Actions.jsx'
import { useQuotes } from './hooks/useQuotes.js'
import { useRandomQuote } from './hooks/useRandomQuote.js'

export default function App(){
  const [source, setSource] = useState(import.meta.env.VITE_QUOTES_SOURCE || 'local')
  const { data, isLoading, isError, error, refetch, isFetching } = useQuotes(source)
  const list = data || []

  const { next } = useRandomQuote(list)
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    if (list.length && !quote) setQuote(next())
  }, [list, next, quote])

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
        <p className="subtitle">Cấp 5 — React + TanStack Query (API / local JSON)</p>
      </header>

      <section className="card" aria-live="polite">
        <div style={{display:'flex', gap:12, flexWrap:'wrap', marginBottom:12}}>
          <span className="badge">Source:</span>
          <button className="btn" onClick={() => setSource('local')}>local (public/quotes.json)</button>
          <button className="btn" onClick={() => setSource('quotable')}>quotable.io</button>
          <button className="btn" onClick={() => setSource('typefit')}>type.fit</button>
          <button className="btn" onClick={() => refetch()} disabled={isFetching}>{isFetching ? 'Refetching...' : 'Refetch'}</button>
        </div>

        {isLoading && <div>
          <div className="skeleton" style={{height:24, width:'90%', marginBottom:8}}></div>
          <div className="skeleton" style={{height:14, width:'40%'}}></div>
        </div>}

        {isError && <p style={{color:'#fda4af'}}>Lỗi tải dữ liệu: {String(error?.message || error)}</p>}

        {!isLoading && !isError && quote && <>
          <QuoteCard quote={quote} />
          <Actions onNew={newQuote} onCopy={copy} tweetUrl={tweetUrl} />
        </>}

        <p className="hint">Mẹo: bấm <kbd>Space</kbd> để random quote. Dữ liệu cache bởi React Query.</p>
      </section>

      <footer className="footer">
        <a href="#" aria-disabled className="muted">trung87.link</a>
      </footer>
    </main>
  )
}
