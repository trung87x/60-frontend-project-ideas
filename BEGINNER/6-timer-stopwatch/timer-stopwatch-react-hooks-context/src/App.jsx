import React from 'react'
import TimersProvider from './context/TimersContext.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App(){
  return (
    <TimersProvider>
      <header className="header">
        <h1>⏱️ Timer & Stopwatch — Level 5</h1>
        <p className="muted">React Hooks nâng cao + Context • Quản lý nhiều bộ đếm</p>
      </header>
      <main className="container">
        <Dashboard />
      </main>
      <footer className="header" style={{borderTop:'1px solid var(--border)', borderBottom:'none'}}>
        <p className="muted">© 2025 trung87.link — Level 5 (Hooks + Context)</p>
      </footer>
    </TimersProvider>
  )
}
