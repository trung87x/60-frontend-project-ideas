import React from 'react'
import Display from '../pages/_parts/Display.jsx'
import Keypad from '../pages/_parts/Keypad.jsx'
import History from '../pages/_parts/History.jsx'
import { ACTIONS } from '../state/calculatorReducer.js'

export default function Calculator({ state, dispatch }) {
  return (
    <div>
      <Display expr={state.exprText} result={state.display} error={state.error} />
      <Keypad
        onDigit={(d) => dispatch({ type: ACTIONS.DIGIT, payload: d })}
        onDot={() => dispatch({ type: ACTIONS.DOT })}
        onOp={(op) => dispatch({ type: ACTIONS.OP, payload: op })}
        onEquals={() => dispatch({ type: ACTIONS.EQUALS })}
        onClear={() => dispatch({ type: ACTIONS.CLEAR })}
        onBackspace={() => dispatch({ type: ACTIONS.BACKSPACE })}
        onToggleSign={() => dispatch({ type: ACTIONS.TOGGLE_SIGN })}
      />
      <div style={{marginTop:12}}>
        <h4 style={{margin:'8px 0'}}>Lịch sử</h4>
        <History items={state.history} onReplay={(item) => dispatch({ type: ACTIONS.REPLAY, payload: item })} />
      </div>
    </div>
  )
}
