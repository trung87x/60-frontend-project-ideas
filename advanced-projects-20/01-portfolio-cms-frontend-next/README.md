# Portfolio CMS — Next.js Frontend (External Backend API)

Bạn cung cấp **Backend API riêng** (Auth, Projects, Posts...). Frontend này:
- **SSR/ISR** cho trang public.
- **Auth** qua **JWT** do backend cấp (cookie HttpOnly).
- **SEO/UX**: metadata, OpenGraph, sitemap/robots.
- **Proxy routes** `/api/auth/*` → backend để đặt cookie bảo mật.
- **Tag-based revalidate** để webhook từ backend có thể gọi `/api/revalidate?tag=...`.

## Chạy local
```bash
npm i
cp .env.local.example .env.local
npm run dev
```
App: http://localhost:3000