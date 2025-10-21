export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Stock Trading Platform', template: '%s — Stock Trading Platform' },
  description: 'Stock Trading Platform — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Stock Trading Platform', description: 'Stock Trading Platform frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}