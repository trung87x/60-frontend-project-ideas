import { useState, useCallback } from 'react'

export function useRandomQuote(list){
  const [lastIndex, setLastIndex] = useState(-1)
  const getIndex = useCallback(() => {
    if (!list || list.length === 0) return -1
    if (list.length === 1) return 0
    let idx
    do { idx = Math.floor(Math.random() * list.length) } while (idx === lastIndex)
    setLastIndex(idx)
    return idx
  }, [list, lastIndex])

  const next = useCallback(() => {
    const idx = getIndex()
    return idx >= 0 ? list[idx] : null
  }, [getIndex, list])

  return { next }
}
