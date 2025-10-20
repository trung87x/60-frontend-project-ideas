# 👤 Social Media Profile — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn xây dựng **trang hồ sơ mạng xã hội (Profile Page)** từ HTML tĩnh đến **React/Next.js** có dữ liệu động, bài viết, follower stats, và API thật.

---

## 🎯 Mục tiêu tổng quát

- Hiểu cấu trúc giao diện **profile card, stats, post feed**.
- Làm quen với **state management**, **fetch API**, **TanStack Query**, và **routing động**.
- Tạo UI đẹp, responsive bằng **TailwindCSS**.
- Tích hợp dữ liệu JSON hoặc CMS, triển khai lên **Vercel**.

---

## 🧩 6 Cấp Độ Social Media Profile

| Cấp độ                               | Công nghệ / Mục tiêu chính | Mô tả                                                                                                         |
| :----------------------------------- | :------------------------- | :------------------------------------------------------------------------------------------------------------ |
| **1. HTML + CSS cơ bản**             | Layout tĩnh                | Tạo card hồ sơ (avatar, tên, bio, stats: followers/following/posts). Thêm danh sách bài viết tĩnh.            |
| **2. TailwindCSS**                   | UI hiện đại, responsive    | Dùng **TailwindCSS** để thiết kế card profile, grid bài viết, dark mode, responsive cho mobile.               |
| **3. JavaScript cơ bản**             | DOM + Event                | Thêm logic đơn giản: nút **Follow/Unfollow**, đếm số follower. Lưu trạng thái vào LocalStorage.               |
| **4. React**                         | Component-based UI         | Tách `ProfileHeader`, `PostList`, `PostCard`, `FollowButton`. Quản lý state toàn cục profile & posts.         |
| **5. React + API / TanStack Query**  | Data động                  | Fetch dữ liệu người dùng & bài viết từ file JSON hoặc API (ví dụ: mockapi.io). Quản lý loading, error, cache. |
| **6. Next.js + Vercel (Production)** | SEO, Routing, Deploy       | Trang `/user/[username]` render hồ sơ động. Tối ưu SEO, metadata (OpenGraph), deploy lên **Vercel**.          |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Làm UI profile và post feed hiện đại bằng Tailwind.
2. **Cấp 3:** Hiểu event DOM, lưu trạng thái theo user.
3. **Cấp 4:** Thành thạo component hóa React và state management.
4. **Cấp 5:** Sử dụng **TanStack Query** để fetch dữ liệu người dùng.
5. **Cấp 6:** Xây dựng dynamic routing và SEO page với Next.js.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ                       | Chủ đề mở rộng  | Mục tiêu                                                 |
| :--------------------------- | :-------------- | :------------------------------------------------------- |
| **7. Comments & Likes**      | React Context   | Thêm like/comment thật cho post.                         |
| **8. Followers List**        | Modal + API     | Hiển thị danh sách người theo dõi (followers/following). |
| **9. CMS Integration**       | Sanity / Strapi | Lưu người dùng & bài viết trong CMS.                     |
| **10. Notifications System** | Socket / API    | Thông báo realtime khi có tương tác.                     |

---

## 💡 Gợi ý triển khai nhanh

- **JSON mẫu:**
  ```json
  {
    "user": {
      "name": "John Doe",
      "avatar": "/avatar.jpg",
      "followers": 1280,
      "bio": "Frontend Dev"
    },
    "posts": [
      { "id": 1, "image": "/p1.jpg", "likes": 230 },
      { "id": 2, "image": "/p2.jpg", "likes": 150 }
    ]
  }
  ```
- **Hook:** `useProfile(username)` → `{ user, posts, isLoading, error }`
- **UI:** layout: `flex flex-col items-center`, card profile sticky, grid post responsive.
- **SEO:** thêm OpenGraph image cho mỗi profile (`og:image`).

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Social Media Profile**, bạn sẽ:

- Hiểu cấu trúc **profile UI + feed + stats**.
- Biết fetch dữ liệu động, quản lý state và caching.
- Tạo **profile page thật** với Next.js, SEO tốt, triển khai trên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
