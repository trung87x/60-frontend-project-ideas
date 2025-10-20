export const metadata = {
  title: 'Countdown — Next.js (Cấp 6)',
  description: 'Đồng hồ đếm ngược bằng Next.js, deploy Vercel'
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{fontFamily:'system-ui'}}>{children}</body>
    </html>
  )
}
