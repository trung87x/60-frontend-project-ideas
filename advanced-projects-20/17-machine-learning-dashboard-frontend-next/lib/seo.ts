export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Machine Learning Dashboard', template: '%s — Machine Learning Dashboard' },
  description: 'Machine Learning Dashboard — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Machine Learning Dashboard', description: 'Machine Learning Dashboard frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}