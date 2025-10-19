import React from 'react'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ items, onToggle, onDelete, onUpdateTitle }) {
  return (
    <ul className="list" role="list" aria-label="Danh sách công việc">
      {items.map(t => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
          onUpdateTitle={(title) => onUpdateTitle(t.id, title)}
        />
      ))}
    </ul>
  )
}
