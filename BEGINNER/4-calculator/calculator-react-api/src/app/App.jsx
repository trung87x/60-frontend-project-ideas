import React, { useEffect, useReducer, useState } from 'react'
import Calculator from '../pages/Calculator.jsx'
import Currency from '../pages/Currency.jsx'
import Vat from '../pages/Vat.jsx'
import reducer, { initialState, ACTIONS } from '../state/calculatorReducer.js'

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [tab, setTab] = useState('calculator') // 'calculator' | 'currency' | 'vat'

  // Keyboard for calculator tab only
  useEffect(() => {
    function onKey(e) {
      if (tab !== 'calculator') return
      const k = e.key
      if ((/^[0-9]$/).test(k)) return (dispatch({ type: ACTIONS.DIGIT, payload: k }), e.preventDefault())
      if (['.', '+', '-', '*', '/', 'Enter', 'Backspace', 'Escape'].includes(k)) {
        e.preventDefault()
        if (k === '.') return dispatch({ type: ACTIONS.DOT })
        if (k === 'Enter') return dispatch({ type: ACTIONS.EQUALS })
        if (k === 'Backspace') return dispatch({ type: ACTIONS.BACKSPACE })
        if (k === 'Escape') return dispatch({ type: ACTIONS.CLEAR })
        if (['+', '-', '*', '/'].includes(k)) return dispatch({ type: ACTIONS.OP, payload: k })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tab])

  return (
    <div className="app">
      <section className="panel" aria-label="Ứng dụng">
        <div className="header">
          <h1>🧮 Level 4 — React + API (Currency & VAT)</h1>
          <div className="tabs" role="tablist" aria-label="Trang">
            {['calculator','currency','vat'].map(t => (
              <button key={t} role="tab" className="tab"
                aria-selected={tab===t ? 'true' : 'false'}
                onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {tab === 'calculator' && (
          <Calculator state={state} dispatch={dispatch} />
        )}
        {tab === 'currency' && (
          <Currency />
        )}
        {tab === 'vat' && (
          <Vat />
        )}
      </section>

      <aside className="panel">
        <h3 style={{marginTop:0}}>Ghi chú</h3>
        <ul>
          <li>API: <code>https://api.exchangerate.host/latest</code> (không cần API key).</li>
          <li>Debounce input 300ms + retry đơn giản.</li>
          <li>VAT hỗ trợ preset % và tuỳ chỉnh.</li>
        </ul>
      </aside>
    </div>
  )
}
