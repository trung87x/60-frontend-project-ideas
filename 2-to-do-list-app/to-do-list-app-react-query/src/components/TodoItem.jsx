import React, { useRef } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onUpdateTitle }) {
  const ref = useRef(null)

  function handleKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); ref.current?.blur() }
  }
  function handleBlur() {
    const text = ref.current?.textContent?.trim() ?? ''
    if (text && text !== todo.title) onUpdateTitle(text)
    else if (!text) ref.current.textContent = todo.title
  }

  return (
    <li className="item" data-id={todo.id}>
      <input
        type="checkbox"
        className="checkbox"
        checked={!!todo.done}
        onChange={() => onToggle(!todo.done)}
        aria-label={todo.done ? 'Bỏ hoàn thành' : 'Đánh dấu hoàn thành'}
      />
      <div
        ref={ref}
        className={`title ${todo.done ? 'done' : ''}`}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      >
        {todo.title}
      </div>
      <div className="actions">
        <button className="icon danger" onClick={onDelete} title="Xoá">Xoá</button>
      </div>
    </li>
  )
}
