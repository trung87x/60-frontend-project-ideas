import './globals.css'
export const metadata = {
  title: 'Responsive Navbar — Next.js (Cấp 6)',
  description: 'Navbar responsive với Next.js App Router'
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi"><body>{children}</body></html>
  )
}
