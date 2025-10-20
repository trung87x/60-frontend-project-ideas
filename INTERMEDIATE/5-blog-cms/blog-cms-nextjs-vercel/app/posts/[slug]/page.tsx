'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function mdToHtml(md:string){
  let html = md
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/\n/g, '<br>')
  return html
}

export default function PostPage(){
  const params = useParams() as { slug: string }
  const [html, setHtml] = useState<string>('Đang tải...')

  useEffect(()=>{
    fetch('/posts/'+params.slug+'.md').then(r=>r.text()).then(t=> setHtml(mdToHtml(t))).catch(()=> setHtml('Không tải được nội dung'))
  }, [params.slug])

  return (
    <div style={{maxWidth:900, margin:'0 auto'}}>
      <Link href="/">← Về trang chủ</Link>
      <div style={{background:'#0b1020',border:'1px solid #243',borderRadius:12,padding:16, marginTop:12}} dangerouslySetInnerHTML={{__html: html}}/>
    </div>
  )
}
