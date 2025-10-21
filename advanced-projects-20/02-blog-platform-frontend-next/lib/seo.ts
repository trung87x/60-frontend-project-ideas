export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Blog Platform (Next.js)', template: '%s — Blog Platform (Next.js)' },
  description: 'Blog Platform (Next.js) — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Blog Platform (Next.js)', description: 'Blog Platform (Next.js) frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}