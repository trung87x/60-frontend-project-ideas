import { useEffect, useMemo, useState } from 'react'
const KEY = 'quiz:v1'

export function useQuiz(){
  const [data, setData] = useState(null)
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem(KEY))?.answers || {} }catch{ return {} }
  })
  const [left, setLeft] = useState(120)

  useEffect(()=>{ fetch('/questions.json').then(r=>r.json()).then(d=>{
    // shuffle questions
    const qs = [...d.questions].sort(()=> Math.random()-0.5)
    setData({ ...d, questions: qs })
  }) }, [])

  useEffect(()=>{
    const t = setInterval(()=> setLeft(s=> Math.max(0, s-1)), 1000)
    return ()=> clearInterval(t)
  }, [])

  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify({ answers })) }, [answers])

  const pool = data?.questions || []
  const q = pool[idx]
  const score = useMemo(()=> Object.entries(answers).reduce((acc,[id,p]) => {
    const qq = pool.find(x=>x.id===id); return acc + (qq && qq.answer===p ? 1 : 0)
  }, 0), [answers, pool])

  return {
    pool, q, idx, setIdx, left, score, answers,
    pick: (i)=> { if(q && answers[q.id]==null) setAnswers(a => ({...a, [q.id]: i})) },
    reset: ()=> { setIdx(0); setLeft(120); setAnswers({}) }
  }
}
