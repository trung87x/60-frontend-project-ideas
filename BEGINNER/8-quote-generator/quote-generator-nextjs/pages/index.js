import Head from 'next/head'
import Link from 'next/link'
import quotes from '../data/quotes.json'
import { useState, useEffect } from 'react'

export default function Home(){
  const [quote, setQuote] = useState(quotes[0])
  const newQuote = () => {
    const idx = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[idx])
  }
  useEffect(() => { newQuote() }, [])
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`“${quote.text}” — ${quote.author}`)}`

  return (
    <div className="min-h-screen bg-[#0b1020] text-[#e6e9f5] flex flex-col items-center justify-center p-6 font-[Inter]">
      <Head>
        <title>✨ Quote Generator</title>
        <meta name="description" content="Ứng dụng tạo câu trích dẫn ngẫu nhiên, tối ưu SEO với Next.js + Vercel." />
        <meta property="og:title" content="✨ Quote Generator" />
        <meta property="og:description" content="Ứng dụng tạo câu trích dẫn ngẫu nhiên bằng Next.js + Vercel." />
        <meta property="og:type" content="website" />
      </Head>

      <main className="w-full max-w-2xl">
        <header className="text-center mb-4">
          <h1 className="text-3xl font-extrabold">✨ Quote Generator</h1>
          <p className="text-sm text-slate-400">Cấp 6 — Next.js + Vercel (Production + SEO)</p>
        </header>

        <section className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 text-center">
          <blockquote className="text-2xl font-semibold mb-3">“{quote.text}”</blockquote>
          <p className="text-slate-400 mb-4">— {quote.author}</p>

          <div className="flex justify-center gap-3 flex-wrap">
            <button onClick={newQuote} className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition">New Quote</button>
            <a href={tweetUrl} target="_blank" rel="noopener" className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition">Tweet</a>
          </div>
          <p className="text-sm text-slate-500 mt-4">Chủ đề: <Link href={`/categories/${quote.category}`} className="underline">{quote.category}</Link></p>
        </section>

        <footer className="text-center text-slate-500 text-sm mt-6">
          <span>© trung87.link</span>
        </footer>
      </main>
    </div>
  )
}
