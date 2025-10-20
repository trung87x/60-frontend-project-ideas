# 💸 Expense Tracker — Lộ Trình 6 Cấp Độ Tăng Dần

> Bản tóm lộ trình từ HTML tĩnh → React → Next.js (Production) cho dự án **💸 Expense Tracker**.

---

## 🎯 Mục tiêu tổng quát

- Học cách tổ chức UI, state, data cho 💸 Expense Tracker.  
- Làm quen với **TailwindCSS**, **React**, **TanStack Query**, **Next.js**, và triển khai **Vercel**.  
- Viết code có cấu trúc: tách **UI – Logic – Data**.

---

## 🧩 6 Cấp Độ

| Cấp độ | Công nghệ / Mục tiêu chính | Mô tả |
| :-- | :-- | :-- |
| **1. HTML + CSS** | Bảng & form tĩnh | Bảng giao dịch (date, desc, amount, type) + tổng số. |
| **2. JavaScript** | DOM + Storage | Thêm/xóa/sửa giao dịch, tính tổng thu/chi, lưu LocalStorage. |
| **3. TailwindCSS** | UI | Card số liệu (Income, Expense, Balance), màu theo dương/âm, responsive. |
| **4. React** | State & Components | Components: SummaryCards, TransactionForm, TransactionTable. Tính toán memoized. |
| **5. React + API** | Query + Filter | Fetch giao dịch từ API/JSON; lọc theo thời gian, phân loại; TanStack Query. |
| **6. Next.js** | SEO + Deploy | Trang /reports, /transactions; SEO, export CSV, deploy Vercel. |

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
| **7. Charts** |  | Charts (Recharts) theo tháng |
| **8. Auth** |  | Auth + nhiều ví |
| **9. Import** |  | Import file CSV |
| **10. PWA** |  | PWA offline |

---

## 💡 Gợi ý triển khai nhanh

- Model: {id, date, category, note, amount, type}
- Hook: useTransactions() + useSummary(range)
- Format tiền: Intl.NumberFormat

---

📌 _Tác giả: trung87.link — Hệ thống học React & Tailwind toàn diện._
