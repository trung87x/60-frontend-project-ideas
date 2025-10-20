# ✨ Quote Generator — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn xây dựng **trình tạo câu trích dẫn (Random Quote Generator)** từ căn bản đến chuyên nghiệp, có API, cache và triển khai thực tế.

---

## 🎯 Mục tiêu tổng quát

- Hiểu cách **random dữ liệu**, xử lý **state** và **event**.
- Làm quen với **fetch API**, **TanStack Query** (caching/loading/error).
- Thiết kế UI đẹp, responsive với **TailwindCSS**.
- Triển khai thực tế bằng **Next.js + Vercel**, tối ưu SEO.

---

## 🧩 6 Cấp Độ Quote Generator

| Cấp độ                               | Công nghệ / Mục tiêu chính | Mô tả                                                                                                                             |
| :----------------------------------- | :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| **1. HTML + CSS cơ bản**             | Giao diện tĩnh             | Giao diện với khung quote, tác giả, nút **New Quote** và **Copy**. Chưa có JavaScript.                                            |
| **2. JavaScript cơ bản**             | DOM + Event                | Tạo mảng `quotes[]` cục bộ. Bấm **New Quote** chọn ngẫu nhiên, cập nhật DOM. Thêm **Copy to Clipboard** & **Tweet**.              |
| **3. TailwindCSS**                   | UI hiện đại                | Dùng **TailwindCSS** tạo card quote, typography đẹp, responsive, dark mode.                                                       |
| **4. React**                         | Component-based UI         | Tách `QuoteCard`, `Actions`. Quản lý state `currentQuote`, tạo hook `useRandomQuote(quotes)`.                                     |
| **5. React + API (TanStack Query)**  | Data động từ API/CMS       | Dùng **TanStack Query** fetch quote từ API (hoặc CMS như Sanity). Có **loading**, **error**, **refetch**. Hỗ trợ category/filter. |
| **6. Next.js + Vercel (Production)** | SEO, Routing, Deploy       | Trang `/` hiển thị quote; trang `/categories/[slug]` filter theo chủ đề. Tối ưu SEO (OpenGraph), build & **deploy Vercel**.       |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Random & thao tác DOM, clipboard, chia sẻ mạng xã hội.
2. **Cấp 3:** Thiết kế card quote đẹp, dark mode, responsive với Tailwind.
3. **Cấp 4:** Tổ chức component, custom hook trong React.
4. **Cấp 5:** Data fetching hiện đại với **TanStack Query** + API/CMS.
5. **Cấp 6:** Triển khai production trên **Vercel**, tối ưu SEO & routing.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ                     | Chủ đề mở rộng         | Mục tiêu                                                       |
| :------------------------- | :--------------------- | :------------------------------------------------------------- |
| **7. Favorites & History** | LocalStorage/IndexedDB | Lưu quote yêu thích, xem lịch sử và thống kê.                  |
| **8. Categories & Search** | React + Query param    | Lọc theo chủ đề (life, work, love), tìm kiếm theo tác giả.     |
| **9. CMS Mode**            | Next.js + Sanity       | Quản lý bộ sưu tập quote, tác giả, tag; preview draft.         |
| **10. PWA + Offline**      | Service Worker         | Sử dụng offline, thêm vào màn hình chính (Add to Home Screen). |

---

## 💡 Gợi ý triển khai nhanh

- **API gợi ý:** tự tạo file `quotes.json` (mẫu nhỏ), sau đó chuyển sang API/cms khi lên cấp 5–6.
- **Hook ví dụ:** `useRandomQuote(list) → {quote, next(), copy(), tweetUrl}`.
- **UI/UX:** animation nhẹ khi đổi quote (opacity/translate), skeleton khi loading.

---

## ✨ Kết luận

Lộ trình **Quote Generator** giúp bạn luyện cả **UI, state, fetch, cache, SEO** theo dạng bài tập nhỏ nhưng hữu ích.  
Hoàn thành 6 cấp, bạn có thể mở rộng thành **ứng dụng sưu tầm trích dẫn** chuyên nghiệp.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
