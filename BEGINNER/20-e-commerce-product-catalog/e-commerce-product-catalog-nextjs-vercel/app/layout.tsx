export const metadata = { title: 'Catalog — Level 6', description: 'Next.js Product Catalog' }
export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (
    <html lang="vi">
      <body style={{minHeight:'100dvh',background:'linear-gradient(135deg,#0b1020,#1b1630)',color:'#e5e7eb',padding:24}}>{children}</body>
    </html>
  )
}
