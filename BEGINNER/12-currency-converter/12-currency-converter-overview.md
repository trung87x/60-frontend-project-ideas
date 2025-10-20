# 💱 Currency Converter — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn xây dựng **ứng dụng đổi tiền tệ** từ HTML tĩnh đến **React/Next.js** dùng API tỉ giá thật, có caching, định dạng số và triển khai production.

---

## 🎯 Mục tiêu tổng quát

- Hiểu công thức chuyển đổi: `amount * rate[from→to]`.  
- Làm quen **fetch API**, **TanStack Query** (caching/loading/error), và **định dạng số/tiền tệ**.  
- Thiết kế UI đẹp, a11y chuẩn, hỗ trợ **swap** và **tự động đổi chiều**.  
- Deploy thực tế bằng **Next.js + Vercel**.

---

## 🧩 6 Cấp Độ Currency Converter

| Cấp độ | Công nghệ / Mục tiêu chính | Mô tả |
| :-- | :-- | :-- |
| **1. HTML + CSS cơ bản** | Giao diện tĩnh | Hai ô tiền tệ (From/To), input `amount`, nút **Convert**. Bảng tỉ giá mẫu tĩnh. |
| **2. JavaScript cơ bản** | DOM + Logic | Lấy `amount`, `from`, `to` từ DOM, áp công thức với **tỉ giá cục bộ** (JSON tĩnh). Thêm nút **Swap** và validation cơ bản. |
| **3. TailwindCSS** | UI hiện đại, responsive | Dùng **TailwindCSS** để tạo form đẹp, layout grid, trạng thái lỗi, dark mode. Định dạng số qua `Intl.NumberFormat`. |
| **4. React** | Component-based UI | Tách `AmountInput`, `CurrencySelect`, `ResultBox`, `SwapButton`. Quản lý state, memo công thức tính để tránh re-render. |
| **5. React + API (TanStack Query)** | Tỉ giá động, caching | Dùng **TanStack Query** fetch tỉ giá từ API (ví dụ: Frankfurter/ECB, exchangerate.host). Xử lý **staleTime**, **retry**, **error**. |
| **6. Next.js + Vercel (Production)** | API Route / ISR & Deploy | Tạo API route `/api/rates` (proxy/caching). Dùng **ISR** hoặc **revalidate** để giảm call. Thêm SEO và deploy **Vercel**. |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Hiểu luồng nhập liệu, kiểm tra dữ liệu và công thức cơ bản.  
2. **Cấp 3:** Làm UI form đẹp, a11y tốt, định dạng số/tiền tệ chuẩn.  
3. **Cấp 4:** Tổ chức component React, tối ưu render với `useMemo`.  
4. **Cấp 5:** Thành thạo **TanStack Query** và làm việc với API tỉ giá.  
5. **Cấp 6:** Biết dùng **API Route / ISR** trong Next.js và triển khai production.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ | Chủ đề mở rộng | Mục tiêu |
| :-- | :-- | :-- |
| **7. Favorites & Recent** | LocalStorage | Lưu cặp tiền tệ yêu thích và lịch sử (USD→VND, EUR→USD...). |
| **8. Multi Convert** | Batch convert | Chuyển đổi một lúc sang nhiều đồng tiền (USD→VND/EUR/JPY...). |
| **9. Charts** | Recharts | Biểu đồ lịch sử tỉ giá 7/30/90 ngày. |
| **10. Offline Mode (PWA)** | Service Worker | Cache tỉ giá gần nhất để dùng offline, cảnh báo khi dữ liệu cũ. |

---

## 💡 Gợi ý triển khai nhanh

- **Nguồn API gợi ý:** `https://api.frankfurter.app/latest?from=USD`, `https://api.exchangerate.host/latest?base=USD`.  
- **Chuẩn hóa tiền tệ:** danh sách ISO 4217 (USD, EUR, VND...).  
- **Hook mẫu:** `useRates(base)` → `{rates, isLoading, isError, refetch}`.  
- **Định dạng:** `Intl.NumberFormat(locale, { style: 'currency', currency: code })`.  
- **Caching:** `staleTime: 10 * 60 * 1000` (10 phút), `retry: 1`.  
- **SSR-friendly:** tránh đọc `window` khi render server trong Next.js.

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Currency Converter**, bạn sẽ:

- Làm chủ **form, số liệu, định dạng và fetch API**.  
- Sử dụng **TanStack Query** để cache tỉ giá hiệu quả.  
- Tạo ứng dụng đổi tiền tệ **đẹp, chính xác, triển khai thật** trên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
