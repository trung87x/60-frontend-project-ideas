'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav(){
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const pathname = usePathname()

  useEffect(()=>{ setOpen(false); setDrop(false) }, [pathname])

  const link = (href:string, label:string) => (
    <Link href={href} className={pathname===href ? 'active' : ''}>{label}</Link>
  )

  return (
    <header className="nav">
      <div style={{fontWeight:700}}>MySite</div>
      <button className="hamburger" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="menu">☰</button>
      <nav id="menu" className="menu" style={{display: open? 'flex':'none'}}>
        {link('/','Home')}
        <div className={'dropdown ' + (drop?'open':'')}>
          <button onClick={()=>setDrop(v=>!v)}>Services ▾</button>
          <div className="dropdown-menu">
            <Link href="/design">Design</Link>
            <Link href="/dev">Dev</Link>
            <Link href="/seo">SEO</Link>
          </div>
        </div>
        {link('/about','About')}
        {link('/contact','Contact')}
      </nav>
    </header>
  )
}
