import React, { useMemo, useState } from 'react'

const DATA = [{"id": 1, "title": "Phở Bò", "time": 45, "servings": 2, "tags": ["viet", "noodle", "beef"], "ingredients": ["Bánh phở", "Thịt bò", "Hành, gừng", "Quế, hồi", "Nước dùng"], "steps": ["Nướng hành gừng", "Hầm xương / nước dùng", "Chần bánh phở", "Thái thịt bò", "Chan nước dùng và thưởng thức"]}, {"id": 2, "title": "Bún Chả", "time": 35, "servings": 2, "tags": ["viet", "grill", "pork"], "ingredients": ["Thịt ba rọi", "Bún tươi", "Nước mắm", "Rau sống", "Đu đủ chua"], "steps": ["Ướp thịt", "Nướng chả", "Pha nước chấm", "Luộc bún", "Dọn kèm rau"]}, {"id": 3, "title": "Mì Ý Sốt Cà", "time": 25, "servings": 2, "tags": ["italian", "pasta", "vegetarian"], "ingredients": ["Mì spaghetti", "Cà chua", "Hành tây", "Tỏi", "Dầu olive", "Basil"], "steps": ["Luộc mì", "Xào tỏi hành", "Nấu sốt cà", "Trộn mì với sốt", "Rắc basil"]}, {"id": 4, "title": "Cơm Gà", "time": 40, "servings": 3, "tags": ["viet", "rice", "chicken"], "ingredients": ["Gà", "Gạo", "Gừng", "Hành lá", "Muối tiêu"], "steps": ["Luộc gà", "Nấu cơm với nước gà", "Xé gà", "Pha nước mắm gừng", "Dọn kèm hành mỡ"]}, {"id": 5, "title": "Salad Hy Lạp", "time": 10, "servings": 2, "tags": ["greek", "salad", "vegetarian"], "ingredients": ["Dưa leo", "Cà chua", "Hành tây", "Ô liu", "Phô mai feta", "Dầu olive"], "steps": ["Cắt rau củ", "Trộn dầu olive", "Thêm phô mai và ô liu"]}]

function Card({ r, onOpen }){
  return (
    <article style={{background:'#111827',border:'1px solid #1f2937',borderRadius:16,padding:16,display:'grid',gap:8}}>
      <h3>{r.title}</h3>
      <p style={{opacity:.8}}>⏱️ {r.time} phút • 👥 {r.servings} khẩu phần</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
        {r.tags.map(t=>(<span key={t} style={{fontSize:12,border:'1px solid #374151',background:'#0b1220',borderRadius:999,padding:'4px 8px',color:'#cbd5e1'}}>#{t}</span>))}
      </div>
      <button onClick={()=>onOpen(r)}>Xem chi tiết</button>
    </article>
  )
}

export default function App(){
  const [q,setQ] = useState('')
  const [tag,setTag] = useState('')
  const [open,setOpen] = useState(null)

  const items = useMemo(()=>{
    const s = q.toLowerCase()
    return DATA.filter(r=> {
      const hitQ = !s || r.title.toLowerCase().includes(s) || r.ingredients.join(' ').toLowerCase().includes(s)
      const hitT = !tag || r.tags.includes(tag)
      return hitQ && hitT
    })
  }, [q, tag])

  return (
    <main style={{maxWidth:980, margin:'40px auto', padding:24, fontFamily:'system-ui', color:'#e5e7eb', background:'#0f172a'}}>
      <h1>🍳 Recipe Finder — React (Cấp 4)</h1>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm công thức..." style={{flex:1,padding:'10px 12px',borderRadius:10,border:'1px solid #374151',background:'#0b1220',color:'#e5e7eb'}}/>
        <select value={tag} onChange={e=>setTag(e.target.value)} style={{padding:'10px 12px',borderRadius:10,border:'1px solid #374151',background:'#0b1220',color:'#e5e7eb'}}>
          <option value="">Tất cả thẻ</option>
          <option>viet</option><option>pasta</option><option>salad</option><option>vegetarian</option><option>beef</option><option>chicken</option>
        </select>
      </div>
      <section style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {items.map(r=> <Card key={r.id} r={r} onOpen={setOpen} />)}
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
