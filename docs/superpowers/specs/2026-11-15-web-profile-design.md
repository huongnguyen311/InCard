# Hồ sơ web (incard.biz/<slug>) — thiết kế

**Ngày:** 2026-11-15 · **Trạng thái:** đã duyệt, đã dựng (figma-export/redesign/10-web-profile.html)

## Mục đích
Trang công khai của một thẻ InCard, mở khi quét QR, chạm thẻ NFC hoặc bấm link. Người xem **không cần cài app**. Đây là đích của nút "Hồ sơ web" trong Hồ sơ của tôi (đang chỉ hiện toast) và của chế độ "Hồ sơ online" trong sheet Chia sẻ (02-D1).

## Quy tắc đã chốt (của người dùng)
- **Đã đăng nhập** InCard trên trình duyệt: có nút **Kết nối**, bấm là gửi lời mời.
- **Chưa đăng nhập**: bấm Kết nối thì yêu cầu đăng nhập.
- Đăng nhập **ngay trên web** bằng bottom sheet (phương án A), không chuyển sang app.

## Đề xuất của Claude (có thể sửa)
- Lưu danh bạ (vCard), Đặt lịch, Nhắn tin (Zalo / SĐT / email), mạng xã hội, sản phẩm và portfolio **dùng được khi chưa đăng nhập**. Chỉ Kết nối cần tài khoản.
- Đăng nhập xong thì **tự gửi lời mời** và quay về trang với trạng thái "Đã gửi lời mời". Người xem không phải bấm lại.
- Nội dung theo thứ tự của A3 "Xem như người khác": bìa → avatar → tên, chức vụ (không có logo IA/IC) → Kết nối → 3 hành động → mạng xã hội → Ngành nghề → Giới thiệu → Thế mạnh → Dịch vụ → Đang tìm kiếm → Hợp tác → Sản phẩm → Portfolio. Mục trống không hiện.
- Thanh trên cùng giả lập trình duyệt (địa chỉ incard.biz/minhanh), header web gồm logo InCard + "Đăng nhập", hoặc avatar người xem khi đã đăng nhập.
- Cuối trang có dải "Tạo thẻ InCard miễn phí" (kênh thu hút người dùng mới), không chen vào phần nội dung chính.
- Chủ thẻ tự mở link của mình: không có nút Kết nối, không có dải nhắc (người dùng bỏ ngày 2026-11-15); 3 hành động thành Sao chép link / QR của tôi / Chia sẻ.
- "Đăng nhập" ở header: đăng nhập không kèm lời mời, xong về W6.

## Các màn
| Mã | Màn |
|---|---|
| W1 | Hồ sơ web — chưa đăng nhập (màn đầu) |
| W2 | Hồ sơ web — toàn trang |
| W3 | Bấm Kết nối → sheet "Đăng nhập để kết nối với Minh Anh" (Google · Apple · Email, "Chưa có tài khoản? Đăng ký" → W4, email mới thì tạo luôn tài khoản) |
| W4 | Đăng nhập bằng email (email → mã OTP) |
| W5 | Đã gửi lời mời (quay lại trang, nút đổi trạng thái + toast) |
| W6 | Đã đăng nhập, chưa kết nối: header có avatar, Kết nối gửi ngay |
| W6b | Đã kết nối → nút Nhắn tin, hành động Gọi |
| W7 | Lưu danh bạ (sheet: tải vCard / mở Danh bạ máy) |
| W8 | Chủ thẻ xem link của chính mình |
| W9 | Desktop (2 cột: thẻ cố định bên trái, nội dung bên phải) |
| W10 | Link không còn hiệu lực (thẻ đã tắt / sai địa chỉ) |

## Cách dựng
- File mới `figma-export/redesign/10-web-profile.html`, cùng khuôn các file 01–09 (rd.css, khung 390px, caption, capture script, Lucide).
- Dữ liệu mẫu: thẻ InApps Technology của Nguyễn Minh Anh (như A1/A2).
- Nối vào prototype: "Hồ sơ web" ở 03-A1/A2/A5/A6 mở W8 (chủ thẻ xem link của mình); các route trong W1–W7 bấm được; thêm vào `index.html`.

## Phương án đã cân nhắc
- **A. Đăng nhập trên web (chọn):** giữ người xem ở lại trang, tỉ lệ kết nối cao nhất. Tốn thêm màn W3–W4.
- **B. Chuyển sang app / cửa hàng ứng dụng:** ít màn hơn, nhưng nhiều người bỏ ngang ở bước cài app.

## Không làm
- Không viết trang web thật hay backend; đây chỉ là mockup.
- Không đổi thiết kế các màn trong app.
