# Quote Generator — Level 6 (Next.js + Vercel)

## ⚙️ Chạy local
```bash
npm i
npm run dev
```
→ http://localhost:3000

## 🧱 Cấu trúc
- `pages/index.js` — Quote ngẫu nhiên, SEO meta.
- `pages/categories/[slug].js` — Lọc quote theo chủ đề.
- `data/quotes.json` — dữ liệu tĩnh (build-time).
- `vercel.json` — cấu hình deploy nhanh.

## 🚀 Triển khai Vercel
```bash
npm run build
vercel --prod
```

## 💡 Tính năng
- `getStaticProps` + `getStaticPaths` tạo trang tĩnh SEO-ready.
- Dynamic route `/categories/[slug]`.
- Mỗi quote có `category` để lọc.
