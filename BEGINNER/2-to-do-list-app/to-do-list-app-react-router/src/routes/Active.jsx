import React from 'react'
import { useOutletContext } from 'react-router-dom'
import TodoList from '../components/TodoList.jsx'

export default function Active() {
  const ctx = useOutletContext()
  const items = ctx.todos.filter(t => !t.done)
  return <TodoList items={items} onToggle={ctx.toggleTodo} onDelete={ctx.deleteTodo} onUpdateTitle={ctx.updateTitle} />
}
