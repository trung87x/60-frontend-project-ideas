export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Social Network App', template: '%s — Social Network App' },
  description: 'Social Network App — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Social Network App', description: 'Social Network App frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}