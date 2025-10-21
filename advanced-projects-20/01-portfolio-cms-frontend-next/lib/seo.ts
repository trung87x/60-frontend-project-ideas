export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Portfolio CMS', template: '%s — Portfolio CMS' },
  description: 'Next.js Frontend using external Backend API with SSR/ISR, Auth, and great SEO.',
  openGraph: {
    type: 'website',
    title: 'Portfolio CMS',
    description: 'Next.js Frontend using external Backend API.',
    url: '/',
  },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}