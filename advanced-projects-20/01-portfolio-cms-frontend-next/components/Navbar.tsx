'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar(){
  const [authed, setAuthed] = useState(false)
  useEffect(()=>{
    // naive check via cookie presence
    setAuthed(document.cookie.includes('access_token='))
  },[])
  return (
    <nav className="sticky top-0 z-10 bg-black/40 backdrop-blur border-b border-white/10">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold">Portfolio CMS</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Blog</Link>
          {authed ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <a href="/api/auth/logout">Logout</a>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}