# Level 1 — Calculator (HTML + CSS + JS cơ bản)

## Mục tiêu
- Bàn phím lưới 4 cột, hiển thị 2 dòng (biểu thức + kết quả).
- Chế độ **immediate execution** (bấm toán tử để tính dần).
- Hỗ trợ bàn phím: `0-9 . + - * / Enter Backspace Escape`. Có `±`, `C`, `⌫`.
- Xử lý lỗi chia cho 0 → hiện `Error`.

## Cấu trúc
```
calculator-level-1-html-css/
├─ index.html
├─ styles.css
└─ script.js
```

## Chạy
Mở trực tiếp `index.html` trong trình duyệt (không cần server).

## Kiểm thử nhanh
- `12 + 3 =` → `15`
- `2 + 3 * 4 =` → `20` (do chế độ immediate: (2+3)=5; 5*4=20)
- `5 / 0` → `Error`
- `±` đổi dấu số hiện tại; `⌫` xóa 1 ký tự; `C` xóa tất cả.
