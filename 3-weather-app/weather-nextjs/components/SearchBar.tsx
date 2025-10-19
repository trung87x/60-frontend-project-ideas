'use client'
import React from 'react'

export default function SearchBar({ defaultCity }: { defaultCity: string }) {
  const [city, setCity] = React.useState(defaultCity)
  function go(e: React.FormEvent) {
    e.preventDefault()
    const u = new URL(window.location.href)
    u.pathname = `/city/${encodeURIComponent(city)}`
    window.location.assign(u.toString())
  }
  return (
    <form className="search" onSubmit={go}>
      <label htmlFor="city" className="sr-only">Thành phố</label>
      <input id="city" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Nhập thành phố, ví dụ: Ho Chi Minh" />
      <button className="btn btn--primary" type="submit">Tìm</button>
    </form>
  )
}
