# Level 6 — Blog Website (Next.js + SEO + Vercel)

**Mục tiêu**: App Router, SSR/ISR nhẹ, SEO hoàn chỉnh (metadata, OpenGraph, sitemap, robots), dễ deploy Vercel.

## Chạy local
```bash
npm i
npm run dev
```
Mặc định: http://localhost:3000

## Cấu trúc
- `app/` — App Router
  - `page.jsx` — Trang chủ
  - `posts/page.jsx` — Danh sách bài viết
  - `post/[slug]/page.jsx` — Chi tiết bài viết (generateStaticParams)
  - `sitemap.js`, `robots.js` — SEO
  - `layout.jsx`, `globals.css`
- `lib/posts.js` — Đọc dữ liệu từ `data/posts.json`
- `data/posts.json` — Dữ liệu mẫu
- `public/opengraph-image.png` — Ảnh OG placeholder
- `next.config.mjs`, `package.json`

## Deploy Vercel
1. Push repo lên GitHub
2. Import vào **Vercel**
3. Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
4. Deploy — sitemap/robots tự dùng đúng URL.

## Nâng cấp sau
- Kết nối CMS (Sanity) → ISR + webhook revalidate
- Thêm `generateImageMetadata` cho OG động
