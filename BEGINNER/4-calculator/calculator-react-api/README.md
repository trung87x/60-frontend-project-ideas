# Level 4 — React + API (Currency & VAT)

## Tính năng

- Tab **Calculator / Currency / VAT**.
- Currency: gọi API `exchangerate.host` (không cần key), debounce 300ms, retry.
- VAT/Discount/Tip: preset % + custom.
- Giữ reducer từ Level 3 (đã thu gọn file).

## Cấu trúc

```
calculator-level-4-react-api/
├─ index.html
├─ package.json
├─ vite.config.js
├─ .env.example
└─ src/...
```

## Chạy

```bash
cp .env.example .env # tùy chọn
npm i -D @vitejs/plugin-react
npm run dev
# mở http://localhost:5174
```

## Notes

- Nếu bị chặn CORS (hiếm): thay `VITE_EXCHANGE_API_BASE` bằng proxy của bạn.
- API trả `rates` theo base; component tính `amount * rate[to]`.
