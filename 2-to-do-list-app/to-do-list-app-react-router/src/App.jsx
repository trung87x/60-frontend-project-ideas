import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import TodoForm from './components/TodoForm.jsx'
import Stats from './components/Stats.jsx'
import { useTodos } from './hooks/useTodos.js'

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTitle } = useTodos()

  const all = todos.length
  const done = todos.filter(t => t.done).length
  const active = all - done

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          ✅ To-Do List <span className="badge">Level 4</span>
        </div>
        <nav className="nav">
          <NavLink to="/" end className={({isActive}) => 'link' + (isActive ? ' active' : '')}>Tất cả</NavLink>
          <NavLink to="/active" className={({isActive}) => 'link' + (isActive ? ' active' : '')}>Đang làm</NavLink>
          <NavLink to="/completed" className={({isActive}) => 'link' + (isActive ? ' active' : '')}>Hoàn thành</NavLink>
        </nav>
      </header>

      <section className="card">
        <TodoForm onAdd={addTodo} />
      </section>

      <Stats counts={{all, active, done}} />

      <section className="card">
        <Outlet context={{ todos, toggleTodo, deleteTodo, updateTitle }} />
      </section>

      <footer className="footer">
        <small>Filter đồng bộ URL bằng React Router (/, /active, /completed)</small>
      </footer>
    </div>
  )
}
