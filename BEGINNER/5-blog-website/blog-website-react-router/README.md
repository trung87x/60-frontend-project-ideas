# Level 4 — Blog Website (React + Vite + Router + JSON)

**Mục tiêu**: Routing với `react-router-dom`, dữ liệu từ `public/posts.json`, có Loading/Error.

## Cách chạy
```bash
npm i
npm run dev
```
Mặc định: http://localhost:5173

## Cấu trúc
- `public/posts.json` — dữ liệu bài viết (mock)
- `src/pages/*` — `Home`, `Posts`, `PostDetail` (dynamic route `/post/:id`)
- `src/components/*` — `Header`, `Footer`, `PostCard`, `Loader`
- `src/App.jsx`, `src/main.jsx`, `src/index.css`
- `vite.config.js`, `package.json`

## Nâng cấp tiếp theo
- **Level 5**: Thay fetch tay bằng **TanStack Query**, tích hợp CMS (Sanity/Contentful).
