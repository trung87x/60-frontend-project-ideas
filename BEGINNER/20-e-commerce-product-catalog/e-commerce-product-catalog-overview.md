# 🛍️ E-Commerce Product Catalog — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn học cách xây dựng **trang danh mục sản phẩm thương mại điện tử** từ HTML tĩnh đến React/Next.js có dữ liệu động, bộ lọc, tìm kiếm, và phân trang.

---

## 🎯 Mục tiêu tổng quát

- Hiểu cấu trúc **product card, grid, pagination, filter**.
- Làm quen với **fetch API**, **TanStack Query**, **search/filter/sort**.
- Tạo UI đẹp và responsive với **TailwindCSS**.
- Kết nối dữ liệu thật và triển khai trên **Next.js + Vercel**.

---

## 🧩 6 Cấp Độ Product Catalog

| Cấp độ                               | Công nghệ / Mục tiêu chính | Mô tả                                                                                                            |
| :----------------------------------- | :------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **1. HTML + CSS cơ bản**             | Grid tĩnh                  | Tạo danh sách sản phẩm tĩnh (ảnh, tên, giá, nút Add to Cart). Dùng flex/grid căn chỉnh layout.                   |
| **2. TailwindCSS**                   | UI hiện đại, responsive    | Dùng **TailwindCSS** để làm card sản phẩm đẹp, hover effect, responsive 2-4 cột.                                 |
| **3. JavaScript cơ bản**             | DOM + Event                | Lọc sản phẩm theo danh mục, sắp xếp theo giá, thêm ô tìm kiếm.                                                   |
| **4. React**                         | Component-based UI         | Tách `ProductGrid`, `ProductCard`, `FilterBar`, `SearchBox`. Quản lý state lọc/tìm kiếm, props truyền dữ liệu.   |
| **5. React + API / TanStack Query**  | Data động, caching         | Fetch sản phẩm từ API (ví dụ: [FakeStoreAPI](https://fakestoreapi.com/products)). Xử lý loading, error, caching. |
| **6. Next.js + Vercel (Production)** | SEO, Routing, Deploy       | Tạo trang `/products` và `/products/[id]`. SEO tốt, prefetch sản phẩm, deploy lên **Vercel**.                    |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Thành thạo UI grid layout và responsive bằng Tailwind.
2. **Cấp 3:** Hiểu logic lọc, tìm kiếm, sắp xếp cơ bản.
3. **Cấp 4:** Biết chia nhỏ UI thành component có state riêng.
4. **Cấp 5:** Làm chủ fetch API & caching với TanStack Query.
5. **Cấp 6:** Build app e-commerce thật bằng Next.js, SEO & deploy.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ                       | Chủ đề mở rộng      | Mục tiêu                                         |
| :--------------------------- | :------------------ | :----------------------------------------------- |
| **7. Product Detail + Cart** | Context API         | Trang chi tiết sản phẩm & giỏ hàng.              |
| **8. Checkout Page**         | Stripe / PayPal API | Thanh toán thật qua cổng Stripe hoặc PayPal.     |
| **9. CMS Integration**       | Sanity / Strapi     | Quản lý sản phẩm, hình ảnh, giá, tồn kho.        |
| **10. Analytics Dashboard**  | Chart.js / Recharts | Theo dõi doanh thu, đơn hàng, lượt xem sản phẩm. |

---

## 💡 Gợi ý triển khai nhanh

- **API mẫu:**
  - `https://fakestoreapi.com/products`
  - `https://dummyjson.com/products`
- **Hook:** `useProducts(query)` → `{ data, isLoading, error }`
- **Filter:** category, price range, search keyword.
- **UI:** grid responsive (`grid-cols-2 md:grid-cols-4 gap-6`).
- **Pagination:** chia 8 sản phẩm mỗi trang, thêm nút “Tải thêm”.
- **SEO:** mỗi sản phẩm có OpenGraph (`og:title`, `og:image`).

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **E-Commerce Product Catalog**, bạn sẽ:

- Làm chủ **UI + data fetching + state management**.
- Biết kết hợp **React + Tailwind + TanStack Query + Next.js**.
- Tạo **catalog sản phẩm động** chuyên nghiệp và triển khai thật trên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
