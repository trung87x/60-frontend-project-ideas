import React, { useEffect, useReducer, useState } from 'react'
import Display from '../components/Display.jsx'
import Keypad from '../components/Keypad.jsx'
import History from '../components/History.jsx'
import reducer, { initialState, ACTIONS } from '../state/calculatorReducer.js'

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [tab, setTab] = useState('calculator') // 'calculator' | 'memory' | 'history'

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
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
  }, [])

  return (
    <div className="app">
      <section className="panel" aria-label="Khu vực máy tính">
        <div className="header">
          <h1>🧮 Level 3 — React + useReducer</h1>
          <div className="tabs" role="tablist" aria-label="Chế độ">
            {['calculator','memory','history'].map(t => (
              <button key={t} role="tab" className="tab"
                aria-selected={tab===t ? 'true' : 'false'}
                onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <Display expr={state.exprText} result={state.display} error={state.error} />

        {tab === 'calculator' && (
          <Keypad
            onDigit={(d) => dispatch({ type: ACTIONS.DIGIT, payload: d })}
            onDot={() => dispatch({ type: ACTIONS.DOT })}
            onOp={(op) => dispatch({ type: ACTIONS.OP, payload: op })}
            onEquals={() => dispatch({ type: ACTIONS.EQUALS })}
            onClear={() => dispatch({ type: ACTIONS.CLEAR })}
            onBackspace={() => dispatch({ type: ACTIONS.BACKSPACE })}
            onToggleSign={() => dispatch({ type: ACTIONS.TOGGLE_SIGN })}
          />
        )}

        {tab === 'memory' && (
          <div>
            <div className="mem">
              <button className="key key-fn" onClick={() => dispatch({ type: ACTIONS.MC })}>MC</button>
              <button className="key key-fn" onClick={() => dispatch({ type: ACTIONS.MR })}>MR</button>
              <button className="key key-fn" onClick={() => dispatch({ type: ACTIONS.MPLUS })}>M+</button>
              <button className="key key-fn" onClick={() => dispatch({ type: ACTIONS.MMINUS })}>M-</button>
            </div>
            <p style={{marginTop:8, color:'#94a3b8'}}>Memory: <strong>{state.memory}</strong></p>
          </div>
        )}

        {tab === 'history' && (
          <History items={state.history} onReplay={(item) => dispatch({ type: ACTIONS.REPLAY, payload: item })} />
        )}
      </section>

      <aside className="panel" aria-label="Tóm tắt thao tác">
        <h3 style={{marginTop:0}}>Hướng dẫn nhanh</h3>
        <ul>
          <li>Chế độ <b>immediate execution</b> (tính dần theo từng toán tử).</li>
          <li>Phím tắt: 0‑9, ., + − × ÷, Enter, Backspace, Esc.</li>
          <li>Memory: MC, MR, M+, M−.</li>
        </ul>
        <p style={{color:'#94a3b8'}}>Tip: Thử bấm <code>2 + 3 × 4 =</code> → Kết quả 20 (vì (2+3)=5 rồi 5×4).</p>
      </aside>
    </div>
  )
}
