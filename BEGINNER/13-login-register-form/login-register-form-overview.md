# 🔐 Login & Register Form — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn xây dựng **màn hình Đăng nhập/Đăng ký** từ HTML cơ bản đến **React/Next.js + Auth API** an toàn, có xác thực, trạng thái tải và thông báo lỗi.

---

## 🎯 Mục tiêu tổng quát

- Nắm chắc **form, validation, password UX** (show/hide, strength).  
- Làm quen với **fetch API**, **TanStack Query** cho trạng thái **loading/error/success**.  
- Tổ chức component chuẩn, tách **UI – Logic – Data**, xử lý **auth flow**.  
- Hiểu các nguyên tắc bảo mật cơ bản khi làm **Authentication**.

---

## 🧩 6 Cấp Độ Login & Register

| Cấp độ | Công nghệ / Mục tiêu chính | Mô tả |
| :-- | :-- | :-- |
| **1. HTML + CSS cơ bản** | Giao diện tĩnh | Hai trang `login.html` và `register.html` với input: email, password (và name ở register). Nút **Submit**. |
| **2. TailwindCSS** | UI hiện đại, responsive | Dùng **TailwindCSS** tạo card form đẹp, input focus, tooltip lỗi, dark mode. |
| **3. JavaScript cơ bản** | DOM + Validation | Kiểm tra định dạng email, min length password, confirm password (register). Thêm **toggle show/hide password** và thông báo lỗi. |
| **4. React** | Component-based UI | Tách `AuthLayout`, `AuthCard`, `TextField`, `PasswordField`, `SubmitButton`. Quản lý state, hiển thị lỗi theo field. |
| **5. React + API (TanStack Query)** | Auth API & trạng thái | Tạo hooks `useLogin`, `useRegister` dùng **TanStack Query** để gọi API, xử lý **loading/error/success**, redirect sau khi login. |
| **6. Next.js + Vercel (Production)** | Auth thực tế + SEO + Deploy | Tạo **API Routes** `/api/auth/login` & `/api/auth/register` (mock hoặc proxy). Thiết lập **cookie/session** cơ bản, metadata SEO, deploy lên **Vercel**. |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Thành thạo UI form, trải nghiệm nhập liệu tốt (focus/error).  
2. **Cấp 3:** Hiểu validation client (email, password rules, confirm).  
3. **Cấp 4:** Tổ chức component React, tránh re-render thừa.  
4. **Cấp 5:** Nắm **TanStack Query** cho auth flow, quản lý **loading** và **error** rõ ràng.  
5. **Cấp 6:** Kết nối **API Route** trong Next.js, set cookie và deploy.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ | Chủ đề mở rộng | Mục tiêu |
| :-- | :-- | :-- |
| **7. NextAuth/Auth.js** | OAuth Providers | Đăng nhập bằng Google/GitHub, session an toàn. |
| **8. Server Validation** | Zod + Server Actions | Validate trên server, trả lỗi field-level (zod issues). |
| **9. Rate Limit & Bot Defense** | reCAPTCHA / Turnstile | Bảo vệ endpoint đăng ký/đăng nhập. |
| **10. Profile & Protected Routes** | Role-based access | Trang hồ sơ, middleware bảo vệ route `/dashboard`. |

---

## 🔒 Ghi chú bảo mật quan trọng

- **Không lưu plain password** trên client hoặc localStorage.  
- Sử dụng **HTTPS**, **SameSite=Lax/Strict**, **HttpOnly cookie** cho session.  
- Hash mật khẩu ở backend (BCrypt/Argon2).  
- Chống **CSRF/XSS**: sanitize input, dùng CSRF token với form.  
- Log sự kiện đăng nhập thất bại để phát hiện tấn công.

---

## 💡 Gợi ý triển khai nhanh

- **Schema form**: email (RFC 5322), password (≥ 8 ký tự, có chữ & số).  
- **Hook mẫu**: `useAuthForm()` → `{values, errors, handleChange, handleSubmit}`.  
- **Query mẫu**: `useLogin()`/`useRegister()` dùng `useMutation` (TanStack Query).  
- **Mock API**: tạm lưu user trong mảng/JSON để test luồng trước khi tích hợp thật.

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Login & Register**, bạn sẽ:

- Nắm chắc **Form + Validation + Auth flow** trong React/Next.js.  
- Biết tích hợp **Auth API** an toàn, UX tốt.  
- Tự tin triển khai ứng dụng có **đăng nhập/đăng ký** lên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
