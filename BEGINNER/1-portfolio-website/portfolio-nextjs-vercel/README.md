# Cấp 6 — Next.js / Vercel (SEO + ISR)

App Router + Tailwind + ISR + SEO chuẩn, sẵn deploy Vercel.

## Chạy local

```bash
npm i
npm run dev
```

Mặc định: http://localhost:3000

## Biến môi trường

- `NEXT_PUBLIC_GITHUB_USER` — user GitHub để trang Projects fetch repos (mặc định `vercel`).
- `NEXT_PUBLIC_SITE_URL` — URL site (dùng cho sitemap/robots, metadataBase). Ví dụ: `https://your-site.vercel.app`.
- (Tuỳ chọn) `NEXT_PUBLIC_POSTS_API` — API blog riêng thay cho JSONPlaceholder.

## ISR

- Các trang động dùng `revalidate = 300` (5 phút). Thay đổi dễ dàng từng trang.

## SEO bật sẵn

- `metadata` trong `app/layout.jsx` (title template, description, OpenGraph, Twitter, themeColor).
- `app/sitemap.js` + `app/robots.js` sinh route động.

## Deploy Vercel

1. Push repo lên GitHub.
2. Import vào Vercel → Framework: Next.js.
3. Thêm biến môi trường nêu trên.
4. Deploy. ISR tự hoạt động sau publish.

## Cấu trúc

```
app/
  blog/, projects/, contact/
  layout.jsx, page.jsx, globals.css, robots.js, sitemap.js
components/ (Navbar, Footer, Card)
lib/data.js
public/ (favicon)
next.config.mjs, tailwind.config.js, postcss.config.js, jsconfig.json
```
