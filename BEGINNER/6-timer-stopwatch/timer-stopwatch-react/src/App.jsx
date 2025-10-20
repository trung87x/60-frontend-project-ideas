import React from 'react'
import Stopwatch from './components/Stopwatch.jsx'
import Timer from './components/Timer.jsx'

export default function App(){
  return (
    <>
      <header className="header">
        <h1>⏱️ Timer & Stopwatch — Level 4</h1>
        <p className="muted">React + Vite • Hooks cơ bản (useState, useEffect, useRef)</p>
      </header>
      <main className="container">
        <Stopwatch />
        <Timer />
      </main>
      <footer className="footer">
        © 2025 trung87.link — Level 4 (React + Vite)
      </footer>
    </>
  )
}
