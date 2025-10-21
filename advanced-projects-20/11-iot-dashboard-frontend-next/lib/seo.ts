export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'IoT Dashboard', template: '%s — IoT Dashboard' },
  description: 'IoT Dashboard — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'IoT Dashboard', description: 'IoT Dashboard frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}