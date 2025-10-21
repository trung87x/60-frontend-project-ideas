export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Expense Report Generator', template: '%s — Expense Report Generator' },
  description: 'Expense Report Generator — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Expense Report Generator', description: 'Expense Report Generator frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}