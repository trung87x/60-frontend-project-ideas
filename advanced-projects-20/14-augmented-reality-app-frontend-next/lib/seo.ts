export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Augmented Reality App (WebAR)', template: '%s — Augmented Reality App (WebAR)' },
  description: 'Augmented Reality App (WebAR) — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Augmented Reality App (WebAR)', description: 'Augmented Reality App (WebAR) frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}