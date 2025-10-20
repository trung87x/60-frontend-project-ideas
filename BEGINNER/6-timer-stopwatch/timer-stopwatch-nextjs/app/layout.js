export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Level 6 — Timer & Stopwatch (Next.js + Vercel)',
  description: 'Next.js App Router + Tailwind + SEO cho Timer & Stopwatch Dashboard',
  openGraph: {
    title: 'Timer & Stopwatch — Next.js',
    description: 'App nhiều bộ đếm với hooks, SEO đầy đủ',
    type: 'website',
    url: '/',
    images: ['/opengraph-image.png'],
  },
  alternates: { canonical: '/' }
}

import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <header className="header">
          <div className="header-inner">
            <h1 className="text-xl md:text-2xl font-semibold">⏱️ Timer & Stopwatch — Level 6</h1>
            <p className="muted">Next.js 14 • Tailwind • SEO</p>
          </div>
        </header>
        {children}
        <footer className="border-t border-border/60 mt-6">
          <div className="container py-6 text-sm text-muted">© 2025 trung87.link — Level 6 (Next.js + Vercel)</div>
        </footer>
      </body>
    </html>
  )
}
