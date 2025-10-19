import React from 'react'

export default function TodoFilters({ value, options, onChange }) {
  return (
    <div className="filters" role="tablist" aria-label="Bộ lọc">
      {options.map(opt => (
        <button
          key={opt}
          className={`tab ${value === opt ? 'active' : ''}`}
          role="tab"
          aria-selected={value === opt}
          onClick={() => onChange(opt)}
        >
          {label(opt)}
        </button>
      ))}
    </div>
  )
}

function label(k) {
  switch (k) {
    case 'active': return 'Đang làm'
    case 'completed': return 'Hoàn thành'
    default: return 'Tất cả'
  }
}
