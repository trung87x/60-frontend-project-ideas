export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Blockchain Explorer', template: '%s — Blockchain Explorer' },
  description: 'Blockchain Explorer — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Blockchain Explorer', description: 'Blockchain Explorer frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}