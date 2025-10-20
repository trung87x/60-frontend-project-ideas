import React, { useMemo } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import TodoFilters from './components/TodoFilters.jsx'
import Stats from './components/Stats.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'

const initialTodos = [
  { id: '1', title: 'Thiết lập dự án React (Vite)', done: false, createdAt: new Date().toISOString() },
  { id: '2', title: 'Lưu todos vào localStorage', done: true, createdAt: new Date().toISOString() },
]

const FILTERS = ['all', 'active', 'completed']

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos-level3', initialTodos)
  const [filter, setFilter] = useLocalStorage('filter-level3', 'all')

  function addTodo(title) {
    const t = { id: String(Date.now() + Math.random()), title, done: false, createdAt: new Date().toISOString() }
    setTodos([t, ...todos])
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id))
  }

  function updateTitle(id, title) {
    setTodos(todos.map(t => t.id === id ? { ...t, title } : t))
  }

  const filtered = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.done)
      case 'completed': return todos.filter(t => t.done)
      default: return todos
    }
  }, [todos, filter])

  const counts = useMemo(() => {
    const all = todos.length
    const done = todos.filter(t => t.done).length
    const active = all - done
    return { all, active, done }
  }, [todos])

  return (
    <div className="container">
      <header>
        <h1>✅ To-Do List <span className="badge">Level 3</span></h1>
        <p>React + localStorage persist. Component-based UI.</p>
      </header>

      <section className="card">
        <TodoForm onAdd={addTodo} />
      </section>

      <Stats counts={counts} />

      <section className="card">
        <TodoFilters
          value={filter}
          options={FILTERS}
          onChange={setFilter}
        />
        <TodoList
          items={filtered}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdateTitle={updateTitle}
        />
        {filtered.length === 0 && <p style={{color:'#8aa1c2', textAlign:'center'}}>Không có mục nào phù hợp.</p>}
      </section>
    </div>
  )
}
