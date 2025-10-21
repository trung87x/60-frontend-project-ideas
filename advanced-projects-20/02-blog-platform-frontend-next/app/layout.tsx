import './globals.css'
import Navbar from '@/components/Navbar'
import { defaultMetadata } from '@/lib/seo'

export const metadata = defaultMetadata as any

export default function RootLayout({children}:{children: React.ReactNode}){
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <Navbar/>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  )
}