# 🃏 Card Memory Game — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn xây dựng **game lật thẻ ghi nhớ** từ HTML tĩnh đến React/Next.js chuyên nghiệp, có thời gian, điểm số, và lưu tiến trình.

---

## 🎯 Mục tiêu tổng quát

- Hiểu cơ chế **matching pair** (so khớp cặp), logic lật/khóa thẻ.
- Tổ chức dữ liệu, shuffle (Fisher–Yates), và quản lý trạng thái game.
- Thiết kế UI/animation mượt với Tailwind, tối ưu trải nghiệm.
- Triển khai thực tế bằng **Next.js + Vercel**.

---

## 🧩 6 Cấp Độ Card Memory Game

| Cấp độ                               | Công nghệ / Mục tiêu chính | Mô tả                                                                                               |
| :----------------------------------- | :------------------------- | :-------------------------------------------------------------------------------------------------- |
| **1. HTML + CSS cơ bản**             | Grid tĩnh                  | Tạo lưới thẻ (ví dụ 4x4) với mặt trước/sau. Chưa có tương tác, chỉ layout & typography.             |
| **2. JavaScript cơ bản**             | DOM + Event                | Thêm click lật thẻ. Giữ 2 thẻ mở để so khớp. Nếu khớp → khóa; sai → lật lại sau 1s.                 |
| **3. TailwindCSS**                   | UI & Animation             | Dùng **TailwindCSS** + `transform/transition` để lật 3D (`rotateY`). Trạng thái matched/disabled.   |
| **4. React**                         | Component-based UI         | Tách `GameBoard`, `Card`, `ScorePanel`. State: `cards`, `first`, `second`, `moves`, `matches`.      |
| **5. React + Hook nâng cao**         | Timer/Score/Storage        | Tạo hook `useMemoryGame()` quản lý **shuffle**, **timer**, **moves**, **bestScore** (LocalStorage). |
| **6. Next.js + Vercel (Production)** | SEO & Deploy               | Đóng gói game trong Next.js, thêm metadata, favicon, deploy lên **Vercel**.                         |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Hiểu event & state tối thiểu cho cơ chế lật/so khớp.
2. **Cấp 3:** Làm UI/animation mượt bằng Tailwind utility.
3. **Cấp 4:** Tổ chức component React rõ ràng, tránh re-render thừa.
4. **Cấp 5:** Viết **custom hook** quản lý toàn bộ logic game & lưu tiến trình.
5. **Cấp 6:** Triển khai thực tế với **Next.js**.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ                   | Chủ đề mở rộng    | Mục tiêu                                  |
| :----------------------- | :---------------- | :---------------------------------------- |
| **7. Difficulty Levels** | 4x4 / 6x6 / 8x8   | Tùy chọn độ khó, thay đổi bộ thẻ động.    |
| **8. Theming**           | Tailwind Themes   | Chủ đề tối/sáng, bộ icon/emoji khác nhau. |
| **9. Leaderboard**       | Storage / Backend | Lưu bảng xếp hạng cục bộ hoặc qua API.    |
| **10. PWA Mode**         | Service Worker    | Chơi offline, thêm vào Home Screen.       |

---

## 💡 Gợi ý triển khai nhanh

- **Dữ liệu thẻ:** mảng icon/emoji → nhân đôi → gán `id` → shuffle Fisher–Yates.
- **Hook:** `useMemoryGame()` → `{ cards, flip(id), moves, time, matches, reset() }`.
- **Animation:** thẻ lật dùng container 3D (`perspective`, `preserve-3d`).
- **Âm thanh:** phát hiệu ứng khi khớp/hoàn thành.
- **A11y:** hỗ trợ điều hướng bàn phím (Enter/Space để lật).

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Card Memory Game**, bạn sẽ:

- Thành thạo **logic trò chơi**, **React Hooks**, và **Tailwind animation**.
- Biết lưu tiến trình, tối ưu hiệu năng và UX.
- Tự tin triển khai game lên **Vercel** với **Next.js**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
