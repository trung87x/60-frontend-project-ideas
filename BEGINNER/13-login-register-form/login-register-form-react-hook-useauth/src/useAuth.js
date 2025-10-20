import { useEffect, useState } from 'react'
const KEY = 'demo-auth'
export function useAuth(){
  const [user, setUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(KEY)) || null }catch{ return null }
  })
  function login(email){
    const u = { email, token: 'mock-token' }
    localStorage.setItem(KEY, JSON.stringify(u))
    setUser(u)
  }
  function logout(){
    localStorage.removeItem(KEY)
    setUser(null)
  }
  function register(name, email){
    login(email)
  }
  return { user, login, logout, register }
}
