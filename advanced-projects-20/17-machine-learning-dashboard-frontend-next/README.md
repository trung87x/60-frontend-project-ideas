# Machine Learning Dashboard — Next.js Frontend (External Backend API)

- SSR/ISR (60s listing, 5' detail).
- Auth JWT (cookie HttpOnly) qua proxy `/api/auth/*`.
- SEO: metadata, OpenGraph, robots, sitemap.
- Trang mẫu: Home + `/models` + `/models/[slug]` + `/login` + `/dashboard`.

## Run
```bash
npm i
cp .env.local.example .env.local
npm run dev
```