import React from 'react'

export default function Display({ expr, result, error }) {
  return (
    <section className="display" aria-live="polite" aria-atomic="true">
      <div className="expr">{error ? 'Lỗi phép tính' : (expr || '0')}</div>
      <div className="result">{error ? 'Error' : result}</div>
    </section>
  )
}
