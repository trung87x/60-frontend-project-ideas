# Quote Generator — Level 4 (React + Vite)

## Cài & chạy
```bash
npm i
npm run dev
# build
npm run build && npm run preview
```

## Cấu trúc
- `src/App.jsx` — app chính
- `src/components/QuoteCard.jsx`, `src/components/Actions.jsx`
- `src/hooks/useRandomQuote.js`
- `src/data/quotes.js`
- `src/main.jsx`, `index.html`, `vite.config.js`

## Ghi chú
- UI giữ nguyên phong cách các cấp trước (CSS thuần).
- Phím tắt: Space = new quote; `Copy` dùng Clipboard API (fallback auto).
- Sẵn sàng nâng cấp Level 5 (TanStack Query) & Level 6 (Next.js).
