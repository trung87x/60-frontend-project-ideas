# 📩 Contact Form — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn học cách xây dựng **form liên hệ (Contact Form)** từ HTML cơ bản đến ứng dụng React/Next.js có xác thực, gửi dữ liệu thật và thông báo người dùng.

---

## 🎯 Mục tiêu tổng quát

- Nắm chắc kiến thức về **form, input, validation** và xử lý dữ liệu người dùng.  
- Làm quen với **React Hooks**, **form validation**, và **fetch API / server route**.  
- Áp dụng TailwindCSS để thiết kế form đẹp, responsive.  
- Biết cách gửi dữ liệu form lên **API thật / dịch vụ backend** (EmailJS, Formspree, Sanity API).

---

## 🧩 6 Cấp Độ Contact Form

| Cấp độ | Công nghệ / Mục tiêu chính | Mô tả |
| :-- | :-- | :-- |
| **1. HTML + CSS cơ bản** | Giao diện tĩnh | Tạo form gồm input: `name`, `email`, `message`, và nút **Send**. Chưa có logic JS. |
| **2. TailwindCSS** | UI hiện đại, responsive | Dùng **TailwindCSS** tạo giao diện card form đẹp, thêm focus state, error highlight, responsive grid. |
| **3. JavaScript cơ bản** | DOM + Validation | Dùng JS để kiểm tra form (`required`, `email format`, `minLength`). Hiển thị thông báo lỗi & reset form. |
| **4. React** | Component-based UI | Tách `ContactForm`, `InputField`, `TextArea`, `SubmitButton`. Dùng `useState` và `onSubmit` để xử lý dữ liệu. |
| **5. React + API / EmailJS / TanStack Query** | Gửi dữ liệu thực | Dùng **fetch()** hoặc **EmailJS** gửi dữ liệu lên server. Dùng **TanStack Query** để xử lý trạng thái loading/success/error. |
| **6. Next.js + Vercel (Production)** | API Routes + SEO + Deploy | Tạo API route `/api/contact` trong Next.js để nhận và log dữ liệu. Thêm SEO + metadata và deploy lên **Vercel**. |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Hiểu cấu trúc và giao diện form với Tailwind.  
2. **Cấp 3:** Làm chủ validation cơ bản (HTML5 + JS).  
3. **Cấp 4:** Hiểu luồng state/props trong React form.  
4. **Cấp 5:** Gửi dữ liệu thật bằng API / EmailJS, xử lý loading/error.  
5. **Cấp 6:** Biết tạo API route trong Next.js và deploy production.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ | Chủ đề mở rộng | Mục tiêu |
| :-- | :-- | :-- |
| **7. Form Validation nâng cao** | React Hook Form / Zod | Kiểm tra form mạnh mẽ, dễ mở rộng. |
| **8. Spam Protection** | reCAPTCHA / Honeypot | Chống spam form tự động. |
| **9. CMS Integration** | Sanity / Strapi | Lưu tin nhắn người dùng vào CMS. |
| **10. Notification & Email** | SendGrid / Resend | Gửi email xác nhận tới người gửi & admin. |

---

## 💡 Gợi ý triển khai nhanh

- **Hook gợi ý:** `useContactForm()` → `{values, handleChange, handleSubmit, isLoading, message}`  
- **Validation:** Regex email, min length message.  
- **UI:** Tailwind class `ring`, `focus:ring-indigo-500`, `invalid:border-red-500`.  
- **API:** POST đến `/api/contact` → log dữ liệu hoặc gửi email qua EmailJS.

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Contact Form**, bạn sẽ:

- Làm chủ từ **HTML form cơ bản → React Form hiện đại**.  
- Biết kết nối form với **API thật hoặc CMS**.  
- Triển khai website có **chức năng liên hệ chuyên nghiệp** trên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
