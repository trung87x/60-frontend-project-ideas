# 🎵 Music Player — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn xây dựng **trình phát nhạc (Music Player)** từ HTML tĩnh đến React/Next.js có playlist, điều khiển, và API nhạc động.

---

## 🎯 Mục tiêu tổng quát

- Hiểu cách làm việc với **<audio> API**, sự kiện `play/pause/seek/timeupdate`.
- Làm quen với **React state**, **custom hooks**, và **audio context**.
- Thiết kế UI player hiện đại bằng **TailwindCSS**.
- Tích hợp **API nhạc / JSON playlist**, triển khai trên **Vercel**.

---

## 🧩 6 Cấp Độ Music Player

| Cấp độ                                      | Công nghệ / Mục tiêu chính | Mô tả                                                                                                                        |
| :------------------------------------------ | :------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **1. HTML + CSS cơ bản**                    | Giao diện tĩnh             | Tạo layout player gồm: ảnh bìa, tiêu đề, thanh tiến trình, nút Play/Pause, Next, Prev.                                       |
| **2. JavaScript cơ bản**                    | DOM + Audio API            | Dùng `audio.play()`, `pause()`, `currentTime`, `duration` để điều khiển nhạc. Cập nhật tiến trình khi phát.                  |
| **3. TailwindCSS**                          | UI hiện đại, responsive    | Dùng **TailwindCSS** để style player card, progress bar, hover/focus effect, dark mode.                                      |
| **4. React**                                | Component-based UI         | Tách component: `Player`, `Controls`, `ProgressBar`, `SongInfo`. Dùng state để điều khiển nhạc và render UI theo trạng thái. |
| **5. React + Playlist API / Hook nâng cao** | Quản lý danh sách nhạc     | Dùng hook `useAudioPlayer()` quản lý **playlist**, **loop**, **shuffle**, **progress**. Fetch playlist từ JSON hoặc API.     |
| **6. Next.js + Vercel (Production)**        | SEO, Static Assets, Deploy | Build app bằng Next.js, load playlist từ API hoặc folder `/public/music`. Tối ưu SEO & deploy lên **Vercel**.                |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Hiểu cách dùng `<audio>` element và các event thời gian.
2. **Cấp 3:** Thiết kế player UI hiện đại, dark mode.
3. **Cấp 4:** Thành thạo state và event trong React player.
4. **Cấp 5:** Tổ chức logic phát nhạc trong hook riêng, hỗ trợ playlist.
5. **Cấp 6:** Biết triển khai player thực tế bằng Next.js.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ                     | Chủ đề mở rộng | Mục tiêu                                                  |
| :------------------------- | :------------- | :-------------------------------------------------------- |
| **7. Waveform Visualizer** | Wavesurfer.js  | Hiển thị sóng âm và thanh tiến trình động.                |
| **8. Lyrics Sync**         | API + time tag | Đồng bộ lời bài hát (LRC file hoặc API).                  |
| **9. Spotify Clone**       | Next.js + API  | Tích hợp Spotify API, đăng nhập và quản lý playlist thật. |
| **10. PWA Music Player**   | Service Worker | Nghe offline, thêm vào Home Screen.                       |

---

## 💡 Gợi ý triển khai nhanh

- **Hook:** `useAudioPlayer()` → `{ current, play(), pause(), next(), prev(), seek() }`.
- **UI:** thanh tiến trình: `<input type="range" />` liên kết `currentTime`.
- **API gợi ý:** JSON playlist: `[ { title, artist, cover, url } ]`.
- **Keyboard control:** Space để play/pause, ←/→ để seek.
- **Tailwind:** `bg-gradient-to-r from-indigo-500 to-purple-600 text-white` cho theme hiện đại.

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Music Player**, bạn sẽ:

- Hiểu toàn bộ **Audio API** và state management.
- Làm chủ UI Tailwind + React Hooks.
- Tạo trình phát nhạc chuyên nghiệp và triển khai thật trên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
