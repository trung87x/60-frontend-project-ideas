export const metadata = {
  title: 'Recipe Finder — Next.js (Cấp 6)',
  description: 'Tìm công thức với API mock (search + filter)'
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="vi"><body style={{fontFamily:'system-ui'}}>{children}</body></html>)
}
