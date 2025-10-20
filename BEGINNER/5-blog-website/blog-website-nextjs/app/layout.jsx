import './globals.css'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Level 6 — Blog (Next.js + SEO + Vercel)',
  description: 'Blog cá nhân với Next.js App Router, SEO chuẩn, sẵn sàng deploy Vercel',
  openGraph: {
    title: 'Level 6 — Blog (Next.js)',
    description: 'SSR/ISR, sitemap, OpenGraph, dynamic routes',
    type: 'website',
    url: '/',
    images: ['/opengraph-image.png'],
  },
  alternates: { canonical: '/' }
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <header className="header">
          <div className="header-inner container">
            <a href="/" style={{ textDecoration: 'none' }}><strong>📝 Blog Next.js (Level 6)</strong></a>
            <nav className="nav">
              <a href="/">Trang chủ</a>
              <a href="/posts">Bài viết</a>
              <a href="/#about">Giới thiệu</a>
              <a href="/#contact">Liên hệ</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="inner container">© 2025 trung87.link — Level 6 (Next.js + SEO + Vercel)</div>
        </footer>
      </body>
    </html>
  )
}
