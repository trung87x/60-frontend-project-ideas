'use client'
import React, { useEffect, useMemo, useState } from 'react'

type Task = { id:string; title:string; due:string; priority:'high'|'medium'|'low'; done:boolean }

function Toolbar({ onAdd, q, setQ, filt, setFilt, sort, setSort }:{
  onAdd:(p:{title:string;due:string;priority:'high'|'medium'|'low'})=>void,
  q:string,setQ:(v:string)=>void,filt:string,setFilt:(v:string)=>void,sort:string,setSort:(v:string)=>void
}){
  const [title, setTitle] = useState('')
  const [due, setDue] = useState('')
  const [priority, setPriority] = useState<'high'|'medium'|'low'>('medium')
  return (
    <div style={{display:'flex',gap:8,flexWrap:'wrap',background:'#0b1020',padding:12,borderRadius:12}}>
      <input value={title} onChange={e=>setTitle((e.target as HTMLInputElement).value)} placeholder="Thêm công việc..." />
      <input type="date" value={due} onChange={e=>setDue((e.target as HTMLInputElement).value)} />
      <select value={priority} onChange={e=>setPriority((e.target as HTMLSelectElement).value as any)}>
        <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
      </select>
      <button onClick={()=>{ if(title.trim()) { onAdd({ title, due, priority }); setTitle(''); setDue('') } }} style={{background:'linear-gradient(90deg,#7c3aed,#06b6d4)',border:'none',color:'#fff',padding:'8px 12px',borderRadius:10}}>Thêm</button>
      <input value={q} onChange={e=>setQ((e.target as HTMLInputElement).value)} placeholder="Search..." style={{marginLeft:'auto'}}/>
      <select value={filt} onChange={e=>setFilt((e.target as HTMLSelectElement).value)}>
        <option value="all">All</option><option value="active">Active</option><option value="done">Done</option>
      </select>
      <select value={sort} onChange={e=>setSort((e.target as HTMLSelectElement).value)}>
        <option value="due-asc">Due ↑</option><option value="due-desc">Due ↓</option>
        <option value="prio-desc">Priority</option>
      </select>
    </div>
  )
}

function TaskItem({ t, onToggle, onDelete }:{ t:Task, onToggle:(id:string)=>void, onDelete:(id:string)=>void }){
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

export default function Page(){
  const [data, setData] = useState<Task[]>([])
  const [q, setQ] = useState('')
  const [filt, setFilt] = useState('all')
  const [sort, setSort] = useState('due-asc')

  const prioWeight = (p:string)=> p==='high'?3: p==='medium'?2:1

  async function load(){
    const r = await fetch('/api/tasks'); const d = await r.json(); setData(d)
  }
  useEffect(()=>{ load() }, [])

  const items = useMemo(()=>{
    let r = [...data]
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
  }, [data, q, filt, sort])

  async function add(p:{title:string; due:string; priority:'high'|'medium'|'low'}){
    const r = await fetch('/api/tasks', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(p) })
    const created = await r.json(); setData(d => [created, ...d])
  }
  async function toggle(id:string){
    const r = await fetch('/api/tasks/'+id, { method:'PATCH' }); const updated = await r.json()
    setData(d => d.map(x => x.id===id ? updated : x))
  }
  async function del(id:string){
    await fetch('/api/tasks/'+id, { method:'DELETE' }); setData(d => d.filter(x => x.id!==id))
  }

  return (
    <div style={{maxWidth:1000, margin:'0 auto'}}>
      <header style={{textAlign:'center', marginBottom:16}}><h1>✅ Tasks — Next.js + API</h1></header>
      <Toolbar onAdd={add} q={q} setQ={setQ} filt={filt} setFilt={setFilt} sort={sort} setSort={setSort} />
      <section style={{display:'grid',gap:10,marginTop:12}}>
        {items.map(t => <TaskItem key={t.id} t={t} onToggle={toggle} onDelete={del} />)}
      </section>
    </div>
  )
}
