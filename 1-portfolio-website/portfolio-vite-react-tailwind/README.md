# Cấp 4 — Portfolio (Vite + React + Tailwind + Router)

Kiến trúc SPA: React component-based, routing, context (dark mode), data JSON.

## Yêu cầu

- Node 18+

## Cài đặt & chạy

```bash
npm i -D @vitejs/plugin-react
npm run dev
```

Mở địa chỉ hiển thị trong terminal (mặc định: http://localhost:5173).

## Build & preview

```bash
npm run build
npm run preview
```

## Deploy GitHub Pages

1. Mở `vite.config.js` và set `base: '/<repo>/'` (ví dụ: `/portfolio-level4-vite-react-tailwind/`).
2. Commit & push, bật Pages (gh-pages từ folder `dist` hoặc dùng action).

## Cấu trúc

```
src/
  components/       # Navbar, Footer, ProjectCard
  context/          # ThemeContext (dark mode)
  pages/            # Home, About, Projects, ProjectDetail, Contact
  projects.json     # Dữ liệu dự án mẫu
  App.jsx, main.jsx, styles.css
tailwind.config.js  # Dark mode + brand colors
postcss.config.js   # Tailwind + autoprefixer
vite.config.js      # Vite config
index.html          # Entrypoint
```
