export default function Page() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Blog Website — Level 6 (Next.js)</h1>
        <p>SSR/ISR nhẹ, SEO chuẩn: metadata, OpenGraph, sitemap, robots.</p>
        <p style={{marginTop:12}}><a className="nav" href="/posts">→ Xem danh sách bài viết</a></p>
      </section>
      <section id="about" style={{ marginTop: 24 }}>
        <h2>Giới thiệu</h2>
        <p>Tôi là <strong>trung87</strong>, yêu thích React, Next.js, Tailwind và CMS.</p>
      </section>
      <section id="contact" style={{ marginTop: 24 }}>
        <h2>Liên hệ</h2>
        <p>Email: contact@trung87.link</p>
      </section>
    </main>
  )
}
