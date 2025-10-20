import { useEffect, useState } from 'react'

const initialTodos = [
  { id: '1', title: 'Thêm React Router', done: false, createdAt: new Date().toISOString() },
  { id: '2', title: 'Đồng bộ filter với URL', done: true, createdAt: new Date().toISOString() },
]

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('todos-level4')
      return raw ? JSON.parse(raw) : initialTodos
    } catch { return initialTodos }
  })

  useEffect(() => {
    try { localStorage.setItem('todos-level4', JSON.stringify(todos)) } catch {}
  }, [todos])

  function addTodo(title) {
    setTodos(prev => [{ id: String(Date.now() + Math.random()), title, done: false, createdAt: new Date().toISOString() }, ...prev])
  }
  function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }
  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }
  function updateTitle(id, title) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, title } : t))
  }

  return { todos, addTodo, toggleTodo, deleteTodo, updateTitle }
}
