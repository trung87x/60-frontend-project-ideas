# Level 5 — React + TanStack Query + API (Optimistic Update)

**Mục tiêu:** Chuyển dữ liệu sang API, dùng `@tanstack/react-query` để fetch/cache và **optimistic updates** cho UX mượt.

## Cài đặt & chạy

```bash
npm i -D @vitejs/plugin-react
npm run api      # chạy mock API bằng json-server tại http://localhost:3000
# mở tab khác
npm run dev      # chạy Vite (http://localhost:5173)
```

> Mặc định `VITE_API_BASE_URL=http://localhost:3000`. Bạn có thể sửa trong `.env`.

## ENV

Tạo file `.env` từ `.env.example`:

```
VITE_API_BASE_URL=http://localhost:3000
```

## API mock (json-server)

- Endpoint: `GET/POST /todos`, `PATCH/DELETE /todos/:id`
- Sort mặc định theo `createdAt desc` trong client.

## Tính năng

- Load todos từ API (loading/error states).
- **Optimistic update** cho Add / Toggle / Edit title / Delete (rollback khi lỗi).
- Tính đếm tổng/đang làm/hoàn thành.
- Cấu trúc tách lớp: `services/` (API), `hooks/` (react-query), `components/` (UI).

## Cấu trúc

```
src/
├─ components/
│  ├─ TodoForm.jsx
│  ├─ TodoItem.jsx
│  └─ TodoList.jsx
├─ hooks/
│  └─ useTodosQuery.js
├─ services/
│  └─ todos.api.js
├─ lib/ (để mở rộng sau, ví dụ helpers/types)
├─ App.jsx
├─ main.jsx
└─ styles.css
```
