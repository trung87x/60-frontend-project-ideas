import React from 'react'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ items, onToggle, onDelete, onUpdateTitle }) {
  if (!items.length) {
    return <p style={{color:'#8aa1c2', textAlign:'center', margin:0}}>Không có mục nào.</p>
  }
  return (
    <ul className="list" role="list" aria-label="Danh sách công việc">
      {items.map(t => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t)}
          onDelete={() => onDelete(t)}
          onUpdateTitle={(title) => onUpdateTitle(t, title)}
        />
      ))}
    </ul>
  )
}
