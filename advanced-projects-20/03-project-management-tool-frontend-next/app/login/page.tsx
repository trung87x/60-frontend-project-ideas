'use client'
import { useState } from 'react'

export default function LoginPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if(res.ok){ window.location.href = '/dashboard' }
    else{ setError(await res.text() || 'Login failed') }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="w-full rounded p-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className="rounded bg-white text-black px-3 py-2">Sign in</button>
        {error && <p className="text-red-300 text-sm">{error}</p>}
      </form>
    </div>
  )
}