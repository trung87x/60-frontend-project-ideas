import React from 'react'
import { useOutletContext } from 'react-router-dom'
import TodoList from '../components/TodoList.jsx'

export default function All() {
  const ctx = useOutletContext()
  return <TodoList items={ctx.todos} onToggle={ctx.toggleTodo} onDelete={ctx.deleteTodo} onUpdateTitle={ctx.updateTitle} />
}
