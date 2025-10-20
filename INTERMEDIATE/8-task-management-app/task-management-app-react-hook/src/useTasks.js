import { useEffect, useMemo, useState } from 'react'

const KEY = 'tasks:v2'

export function useTasks(initial = []){
  const [tasks, setTasks] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(KEY)) || initial }catch{ return initial }
  })
  const [q, setQ] = useState('')
  const [filt, setFilt] = useState('all')
  const [sort, setSort] = useState('due-asc')

  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(tasks)) }, [tasks])
  const uid = ()=> Math.random().toString(36).slice(2,9)
  const prioWeight = p => p==='high'?3: p==='medium'?2:1

  const items = useMemo(()=>{
    let r = [...tasks]
    const term = q.trim().toLowerCase()
    if(term) r = r.filter(t => t.title.toLowerCase().includes(term))
    if(filt==='active') r = r.filter(t => !t.done)
    if(filt==='done') r = r.filter(t => t.done)
    switch(sort){
      case 'due-asc': r.sort((a,b)=>(a.due||'9999').localeCompare(b.due||'9999')); break;
      case 'due-desc': r.sort((a,b)=>(b.due||'').localeCompare(a.due||'')); break;
      case 'prio-desc': r.sort((a,b)=> prioWeight(b.priority)-prioWeight(a.priority)); break;
    }
    return r
  }, [tasks, q, filt, sort])

  return {
    tasks, items, q, setQ, filt, setFilt, sort, setSort,
    add: (payload)=> setTasks(t => [{ id: uid(), title: payload.title, due: payload.due, priority: payload.priority || 'medium', done:false, tags: payload.tags||[] }, ...t]),
    toggle: (id)=> setTasks(t => t.map(x => x.id===id ? ({...x, done:!x.done}) : x)),
    del: (id)=> setTasks(t => t.filter(x => x.id!==id))
  }
}
