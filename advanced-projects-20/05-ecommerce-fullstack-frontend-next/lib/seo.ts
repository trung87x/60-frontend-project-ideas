export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'E-Commerce Fullstack', template: '%s — E-Commerce Fullstack' },
  description: 'E-Commerce Fullstack — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'E-Commerce Fullstack', description: 'E-Commerce Fullstack frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}