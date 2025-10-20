import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: { default: "Portfolio • Next.js", template: "%s • Portfolio" },
  description:
    "Portfolio dùng Next.js + Tailwind + ISR + SEO tốt, sẵn sàng triển khai Vercel.",
  openGraph: {
    title: "Portfolio • Next.js",
    description: "Next.js + Tailwind + ISR + SEO • Deploy Vercel",
    type: "website",
    locale: "vi_VN",
  },
  twitter: { card: "summary_large_image", creator: "@your_handle" },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
