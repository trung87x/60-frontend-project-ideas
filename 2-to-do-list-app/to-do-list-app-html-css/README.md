# Level 1 — HTML + CSS (+ JS nhẹ)
Tập trung vào **UI/UX cơ bản** và **tương tác nhẹ**: thêm việc, đánh dấu hoàn thành, chỉnh tiêu đề inline, xoá (chỉ DOM/bộ nhớ tạm). **Không có lưu trữ** (refresh sẽ mất).

## Chạy thử
Mở trực tiếp file `index.html` trên trình duyệt.

## Tính năng
- Thêm việc bằng nút **Thêm** hoặc phím **Enter**.
- Đánh dấu hoàn thành bằng **checkbox** (đổi style thành gạch ngang).
- Sửa tiêu đề **inline** (click vào tiêu đề để sửa, Enter để kết thúc).
- Xoá mục bằng nút **Xoá**.
- Bộ đếm: tổng / đang làm / hoàn thành (cập nhật tự động).

## Ghi chú
- JS chỉ dùng để thao tác DOM cơ bản, **chưa có localStorage/API**.
- A11y: có `aria-label`, `aria-live`, focus ring rõ ràng.
