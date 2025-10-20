# Level 2 — Calculator (Tailwind + Dark Mode + A11y)

## Mục tiêu
- Giao diện hiện đại bằng **Tailwind (CDN, không cần build)**.
- **Dark Mode** với toggle, ghi nhớ `localStorage`, tôn trọng `prefers-color-scheme`.
- **A11y**: Focus ring, role/aria, live region thông báo kết quả, hỗ trợ bàn phím đầy đủ.
- Giữ **logic immediate execution** như Level 1.

## Cấu trúc
```
calculator-level-2-tailwind/
├─ index.html
├─ script.js
└─ theme.js
```

## Chạy
Mở trực tiếp `index.html` trong trình duyệt (cần mạng để tải CDN Tailwind).

## Kiểm thử nhanh
- `12 + 3 =` → `15`
- `2 + 3 * 4 =` → `20` (immediate)
- `5 / 0` → `Error`
- Tab navigation qua toàn bộ nút, có focus ring. Toggle Dark/Light hoạt động và nhớ trạng thái.
