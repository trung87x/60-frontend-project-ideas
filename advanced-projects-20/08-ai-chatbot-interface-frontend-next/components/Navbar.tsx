'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar(){
  const [authed, setAuthed] = useState(false)
  useEffect(()=>{ setAuthed(document.cookie.includes('access_token=')) },[])
  return (
    <nav className="sticky top-0 z-10 bg-black/40 backdrop-blur border-b border-white/10">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold">AI Chatbot Interface</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/conversations">Conversations</Link>
          <Link href="/login">Login</Link>
          {authed && <Link href="/dashboard">Dashboard</Link>}
        </div>
      </div>
    </nav>
  )
}