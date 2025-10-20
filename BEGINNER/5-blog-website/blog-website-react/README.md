# Level 3 — Blog Website (React + Vite)

**Mục tiêu**: Tư duy component, state/props, dark mode + search (chưa có router/API).

## Cách chạy
```bash
npm i
npm run dev
```
Mở URL hiển thị trên terminal (mặc định http://localhost:5173).

## Cấu trúc
- `src/App.jsx` — giao diện chính, dark mode, tìm kiếm
- `src/components/*` — `Header`, `PostCard`, `SearchBar`, `Footer`
- `src/assets/*` — ảnh minh hoạ (placeholder)
- `src/main.jsx`, `src/index.css`
- `vite.config.js`, `package.json`

## Nâng cấp tiếp theo
- **Level 4**: Thêm `react-router-dom` & fetch `public/posts.json`.
