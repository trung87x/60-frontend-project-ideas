'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(saved || (prefersDark ? 'dark' : 'light'))
  }, [])
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/70 backdrop-blur bg-white/70 dark:bg-slate-950/70">
      <div className="container-std h-14 flex items-center justify-between">
        <Link href="/" className="font-extrabold tracking-wide">trung87</Link>
        <nav className="hidden sm:flex items-center gap-2">
          <Link href="/projects" className="px-3 py-1.5 rounded-full">Dự án</Link>
          <Link href="/blog" className="px-3 py-1.5 rounded-full">Blog</Link>
          <Link href="/contact" className="px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">Liên hệ</Link>
        </nav>
        <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg border border-slate-300 dark:border-slate-700" aria-label="Đổi theme">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
