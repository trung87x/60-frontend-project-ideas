export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Learning Platform (LMS)', template: '%s — Learning Platform (LMS)' },
  description: 'Learning Platform (LMS) — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Learning Platform (LMS)', description: 'Learning Platform (LMS) frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}