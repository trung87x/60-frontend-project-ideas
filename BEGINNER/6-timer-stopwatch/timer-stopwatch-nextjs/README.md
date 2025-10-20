# Level 6 — Timer & Stopwatch (Next.js + Vercel)

**JS version (App Router).** Tích hợp Tailwind, SEO (metadata, sitemap, robots), Dashboard nhiều bộ đếm.

## Chạy local
```bash
npm i
npm run dev
```
Mặc định: http://localhost:3000

## Cấu trúc
- `app/` — App Router
  - `layout.js`, `page.js` (client), `globals.css`
  - `sitemap.js`, `robots.js`
- `components/` — `Dashboard.js`, `StopwatchCard.js`, `TimerCard.js`
- `lib/hooks/` — `useStopwatch.js`, `useTimer.js`
- `public/opengraph-image.png`
- `tailwind.config.js`, `postcss.config.js`, `next.config.mjs`, `package.json`

## Deploy Vercel
1. Push repo lên GitHub
2. Import vào **Vercel**
3. Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
4. Deploy là xong.

## Nâng cấp gợi ý
- Lap list cho Stopwatch (như Level 5)
- Lưu cấu hình timers vào `localStorage`
- PWA (Level 9 mở rộng)
