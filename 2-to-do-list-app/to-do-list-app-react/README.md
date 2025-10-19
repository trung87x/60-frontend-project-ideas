# Level 3 — React (Vite) + localStorage persist

**Mục tiêu**: Xây dựng To-Do List bằng React, chia component rõ ràng, và **lưu todos vào localStorage** để không mất khi reload.

## Chạy dự án

```bash
npm i -D @vitejs/plugin-react
npm run dev
```

Mở URL in ra bởi Vite (mặc định: http://localhost:5173).

## Tính năng

- Thêm / sửa inline / xoá / toggle hoàn thành.
- Bộ lọc: **Tất cả / Đang làm / Hoàn thành**.
- Bộ đếm: tổng / đang làm / hoàn thành.
- Persist **localStorage** cho cả `todos` và `filter`.

## Cấu trúc

```
src/
├─ components/
│  ├─ TodoForm.jsx
│  ├─ TodoItem.jsx
│  ├─ TodoList.jsx
│  ├─ TodoFilters.jsx
│  └─ Stats.jsx
├─ hooks/
│  └─ useLocalStorage.js
├─ App.jsx
├─ main.jsx
└─ styles.css
```
