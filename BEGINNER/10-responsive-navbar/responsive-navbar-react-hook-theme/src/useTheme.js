import { useEffect, useState } from 'react'
const KEY = 'prefers-theme'
export function useTheme(){
  const [theme, setTheme] = useState(()=> localStorage.getItem(KEY) || 'dark')
  useEffect(()=>{
    localStorage.setItem(KEY, theme)
    document.documentElement.dataset.theme = theme
    document.body.style.background = theme==='dark' ? '#0f172a' : '#f8fafc'
    document.body.style.color = theme==='dark' ? '#e5e7eb' : '#0f172a'
  }, [theme])
  return { theme, setTheme }
}
