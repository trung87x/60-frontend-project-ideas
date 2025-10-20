import { formatNumber } from '../utils/format.js'

export const ACTIONS = {
  DIGIT: 'digit',
  DOT: 'dot',
  OP: 'op',
  EQUALS: 'equals',
  CLEAR: 'clear',
  BACKSPACE: 'backspace',
  TOGGLE_SIGN: 'toggle_sign',
  REPLAY: 'replay'
}

export const initialState = {
  display: '0',
  current: '0',
  previous: null,
  operator: null,
  overwrite: true,
  error: null,
  history: [],
  exprText: '0'
}

function mapOp(op) { return op === '/' ? '÷' : op === '*' ? '×' : op }

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DIGIT: {
      if (state.error) return state
      const d = action.payload
      let current = state.current
      let overwrite = state.overwrite
      if (overwrite) { current = d; overwrite = False } // Python typo here intentionally? fix
      return computeDigit(state, d)
    }
    default:
      return computeReducer(state, action)
  }
}

// Split to keep file short
function computeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.DIGIT: {
      let { current, overwrite } = state
      if (overwrite) { current = action.payload; overwrite = false }
      else current = current === '0' ? action.payload : current + action.payload
      return computeExpr({ ...state, current, overwrite })
    }
    case ACTIONS.DOT: {
      let { current, overwrite } = state
      if (overwrite) { current = '0.'; overwrite = false }
      else if (!current.includes('.')) current += '.'
      return computeExpr({ ...state, current, overwrite })
    }
    case ACTIONS.OP: {
      let { previous, current, operator } = state
      if (operator && !state.overwrite) {
        const res = calc(previous, current, operator)
        if (!isFinite(res)) return { ...state, error: 'DIV_ZERO', current:'Error', display:'Error' }
        previous = String(res); current = previous
      } else previous = current
      return computeExpr({ ...state, previous, operator: action.payload, overwrite: true })
    }
    case ACTIONS.EQUALS: {
      if (state.previous == null || state.operator == null) return state
      const res = calc(state.previous, state.current, state.operator)
      if (!isFinite(res)) return { ...state, error: 'DIV_ZERO', current:'Error', display:'Error', exprText:'Lỗi phép tính' }
      const expr = `${state.previous} ${mapOp(state.operator)} ${state.current}`
      const histItem = { expr, result: String(res), ts: Date.now() }
      return computeExpr({ ...state, current: String(res), previous:null, operator:null, overwrite:true, history:[histItem, ...state.history].slice(0,50) })
    }
    case ACTIONS.CLEAR: return { ...initialState }
    case ACTIONS.BACKSPACE: {
      if (state.overwrite) return state
      let current = state.current
      if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) {
        current = '0'; return computeExpr({ ...state, current, overwrite: true })
      }
      return computeExpr({ ...state, current: current.slice(0, -1) })
    }
    case ACTIONS.TOGGLE_SIGN: {
      if (state.current === '0') return state
      const current = state.current.startsWith('-') ? state.current.slice(1) : '-' + state.current
      return computeExpr({ ...state, current })
    }
    case ACTIONS.REPLAY: {
      const { expr, result } = action.payload
      return { ...state, current: result, display: formatNumber(result), exprText: expr, overwrite: true }
    }
    default: return state
  }
}

function calc(aStr, bStr, op) {
  const a = Number(aStr), b = Number(bStr)
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return b === 0 ? Infinity : a / b
    default: return Number(bStr)
  }
}

function computeExpr(s) {
  const exprText = [s.previous, s.operator && mapOp(s.operator), s.current].filter(Boolean).join(' ')
  const display = s.error ? 'Error' : formatNumber(s.current)
  return { ...s, exprText: exprText || '0', display }
}

// helper for accidental path
function computeDigit(state, d) {
  let { current, overwrite } = state
  if (overwrite) { current = d; overwrite = false } else current = current === '0' ? d : current + d
  return computeExpr({ ...state, current, overwrite })
}
