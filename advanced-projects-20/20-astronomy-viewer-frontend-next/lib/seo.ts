export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Astronomy Viewer', template: '%s — Astronomy Viewer' },
  description: 'Astronomy Viewer — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Astronomy Viewer', description: 'Astronomy Viewer frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}