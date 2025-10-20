# Level 4 — Timer & Stopwatch (React + Vite)

**Mục tiêu**: Chuyển từ JS thuần (Level 2-3) sang **React**, tách component `Stopwatch` và `Timer`, quản lý state với hooks.

## Cách chạy
```bash
npm i
npm run dev
```
Mặc định: http://localhost:5173

## Thành phần
- `src/components/Stopwatch.jsx` — bấm giờ có Lap, cập nhật mượt bằng `requestAnimationFrame`.
- `src/components/Timer.jsx` — đếm ngược, drift-correct bằng `Date.now()`.
- `src/App.jsx`, `src/main.jsx`, `src/index.css`
- `vite.config.js`, `package.json`

## Nâng cấp tiếp theo
- **Level 5**: Trích logic ra custom hooks `useStopwatch`, `useTimer` và quản lý nhiều bộ đếm bằng Context.
