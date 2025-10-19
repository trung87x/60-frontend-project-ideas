# ✅ To-Do List App — Lộ trình 6 cấp độ (to-do-list-app-overview.md)

> Dự án luyện tập “kinh điển” nhưng làm **bài bản theo 6 cấp độ** từ HTML thuần → React → Query → Next.js (SEO + deploy).  
> Mỗi cấp độ tăng dần tính năng, cấu trúc, và tư duy kiến trúc.

---

## 🎯 Mục tiêu tổng quát

- Nắm toàn bộ vòng đời một app CRUD: **Create / Read / Update / Delete**.
- Thực hành quản lý **state**, **lưu trữ** (localStorage / API), **tối ưu render**, **UX** (keyboard, a11y).
- Tách lớp **UI / State / Data** để dễ mở rộng (filter, search, tags, due date, drag & drop).
- Sẵn sàng **deploy** bản production (Next.js + Vercel).

---

## 🧩 6 cấp độ phát triển

| Cấp                                 | Công nghệ / Chủ điểm  | Tính năng trọng tâm                                                                                                              |
| ----------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **1. HTML + CSS**                   | Thuần HTML/CSS        | Danh sách việc; form thêm việc; đánh dấu hoàn thành (fake UI); layout responsive đơn giản.                                       |
| **2. TailwindCSS**                  | UI nhanh + responsive | Nâng cấp UI (dark mode, trạng thái hover/focus), nhóm section, badge trạng thái. Không dùng JS framework.                        |
| **3. React (Vite)**                 | Component & State     | Thêm/sửa/xoá; toggle done; đếm việc; filter (All/Active/Done); lưu **localStorage**. Chia nhỏ component.                         |
| **4. React + Router**               | Routing & kiến trúc   | Tách “trang”: `/all`, `/active`, `/completed`; Search params đồng bộ filter; custom hooks (useTodos).                            |
| **5. React + API (TanStack Query)** | Data động + Caching   | Chuyển nguồn dữ liệu sang API (mock `json-server` hoặc real API); **loading/error**; **optimistic update**; retry; invalidation. |
| **6. Next.js + Vercel**             | Production + SEO      | SSR các trang danh sách; meta/OG; route động; API routes (mặc định hoặc kết nối DB sau); deploy Vercel.                          |

---

## 🧪 Bộ tính năng chi tiết theo cấp

### Cấp 1 — HTML + CSS

- **FR**: Thêm việc (ấn Enter), đánh dấu hoàn thành (chỉ đổi style), xóa (chỉ DOM).
- **A11y**: Label cho input, focus ring, phím tắt Enter để thêm.
- **Files**: `index.html`, `styles.css`, `script.js` (very light).

### Cấp 2 — TailwindCSS

- **UI**: Dark mode (class `dark`), button states, badge “Active/Done”, empty state.
- **Layout**: Container, card, list item + checkbox đẹp.
- **Build**: CDN Tailwind hoặc Vite + Tailwind.

### Cấp 3 — React (Vite)

- **State**: `useState`, **persist** vào `localStorage`.
- **Tính năng**: Add/Edit/Delete/Toggle; bộ lọc All/Active/Done; đếm còn lại.
- **Tách nhỏ**: `<TodoApp>`, `<TodoForm>`, `<TodoItem>`, `<TodoList>`, `<TodoFilters>`.
- **Hook**: `useLocalStorage(key, initial)`.

### Cấp 4 — React + React Router

- **Routing**: `/`, `/active`, `/completed` (hoặc `/?filter=active`).
- **Sync UI ↔ URL**: filter từ URL; back/forward không mất trạng thái.
- **Hook**: `useTodos()` (CRUD + persist); `useFilter()` (đọc/ghi URLSearchParams).
- **Testing (light)**: Vitest + React Testing Library cho `TodoItem`.

### Cấp 5 — React + TanStack Query

- **API**: Dùng `json-server` local **hoặc** endpoint thật (ví dụ `/api/todos`).
- **Query**: `useQuery` danh sách, `useMutation` cho add/edit/delete/toggle.
- **Optimistic Update**: UI phản hồi tức thì, rollback nếu lỗi.
- **Error UX**: toast/alert; retry; loading skeleton.
- **Env**: `.env` → `VITE_API_BASE_URL`.

### Cấp 6 — Next.js + Vercel

- **Rendering**: SSG/SSR danh sách; **SEO** (title/description/OG).
- **Routes**: `/`, `/active`, `/completed`; `app/` router hoặc `pages/`.
- **API Routes**: `/api/todos` (in-memory hoặc DB stub).
- **Deploy**: Vercel; bật Image Optimization (nếu có avatar), add headers/caching.

---
