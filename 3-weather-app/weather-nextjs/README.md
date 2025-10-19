# Weather App — Level 6 (Next.js + SSR/ISR + PWA)

## Tính năng
- **Next.js App Router** (server components)
- Trang `/` (city mặc định) và `/city/[slug]` (city động)
- **SSR + ISR**: `fetch(..., { next: { revalidate: 600 } })` → cache 10 phút
- **PWA cơ bản**: `manifest.webmanifest` + `sw.js` (cache static, SWR cho OpenWeather)
- Không lộ API key: dùng biến môi trường **server-side**

## Chạy local
```bash
npm i
cp .env.example .env.local
# sửa .env.local: OPENWEATHER_API_KEY=...
npm run dev
```

Mặc định:
- `DEFAULT_CITY=Ho Chi Minh`
- `DEFAULT_UNITS=metric`

## Deploy Vercel
- Import repo → add **Environment Variable** `OPENWEATHER_API_KEY`
- Build Command: `npm run build` (mặc định của Next)
- ISR hoạt động mặc định (revalidate 600s)

## Ghi chú
- Đổi đơn vị bằng query `?units=metric|imperial` và `UnitToggle` sẽ cập nhật URL.
- `sw.js` chỉ là demo, có thể thay bằng `next-pwa` nếu cần tính năng PWA nâng cao.
