import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weather App — Level 6 (Next.js)',
  description: 'Next.js + SSR/ISR + PWA (service worker) — Weather App',
  themeColor: '#0b1020'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0b1020" />
      </head>
      <body>
        {children}
        {/* SW register */}
        <script dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js').catch(()=>{});
            });
          }
        `}}/>
      </body>
    </html>
  )
}
