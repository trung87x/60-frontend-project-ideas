import './globals.css'
import Navbar from '@/components/Navbar'
import { defaultMetadata } from '@/lib/seo'

export const metadata = defaultMetadata as any

export default function RootLayout({children}:{children: React.ReactNode}){
  return (
    <html lang="vi">
      <body>
        <Navbar/>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  )
}