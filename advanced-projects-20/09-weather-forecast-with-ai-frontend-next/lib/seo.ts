export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Weather Forecast with AI', template: '%s — Weather Forecast with AI' },
  description: 'Weather Forecast with AI — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'Weather Forecast with AI', description: 'Weather Forecast with AI frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}