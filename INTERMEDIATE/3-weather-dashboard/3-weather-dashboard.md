# ⛅ Weather Dashboard — Lộ Trình 6 Cấp Độ Tăng Dần

> Bản tóm lộ trình từ HTML tĩnh → React → Next.js (Production) cho dự án **⛅ Weather Dashboard**.

---

## 🎯 Mục tiêu tổng quát

- Học cách tổ chức UI, state, data cho ⛅ Weather Dashboard.  
- Làm quen với **TailwindCSS**, **React**, **TanStack Query**, **Next.js**, và triển khai **Vercel**.  
- Viết code có cấu trúc: tách **UI – Logic – Data**.

---

## 🧩 6 Cấp Độ

| Cấp độ | Công nghệ / Mục tiêu chính | Mô tả |
| :-- | :-- | :-- |
| **1. HTML + CSS** | Cards tĩnh | Thẻ thời tiết hiện tại + 5 ngày; ô tìm kiếm thành phố. |
| **2. JavaScript** | Fetch cơ bản | Fetch JSON mẫu; hiển thị nhiệt độ, humidity, wind. |
| **3. TailwindCSS** | UI | Icon thời tiết, gradient theo điều kiện, responsive. |
| **4. React** | Components | WeatherCard, ForecastList, SearchBar; state & effect theo city. |
| **5. React + API** | OpenWeather + Query | TanStack Query fetch /weather & /forecast, cache theo city. |
| **6. Next.js** | ENV + Deploy | Đọc OPENWEATHER_API_KEY từ env, SEO, deploy Vercel. |

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
| **7. Geolocation** |  | Geolocation tự phát hiện vị trí |
| **8. Unit** |  | Unit chuyển °C/°F |
| **9. Map** |  | Map + layer mưa/gió |
| **10. PWA** |  | PWA offline cache kết quả gần nhất |

---

## 💡 Gợi ý triển khai nhanh

- Hook: useWeather(city) → {current, forecast}
- Xử lý lỗi 429 (rate limit) + retry

---

📌 _Tác giả: trung87.link — Hệ thống học React & Tailwind toàn diện._
