# Quote Generator — Level 5 (React + TanStack Query)

## Môi trường
- React + Vite
- @tanstack/react-query để **fetch + cache** dữ liệu quote

## Chạy
```bash
npm i
npm run dev
```

## Cấu hình nguồn dữ liệu
- Mặc định dùng **local** (file `public/quotes.json`).
- Có thể chọn **quotable** hoặc **typefit** ngay trong UI.
- Hoặc set ENV:
```
# .env.local (tùy chọn)
VITE_QUOTES_SOURCE=quotable    # local | quotable | typefit
```
Lưu ý: gọi API công khai phụ thuộc mạng/CORS.

## Cấu trúc
- `src/api/quotes.js` — `fetchQuotes(source)` chuẩn hóa dữ liệu từ nhiều nguồn
- `src/hooks/useQuotes.js` — hook React Query
- `src/hooks/useRandomQuote.js` — chọn quote ngẫu nhiên, tránh trùng liên tiếp
- `src/components/QuoteCard.jsx`, `src/components/Actions.jsx`
- `public/quotes.json` — dữ liệu local

## Tính năng
- Loading skeleton, Error message
- Refetch thủ công, chọn nguồn dữ liệu
- Cache 5 phút, GC 30 phút
