import React from 'react'

export default function Stats({ counts }) {
  const { all, active, done } = counts
  return (
    <section className="stats" aria-live="polite">
      <span><strong>{all}</strong> việc</span>
      <span>•</span>
      <span><strong>{active}</strong> đang làm</span>
      <span>•</span>
      <span><strong>{done}</strong> hoàn thành</span>
    </section>
  )
}
