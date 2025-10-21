export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'AI Chatbot Interface', template: '%s — AI Chatbot Interface' },
  description: 'AI Chatbot Interface — Next.js Frontend using external Backend API.',
  openGraph: { type: 'website', title: 'AI Chatbot Interface', description: 'AI Chatbot Interface frontend', url: '/' },
  robots: { index: true, follow: true },
  twitter: { card: 'summary_large_image' },
}