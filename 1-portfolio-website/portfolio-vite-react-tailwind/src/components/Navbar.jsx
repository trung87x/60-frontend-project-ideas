import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/70 backdrop-blur bg-white/70 dark:bg-slate-950/70">
      <div className="container-std h-14 flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-wide">trung87</Link>
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink to="/about" className="px-3 py-1.5 rounded-full text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Giới thiệu</NavLink>
          <NavLink to="/projects" className="px-3 py-1.5 rounded-full text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Dự án</NavLink>
          <NavLink to="/contact" className="px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">Liên hệ</NavLink>
        </nav>
        <button onClick={toggle} className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900" aria-label="Đổi theme">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
