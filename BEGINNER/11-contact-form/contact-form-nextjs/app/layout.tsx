export const metadata = {
  title: 'Contact Form — Next.js (Cấp 6)',
  description: 'Form liên hệ với API route mock'
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{fontFamily:'system-ui'}}>{children}</body>
    </html>
  )
}
