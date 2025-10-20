# Level 3 — React + useReducer (Vite)

## Mục tiêu

- Chuyển UI sang **React**, tách component `Display`, `Keypad`, `History`.
- State chuẩn với **useReducer** (immediate execution), có **History** và **Memory (MC/MR/M+/M-)**.
- Hỗ trợ keyboard đầy đủ, hiển thị biểu thức ở dòng trên.

## Cấu trúc

```
calculator-level-3-react-vite/
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ styles.css
   ├─ main.jsx
   ├─ app/App.jsx
   ├─ components/
   │  ├─ Display.jsx
   │  ├─ Keypad.jsx
   │  └─ History.jsx
   ├─ state/calculatorReducer.js
   └─ utils/format.js
```

## Chạy dự án

```bash
npm i -D @vitejs/plugin-react
npm run dev
# mở http://localhost:5173
```

## Kiểm thử nhanh

- `12 + 3 =` → `15`
- `2 + 3 * 4 =` → `20` (immediate)
- `5 / 0` → `Error`
- Thao tác Memory: `M+`, `MR`, `MC`, `M-`.
