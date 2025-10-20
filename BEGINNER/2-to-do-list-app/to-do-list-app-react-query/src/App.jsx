import React from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import Stats from './components/Stats.jsx'
import { useTodosQuery } from './hooks/useTodosQuery.js'

export default function App() {
  const { data, isLoading, isError, error, counts, addTodo, toggleTodo, deleteTodo, updateTitle } = useTodosQuery()

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          ✅ To-Do List <span className="badge">Level 5</span>
        </div>
      </header>

      <section className="card">
        <TodoForm onAdd={addTodo} />
        <p className="notice">React Query + API (optimistic update). ENV: <code>VITE_API_BASE_URL</code></p>
      </section>

      <Stats counts={counts} />

      <section className="card">
        {isLoading && <p>Đang tải…</p>}
        {isError && <p style={{color:'#fca5a5'}}>Lỗi: {error?.message}</p>}
        {!isLoading && !isError && (
          <TodoList
            items={data || []}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdateTitle={updateTitle}
          />
        )}
        {!isLoading && !isError && (data || []).length === 0 && (
          <p style={{color:'#8aa1c2', textAlign:'center'}}>Danh sách trống.</p>
        )}
      </section>
    </div>
  )
}
