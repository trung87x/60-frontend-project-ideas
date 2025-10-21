export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Real-Estate Listing App', template: '%s — Real-Estate Listing App' },
  description: 'Real-Estate Listing App — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Real-Estate Listing App', description: 'Real-Estate Listing App frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}