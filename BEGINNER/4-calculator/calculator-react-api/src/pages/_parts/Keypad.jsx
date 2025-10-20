import React from 'react'

export default function Keypad({ onDigit, onDot, onOp, onEquals, onClear, onBackspace, onToggleSign }) {
  const key = (label, props = {}) => (
    <button className={`key ${props.className||''}`} onClick={props.onClick} aria-label={props.ariaLabel || label}>
      {label}
    </button>
  )
  return (
    <section className="keypad" role="group" aria-label="Bàn phím máy tính">
      {key('C', { className:'key-fn wide', onClick:onClear, ariaLabel:'Xóa tất cả (C)' })}
      {key('⌫', { className:'key-fn', onClick:onBackspace, ariaLabel:'Xóa 1 ký tự' })}
      {key('±', { className:'key-fn', onClick:onToggleSign, ariaLabel:'Đổi dấu' })}

      {['7','8','9'].map(d => key(d, { onClick:() => onDigit(d) }))}
      {key('÷', { className:'key-op', onClick:() => onOp('/'), ariaLabel:'Chia' })}

      {['4','5','6'].map(d => key(d, { onClick:() => onDigit(d) }))}
      {key('×', { className:'key-op', onClick:() => onOp('*'), ariaLabel:'Nhân' })}

      {['1','2','3'].map(d => key(d, { onClick:() => onDigit(d) }))}
      {key('−', { className:'key-op', onClick:() => onOp('-'), ariaLabel:'Trừ' })}

      {key('0', { className:'zero', onClick:() => onDigit('0') })}
      {key('.', { onClick:onDot })}
      {key('+', { className:'key-op', onClick:() => onOp('+'), ariaLabel:'Cộng' })}

      {key('=', { className:'key-eq', onClick:onEquals, ariaLabel:'Bằng' })}
    </section>
  )
}
