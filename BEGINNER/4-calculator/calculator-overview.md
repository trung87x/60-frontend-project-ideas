# 🧮 Calculator App — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án mẫu giúp bạn học và áp dụng các công nghệ từ **HTML tĩnh → React động → Next.js production**, từng bước xây dựng **ứng dụng máy tính đa năng**.

---

## 🎯 Mục tiêu tổng quát

- Hiểu rõ sự tiến hóa từ **máy tính 4 phép tính cơ bản → ứng dụng tính toán đa chế độ** (khoa học, chuyển đổi tiền tệ, thuế, tip).  
- Làm quen với các thư viện thực tế: **TailwindCSS**, **React**, **TanStack Query**, **Vercel**.  
- Biết cách tổ chức code theo **cấp độ dự án**, tách phần giao diện, logic và dữ liệu.  
- Tự tin triển khai **Calculator thực tế** như một **ứng dụng production nhỏ gọn**.

---

## 🧩 6 Cấp Độ Calculator

| Cấp độ                                  | Công nghệ / Mục tiêu chính      | Mô tả                                                                                                                                                   |
| --------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. HTML + CSS cơ bản**                | HTML & CSS thuần                | Tạo máy tính 4 phép tính (`+ - × ÷`) với **giao diện bàn phím grid**. Hỗ trợ nhập số, dấu thập phân, `C`, `←`, `=`.                                    |
| **2. TailwindCSS / Dark Mode**          | TailwindCSS + CSS variables     | Thiết kế giao diện đẹp, responsive, có **dark mode toggle** và **a11y tốt** (tab navigation, aria).                                                    |
| **3. React (Component + Reducer)**      | React + useReducer              | Chuyển toàn bộ UI sang React. Tách component `Display`, `Keypad`, `History`. Quản lý logic tính toán bằng **Reducer pattern**.                         |
| **4. React + API (Converter Pack)**     | Fetch API / Hooks               | Thêm **Currency Converter**, **VAT/Discount/Tip Calculator**. Dùng fetch tỉ giá thật (hoặc JSON tĩnh). Có **loading/error state**.                     |
| **5. React + TanStack Query (Cache)**   | TanStack Query / Persist Cache  | Sử dụng **useQuery** để fetch và cache dữ liệu tỉ giá. Hỗ trợ **offline** và **retry khi online lại**. Có hiển thị “Last updated”.                     |
| **6. Next.js + Vercel (Production)**    | SSR, SEO & Deploy thực tế       | Build Calculator với **Next.js App Router**, có route API `/api/rates`, chia sẻ trạng thái qua URL, tối ưu SEO và deploy lên **Vercel**.               |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Làm chủ layout **Grid/Flex** và theme (light/dark).  
2. **Cấp 3:** Hiểu sâu **state management** trong React qua `useReducer`.  
3. **Cấp 4:** Biết fetch dữ liệu từ **API thực** và tách lớp `services/hooks`.  
4. **Cấp 5:** Nắm kỹ kỹ thuật **data fetching hiện đại (TanStack Query)**.  
5. **Cấp 6:** Biết **triển khai thực tế**, tối ưu hiệu năng & SEO trên Vercel.

---

## 🚀 Hướng phát triển tiếp theo

Nếu bạn đã hoàn tất 6 cấp độ trên, có thể tiếp tục với:

| Cấp độ                           | Chủ đề mở rộng                | Mục tiêu                                             |
| -------------------------------- | ----------------------------- | ---------------------------------------------------- |
| **7. Scientific Calculator**     | React + Math.js               | Thêm các hàm `sin`, `cos`, `tan`, `log`, `√`, `π`.  |
| **8. Programmer Mode**           | Bitwise / Hex / Bin           | Chuyển đổi và thao tác số hệ 2, 10, 16.             |
| **9. History Persistence**       | IndexedDB / LocalForage       | Lưu lịch sử phép tính giữa các phiên.               |
| **10. Calculator PWA**           | Service Worker + Manifest     | Biến app thành **ứng dụng offline** có thể cài đặt. |

---

## ✨ Kết luận

Lộ trình 6 cấp độ **Calculator App** giúp bạn:

- Từ **người mới** thành **người hiểu toàn bộ vòng đời ứng dụng front-end**.  
- Biết cách tách logic, caching, API, và **triển khai app thật** trên web.  
- Sẵn sàng nâng cấp thành **ứng dụng khoa học hoặc tài chính mini**.

---

📌 _Tác giả: trung87.link — Hệ thống học React & Tailwind toàn diện._
