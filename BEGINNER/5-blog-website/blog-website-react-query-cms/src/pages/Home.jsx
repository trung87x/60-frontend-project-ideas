import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Blog Website — Level 5 (React Query + CMS)</h1>
        <p>Dữ liệu lấy từ Sanity (nếu cấu hình .env) hoặc fallback sang <code>public/posts.json</code>.</p>
        <p style={{marginTop: 12}}><Link className="button" to="/posts">Xem danh sách bài viết</Link></p>
      </section>
      <section id="about" style={{ marginTop: 24 }}>
        <h2>Giới thiệu</h2>
        <p>Tôi là <strong>trung87</strong>, yêu thích React, Tailwind và hệ sinh thái học tập sáng tạo.</p>
      </section>
      <section id="contact" style={{ marginTop: 24 }}>
        <h2>Liên hệ</h2>
        <p>Email: contact@trung87.link</p>
      </section>
    </main>
  )
}
