import { useEffect, useMemo, useState } from 'react'
const KEY = 'quiz-progress-v1'
const DATA = [
  { id:1, text:'Thủ đô của Việt Nam là?', options:['Hà Nội','TP.HCM','Đà Nẵng','Huế'], answer:0 },
  { id:2, text:'2 + 3 = ?', options:['4','5','6','23'], answer:1 },
  { id:3, text:'CSS viết tắt của?', options:['Cascading Style Sheets','Counter Strike Source','Computer Styled Sections','Cross Site Scripting'], answer:0 },
  { id:4, text:'React là...', options:['Framework','Thư viện UI','Ngôn ngữ','Trình duyệt'], answer:1 },
]
export function useQuiz(){
  const [idx, setIdx] = useState(0)
  const [picks, setPicks] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(KEY))?.picks ?? Array(DATA.length).fill(null) }
    catch{ return Array(DATA.length).fill(null) }
  })
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify({ picks })) }, [picks])
  const done = useMemo(()=> picks.every(v => v !== null), [picks])
  const score = useMemo(()=> picks.reduce((s, v, i) => s + (v === DATA[i].answer ? 1 : 0), 0), [picks])
  const choose = (i) => setPicks(p => { const n=[...p]; n[idx]=i; return n })
  function reset(){ setPicks(Array(DATA.length).fill(null)); setIdx(0); localStorage.removeItem(KEY) }
  return { data: DATA, idx, setIdx, picks, choose, done, score, reset }
}
