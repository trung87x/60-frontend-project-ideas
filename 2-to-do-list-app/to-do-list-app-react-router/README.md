# Level 4 — React + React Router (Filter by URL)

**Mục tiêu:** Đồng bộ bộ lọc với URL bằng React Router.  
Các route: `/` (Tất cả), `/active`, `/completed`.

## Chạy dự án

```bash
npm i -D @vitejs/plugin-react
npm run dev
```

Mở URL in ra bởi Vite (mặc định: http://localhost:5173).

## Tính năng

- Thêm / sửa inline / xoá / toggle hoàn thành.
- Bộ lọc theo **route** (back/forward không mất trạng thái).
- Persist **localStorage** cho danh sách todos.
- Tách `routes/` (All, Active, Completed) và `hooks/useTodos`.

## Cấu trúc

```
src/
├─ components/
│  ├─ TodoForm.jsx
│  ├─ TodoItem.jsx
│  └─ TodoList.jsx
├─ routes/
│  ├─ All.jsx
│  ├─ Active.jsx
│  └─ Completed.jsx
├─ hooks/
│  └─ useTodos.js
├─ App.jsx
├─ main.jsx
└─ styles.css
```
