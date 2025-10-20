'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

type Product = { id:number; title:string; price:number; rating:number; category:string; brand:string; thumbnail:string }

export default function ProductPage({ params }:{ params: { id: string } }){
  const [prod, setProd] = useState<Product | null>(null)
  useEffect(()=>{
    fetch('/products.json').then(r=>r.json()).then((list: Product[])=>{
      const p = list.find(x => x.id === Number(params.id)) || null
      setProd(p)
    })
  }, [params.id])

  if(!prod) return <div style={{maxWidth:900,margin:'0 auto'}}><p>Đang tải...</p><Link href="/">← Về trang chủ</Link></div>

  return (
    <div style={{maxWidth:900,margin:'0 auto'}}>
      <Link href="/">← Về trang chủ</Link>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:16,background:'#161a2b',padding:16,borderRadius:16}}>
        <img src={prod.thumbnail} alt={prod.title} style={{width:'100%',aspectRatio:'4/3',objectFit:'cover',borderRadius:12}}/>
        <div>
          <h1 style={{marginTop:0}}>{prod.title}</h1>
          <p>Danh mục: {prod.category}</p>
          <p>Hãng: {prod.brand}</p>
          <p>Đánh giá: ★{prod.rating}</p>
          <h2 style={{color:'#a78bfa'}}>${prod.price.toFixed(2)}</h2>
          <button style={{padding:'10px 14px',borderRadius:999,background:'linear-gradient(90deg,#7c3aed,#06b6d4)',border:'none',color:'white'}}>Thêm vào giỏ (demo)</button>
        </div>
      </div>
    </div>
  )
}
