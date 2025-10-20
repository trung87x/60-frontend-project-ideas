import React, { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const v = value.trim()
    if (!v) return
    onAdd(v)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="row">
        <input
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Nhập việc và nhấn Enter…"
          aria-label="Công việc"
        />
        <button type="submit" className="btn">Thêm</button>
      </div>
    </form>
  )
}
