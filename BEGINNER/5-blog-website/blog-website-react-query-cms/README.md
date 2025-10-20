# Level 5 — Blog Website (React + Vite + TanStack Query + CMS)

**Mục tiêu**: Dùng React Query để fetch/caching dữ liệu. Ưu tiên lấy từ **Sanity CMS** nếu có cấu hình `.env`, fallback sang **public/posts.json**.

## Cách chạy
```bash
npm i
npm run dev
```
Mặc định: http://localhost:5173

## Kết nối Sanity (tùy chọn)
1. Sao chép `.env.example` → `.env.local`
2. Điền:
```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-01-01
```
3. Khởi động lại dev server. Ứng dụng sẽ tự fetch từ Sanity bằng GROQ, nếu thất bại sẽ báo lỗi; nếu không có biến môi trường sẽ dùng `public/posts.json`.

## Cấu trúc
- `public/posts.json` — dữ liệu mock
- `src/lib/api.js` — logic fetch Sanity/JSON
- `src/pages/*` — `Home`, `Posts`, `PostDetail` (React Query)
- `src/components/*` — `Header`, `Footer`, `PostCard`, `Loader`
- `src/App.jsx`, `src/main.jsx`, `src/index.css`
- `.env.example`, `vite.config.js`, `package.json`

## Nâng cấp tiếp theo
- **Level 6**: Next.js + SEO + Deploy Vercel, ISR, sitemap, OpenGraph.
