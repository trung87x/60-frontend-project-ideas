# 🧭 Responsive Navbar — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn xây dựng **thanh điều hướng (Navbar) responsive** từ HTML tĩnh đến React/Next.js chuyên nghiệp: có **hamburger menu**, **dark mode**, **sticky** và **a11y chuẩn**.

---

## 🎯 Mục tiêu tổng quát

- Nắm layout header/nav cơ bản và mô hình **mobile-first**.  
- Làm chủ **toggle menu**, **sticky/scroll shadow**, và **dark mode**.  
- Áp dụng **a11y/ARIA** (keyboard, focus trap) và tối ưu UX.  
- Triển khai thực tế bằng **Next.js + Vercel**.

---

## 🧩 6 Cấp Độ Responsive Navbar

| Cấp độ | Công nghệ / Mục tiêu chính | Mô tả |
| :-- | :-- | :-- |
| **1. HTML + CSS cơ bản** | Giao diện tĩnh | Tạo cấu trúc `header > nav > ul > li > a`, logo và các link. Chỉ hiển thị dạng desktop, chưa có hamburger. |
| **2. TailwindCSS** | UI hiện đại, responsive | Dùng **TailwindCSS** với breakpoint (`sm/md/lg`) để ẩn/hiện menu theo kích thước. Thêm dark mode (class), shadow khi sticky. |
| **3. JavaScript cơ bản** | DOM + Event | Thêm nút **hamburger** (SVG). Toggle mở/đóng menu mobile, đóng khi chọn item. Thêm hiệu ứng transition cho slide/fade. |
| **4. React** | Component-based UI | Tách component `Navbar`, `Menu`, `MenuItem`, `ThemeToggle`. Quản lý state mở/đóng, focus management sau khi đóng menu. |
| **5. React + A11y nâng cao** | ARIA + Keyboard + Persist | Bổ sung ARIA roles/attributes, điều hướng bằng phím (Tab/Shift+Tab/Escape). Lưu **theme** vào LocalStorage (`useTheme`). |
| **6. Next.js + Vercel (Production)** | SEO, Layout & Deploy | Tạo layout dùng lại cho toàn site (`<Header/>`), thêm metadata mặc định, sitemap/link rel, deploy lên **Vercel**. |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Hiểu layout navbar, breakpoint và dark mode bằng Tailwind.  
2. **Cấp 3:** Xử lý toggle menu, animation mượt với CSS/JS.  
3. **Cấp 4:** Tổ chức component React rõ ràng, tránh re-render dư thừa.  
4. **Cấp 5:** Làm chủ **a11y/ARIA**, keyboard nav và lưu **theme**.  
5. **Cấp 6:** Tái sử dụng layout trong Next.js và deploy production.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ | Chủ đề mở rộng | Mục tiêu |
| :-- | :-- | :-- |
| **7. Headless UI** | @headlessui/react | Dùng components headless (Disclosure/Menu) để chuẩn a11y. |
| **8. Mega Menu** | Grid + Hover Intent | Tạo mega menu đa cột, giữ mở khi di chuột hợp lý. |
| **9. Route-aware Navbar** | Next.js usePathname | Tự động highlight tab theo route hiện tại. |
| **10. Motion Navbar** | Framer Motion | Animate mở/đóng menu, underline di chuyển theo tab. |

---

## 💡 Gợi ý triển khai nhanh

- **Sticky shadow:** thêm class khi `window.scrollY > 0`.  
- **Focus trap:** khi menu mở, giữ focus trong panel; **Escape** để đóng.  
- **Theme toggle:** `useTheme()` lưu `theme` vào LocalStorage; sync với class `dark` trên `<html>`.  
- **SSR-friendly:** kiểm tra `typeof window !== 'undefined'` trước khi đọc LocalStorage trong Next.js.

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Responsive Navbar**, bạn sẽ:

- Làm chủ **layout + responsive + dark mode** với Tailwind.  
- Viết navbar **thân thiện bàn phím** và có UX tốt.  
- Tái sử dụng trong **Next.js** và triển khai production trên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
