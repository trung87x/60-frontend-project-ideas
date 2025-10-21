export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Voice Assistant Interface', template: '%s — Voice Assistant Interface' },
  description: 'Voice Assistant Interface — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Voice Assistant Interface', description: 'Voice Assistant Interface frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}