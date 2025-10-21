export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Financial Planning Tool', template: '%s — Financial Planning Tool' },
  description: 'Financial Planning Tool — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Financial Planning Tool', description: 'Financial Planning Tool frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}