import React, { useState } from 'react'
import { useTasks } from './useTasks.js'

const INIT = [
  {
    "id": "t1",
    "title": "Thiết kế wireframe",
    "done": false,
    "priority": "high",
    "due": "2025-10-25",
    "tags": [
      "ux",
      "design"
    ]
  },
  {
    "id": "t2",
    "title": "Viết API spec",
    "done": true,
    "priority": "medium",
    "due": "2025-10-18",
    "tags": [
      "backend"
    ]
  },
  {
    "id": "t3",
    "title": "Lập kế hoạch sprint",
    "done": false,
    "priority": "low",
    "due": "2025-10-30",
    "tags": [
      "pm"
    ]
  },
  {
    "id": "t4",
    "title": "Sửa lỗi #231",
    "done": false,
    "priority": "high",
    "due": "2025-10-22",
    "tags": [
      "bugfix"
    ]
  }
]

function Toolbar({ onAdd, q, setQ, filt, setFilt, sort, setSort }){
  const [title, setTitle] = useState('')
  const [due, setDue] = useState('')
  const [priority, setPriority] = useState('medium')
  return (
    <div style={{display:'flex',gap:8,flexWrap:'wrap',background:'#0b1020',padding:12,borderRadius:12}}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Thêm công việc..." />
      <input type="date" value={due} onChange={e=>setDue(e.target.value)} />
      <select value={priority} onChange={e=>setPriority(e.target.value)}>
        <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
      </select>
      <button onClick={()=>{ if(title.trim()) { onAdd({ title, due, priority }); setTitle(''); setDue('') } }} style={{background:'linear-gradient(90deg,#7c3aed,#06b6d4)',border:'none',color:'#fff',padding:'8px 12px',borderRadius:10}}>Thêm</button>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{marginLeft:'auto'}}/>
      <select value={filt} onChange={e=>setFilt(e.target.value)}>
        <option value="all">All</option><option value="active">Active</option><option value="done">Done</option>
      </select>
      <select value={sort} onChange={e=>setSort(e.target.value)}>
        <option value="due-asc">Due ↑</option><option value="due-desc">Due ↓</option>
        <option value="prio-desc">Priority</option>
      </select>
    </div>
  )
}

function TaskItem({ t, onToggle, onDelete }){
  return (
    <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',gap:10,alignItems:'center',background:'#161a2b',borderRadius:12,padding:10,opacity:t.done?.7:1}}>
      <input type="checkbox" checked={t.done} onChange={()=>onToggle(t.id)} />
      <div>
        <div style={{fontWeight:600, textDecoration: t.done?'line-through':'none'}}>{t.title}</div>
        <div style={{fontSize:12, opacity:.8}}>Due: {t.due || '-'}</div>
      </div>
      <div style={{display:'flex',gap:6}}>
        <span style={{fontSize:12,padding:'4px 8px',borderRadius:999,border:'1px solid #283055'}}>{t.priority}</span>
        <button onClick={()=>onDelete(t.id)}>Xoá</button>
      </div>
    </div>
  )
}

export default function App(){
  const { items, add, toggle, del, q, setQ, filt, setFilt, sort, setSort } = useTasks(INIT)

  return (
    <div style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:'24px 0'}}>
      <header style={{textAlign:'center',padding:24}}><h1>✅ Tasks — Hook + localStorage</h1></header>
      <main style={{width:'min(1000px,92vw)',margin:'0 auto'}}>
        <Toolbar onAdd={add} q={q} setQ={setQ} filt={filt} setFilt={setFilt} sort={sort} setSort={setSort} />
        <section style={{display:'grid',gap:10,marginTop:12}}>
          {items.map(t => <TaskItem key={t.id} t={t} onToggle={toggle} onDelete={del} />)}
        </section>
      </main>
    </div>
  )
}
