# ⏳ Countdown Timer — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn học cách xây dựng **đồng hồ đếm ngược (Countdown Timer)** từ HTML tĩnh đến ứng dụng React/Next.js chuyên nghiệp, có tùy chọn thời gian, âm thanh và thông báo.

---

## 🎯 Mục tiêu tổng quát

- Hiểu cơ chế **đếm ngược thời gian (time difference, Date API)**.
- Làm quen với **event, state, useEffect**, và cập nhật thời gian thực.
- Thiết kế UI hiện đại bằng **TailwindCSS**.
- Triển khai app thật bằng **Next.js + Vercel**.

---

## 🧩 6 Cấp Độ Countdown Timer

| Cấp độ                               | Công nghệ / Mục tiêu chính | Mô tả                                                                                            |
| :----------------------------------- | :------------------------- | :----------------------------------------------------------------------------------------------- |
| **1. HTML + CSS cơ bản**             | Giao diện tĩnh             | Tạo giao diện gồm input chọn thời gian và hiển thị đồng hồ đếm ngược. Chưa có logic JS.          |
| **2. JavaScript cơ bản**             | DOM + Date API             | Dùng `setInterval` tính chênh lệch giữa `targetDate` và `now`. Cập nhật DOM theo giây.           |
| **3. TailwindCSS**                   | UI hiện đại, responsive    | Thiết kế card đồng hồ, thêm hiệu ứng số, màu sắc cảnh báo khi gần hết giờ.                       |
| **4. React**                         | Component-based UI         | Tách component `TimerDisplay`, `TimeInput`, `Controls`. Dùng state & effect để chạy timer.       |
| **5. React + Hook nâng cao**         | Custom Hook + LocalStorage | Tạo hook `useCountdown(targetDate)`. Lưu thời gian vào LocalStorage để reload không mất dữ liệu. |
| **6. Next.js + Vercel (Production)** | SEO & Deploy               | Build ứng dụng Countdown hoàn chỉnh với **Next.js**, thêm meta SEO, deploy lên **Vercel**.       |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Thành thạo thao tác thời gian và interval cơ bản.
2. **Cấp 3:** Biết cách làm UI đẹp, sinh động bằng Tailwind.
3. **Cấp 4:** Thành thạo React state/effect và tách component.
4. **Cấp 5:** Biết viết **custom hook**, lưu trạng thái vào LocalStorage.
5. **Cấp 6:** Biết deploy ứng dụng thật lên **Vercel**, tối ưu SEO.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ                           | Chủ đề mở rộng      | Mục tiêu                                                               |
| :------------------------------- | :------------------ | :--------------------------------------------------------------------- |
| **7. Event Countdown**           | React + API         | Cho phép nhập mốc sự kiện (Noel, Tết, sinh nhật) và đếm ngược tự động. |
| **8. Multi Countdown Dashboard** | React Context       | Quản lý nhiều bộ đếm cùng lúc, lưu dữ liệu vào LocalStorage.           |
| **9. Notification & Sound**      | Browser API         | Phát âm thanh hoặc gửi thông báo khi hết giờ.                          |
| **10. PWA Countdown**            | Progressive Web App | Cài đặt lên điện thoại, chạy offline, thêm vào Home Screen.            |

---

## 💡 Gợi ý triển khai nhanh

- **Hook mẫu:** `useCountdown(targetDate)` → `{days, hours, minutes, seconds, isExpired}`.
- **UI:** sử dụng `grid` + `gap-4` cho 4 khối thời gian.
- **Âm thanh:** thêm `audio.play()` khi hết giờ.
- **SEO:** thêm meta description, title, và favicon khi deploy.

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Countdown Timer**, bạn sẽ:

- Làm chủ **Date API**, **React Hooks**, và **Tailwind**.
- Hiểu cách tổ chức logic thời gian và UI động.
- Có thể triển khai ứng dụng đếm ngược thật trên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
