# 🍳 Recipe Finder — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn học cách xây dựng **ứng dụng tìm công thức nấu ăn** từ HTML cơ bản đến React/Next.js có API thật, tìm kiếm, chi tiết món ăn, và lưu yêu thích.

---

## 🎯 Mục tiêu tổng quát

- Hiểu cách **fetch dữ liệu từ API** và hiển thị danh sách kết quả.
- Làm quen với **state management**, **search/filter**, **pagination**, **details modal**.
- Thiết kế UI hiện đại bằng **TailwindCSS**, tối ưu UX.
- Triển khai ứng dụng thực tế bằng **Next.js + Vercel**.

---

## 🧩 6 Cấp Độ Recipe Finder

| Cấp độ                               | Công nghệ / Mục tiêu chính | Mô tả                                                                                                                                          |
| :----------------------------------- | :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. HTML + CSS cơ bản**             | Giao diện tĩnh             | Tạo giao diện gồm ô tìm kiếm, danh sách món ăn (card), và chi tiết món khi click.                                                              |
| **2. JavaScript cơ bản**             | DOM + Fetch API            | Dùng `fetch()` để lấy dữ liệu công thức mẫu từ file `recipes.json`. Hiển thị danh sách kết quả, xử lý tìm kiếm cơ bản.                         |
| **3. TailwindCSS**                   | UI hiện đại, responsive    | Dùng **TailwindCSS** để làm layout đẹp, grid card món ăn, modal chi tiết, dark mode.                                                           |
| **4. React**                         | Component-based UI         | Tách `SearchBar`, `RecipeList`, `RecipeCard`, `RecipeModal`. Quản lý state tìm kiếm, chọn món, loading.                                        |
| **5. React + API (TanStack Query)**  | API thật + caching         | Dùng **TanStack Query** để fetch từ **TheMealDB API** (`https://www.themealdb.com/api/json/v1/1/search.php?s=`). Xử lý loading/error, caching. |
| **6. Next.js + Vercel (Production)** | Routing + SEO + Deploy     | Trang `/recipes/[id]` hiển thị chi tiết món, tối ưu SEO, dynamic route, deploy lên **Vercel**.                                                 |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Thành thạo thao tác DOM, fetch API cơ bản.
2. **Cấp 3:** Làm UI hiện đại, responsive, có modal và dark mode.
3. **Cấp 4:** Quản lý state và component React hiệu quả.
4. **Cấp 5:** Biết fetch data với **TanStack Query**, quản lý cache.
5. **Cấp 6:** Xây dựng web app thực tế bằng Next.js và deploy.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ                              | Chủ đề mở rộng  | Mục tiêu                                       |
| :---------------------------------- | :-------------- | :--------------------------------------------- |
| **7. Favorites & LocalStorage**     | Lưu yêu thích   | Lưu món yêu thích, đánh dấu ❤️ và xem lại.     |
| **8. Filter nâng cao**              | Tag / Category  | Lọc theo loại món (Beef, Dessert, Seafood...). |
| **9. Pagination / Infinite Scroll** | UX tối ưu       | Tải thêm món khi cuộn hoặc chia trang.         |
| **10. Recipe CMS**                  | Sanity / Strapi | Quản lý món ăn trong CMS, có CRUD.             |

---

## 💡 Gợi ý triển khai nhanh

- **API mẫu:**
  - `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`
  - `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`
- **Hook:** `useRecipes(query)` → `{ data, isLoading, error }`
- **UI:** hiển thị 12 món / trang, có nút “Tải thêm”.
- **UX:** animation khi mở modal, skeleton khi loading.

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Recipe Finder**, bạn sẽ:

- Thành thạo **fetch API, search, filter** trong React.
- Biết triển khai app động với **Next.js + TanStack Query**.
- Tạo ứng dụng tìm món ăn đẹp, nhanh, và dùng API thật trên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
