export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Project Management Tool', template: '%s — Project Management Tool' },
  description: 'Project Management Tool — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Project Management Tool', description: 'Project Management Tool frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}