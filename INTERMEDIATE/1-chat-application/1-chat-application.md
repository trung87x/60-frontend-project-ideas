# 💬 Chat Application — Lộ Trình 6 Cấp Độ Tăng Dần

> Bản tóm lộ trình từ HTML tĩnh → React → Next.js (Production) cho dự án **💬 Chat Application**.

---

## 🎯 Mục tiêu tổng quát

- Học cách tổ chức UI, state, data cho 💬 Chat Application.  
- Làm quen với **TailwindCSS**, **React**, **TanStack Query**, **Next.js**, và triển khai **Vercel**.  
- Viết code có cấu trúc: tách **UI – Logic – Data**.

---

## 🧩 6 Cấp Độ

| Cấp độ | Công nghệ / Mục tiêu chính | Mô tả |
| :-- | :-- | :-- |
| **1. HTML + CSS** | Layout tĩnh | Khung chat: danh sách tin nhắn, input + nút Send; avatar, timestamp (tĩnh). |
| **2. JavaScript** | DOM + Event | Append tin nhắn vào list, auto-scroll, lưu tạm vào LocalStorage. |
| **3. TailwindCSS** | UI hiện đại | Bubble chat trái/phải, avatar tròn, dark mode, responsive. |
| **4. React** | State & Components | Components: ChatWindow, MessageList, MessageItem, Composer. State hàng đợi, auto-scroll. |
| **5. React + API** | Realtime (mock) / Query | Fetch hội thoại từ API/JSON; dùng TanStack Query (loading/error/caching). Mock realtime bằng setInterval/polling. |
| **6. Next.js** | API Route + Deploy | API `/api/messages` (mock), middleware chặn rỗng, SEO, deploy Vercel. |

---

## 🧠 Kết quả học được

1. Nắm layout & responsive với **HTML/Tailwind**.  
2. Quản lý **state/effect** và chia nhỏ **components** trong React.  
3. Fetch dữ liệu động bằng **TanStack Query**, xử lý **loading/error/cache**.  
4. Tối ưu **SEO** và deploy production với **Next.js + Vercel**.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ | Chủ đề mở rộng | Mô tả |
| :-- | :-- | :-- |
| **7. WebSocket / Socket.io realtime thật** |  | WebSocket / Socket.io realtime thật |
| **8. Upload** |  | Upload file/ảnh, preview và progress |
| **9. Typing** |  | Typing indicator, read receipts |
| **10. Auth** |  | Auth + room nhiều người |

---

## 💡 Gợi ý triển khai nhanh

- Schema tin nhắn: {id, userId, text, createdAt, status}
- Hook: useChat() → {messages, send(), typing}
- Auto-scroll: ref + scrollIntoView() khi thêm tin nhắn

---

📌 _Tác giả: trung87.link — Hệ thống học React & Tailwind toàn diện._
