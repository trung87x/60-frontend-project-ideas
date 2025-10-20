# Level 5 — Timer & Stopwatch (React Hooks + Context)

**Mục tiêu**: Trích logic ra custom hooks (`useStopwatch`, `useTimer`) và quản lý nhiều bộ đếm bằng **Context API**.

## Cách chạy
```bash
npm i
npm run dev
```
Mặc định: http://localhost:5173

## Cấu trúc
- `src/hooks/useStopwatch.js`, `src/hooks/useTimer.js`
- `src/context/TimersContext.jsx` — lưu danh sách Stopwatches/Timers, thêm/xoá
- `src/components/StopwatchCard.jsx`, `src/components/TimerCard.jsx`, `src/components/Dashboard.jsx`
- `src/App.jsx`, `src/main.jsx`, `src/index.css`

## Ghi chú
- `useStopwatch` dùng rAF + `Date.now()` để hiển thị mượt và chính xác.
- `useTimer` tính toán dựa vào `endAt = Date.now() + base` để chống trôi thời gian (drift-correct).
- Có thể mở rộng lưu cấu hình vào `localStorage` (Level 7: Dashboard nâng cao).
