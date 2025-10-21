export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: '3D Graphics Playground', template: '%s — 3D Graphics Playground' },
  description: '3D Graphics Playground — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: '3D Graphics Playground', description: '3D Graphics Playground frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}