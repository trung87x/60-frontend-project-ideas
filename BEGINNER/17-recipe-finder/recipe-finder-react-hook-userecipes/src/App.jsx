import React from 'react'
import { useRecipes } from './useRecipes'

function Card({ r, isFav, onOpen, onToggleFav }){
  return (
    <article style={{background:'#111827',border:'1px solid #1f2937',borderRadius:16,padding:16,display:'grid',gap:8}}>
      <h3>{r.title}</h3>
      <p style={{opacity:.8}}>⏱️ {r.time} phút • 👥 {r.servings} khẩu phần</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
        {r.tags.map(t=>(<span key={t} style={{fontSize:12,border:'1px solid #374151',background:'#0b1220',borderRadius:999,padding:'4px 8px',color:'#cbd5e1'}}>#{t}</span>))}
      </div>
      <div style={{display:'flex', gap:8}}>
        <button onClick={()=>onOpen(r)}>Xem</button>
        <button onClick={()=>onToggleFav(r.id)}>{isFav?'★ Bỏ yêu thích':'☆ Yêu thích'}</button>
      </div>
    </article>
  )
}

export default function App(){
  const { items, q, setQ, tag, setTag, tags, fav, toggleFav } = useRecipes()
  const [open, setOpen] = React.useState(null)
  const [onlyFav, setOnlyFav] = React.useState(false)

  const filtered = items.filter(r => !onlyFav || fav.includes(r.id))

  return (
    <main style={{maxWidth:980, margin:'40px auto', padding:24, fontFamily:'system-ui', color:'#e5e7eb', background:'#0f172a'}}>
      <h1>🍳 Recipe Finder — Cấp 5 (useRecipes + Favorites)</h1>
      <div style={{display:'flex',gap:8,marginBottom:12, alignItems:'center'}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm công thức..." style={{flex:1,padding:'10px 12px',borderRadius:10,border:'1px solid #374151',background:'#0b1220',color:'#e5e7eb'}}/>
        <select value={tag} onChange={e=>setTag(e.target.value)} style={{padding:'10px 12px',borderRadius:10,border:'1px solid #374151',background:'#0b1220',color:'#e5e7eb'}}>
          <option value="">Tất cả</option>
          {tags.map(t=> <option key={t}>{t}</option>)}
        </select>
        <label style={{display:'flex', gap:6, alignItems:'center'}}>
          <input type="checkbox" checked={onlyFav} onChange={e=>setOnlyFav(e.target.checked)} />
          Chỉ yêu thích
        </label>
      </div>
      <section style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {filtered.map(r=> <Card key={r.id} r={r} isFav={fav.includes(r.id)} onOpen={setOpen} onToggleFav={toggleFav} />)}
      </section>

      {open && (
        <dialog open style={{padding:0,border:'none',background:'transparent'}} onClose={()=>setOpen(null)}>
          <article style={{maxWidth:640,background:'#0b1220',border:'1px solid #374151',borderRadius:16,padding:16}}>
            <h2 style={{margin:'0 0 8px'}}>{open.title}</h2>
            <p>⏱️ {open.time} phút • 👥 {open.servings} khẩu phần</p>
            <h4>Nguyên liệu</h4>
            <ul>{open.ingredients.map((i,idx)=>(<li key={idx}>{i}</li>))}</ul>
            <h4>Các bước</h4>
            <ol>{open.steps.map((s,idx)=>(<li key={idx}>{s}</li>))}</ol>
            <div style={{marginTop:8}}><button onClick={()=>setOpen(null)}>Đóng</button></div>
          </article>
        </dialog>
      )}
    </main>
  )
}
