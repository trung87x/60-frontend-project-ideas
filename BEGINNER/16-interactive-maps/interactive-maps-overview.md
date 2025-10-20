# 🗺️ Interactive Maps — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn học cách xây dựng **bản đồ tương tác** từ HTML cơ bản đến **React + Next.js + API Mapbox/Leaflet**, có marker, popup, geolocation và tìm kiếm địa điểm.

---

## 🎯 Mục tiêu tổng quát

- Hiểu cách **render bản đồ**, thêm marker, zoom, và sự kiện click.
- Làm quen với thư viện bản đồ phổ biến: **Leaflet**, **Mapbox GL JS**, **Google Maps API**.
- Xử lý **geolocation**, **reverse geocoding**, và hiển thị thông tin vị trí.
- Tạo UI hiện đại, responsive với **TailwindCSS**.
- Deploy sản phẩm thật bằng **Next.js + Vercel**.

---

## 🧩 6 Cấp Độ Interactive Maps

| Cấp độ                                  | Công nghệ / Mục tiêu chính | Mô tả                                                                                                                                      |
| :-------------------------------------- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **1. HTML + CSS cơ bản**                | Giao diện tĩnh             | Tạo khung bản đồ (`#map`), chiều cao cố định, placeholder text. Chưa có bản đồ thật.                                                       |
| **2. JavaScript cơ bản (Leaflet CDN)**  | Render bản đồ đầu tiên     | Sử dụng **Leaflet** qua CDN để hiển thị bản đồ từ OpenStreetMap. Thêm 1 marker và popup cơ bản.                                            |
| **3. TailwindCSS**                      | UI đẹp, responsive         | Dùng **TailwindCSS** để căn layout, thêm header, footer, dark mode, responsive map container.                                              |
| **4. React**                            | Component-based UI         | Tạo component `Map`, `MarkerList`, `SearchBar`. Sử dụng `react-leaflet` để quản lý map & markers.                                          |
| **5. React + API (Mapbox / Geocoding)** | Tìm kiếm & định vị         | Dùng **Mapbox API** hoặc **OpenCage API** để tìm địa điểm, hiển thị marker tương ứng. Hỗ trợ định vị người dùng (`navigator.geolocation`). |
| **6. Next.js + Vercel (Production)**    | SEO & Deploy               | Tích hợp bản đồ vào trang Next.js, tạo trang `/maps`, thêm metadata, deploy lên **Vercel**.                                                |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Biết hiển thị bản đồ cơ bản bằng Leaflet.
2. **Cấp 3:** Làm UI map container responsive và đẹp.
3. **Cấp 4:** Thành thạo `react-leaflet` và component hóa bản đồ.
4. **Cấp 5:** Fetch dữ liệu vị trí thật từ API (geocoding & geolocation).
5. **Cấp 6:** Tích hợp map vào Next.js và deploy production.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ                      | Chủ đề mở rộng          | Mục tiêu                          |
| :-------------------------- | :---------------------- | :-------------------------------- |
| **7. Directions & Routing** | Mapbox Directions API   | Hiển thị đường đi giữa 2 điểm.    |
| **8. Cluster Markers**      | react-leaflet-cluster   | Gom nhóm marker khi zoom nhỏ.     |
| **9. Custom Marker Icons**  | Tailwind + Image assets | Tùy chỉnh marker bằng icon riêng. |
| **10. CMS Integration**     | Sanity / Strapi         | Lưu danh sách địa điểm trong CMS. |

---

## 💡 Gợi ý triển khai nhanh

- **API gợi ý:**
  - Mapbox: `https://api.mapbox.com/geocoding/v5/mapbox.places/{query}.json`
  - OpenCage: `https://api.opencagedata.com/geocode/v1/json?q={query}&key=API_KEY`
- **Hook:** `useMapSearch()` → `{ results, search(query), loading, error }`
- **UI:** hiển thị search bar trên map (absolute), list kết quả bên phải.
- **Geolocation:** `navigator.geolocation.getCurrentPosition()` → center map.

---

## ✨ Kết luận

Lộ trình 6 cấp độ **Interactive Maps** giúp bạn:

- Làm chủ kỹ thuật hiển thị bản đồ và vị trí động.
- Hiểu cách kết hợp **React + API + Tailwind**.
- Có thể triển khai ứng dụng bản đồ thật trên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
