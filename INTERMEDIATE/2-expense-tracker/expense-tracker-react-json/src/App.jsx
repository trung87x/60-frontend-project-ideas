import React from 'react'
import seed from './data/expenses.json'

function useExpenses(initial){
  const [items, setItems] = React.useState(initial)
  const add = (it)=> setItems(prev => [it, ...prev])
  const remove = (idx)=> setItems(prev => prev.filter((_,i)=>i!==idx))
  return { items, add, remove }
}

export default function App(){
  const { items, add, remove } = useExpenses(seed)
  const [filter,setFilter]=React.useState('All')
  const filtered = items.filter(i => filter==='All' ? true : i.category===filter)
  const total = filtered.reduce((s,i)=>s+Number(i.amount||0),0)

  const onSubmit=(e)=>{
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const it = Object.fromEntries(f.entries())
    if(!it.title || !it.amount || !it.date) return
    it.amount = Number(it.amount)
    add(it); e.currentTarget.reset()
  }

  return (
    <main style={{maxWidth:900,margin:'0 auto',padding:16}}>
      <h1>💸 Expense Tracker</h1>
      <form onSubmit={onSubmit} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr auto',gap:8}}>
        <input name="title" placeholder="Tên khoản chi"/>
        <input name="amount" type="number" step="0.01" placeholder="Số tiền"/>
        <input name="date" type="date"/>
        <select name="category"><option>Food</option><option>Transport</option><option>Shopping</option><option>Other</option></select>
        <button>Thêm</button>
      </form>

      <div style={{marginTop:8, display:'flex', gap:8, alignItems:'center'}}>
        <span>Lọc:</span>
        {['All','Food','Transport','Shopping','Other'].map(c=> (
          <button key={c} onClick={()=>setFilter(c)} style={{padding:'6px 10px',border:'1px solid #ddd',borderRadius:8, background: c===filter?'#e2e8f0':'#fff'}}>{c}</button>
        ))}
        <div style={{marginLeft:'auto', color:'#0ea5e9'}}>Tổng: <strong>{total.toLocaleString()}</strong> đ</div>
      </div>

      <ul style={{listStyle:'none',padding:0,marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
        {filtered.map((it,idx)=>(
          <li key={idx} style={{display:'flex',justifyContent:'space-between',border:'1px solid #eee',padding:10,borderRadius:10}}>
            <div>
              <div style={{fontWeight:600}}>{it.title} — <span style={{color:'#16a34a'}}>{it.category}</span></div>
              <div style={{color:'#64748b',fontSize:12}}>{it.date}</div>
            </div>
            <div>
              <strong>{Number(it.amount).toLocaleString()}</strong>
              <button onClick={()=>remove(idx)} style={{marginLeft:8,border:'1px solid #ddd',borderRadius:6,padding:'2px 8px'}}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
