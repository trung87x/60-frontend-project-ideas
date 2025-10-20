import React from 'react'

export default function History({ items, onReplay }) {
  if (!items?.length) return <p className="expr">Chưa có lịch sử.</p>
  return (
    <div className="hist" role="list">
      {items.map((it, idx) => (
        <div key={idx} className="hist-item" role="listitem">
          <div>
            <div className="expr">{it.expr}</div>
            <div>= <strong>{it.result}</strong></div>
          </div>
          <button className="key" onClick={() => onReplay(it)}>↺</button>
        </div>
      ))}
    </div>
  )
}
