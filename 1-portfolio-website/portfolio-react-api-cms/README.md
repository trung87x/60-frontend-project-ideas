# Cấp 5 — React + API/CMS (TanStack Query)

**Mục tiêu:** Data động cho portfolio. Lấy danh sách dự án từ **GitHub API** theo user; bài viết demo từ **JSONPlaceholder**.
Kiến trúc tách lớp **services/hooks** để thay bằng CMS (Sanity/Contentful/Strapi) khi cần.

## Yêu cầu

- Node 18+

## Cài đặt & chạy

```bash
npm i -D @vitejs/plugin-react
npm run dev
```

Sau đó mở URL in ra bởi Vite (mặc định: http://localhost:5173).

## Cấu hình

Tạo file `.env` từ `.env.example` rồi chỉnh:

- `VITE_GITHUB_USER` — username GitHub của bạn (để trang Projects fetch repos).
- `VITE_POSTS_API` — (tuỳ chọn) URL API bài viết của bạn thay cho JSONPlaceholder.
- `VITE_PROXY_TARGET` — (tuỳ chọn) target để dev proxy qua `/proxy/*` khi API chặn CORS.

## Nâng cấp gợi ý (gắn CMS)

- **Sanity/Contentful/Strapi**: tạo adapter mới trong `src/services/` (ví dụ `cmsSanity.js`) và thay hooks sử dụng adapter đó.
- Thêm **react-helmet-async** cho SEO meta theo route.
- Thêm form thực tế (Formspree/Web3Forms/API riêng) với validate (React Hook Form + Zod).
- Deploy Vercel/Netlify; hoặc GH Pages (set `base` trong `vite.config.js`).

## Cấu trúc

```
src/
  hooks/                # TanStack Query hooks (usePosts, useProjects)
  pages/                # Home, Projects, ProjectDetail, Blog, PostDetail, Contact
  services/             # theme context + adapters
  App.jsx, main.jsx, styles.css
tailwind.config.js, postcss.config.js, vite.config.js, index.html
```

## Lưu ý GitHub API

- Không dùng token thì rate limit thấp. Nếu cần, thêm token vào header fetch (tự bạn mở rộng).
