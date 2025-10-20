import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function Home(){
  const [items,setItems] = React.useState([])
  const onSubmit=(e)=>{
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const it = Object.fromEntries(f.entries())
    if(!it.title || !it.amount || !it.date) return
    it.amount = Number(it.amount)
    setItems(prev => [it, ...prev])
    e.currentTarget.reset()
  }
  const total = items.reduce((s,i)=>s+Number(i.amount||0),0)
  return (
    <main style={{maxWidth:900,margin:'0 auto',padding:16}}>
      <Helmet><title>Expense Tracker — Home</title></Helmet>
      <h1>💸 Expense Tracker</h1>
      <form onSubmit={onSubmit} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr auto',gap:8}}>
        <input name="title" placeholder="Tên khoản chi"/>
        <input name="amount" type="number" step="0.01" placeholder="Số tiền"/>
        <input name="date" type="date"/>
        <select name="category"><option>Food</option><option>Transport</option><option>Shopping</option><option>Other</option></select>
        <button>Thêm</button>
      </form>
      <div style={{marginTop:8, display:'flex', gap:8, alignItems:'center'}}>
        <span><Link to="/stats">Xem thống kê tháng →</Link></span>
        <div style={{marginLeft:'auto', color:'#0ea5e9'}}>Tổng: <strong>{total.toLocaleString()}</strong> đ</div>
      </div>
      <ul style={{listStyle:'none',padding:0,marginTop:12,display:'flex',flexDirection:'column',gap:8}}>
        {items.map((it,idx)=>(
          <li key={idx} style={{display:'flex',justifyContent:'space-between',border:'1px solid #eee',padding:10,borderRadius:10}}>
            <div>
              <div style={{fontWeight:600}}>{it.title} — <span style={{color:'#16a34a'}}>{it.category}</span></div>
              <div style={{color:'#64748b',fontSize:12}}>{it.date}</div>
            </div>
            <strong>{Number(it.amount).toLocaleString()}</strong>
          </li>
        ))}
      </ul>
    </main>
  )
}
