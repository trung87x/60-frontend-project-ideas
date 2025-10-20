# 🧠 Interactive Quiz — Lộ Trình 6 Cấp Độ Tăng Dần

> Dự án giúp bạn xây dựng **ứng dụng trắc nghiệm tương tác** từ HTML tĩnh đến React/Next.js chuyên nghiệp, có API câu hỏi, tính điểm, và lưu kết quả.

---

## 🎯 Mục tiêu tổng quát

- Hiểu cách tổ chức **quiz app** (câu hỏi, đáp án, kết quả).
- Làm quen với **state management**, **fetch API**, **TanStack Query**, và **conditional rendering**.
- Tạo UI hiện đại, rõ ràng, có tiến trình, kết quả và replay.
- Triển khai ứng dụng thật bằng **Next.js + Vercel**.

---

## 🧩 6 Cấp Độ Interactive Quiz

| Cấp độ                               | Công nghệ / Mục tiêu chính | Mô tả                                                                                                                       |
| :----------------------------------- | :------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **1. HTML + CSS cơ bản**             | Giao diện tĩnh             | Tạo bố cục gồm câu hỏi, 4 đáp án, nút **Next** và **Submit**. Hiển thị trang kết quả đơn giản.                              |
| **2. JavaScript cơ bản**             | DOM + Event                | Tạo mảng `questions[]` và xử lý chọn đáp án, tính điểm, hiển thị câu kế tiếp, reset quiz.                                   |
| **3. TailwindCSS**                   | UI hiện đại, responsive    | Dùng **TailwindCSS** để tạo card câu hỏi, hiệu ứng hover đúng/sai, thanh tiến trình.                                        |
| **4. React**                         | Component-based UI         | Tách component `Quiz`, `Question`, `AnswerButton`, `Result`. Dùng state `index`, `score`, `isFinished`.                     |
| **5. React + API (TanStack Query)**  | Data động, caching         | Fetch câu hỏi từ API (ví dụ: [Open Trivia DB](https://opentdb.com/)). Xử lý loading/error, filter theo category/difficulty. |
| **6. Next.js + Vercel (Production)** | SEO, Routing, Deploy       | Trang `/quiz/[category]` fetch câu hỏi theo chủ đề. Tối ưu SEO, build production và **deploy lên Vercel**.                  |

---

## 🧠 Kiến thức rút ra sau 6 cấp độ

1. **Cấp 1–2:** Hiểu logic quiz cơ bản, event DOM, và xử lý điểm.
2. **Cấp 3:** Thiết kế UI đẹp, responsive với Tailwind.
3. **Cấp 4:** Làm chủ state React và conditional rendering.
4. **Cấp 5:** Thành thạo fetch API và caching với TanStack Query.
5. **Cấp 6:** Xây dựng quiz thật với Next.js và deploy production.

---

## 🚀 Hướng phát triển tiếp theo

| Cấp độ                   | Chủ đề mở rộng   | Mục tiêu                                     |
| :----------------------- | :--------------- | :------------------------------------------- |
| **7. Quiz Timer**        | React Hooks      | Thêm đồng hồ đếm ngược cho mỗi câu hỏi.      |
| **8. Score History**     | LocalStorage     | Lưu điểm và kết quả quiz của người chơi.     |
| **9. Quiz CMS**          | Next.js + Sanity | Quản lý câu hỏi, chủ đề và độ khó trong CMS. |
| **10. Multiplayer Mode** | WebSocket        | Tạo chế độ thi đua 2 người cùng lúc.         |

---

## 💡 Gợi ý triển khai nhanh

- **Dữ liệu mẫu:** `[{ question: '...', answers: ['A','B','C','D'], correct: 1 }]`
- **Hook:** `useQuiz()` → `{ current, score, next(), reset(), isFinished }`
- **Animation:** sử dụng `opacity`/`scale` khi chuyển câu.
- **UI:** hiển thị thanh tiến trình (`(index+1)/total`).
- **API mẫu:** `https://opentdb.com/api.php?amount=5&category=9&type=multiple`.

---

## ✨ Kết luận

Hoàn thành 6 cấp độ **Interactive Quiz**, bạn sẽ:

- Hiểu toàn bộ logic và state của ứng dụng quiz.
- Biết fetch câu hỏi động từ API thật.
- Có thể triển khai **quiz web app hoàn chỉnh** lên **Vercel**.

---

📌 _Tác giả: [trung87.link](https://trung87.link) — Hệ thống học React & Tailwind toàn diện._
