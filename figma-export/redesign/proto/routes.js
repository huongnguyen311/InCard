/* ==========================================================================
   InCard Prototype — Bản đồ liên kết
   Khoá  = nhãn bắt đầu bằng chuỗi này (chữ trên nút, dòng, thẻ) hoặc '#tên-icon'
   Giá trị:
     'back'                  → quay lại màn trước
     '02-A1'                 → mở màn (file 02, mã A1)
     '02-A1|Thông báo'       → mở màn + hiện thông báo nhỏ (toast)
     'toast:Nội dung'        → chỉ hiện thông báo (tính năng hệ thống / ngoài phạm vi mockup)
   '*'  = bấm vào vùng còn lại của màn (mô phỏng camera, chạm thẻ, mở bài viết…)
   ========================================================================== */
(function () {
  const HOME = '02-A1', ACC = '08-A1', PROF = '03-A2';

  const TABS = { 'Trang chủ': HOME, 'Danh bạ': '04-A1', 'Quét': '05-B1', 'Khám phá': '06-A1', 'Tài khoản': ACC };

  const GLOBAL = {
    '#arrow-left': 'back', '#chevron-left': 'back', '#x': 'back', 'Đóng': 'back',
    'Hỏi Inka': '07-A1', 'Phóng to mã QR': '05-C5', '#bell': '02-C1', '#circle-help': '08-E1',
    'Trần Thuỷ (Helen)': '03-B1@helen', 'Trần Thuỷ': '03-B1@helen',
    'Hồ Văn Tâm': '03-B1@tam', 'Hồ Tâm': '03-B1@tam',
    'Lê Nhật Nam': '03-B1@nam', 'Đặng Phương': '03-B1@phuong', 'Võ Minh Khoa': '03-B1@khoa', 'Phạm Thu Lan': '03-B1@lan',
    'Trần Thị Hoài An': '03-B1@an', 'Lê Quốc Anh': '03-B1@quocanh', 'Nguyễn Gia Bảo': '03-B1@bao', 'Phan Đức Thịnh': '03-B4@thinh',
    'Gọi': 'toast:Mở ứng dụng gọi điện', 'Nhắn tin': '09-B1@?',
    'Zalo': 'toast:Mở Zalo', 'Messenger': 'toast:Mở Messenger',
  };

  const S = {
    /* ---------- 01 Auth & Onboarding ---------- */
    '01-A1': { '*': '01-A2' },
    '01-A2': { 'Tạo tài khoản miễn phí': '01-C1', 'Tôi đã có tài khoản': '01-B1', 'Tiếng Việt': 'toast:Chọn ngôn ngữ' },
    '01-B1': { 'Tiếp tục với Google': HOME + '|Đăng nhập bằng Google thành công', 'Tiếp tục với Apple': HOME + '|Đăng nhập bằng Apple thành công', 'Quên mật khẩu?': '01-B3', 'Đăng nhập': HOME + '|Chào mừng trở lại, Minh Anh', 'Đăng ký': '01-C1', '#arrow-left': '01-A2' },
    '01-B2': { 'Quên mật khẩu?': '01-B3', 'Đăng nhập': HOME + '|Chào mừng trở lại, Minh Anh', 'Đăng ký': '01-C1', '#arrow-left': '01-A2' },
    '01-B3': { 'Gửi liên kết': '01-B4' },
    '01-B4': { 'Quay lại đăng nhập': '01-B1', 'Mở ứng dụng email': 'toast:Mở ứng dụng Mail', 'Gửi lại': 'toast:Đã gửi lại email', '#x': '01-B1' },
    '01-C1': { 'Tiếp tục với Google': '01-D1|Đã liên kết Google', 'Tiếp tục với Apple': '01-D1|Đã liên kết Apple', 'Điều khoản sử dụng': '01-C2', 'Chính sách quyền riêng tư': '01-C2', 'Tạo tài khoản': '01-D1', 'Đăng nhập': '01-B1', '#arrow-left': '01-A2' },
    '01-C2': { 'Tôi đã hiểu': 'back' },
    '01-D1': { 'Tiếp tục': '01-D2' },   // ảnh đại diện: trang tự giả lập (data-js="av-*")
    '01-D2': { 'Hoàn tất': '01-D3', 'Thêm chức danh & công ty': 'toast:Mở thêm 1 cụm Chức danh & công ty bên dưới', 'Tìm trong hơn 100 ngành nghề': '01-D2b', '#chevron-down': '01-D2b', '#search': '01-D2b' },
    '01-D2b': { 'Xong': '01-D2', '#x': '01-D2' },
    '01-D3': { 'Kích hoạt thẻ InCard': '03-D1', 'Quét danh thiếp đầu tiên': '05-A1', 'Hoàn thiện hồ sơ': '03-F1', 'Vào trang chủ': '02-A3' },

    /* ---------- 02 Home ---------- */
    '02-A1': {
      'Chia sẻ lời mời': '02-D6', 'Lịch sử': '08-D5', 'Sao chép': 'toast:Đã sao chép link mời incard.biz/ref/nkax5v', 'Phóng to QR mời': '02-D5', 'Mã QR mời': '02-D5',
      'Chia sẻ thẻ': '02-D1', 'Xem hồ sơ': PROF, 'Cập nhật': '03-F1', 'Hồ sơ đã hoàn thiện': '03-F1',
      'AI': '07-A2', 'Tìm người': '07-A2', 'Quét danh thiếp': '05-B1', 'QR của tôi': '02-D1', 'Mời bạn bè': '02-D2', 'Kích hoạt thẻ': '03-D1',
      'Tất cả': '02-B2', 'Kết nối': '03-B5@?', 'Danh bạ': '04-A1', 'Xem hạng': '02-E2', 'Bạn': '02-E2',
      'Xem gói Premium': '02-E1', 'Quét danh thiếp không giới hạn': '02-E1', '#sparkles': '07-A1', 'Gói Miễn phí': '08-G1', 'Quản lý thẻ': '03-E1', 'Thẻ của tôi': '03-E1', 'Phó Chủ tịch': '03-A5', 'Giám đốc kinh doanh': PROF, 'Diễn giả': '03-A6', 'Nguyễn Minh Anh': PROF,
    },
    '02-A3': { 'Bỏ qua': HOME, 'Tiếp': HOME + '|Hướng dẫn 2/3 · 3/3 (rút gọn trong prototype)', '*': HOME },
    '02-B1': { 'Cập nhật hồ sơ': '03-F3', 'Ngành nghề': '03-F3', 'Sản phẩm / Dịch vụ': '03-F12' },
    '02-B2': { '#user-plus': '03-B5@?', 'Kết nối': '03-B5@?', 'Đã gửi lời mời': '03-B6@?', 'Bỏ qua': 'toast:Đã ẩn gợi ý này', 'Gợi ý mới': 'js:sugg', '#sliders-horizontal': 'toast:Bộ lọc gợi ý', 'Đã gửi lời mời': 'toast:Đang chờ phản hồi' },
    '02-C1': { 'Tất cả': '02-C1', 'Lời mời': '02-C1', 'Chấp nhận': 'toast:Đã chấp nhận lời mời kết nối', 'Từ chối': 'toast:Đã từ chối lời mời', '#check-check': 'toast:Đã đánh dấu tất cả là đã đọc' },
    '02-C2': { 'Chia sẻ thẻ của tôi': '02-D1' },
    '02-C3': { '#trash-2': '02-C4' },
    '02-C4': { 'Huỷ': '02-C3', '#x': '02-C3', 'Xoá lịch sử': '02-C5|Đã xoá lịch sử xem gần đây' },
    '02-C5': { 'Quét thẻ': '05-B1' },
    '02-D1': { 'Hồ sơ online': '02-D1', 'Danh bạ (vCard)': '02-D3', 'Email': 'toast:Mở ứng dụng Mail', 'Lưu ảnh QR': 'toast:Đã lưu ảnh QR vào thư viện', 'Khác': 'toast:Mở bảng chia sẻ của hệ điều hành', 'Sao chép': 'toast:Đã sao chép incard.biz/minhanh' },
    '02-D3': { 'Hồ sơ online': '02-D1', 'Danh bạ (vCard)': '02-D3', 'Email': 'toast:Mở ứng dụng Mail', 'Lưu ảnh QR': 'toast:Đã lưu ảnh QR vào thư viện', 'Khác': 'toast:Mở bảng chia sẻ của hệ điều hành', 'Lưu danh bạ': 'toast:Gửi file danh bạ .vcf', 'Thông tin trong vCard': 'toast:Chọn thông tin đưa vào vCard' },
    '02-D4': { 'Hồ sơ online': '02-D4', 'Danh bạ (vCard)': '02-D3', 'Email': 'toast:Mở ứng dụng Mail', 'Lưu ảnh QR': 'toast:Đã lưu ảnh QR vào thư viện', 'Khác': 'toast:Mở bảng chia sẻ của hệ điều hành', 'Sao chép': 'toast:Đã sao chép incard.biz/minhanh/clb-dnt' },
    '02-D2': { 'Phóng to QR mời': '02-D5', 'Mã QR mời': '02-D5', 'Gửi lời mời': '02-D6', 'Xem lịch sử giới thiệu': '08-D5', 'Sao chép': 'toast:Đã sao chép liên kết mời' },
    '02-D5': { 'Gửi link mời': '02-D6', 'NKAX5V': 'toast:Đã sao chép mã mời NKAX5V', '#x': 'back' },
    '02-E1': { 'Dùng thử 7 ngày': '08-G3', 'Khôi phục': 'toast:Đang khôi phục giao dịch…', 'Hàng năm': 'toast:Đã chọn gói năm', 'Hàng tháng': 'toast:Đã chọn gói tháng', 'Điều khoản': '01-C2', 'Quyền riêng tư': '01-C2' },
    '02-E3': { '#trophy': '02-E2', 'Quản lý thẻ': '03-E1', 'Giới thiệu bạn bè': '08-D5', 'Phạm Thu Lan tạo': '08-D5', 'Hồ Văn Tâm đặt hẹn': '08-D1', 'Kết nối với Trần Thuỷ': '03-B1@helen', 'Lê Nhật Nam quét': '03-B1@nam', 'Đặng Phương chạm': '03-B1@phuong', 'Hồ sơ được xem': 'toast:Xem ai đã xem hồ sơ (Premium)' },
    '02-E4': { 'Đã hiểu': 'back', '*': 'back' },
    '02-E5': { 'Chia sẻ thẻ': '02-D1', 'Hồ Văn Tâm đặt hẹn': '08-D1', 'Kết nối với Trần Thuỷ': '03-B1@helen', 'Lê Nhật Nam quét': '03-B1@nam', 'Đặng Phương chạm': '03-B1@phuong', 'Hồ sơ được xem': 'toast:Xem ai đã xem hồ sơ (Premium)' },
    '02-E2': { '#info': '02-E4', 'Cách tính điểm': '02-E4', 'Bạn': '02-E3' },

    /* ---------- 03 Profile & NFC ---------- */
    '03-A2': { '#arrow-left': HOME, '#eye': '03-A3', 'Kích hoạt thẻ NFC': '03-D1', 'Chỉnh sửa': '03-F1', 'Hồ sơ web': 'toast:Mở incard.biz/minhanh', 'QR của tôi': '02-D1', 'Chia sẻ': '02-D1', 'Giám đốc kinh doanh': '03-F1', 'Cố vấn chiến lược': '03-F1', 'Phó Chủ tịch': '03-F1', 'Ủy viên BCH': '03-F1', 'Dịch vụ chính': 'toast:Mở mục Dịch vụ chính', 'Đang tìm kiếm': 'toast:Mở mục Đang tìm kiếm', 'Hợp tác': 'toast:Mở mục Hợp tác', 'Tìm hiểu thêm': 'toast:Mở chi tiết sản phẩm', '#image': 'toast:Đổi ảnh bìa', '#camera': 'toast:Đổi ảnh đại diện', '#facebook': 'toast:Mở Facebook', '#linkedin': 'toast:Mở LinkedIn', '#youtube': 'toast:Mở YouTube', '#mail': 'toast:Mở ứng dụng Mail', '#phone': 'toast:Gọi điện' },
    '03-A5': { '#arrow-left': HOME, '#eye': '03-A3', 'Kích hoạt thẻ NFC': '03-D1', 'Chỉnh sửa': '03-F1', 'Hồ sơ web': 'toast:Mở incard.biz/minhanh', 'QR của tôi': '02-D1', 'Chia sẻ': '02-D1', 'Giám đốc kinh doanh': '03-F1', 'Cố vấn chiến lược': '03-F1', 'Phó Chủ tịch': '03-F1', 'Ủy viên BCH': '03-F1', 'Dịch vụ chính': 'toast:Mở mục Dịch vụ chính', 'Đang tìm kiếm': 'toast:Mở mục Đang tìm kiếm', 'Hợp tác': 'toast:Mở mục Hợp tác', 'Tìm hiểu thêm': 'toast:Mở chi tiết sản phẩm', '#image': 'toast:Đổi ảnh bìa', '#camera': 'toast:Đổi ảnh đại diện', '#facebook': 'toast:Mở Facebook', '#linkedin': 'toast:Mở LinkedIn', '#youtube': 'toast:Mở YouTube', '#mail': 'toast:Mở ứng dụng Mail', '#phone': 'toast:Gọi điện' },
    '03-A4': { 'Thẻ InApps Technology': '03-A2', 'Thẻ CLB Doanh nhân trẻ': '03-A5', 'Thẻ Mentor khởi nghiệp': '03-A6', 'Quản lý thẻ': '03-E1', 'Tạo thẻ mới': '03-E3', '#x': 'back' },
    '03-A3': { 'Thoát': PROF, 'Kết nối': 'toast:Người xem bấm để gửi lời mời kết nối', 'Lưu danh bạ': 'toast:Người xem lưu bạn vào danh bạ', 'Đặt lịch': 'toast:Người xem đặt lịch với bạn', 'Nhắn tin': 'toast:Người xem nhắn tin cho bạn' },
    '03-B1': { '#ellipsis-vertical': '03-B2', 'Đã kết nối': '03-B3', 'Lưu danh bạ': 'toast:Đã lưu vào danh bạ điện thoại', 'Nhắn tin': '09-B1', 'Đặt lịch': '03-B15', 'Gắn nhãn': '04-C4', 'Tìm hiểu thêm': 'toast:Mở chi tiết sản phẩm', 'Dịch vụ chính': 'toast:Mở mục Dịch vụ chính', 'Đang tìm kiếm': 'toast:Mở mục Đang tìm kiếm', 'Hợp tác': 'toast:Mở mục Hợp tác' },
    '03-B2': { 'Huỷ kết nối': '03-B3', 'Chia sẻ hồ sơ': '03-B10', 'Gắn nhãn': '04-C4', 'Báo cáo': 'toast:Đã gửi báo cáo', 'Đóng': '03-B1' },
    '03-B3': { 'Giữ kết nối': '03-B1', 'Huỷ kết nối': '03-B4|Đã huỷ kết nối · Hoàn tác' },
    '03-C1': { 'Thêm Điện thoại': '03-F1|Đã thêm Điện thoại', 'Thêm Zalo': '03-F1|Đã thêm Zalo', 'Thêm Email': '03-F1|Đã thêm Email', 'Thêm Website': '03-F1|Đã thêm Website', 'Thêm Facebook': '03-F1|Đã thêm Facebook', 'Thêm LinkedIn': '03-F1|Đã thêm LinkedIn', 'Thêm WhatsApp': '03-F1|Đã thêm WhatsApp', 'Thêm TikTok': '03-F1|Đã thêm TikTok', 'Thêm YouTube': '03-F1|Đã thêm YouTube', 'Thêm Instagram': '03-F1|Đã thêm Instagram', 'Thêm Địa chỉ': '03-F1|Đã thêm Địa chỉ', 'Thêm Khác': '03-F1|Đã thêm Khác', '#x': 'back' },
    '03-C3': { 'Thêm vào thẻ': '03-F8', '#x': 'back' },
    '03-D1': { 'Bắt đầu': '03-D2', 'Mua thẻ InCard': 'toast:Mở cửa hàng thẻ InCard', '#x': 'back' },
    '03-D2': { 'Nhập mã thủ công': 'toast:Nhập mã 8 ký tự in trên thẻ', '#flashlight': 'toast:Bật đèn pin', '*': '03-D3' },
    '03-D3': { 'Huỷ': '03-D1', '*': '03-D4' },
    '03-D4': { 'Đặt tên cho thẻ': 'toast:Đổi tên thẻ', 'Thử chạm thẻ': 'toast:Chạm thẻ vào điện thoại khác để thử', 'Về trang chủ': HOME, '#x': HOME },
    '03-D5': { 'Thử lại': '03-D3', 'Mở cài đặt NFC': 'toast:Mở Cài đặt › NFC', 'Liên hệ hỗ trợ': '08-E1' },
    '03-E1': { '#arrow-left': ACC, '#ellipsis-vertical': '03-E2', 'Tạo thẻ': '03-E3', '#plus': '03-E3', 'Thành viên': '03-E5', 'Thẻ của tôi': '03-E1', '312 xem': '03-A5', '96 xem': '03-A6', 'Phó Chủ tịch · CLB': '03-A5', 'Diễn giả · Mentor': '03-A6', '1.248 xem': PROF, 'Giám đốc kinh doanh': '03-F1', 'Phó Chủ tịch': '03-F1', '*': PROF },
    '03-E3': { '#x': '03-E1', 'Tiếp tục': '03-E3b' },
    '03-E3b': { '#arrow-left': '03-E3', 'Tìm trong hơn 100 ngành nghề': '03-F3', 'Thêm chức danh & công ty': 'toast:Mở thêm 1 cụm Chức danh & công ty bên dưới', 'Tiếp tục': '03-E3c' },
    '03-E3c': { '#arrow-left': '03-E3b', 'Thêm mạng xã hội': '03-C1', 'Thêm thế mạnh': '03-F11', 'Thêm dịch vụ': '03-A8', 'Thêm nhu cầu': '03-A9', 'Thêm hình thức hợp tác': '03-A10', 'Thêm sản phẩm': '03-F12', 'Thêm video': '03-F13', 'Thêm ảnh': '03-F13', 'Tạo thẻ': '03-E3d' },
    '03-E3d': { 'Gắn thẻ NFC': '03-D1', 'Chia sẻ thẻ': '02-D1', 'Xem hồ sơ thẻ': '03-A3', 'Về Thẻ của tôi': '03-E1|Đã tạo thẻ mới' },
    '03-E2': { '#x': '03-E1', 'Sửa thẻ': '03-F1', 'QR & link của thẻ': '02-D1', 'Nhân bản thẻ': '03-E3|Đã sao chép nội dung từ thẻ này — kiểm tra lại thông tin cho thẻ mới', 'Xoá thẻ': '03-E4', '*': '03-E1' },
    '03-E4': { 'Giữ thẻ': '03-E1', 'Xoá thẻ': '03-E1|Đã xoá thẻ', '#arrow-left': '03-E1', '*': '03-E1' },

    /* ---------- 04 Network ---------- */
    '04-A1': {}, '04-A2': { 'Quét danh thiếp giấy': '05-B1', 'Lưu tất cả': 'toast:Đã lưu 2 danh thiếp vào Danh bạ', '*': '05-B3' },
    '04-A3': {}, '04-A4': { 'Cho phép truy cập danh bạ': '04-A7|Đã nhập 286 liên hệ từ điện thoại', 'Để sau': '04-A1' },
    '04-A7': { 'Điện thoại': '04-A7', 'Tìm': 'toast:Gõ tên hoặc số điện thoại' },
    /* Liên hệ KHÔNG dùng InCard: không có hồ sơ InCard */
    '04-E1': { '#pencil': 'toast:Sửa thông tin liên hệ', 'SMS': 'toast:Mở ứng dụng Tin nhắn', 'Email': 'toast:Mở ứng dụng Mail', 'Đặt lịch': '08-D1', 'Thêm nhãn': '04-C4', 'Thêm ghi chú': 'toast:Thêm ghi chú', 'Di động': 'toast:Đã sao chép số điện thoại', 'Nguồn': 'toast:Liên hệ được lưu từ nguồn này' },
    '04-E2': { 'SMS': 'toast:Mở ứng dụng Tin nhắn', 'Lưu vào Danh bạ InCard': '04-A3|Đã lưu vào tab Đã lưu', 'Di động': 'toast:Đã sao chép số điện thoại' },
    '04-A5': { 'Chia sẻ thẻ của bạn': '02-D1', 'Quét danh thiếp': '05-B1' },
    '04-B1': { 'Xem 12 kết quả': '04-A1|Đang lọc: 12 liên hệ', 'Đặt lại': 'toast:Đã xoá bộ lọc', '#x': '04-A1' },
    '04-B2': { 'Sửa câu hỏi': '07-D2', '#arrow-left': '04-A1', '*': '03-B1@?' },
    '04-C1': { '#arrow-left': '04-A1', '#ellipsis-vertical': '04-C2', 'Xem hồ sơ InCard': '03-B1', 'Email': 'toast:Mở ứng dụng Mail', 'Đặt lịch': '08-D1', 'Thêm ghi chú': 'toast:Thêm ghi chú', '#star': 'toast:Đã thêm vào Yêu thích', 'Thêm': 'toast:Tạo lịch hẹn / công việc', 'Khách hàng': '04-C4', 'Tiềm năng': '04-C4', 'Nhãn': '04-C4', 'Di động': 'toast:Đã sao chép số điện thoại' },
    '04-C2': { 'Huỷ kết nối': '04-C3', 'Gắn nhãn': '04-C4', 'Sửa thông tin': 'toast:Sửa thông tin liên hệ', 'Chia sẻ liên hệ': 'toast:Mở bảng chia sẻ', 'Lưu vào danh bạ': 'toast:Đã lưu vào danh bạ điện thoại', 'Xuất file vCard': 'toast:Đã xuất file .vcf', 'Đóng': '04-C1' },
    '04-C3': { 'Huỷ kết nối': '03-B4|Đã huỷ kết nối · Hoàn tác', 'Giữ kết nối': 'back' },
    '04-C4': { 'Lưu (2 nhãn)': 'back|Đã gắn 2 nhãn', 'Huỷ': 'back', '#x': 'back', 'Tạo nhãn mới': 'toast:Đã tạo nhãn "Techfest 2026"' },
    '04-D1': { 'Đồng bộ ngay': '04-D2', 'Ngắt kết nối Google': '08-C1', '#x': '04-A1' },
    '04-D2': {},

    /* ---------- 05 Scan ---------- */
    '05-A1': { 'Cho phép máy ảnh': '05-B1', 'Để sau': '05-A2' },
    '05-A2': { 'Mở Cài đặt': '05-B1', 'Chọn ảnh từ thư viện': '05-B3', 'nhập liên hệ thủ công': 'toast:Mở form nhập liên hệ' },
    '05-B1': { '#x': HOME, 'Nhiều thẻ': '05-B2', 'Một thẻ': '05-B1', 'Danh thiếp': '05-B1', 'Mã QR': '05-C1', 'QR của tôi': '02-D1', 'Thư viện': '05-B3', 'Nhập tay': 'toast:Mở form nhập liên hệ', '#zap-off': 'toast:Bật đèn flash', '*': '05-B3' },
    '05-B2': { '#x': HOME, 'Một thẻ': '05-B1', 'Danh thiếp': '05-B1', 'Mã QR': '05-C1', 'QR của tôi': '02-D1', 'Xem & lưu': '05-B4', '*': '05-B4' },
    '05-B3': { 'Lưu liên hệ': '04-A2|Đã lưu Phạm Minh Thư vào Danh bạ', 'Quét lại': '05-B1', 'Sửa thành': 'toast:Đã sửa email' },
    '05-B4': { 'Lưu tất cả (3)': '05-B5', 'Quét thêm thẻ': '05-B2', 'Nhãn': '04-C4', '*': '05-B3' },
    '05-B5': { 'Quét tiếp': '05-B1', 'Quét danh thiếp giấy': '05-B1' },
    '05-C1': { '#x': HOME, 'Danh thiếp': '05-B1', 'Mã QR': '05-C1', 'QR của tôi': '02-D1', 'Ảnh có mã QR': 'toast:Mở thư viện ảnh', '*': '05-C2' },
    '05-C2': { 'Kết nối': '03-B1@thinh|Đã gửi lời mời kết nối', 'Lưu danh bạ': 'toast:Đã lưu vào danh bạ', 'Xem hồ sơ': '03-B1@thinh', 'Quét mã khác': '05-C1', '#x': '05-C1' },
    '05-C3': { '#x': 'back', 'Danh bạ offline': '05-C4', 'Hồ sơ online': '05-C3', 'Chia sẻ': 'toast:Mở bảng chia sẻ của hệ điều hành', 'Lưu ảnh': 'toast:Đã lưu ảnh QR', 'Sao chép liên kết': 'toast:Đã sao chép incard.biz/minhanh', '#pencil': '03-F1', 'Danh thiếp': '05-B1', 'Mã QR': '05-C1' },
    '05-C4': { '#x': 'back', 'Hồ sơ online': '05-C3', 'Danh bạ offline': '05-C4', 'Chia sẻ': 'toast:Mở bảng chia sẻ của hệ điều hành', 'Lưu ảnh': 'toast:Đã lưu ảnh QR', 'Chọn thông tin': 'toast:Chọn thông tin đưa vào vCard', '#pencil': '03-F1', 'Danh thiếp': '05-B1', 'Mã QR': '05-C1' },

    /* ---------- 06 Explore ---------- */
    '05-C5': { '#x': 'back', 'Hồ sơ online': '05-C5', 'Danh bạ offline': 'toast:Mã danh bạ offline dày hơn – đưa máy lại gần 20–30 cm', 'incard.biz': 'toast:Người kia có thể gõ link này nếu không quét được', 'Vuốt ngang': 'toast:Đã chuyển sang Thẻ CLB Doanh nhân trẻ' },
    '06-A1': { 'Dành cho bạn': '06-A1', 'Tin tức': '06-A3', 'Của tôi': '06-C2', '#square-pen': '06-D1', '#search': 'toast:Tìm bài viết', 'Kết nối': 'toast:Đã gửi lời mời kết nối', 'Tham gia': 'toast:Đã đăng ký tham gia sự kiện', '*': '06-B1' },
    '06-A2': { 'Dành cho bạn': '06-A1', 'Tin tức': '06-A3', 'Của tôi': '06-C2', '#square-pen': '06-D1', 'Thống kê': '06-C2', 'Xem': '06-B1', '*': '06-B1' },
    '06-A3': { 'Dành cho bạn': '06-A1', 'Tin tức': '06-A3', 'Của tôi': '06-C2', '#square-pen': '06-D1', '*': '06-B1' },
    '06-B1': { '#arrow-left': '06-A1', 'Kết nối': 'toast:Đã gửi lời mời kết nối', '#bookmark': 'toast:Đã lưu bài viết', '#share-2': 'toast:Mở bảng chia sẻ với link bài viết', '#heart': 'toast:Đã thích', 'Xem thêm': 'toast:Tải thêm bình luận' },
    '06-C1': { 'Dành cho bạn': '06-A1', 'Tin tức': '06-A3', 'Của tôi': '06-C2', '#square-pen': '06-D1', 'Tạo bài viết đầu tiên': '06-D1', 'Giới thiệu sản phẩm': '06-D2', 'Tìm đối tác': '06-D2', 'Chia sẻ sự kiện': '06-D2' },
    '06-C2': { 'Dành cho bạn': '06-A1', 'Tin tức': '06-A3', 'Của tôi': '06-C1|Trạng thái chưa có bài (để so sánh)', '#square-pen': '06-D1', 'Viết tiếp': '06-D2', 'Sửa bài viết': '06-D2', 'Xoá bài viết': 'toast:Cần xác nhận trước khi xoá', 'Ẩn khỏi bảng tin': 'toast:Đã ẩn bài viết', 'Xem thống kê': 'toast:1.248 lượt xem · 86 lượt thích' },
    '06-D1': { 'Tiếp tục': '06-D2', '#x': '06-A1' },
    '06-D2': { 'Đăng bài': '06-A2', 'Xem trước': 'toast:Xem trước bài viết', '#x': '06-D4', 'Viết bằng AI': '06-D3' },
    '06-D3': { 'Dùng nội dung này': '06-D2|Đã chèn nội dung do Inka viết', '#x': '06-D2', 'Viết lại': 'toast:Inka đang viết lại…' },
    '06-D4': { 'Lưu bản nháp': '06-C2|Đã lưu bản nháp', 'Tiếp tục chỉnh sửa': '06-D2', 'Bỏ bài viết': '06-A1' },

    /* ---------- 07 Inka AI ---------- */
    '07-A1': { '#arrow-left': HOME, 'Tìm hồ sơ': '07-A2', 'Trợ lý': '07-A1', '#history': '07-C1', '#square-pen': 'toast:Cuộc trò chuyện mới', '#mic': '07-C2', 'Soạn email': '07-D1', '*': '07-A3' },
    '07-A2': { '#arrow-left': HOME, 'Trợ lý': '07-A1', 'Tìm hồ sơ': '07-A2', '#history': '07-C1', '#mic': '07-C2', '*': '07-B1' },
    '07-A3': { '#arrow-left': HOME, 'Trợ lý': '07-A1', 'Tìm hồ sơ': '07-A2', '#history': '07-C1', 'Xác nhận': '08-D2|Đã tạo công việc "Gọi điện cho anh Hồ Tâm"', 'Sửa': 'toast:Sửa nội dung công việc', '#mic': '07-C2' },
    '07-B1': { '#arrow-left': HOME, 'Trợ lý': '07-A1', 'Tìm hồ sơ': '07-A2', '#history': '07-C1', 'Xem': '03-B1@?', 'Kết nối': 'toast:Đã gửi lời mời kết nối', '#mic': '07-C2' },
    '07-C1': { '#x': 'back', 'Cuộc trò chuyện mới': '07-A1', 'Đổi tên': 'toast:Đổi tên cuộc trò chuyện', 'Ghim': 'toast:Đã ghim', 'Xoá': 'toast:Đã xoá cuộc trò chuyện', '*': '07-A3' },
    '07-C2': { '#x': '07-A1', '*': '07-A3' },
    '07-D1': { '#arrow-left': HOME, 'Nâng cấp Premium': '02-E1', 'Để sau': '07-A1', 'Trợ lý': '07-A1', 'Tìm hồ sơ': '07-A2' },
    '07-D2': { 'Lọc danh bạ': '04-B2', '#x': '04-A1' },

    /* ---------- 08 Account & Settings ---------- */
    '08-A1': {
      'Gói của tôi': '08-G1', 'Gói Miễn phí': '08-G1', '#qr-code': '05-C3', 'Xem hồ sơ': PROF, 'Nguyễn Minh Anh': PROF, 'Thông tin tài khoản': '08-B1', 'Danh thiếp của tôi': '03-E1', 'Nhóm của tôi': '08-D4',
      'Lịch hẹn': '08-D1', 'Công việc': '08-D2', 'Bảng xếp hạng': '02-E2', 'Mời bạn bè': '08-D5', 'Ngôn ngữ': '08-B3', 'Tài khoản Google': '08-C1',
      'Thông báo': 'toast:Cài đặt thông báo (chưa vẽ)', 'Quyền riêng tư': '08-B4', 'Đổi mật khẩu': '08-B2', 'Trung tâm trợ giúp': '08-E1', 'Có gì mới': '08-E2',
      'Tiện ích màn hình': 'toast:Hướng dẫn thêm widget InCard', 'Gửi phản hồi': '08-E3', 'Đăng xuất': '08-F1', 'InCard Premium': '02-E1', 'Xem gói': '02-E1', 'Nâng cấp': '02-E1',
    },
    '08-B1': { 'Lưu thay đổi': 'toast:Đã lưu thay đổi', 'Đổi email': 'toast:Gửi mã xác nhận tới email mới', '#arrow-left': ACC },
    '08-B2': { 'Cập nhật mật khẩu': ACC + '|Đã đổi mật khẩu', 'Quên mật khẩu?': '01-B3', '#arrow-left': ACC },
    '08-B3': { 'English': 'toast:Đã chuyển sang English (demo)', 'Tiếng Việt': 'toast:Đang dùng Tiếng Việt', '#arrow-left': ACC },
    '08-B4': { 'Xoá tài khoản': '08-F2', 'Đổi mật khẩu': '08-B2', 'Thiết bị đăng nhập': 'toast:2 thiết bị đang đăng nhập', 'Chính sách quyền riêng tư': '01-C2', 'Hiển thị': 'toast:Đã cập nhật quyền riêng tư', 'Cho phép AI': 'toast:Đã cập nhật quyền riêng tư', '#arrow-left': ACC },
    '08-C1': { 'Kết nối với Google': '08-C2|Đã kết nối Google', 'Để sau': ACC, '#arrow-left': ACC },
    '08-C2': { 'Ngắt kết nối Google': '08-C1|Đã ngắt kết nối Google', 'Đồng bộ ngay': 'toast:Đang đồng bộ…', '#arrow-left': ACC },
    '08-D1b': { 'Về hôm nay': '08-D1', '12': '08-D1', 'Bật': '08-C1', '#plus': 'toast:Tạo lịch hẹn mới', 'Chấp nhận': 'toast:Đã xác nhận lịch hẹn với Hồ Văn Tâm', 'Đổi giờ': 'toast:Đề xuất giờ khác cho Hồ Văn Tâm', 'Trần Quốc Bảo': 'toast:Mở hồ sơ Trần Quốc Bảo', '#arrow-left': ACC },
    '08-D1': { '16': '08-D1b', 'Phạm Thu Lan': 'toast:Mở hồ sơ Phạm Thu Lan', 'Bật': '08-C1', '#plus': 'toast:Tạo lịch hẹn mới', '#search': 'toast:Tìm lịch hẹn', 'Hôm nay': 'toast:Về hôm nay', '#chevron-left': 'toast:Tháng 10, 2026', '#chevron-right': 'toast:Tháng 12, 2026', 'Chỉ đường': 'toast:Mở Google Maps tới Highlands Lê Lợi', 'Nhắn tin': 'toast:Mở cuộc trò chuyện với Trần Quốc Bảo', 'Chấp nhận': 'toast:Đã xác nhận lịch hẹn với Hồ Văn Tâm', 'Đổi giờ': 'toast:Đề xuất giờ khác cho Hồ Văn Tâm', 'Lê Thu Hà': '04-C1', 'Demo sản phẩm': 'toast:Mở chi tiết lịch hẹn', 'Demo thẻ NFC': 'toast:Mở chi tiết lịch hẹn', '#arrow-left': ACC },
    '08-D2': { 'Kết nối': '08-C1', '#plus': 'toast:Thêm công việc', 'Tháng': 'toast:Xem theo tháng', '*': '08-D3', '#arrow-left': ACC },
    '08-D3': { 'Quay về hôm nay': '08-D2', 'Thêm công việc': 'toast:Thêm công việc', '#plus': 'toast:Thêm công việc', '#arrow-left': ACC },
    '08-D4': { 'Tạo nhóm': 'toast:Tạo nhóm mới', 'Quản lý': 'toast:Quản lý nhóm', 'Mời thành viên': 'toast:Mời thành viên', 'Xem': 'toast:Xem nhóm', '#arrow-left': ACC },
    '08-D5': { 'Chia sẻ lời mời': '02-D6', 'Lọc': 'toast:Lọc lịch sử', '#arrow-left': ACC },
    '08-E1': { 'Chat với hỗ trợ': 'toast:Mở chat với đội hỗ trợ', 'Xem tất cả': 'toast:Tất cả video hướng dẫn', '#arrow-left': ACC },
    '08-E2': { '#arrow-left': ACC },
    '08-E3': { 'Gửi phản hồi': '08-E4', '#x': ACC },
    '08-E4': { 'Về trang Tài khoản': ACC, 'Gửi thêm phản hồi': '08-E3', '#x': ACC },
    '08-F1': { 'Đăng xuất': '01-A2|Đã đăng xuất', 'Ở lại': ACC },
    '08-F2': { 'Xoá tài khoản': '08-F3', 'Giữ tài khoản': '08-B4', '#arrow-left': '08-B4' },
    '08-G1': { 'Nâng cấp Premium': '02-E1', '#arrow-left': ACC },
    '08-G2': { 'Lịch sử thanh toán': 'toast:Lịch sử thanh toán', 'Quản lý gói': 'toast:Mở App Store › Đăng ký', '#arrow-left': ACC },
    '08-G3': { '*': '08-G2' },
    '08-F3': { 'Xoá vĩnh viễn': '01-A2|Tài khoản đã được xoá', 'Huỷ': '08-F2' },
  };

  /* Danh bạ tabs dùng chung cho 04-A*, 04-D2, 05-B5 */
  const NET = { 'Kết nối': '04-A1', 'Danh thiếp': '04-A2', 'Đã lưu': '04-A3', 'Điện thoại': '04-A4', '312 liên hệ': '04-D1', '315 liên hệ': '04-D1', '0 liên hệ': '08-C1', 'Hỏi AI': '07-D2', '#user-plus': '05-B1',
    '#sliders-horizontal': '04-B1', '#list-filter': '04-B1', '#filter': '04-B1', 'Đã đồng bộ Google': '04-D1', 'Đang đồng bộ': '04-D1', 'Chưa kết nối Google': '08-C1', 'Tìm': 'toast:Gõ tên, công ty hoặc số điện thoại', 'Trần Thuỷ (Helen)': '03-B1@helen', 'Trần Thuỷ': '03-B1@helen', '*': '03-B1@?' };
  ['04-A1', '04-A2', '04-A3', '04-A4', '04-A7', '04-D2', '05-B5'].forEach(k => { S[k] = Object.assign({}, NET, S[k]); });
  /* Màn đầu trùng với màn toàn trang → dùng chung liên kết */
  S['02-A2'] = S['02-A1']; S['03-A1'] = S['03-A2']; S['08-A2'] = S['08-A1'];
  S['01-B2'] = Object.assign({}, S['01-B1'], S['01-B2']);


  /* ---- Sửa trực tiếp (WYSIWYG) ---- */
  const ED = { '#x': '03-F5', 'Nguyễn Minh Anh': '03-F2', 'Ngành nghề': '03-F3', 'Công nghệ thông tin': '03-F3', 'Phần mềm & SaaS': '03-F3', 'Tư vấn quản lý': '03-F3', 'Kinh doanh – Bán hàng': '03-F3', 'Thêm': '03-F3',
    'Thêm chức vụ': '03-C3', 'Giám đốc kinh doanh': 'toast:Chạm để sửa chức vụ tại chỗ', 'Cố vấn chiến lược': 'toast:Chạm để sửa chức vụ tại chỗ', 'Đổi ảnh bìa': '03-F14', '#camera': '03-F16',
    'Hơn 10 năm': 'toast:Sửa trực tiếp đoạn giới thiệu', 'Thêm thế mạnh': '03-F11', 'Đang tìm kiếm': '03-A9', 'Thêm dịch vụ': '03-A8', 'Thêm hình thức hợp tác': '03-A10', 'Hợp tác': '03-A10', 'Thêm nhu cầu': '03-A9',
    'Thêm sản phẩm': '03-F12', 'Thêm ảnh / video': '03-F13', 'Lưu thay đổi': '03-F6',
    '#minus': 'toast:Đã xoá · Hoàn tác', '#circle-minus': 'toast:Đã xoá · Hoàn tác', '#grip-vertical': 'toast:Giữ và kéo để đổi thứ tự', '#eye': 'toast:Đã ẩn mục này với người xem', '#eye-off': 'toast:Đã hiện lại mục này',
    '#plus': '03-C1', '#pencil': 'toast:Sửa mục này' };
  S['03-F1'] = ED; S['03-F1b'] = ED;
  S['03-F2'] = { 'Xong': '03-F1|Đã cập nhật tên', '*': '03-F1|Đã cập nhật tên' };
  S['03-F3'] = { 'Xong': '03-F1|Đã cập nhật ngành nghề', '#x': 'back' };
  S['03-F5'] = { 'Lưu & thoát': '03-F6', 'Bỏ thay đổi': PROF, 'Tiếp tục sửa': '03-F1' };
  S['03-F8'] = ED;
  S['03-F11'] = { '#x': 'back', 'Thêm thế mạnh': '03-F1|Đã thêm thế mạnh', 'Quản lý key account': 'toast:Đã điền gợi ý vào ô', 'Xây dựng kênh phân phối': 'toast:Đã điền gợi ý vào ô', 'Đào tạo đội ngũ sales': 'toast:Đã điền gợi ý vào ô', 'Đàm phán hợp đồng lớn': 'toast:Đã điền gợi ý vào ô' };
  S['03-F12'] = { '#x': 'back', 'Thêm sản phẩm': '03-F1|Đã thêm sản phẩm', 'Tải ảnh sản phẩm': 'toast:Mở thư viện ảnh' };
  S['03-F13'] = { '#x': 'back', 'Thêm vào Portfolio': '03-F1|Đã thêm vào Portfolio', 'Lưu video': '03-F1|Đã cập nhật video Portfolio', 'Thêm': 'toast:Chọn thêm ảnh / video' };
  S['03-F14'] = { '#x': 'back', 'Chụp ảnh': '03-F15', 'Chọn từ thư viện': '03-F15', 'Xoá ảnh bìa': '03-F1|Đã xoá ảnh bìa' };
  S['03-F15'] = { 'Huỷ': 'back', 'Xong': '03-F1|Đã đổi ảnh bìa', 'Xoay': 'toast:Đã xoay 90°', 'Đặt lại': 'toast:Đã đặt lại khung cắt' };
  S['03-F16'] = { '#x': 'back', 'Chụp ảnh': '03-F17', 'Chọn từ thư viện': '03-F17', 'Xoá ảnh đại diện': '03-F1|Đã xoá ảnh đại diện' };
  S['03-F17'] = { 'Huỷ': 'back', 'Xong': '03-F1|Đã đổi ảnh đại diện', 'Xoay': 'toast:Đã xoay 90°', 'Đặt lại': 'toast:Đã đặt lại khung cắt' };
  S['03-F7'] = Object.assign({}, ED, { 'Hoàn tác': '03-F1|Đã khôi phục "Cố vấn chiến lược"' });
  S['03-F6'] = Object.assign({}, S['03-A2'], { 'Xem thử': '03-A3' });

  /* ---- bổ sung hành động cho các nút còn lại (rà ngày 12/11) ---- */
  const addTo = (k, obj) => { S[k] = Object.assign({}, S[k] || {}, obj); };
  const PF_VIEW = {
    'Công nghệ thông tin': 'toast:Xem người cùng ngành Công nghệ thông tin', 'Phần mềm & SaaS': 'toast:Xem người cùng ngành Phần mềm & SaaS', 'Tư vấn quản lý': 'toast:Xem người cùng ngành Tư vấn quản lý', 'Kinh doanh – Bán hàng': 'toast:Xem người cùng ngành Kinh doanh – Bán hàng',
    'Nông nghiệp': 'toast:Xem người cùng ngành Nông nghiệp', 'Hoá chất': 'toast:Xem người cùng ngành Hoá chất', 'Thương mại': 'toast:Xem người cùng ngành Thương mại', 'Xây dựng': 'toast:Xem người cùng ngành Xây dựng',
    'Techfest 2026': 'toast:Mở ảnh portfolio', 'Đội ngũ InApps': 'toast:Mở ảnh portfolio', 'Văn phòng Q.3': 'toast:Mở ảnh portfolio', 'Demo thẻ NFC': 'toast:Mở video portfolio',
    'Vietglobal Founders': 'toast:Mở ảnh portfolio', 'Workshop Sales': 'toast:Mở ảnh portfolio', 'Đối tác MISA': 'toast:Mở ảnh portfolio', 'Tư vấn SME': 'toast:Mở ảnh portfolio',
    'Dự án chuyển đổi số': 'toast:Phát video portfolio', 'Gặp InCard tại CTO Summit': 'toast:Phát video portfolio',
  };
  S['03-A6'] = Object.assign({}, S['03-A5'], { 'Diễn giả': '03-F1' });
  ['03-A2', '03-A5', '03-A6', '03-F6', '03-B1', '03-B4', '03-B6', '03-B8'].forEach(k => addTo(k, PF_VIEW));
  S['03-A1'] = S['03-A2'];
  const HOME_X = { 'Phó Chủ tịch': '02-A4' };
  addTo('02-A1', HOME_X); S['02-A2'] = S['02-A1'];
  S['02-A4'] = Object.assign({}, S['02-A1'], { 'Chia sẻ thẻ': '02-D4', 'Phó Chủ tịch': '03-A5', 'Giám đốc kinh doanh': '02-A1', 'Xem hồ sơ': '03-A5', 'Nguyễn Minh Anh': '03-A5' });
  addTo('02-A3', { 'Chia sẻ thẻ': '02-D1', 'Xem hồ sơ': PROF });
  addTo('02-C2', { 'Lời mời': '02-C2', 'Tất cả': '02-C1' });
  addTo('04-C1', { 'Công ty': 'toast:Mở trang công ty', 'Nguồn kết nối': 'toast:Kết nối qua chạm thẻ NFC lúc 16:32 12/11/2026', 'TH 2': '08-D1', 'Cà phê bàn hợp tác': '08-D1', 'Gửi báo giá': '08-D2' });
  addTo('05-B2', { '#zap': 'toast:Tắt đèn flash' });
  addTo('05-C1', { '#zap-off': 'toast:Bật đèn flash' });
  addTo('05-C2', { '#zap-off': 'toast:Bật đèn flash' });
  addTo('05-B5', { '*': '05-B3' });
  addTo('05-B3', { 'Techfest 2026': 'toast:Đã gắn nhãn Techfest 2026', 'Khách hàng': 'toast:Đã gắn nhãn Khách hàng', 'Đối tác': 'toast:Đã gắn nhãn Đối tác', 'Nhãn': '04-C4' });
  addTo('06-B1', { '#Outsourcing': 'toast:Xem bài cùng chủ đề #Outsourcing', '#Tuyển dụng IT': 'toast:Xem bài cùng chủ đề #Tuyển dụng IT', '#Công nghệ': 'toast:Xem bài cùng chủ đề #Công nghệ', 'Mới nhất': 'toast:Sắp xếp bình luận: Mới nhất / Nổi bật' });
  addTo('06-C2', { '#search': 'toast:Tìm trong bài viết của tôi', 'Mới nhất': 'toast:Sắp xếp: Mới nhất / Nhiều lượt xem' });
  ['07-A1', '07-A2', '07-A3', '07-B1', '07-D1'].forEach(k => addTo(k, { '#square-pen': '07-A1|Đã mở cuộc trò chuyện mới', '#history': '07-C1' }));
  addTo('07-A3', { 'Thêm ghi chú cuộc gọi': 'toast:Inka đã thêm ghi chú vào liên hệ Hồ Tâm', 'Soạn email cho anh Tâm': 'toast:Inka đang soạn email…' });
  addTo('08-D5', { 'Chép': 'toast:Đã sao chép liên kết mời' });
  addTo('08-G2', { 'Quét danh thiếp': '05-B1', 'Inka AI': '07-A1', 'Đồng bộ Google': '08-C2', 'Gợi ý kết nối': '02-B2' });
  addTo('08-C2', { 'Danh bạ': 'toast:46 liên hệ đã đồng bộ', 'Lịch': '08-D1', 'Công việc': '08-D2', 'Gửi email bằng Gmail': 'toast:Bật để Inka gửi email thay bạn' });
  addTo('04-D1', { 'minhanh@inapps.net': '08-C2' });
  addTo('04-A5', { '#user-plus': '05-B1', 'Kết nối': '04-A5', 'Danh thiếp': '04-A2', 'Đã lưu': '04-A3', 'Điện thoại': '04-A4', '0 liên hệ': '08-C1' });

  /* ---- 1 người dùng nhiều thẻ: luôn hỏi chọn thẻ khi chia sẻ / gửi kết nối ---- */
  const SEND_PICK = (who) => ({
    'Thẻ InApps Technology': `back|Đã gửi Thẻ InApps Technology${who}`,
    'Thẻ CLB Doanh nhân trẻ': `back|Đã gửi Thẻ CLB Doanh nhân trẻ${who}`,
    'Thẻ Mentor khởi nghiệp': `back|Đã gửi Thẻ Mentor khởi nghiệp${who}`,
    '#x': 'back', 'Đóng': 'back',
  });
  S['02-D0'] = { 'Thẻ InApps Technology': '02-D1', 'Thẻ CLB Doanh nhân trẻ': '02-D4', 'Thẻ Mentor khởi nghiệp': 'toast:Mở chia sẻ Thẻ Mentor khởi nghiệp · incard.biz/minhanh/mentor', '#x': 'back' };
  ['02-D1', '02-D3', '02-D4'].forEach(k => addTo(k, { 'Đổi': '02-D0' }));
  addTo('02-C2', { 'Chia sẻ thẻ của tôi': '02-D0' });
  ['02-A1', '02-A2', '02-A3', '02-A4', '02-E5'].forEach(k => addTo(k, { 'QR của tôi': '02-D0', 'Tạo thẻ mới': '03-E3' }));
  /* Chia sẻ từ hồ sơ = đúng sheet chia sẻ của Trang chủ (02-D1 / 02-D4), 03-A7 là bản sao tĩnh của 02-D1 */
  S['03-A7'] = Object.assign({}, S['02-D1'], { 'Đổi': '02-D0', 'Messenger': 'toast:Mở Messenger', 'Zalo': 'toast:Mở Zalo', '#x': 'back' });
  ['03-A2', '03-A5', '03-A6'].forEach(k => addTo(k, { 'Gắn thẻ NFC cho thẻ này': '03-D1', 'Thêm dịch vụ': '03-A8' }));
  addTo('03-A2', { 'QR của tôi': '02-D1', 'Chia sẻ': '02-D1' });
  addTo('03-A5', { 'QR của tôi': '02-D4', 'Chia sẻ': '02-D4', 'Hồ sơ web': 'toast:Mở incard.biz/minhanh/clb-dnt' });
  addTo('03-A6', { 'QR của tôi': '02-D0', 'Chia sẻ': '02-D0', 'Hồ sơ web': 'toast:Mở incard.biz/minhanh/mentor' });
  S['03-A1'] = S['03-A2'];
  /* Thêm Dịch vụ chính / Đang tìm kiếm / Hợp tác */
  S['03-A8'] = { '#x': 'back', 'Thêm dịch vụ': '03-A11|Đã thêm dịch vụ' };
  S['03-A9'] = { '#x': 'back', 'Lưu (3 mục)': '03-A11|Đã lưu mục Đang tìm kiếm', 'Khác': 'toast:Gõ mục bạn đang tìm' };
  S['03-A10'] = { '#x': 'back', 'Lưu': '03-A11|Đã lưu mục Hợp tác', 'Khác': 'toast:Gõ hình thức hợp tác khác' };
  S['03-A11'] = { '#arrow-left': PROF, 'Thêm dịch vụ': '03-A8', 'Tìm hiểu thêm': 'toast:Mở chi tiết sản phẩm' };
  addTo('03-F1', { 'Thêm dịch vụ': '03-A8' });
  // P · xem portfolio (ảnh / video YouTube) và trang web sản phẩm
  S['03-P1'] = { '#x': 'back', '#chevron-left': 'toast:Ảnh trước', '#chevron-right': 'toast:Ảnh tiếp theo' };
  S['03-P2'] = { '#x': 'back', '*': 'toast:Đang phát video' };
  S['03-P3'] = { '#x': 'back', '#external-link': 'toast:Mở bằng trình duyệt ngoài', 'Nhận báo giá': 'toast:Mở form báo giá trên web', '#chevron-left': 'back' };
  /* Hồ sơ người khác: chia sẻ hồ sơ (B10, cùng bố cục 02-D1) + đề xuất hợp tác */
  S['03-B10'] = { '#x': 'back', 'Hồ sơ online': '03-B10', 'Danh bạ (vCard)': 'toast:Gửi file danh bạ .vcf của Helen', 'Zalo': 'toast:Mở Zalo', 'Messenger': 'toast:Mở Messenger', 'Email': 'toast:Mở ứng dụng Mail', 'Lưu ảnh QR': 'toast:Đã lưu ảnh QR vào thư viện', 'Khác': 'toast:Mở bảng chia sẻ của hệ điều hành', 'Sao chép': 'toast:Đã sao chép link hồ sơ' };
  ['03-B1', '03-B4', '03-B6', '03-B8'].forEach(k => addTo(k, { 'Đề xuất hợp tác': '03-B13', 'Tôi có thể giúp': '03-B12', 'Tư vấn triển khai CRM cho SME': '03-B11', 'Đào tạo đội sales B2B': '03-B11' }));
  S['03-B11'] = { '#x': 'back', 'Đặt lịch tư vấn': '08-D1', 'Hỏi về dịch vụ': 'toast:Mở tin nhắn: hỏi về Tư vấn triển khai CRM cho SME' };
  S['03-B12'] = { '#x': 'back', 'Gửi cho Helen': '03-B14|Đã gửi cho Helen', 'Giới thiệu người khác': 'toast:Chọn người từ danh bạ để giới thiệu' };
  S['03-B13'] = { '#x': 'back', 'Gửi đề xuất': '03-B14|Đã gửi đề xuất hợp tác cho Helen', 'Thẻ InApps Technology': 'toast:Chọn thẻ gửi kèm (InApps · CLB Doanh nhân trẻ · Mentor)' };
  S['03-B14'] = { '#arrow-left': '03-B1', '#ellipsis-vertical': '03-B2', 'Đề xuất hợp tác': '03-B13', 'Tôi có thể giúp': '03-B12', 'Tư vấn triển khai CRM cho SME': '03-B11', 'Đào tạo đội sales B2B': '03-B11' };
  /* B15 · Đặt lịch hẹn với hồ sơ khác → B16 · Đã đặt lịch. X / Về hồ sơ = đóng sheet, ở lại đúng hồ sơ */
  addTo('03-B14', { 'Đặt lịch': '03-B15' });
  addTo('03-B11', { 'Đặt lịch tư vấn': '03-B15' });
  S['03-B15'] = { '#x': 'back', '10:30': 'toast:Mở bộ chọn giờ — chọn giờ bất kỳ', '#clock': 'toast:Mở bộ chọn giờ — chọn giờ bất kỳ', 'Xác nhận đặt lịch': '03-B16' };
  S['03-B16'] = { 'Về hồ sơ': 'back', 'Xem lịch hẹn': '08-D1', '#x': 'back' };
  addTo('03-B14', { 'Nhắn tin': '09-B1' }); S['09-B1'] = Object.assign({}, S['09-B1'] || {}, { '#arrow-left': 'back' });   // Nhắn tin trên hồ sơ → màn chat 09-B1, mũi tên quay lại hồ sơ
  addTo('03-D1', { 'Gắn vào thẻ': '03-A4' });
  addTo('03-D5', { 'Chuyển sang thẻ này': '03-D6' });
  S['03-D6'] = { 'Chuyển sang thẻ này': '03-D4|Đã chuyển thẻ NFC sang Thẻ InApps Technology', 'Giữ ở Thẻ CLB Doanh nhân trẻ': '03-E1|Thẻ NFC vẫn gắn với Thẻ CLB Doanh nhân trẻ', '#x': 'back' };
  // Tab Thành viên (E5–E8)
  S['03-E5'] = { '#arrow-left': ACC, 'Thẻ của tôi': '03-E1', 'Thành viên': '03-E5', '#plus': '03-E7', 'Tạo thành viên': '03-E7', '#square-pen': '03-E7b', '*': '03-E6' };
  S['03-E6'] = { '#x': '03-E5', 'Xem hồ sơ': '03-B1@helen', 'Sửa thông tin': '03-E7b', 'QR & link thẻ': 'toast:QR & link thẻ của Trần Quốc Bảo', 'Xoá thành viên': '03-E5|Đã xoá Trần Quốc Bảo', '*': '03-E5' };
  S['03-E7'] = { '#x': '03-E5', 'Tạo thành viên': '03-E5|Đã tạo thành viên mới', '#camera': 'toast:Chọn ảnh đại diện' };
  S['03-E7b'] = { '#x': '03-E5', 'Lưu thay đổi': '03-E5|Đã cập nhật Trần Quốc Bảo', 'Xoá thành viên': '03-E5|Đã xoá Trần Quốc Bảo', '#camera': 'toast:Đổi ảnh đại diện' };
  S['03-E8'] = { '#arrow-left': ACC, 'Thẻ của tôi': '03-E1', '#plus': '03-E7', 'Tạo thành viên': '03-E7' };
  addTo('04-A5', { 'Chia sẻ thẻ của bạn': '04-A6' });
  S['04-A6'] = { 'Thẻ InApps Technology': '02-D1', 'Thẻ CLB Doanh nhân trẻ': '02-D4', 'Thẻ Mentor khởi nghiệp': 'toast:Mở chia sẻ Thẻ Mentor khởi nghiệp', '#x': 'back' };
  addTo('04-C2', { 'Gửi thẻ của tôi': '04-C5', 'Chia sẻ liên hệ': '04-C5' });
  S['04-C5'] = SEND_PICK(' cho Hồ Văn Tâm');
  /* Hồ sơ người khác chưa kết nối: B4 → B5 (chọn thẻ) → B6 đang chờ → (B7 huỷ) ; nhận lời mời B8 → B9 (chọn thẻ) → B1 */
  addTo('03-B1', { 'Đối tác': '04-C4', 'Khách hàng': '04-C4', 'Tiềm năng': '04-C4', 'Khách hàng tiềm năng': '04-C4', 'Nhà cung cấp': '04-C4', 'Nhãn': '04-C4' });
  S['03-B4'] = { '#ellipsis-vertical': '03-B2', 'Lưu danh bạ': 'toast:Đã lưu vào danh bạ điện thoại', 'Đặt lịch': '03-B15', 'Nhắn tin': '09-B1', 'Tìm hiểu thêm': 'toast:Mở chi tiết sản phẩm', 'Dịch vụ chính': 'toast:Mở mục Dịch vụ chính', 'Đang tìm kiếm': 'toast:Mở mục Đang tìm kiếm', 'Hợp tác': 'toast:Mở mục Hợp tác', 'Kết nối': '03-B5' };
  S['03-B5'] = { 'Thẻ InApps Technology': '03-B6|Đã gửi lời mời kết nối kèm Thẻ InApps Technology', 'Thẻ CLB Doanh nhân trẻ': '03-B6|Đã gửi lời mời kết nối kèm Thẻ CLB Doanh nhân trẻ', 'Thẻ Mentor khởi nghiệp': '03-B6|Đã gửi lời mời kết nối kèm Thẻ Mentor khởi nghiệp', '#x': '03-B4', 'Đóng': '03-B4' };
  S['03-B6'] = { '#ellipsis-vertical': '03-B2', 'Lưu danh bạ': 'toast:Đã lưu vào danh bạ điện thoại', 'Đặt lịch': '03-B15', 'Nhắn tin': '09-B1', 'Tìm hiểu thêm': 'toast:Mở chi tiết sản phẩm', 'Dịch vụ chính': 'toast:Mở mục Dịch vụ chính', 'Đang tìm kiếm': 'toast:Mở mục Đang tìm kiếm', 'Hợp tác': 'toast:Mở mục Hợp tác', 'Đã gửi lời mời': '03-B7' };
  S['03-B7'] = { 'Giữ lời mời': 'back', 'Huỷ lời mời': '03-B4|Đã huỷ lời mời kết nối' };
  S['03-B8'] = { '#ellipsis-vertical': '03-B2', 'Lưu danh bạ': 'toast:Đã lưu vào danh bạ điện thoại', 'Đặt lịch': '03-B15', 'Nhắn tin': '09-B1', 'Tìm hiểu thêm': 'toast:Mở chi tiết sản phẩm', 'Dịch vụ chính': 'toast:Mở mục Dịch vụ chính', 'Đang tìm kiếm': 'toast:Mở mục Đang tìm kiếm', 'Hợp tác': 'toast:Mở mục Hợp tác', 'Chấp nhận': '03-B9', 'Từ chối': '03-B4|Đã từ chối lời mời' };
  S['03-B9'] = { 'Thẻ InApps Technology': '03-B1|Đã kết nối — gửi kèm Thẻ InApps Technology', 'Thẻ CLB Doanh nhân trẻ': '03-B1|Đã kết nối — gửi kèm Thẻ CLB Doanh nhân trẻ', 'Thẻ Mentor khởi nghiệp': '03-B1|Đã kết nối — gửi kèm Thẻ Mentor khởi nghiệp', '#x': '03-B8', 'Đóng': '03-B8' };
  addTo('05-C2', { 'Kết nối': '05-C6' });
  S['05-C6'] = Object.assign(SEND_PICK(' — đã gửi lời mời kết nối tới Phan Đức Thịnh'), {
    'Thẻ InApps Technology': '03-B6@thinh|Đã gửi lời mời kết nối kèm Thẻ InApps Technology',
    'Thẻ CLB Doanh nhân trẻ': '03-B6@thinh|Đã gửi lời mời kết nối kèm Thẻ CLB Doanh nhân trẻ',
    'Thẻ Mentor khởi nghiệp': '03-B6@thinh|Đã gửi lời mời kết nối kèm Thẻ Mentor khởi nghiệp',
    '#x': '05-C2', 'Đóng': '05-C2',   // C2 là sheet nên không nằm trong lịch sử → đóng chọn thẻ phải quay về C2, không gửi lời mời
  });
  ['05-C3', '05-C4'].forEach(k => addTo(k, { 'Thẻ InApps Technology': '03-A4', 'Thẻ CLB Doanh nhân trẻ': '03-A4' }));
  addTo('05-C4', { 'Sao chép liên kết': 'toast:Đã sao chép incard.biz/minhanh/clb-dnt' });
  ['05-B1', '05-B2', '05-C1'].forEach(k => addTo(k, { 'QR của tôi': '05-C3' }));
  ['06-A1', '06-B1'].forEach(k => addTo(k, { 'Kết nối': '06-B3', 'Gửi danh thiếp': '06-B3' }));
  S['06-B3'] = SEND_PICK(' kèm lời mời kết nối');
  addTo('06-D2', { 'Đổi': '03-A4', 'Thẻ InApps': '03-A4' });
  addTo('07-B1', { 'Kết nối': '07-B2' });
  S['07-B2'] = SEND_PICK(' kèm lời mời kết nối');
  addTo('07-A2', { 'Theo thẻ': '03-A4' });
  addTo('08-A1', { '#qr-code': '08-A3', 'Thẻ của tôi': '03-E1', 'Xem thẻ': '03-A4' });
  S['08-A2'] = S['08-A1'];
  S['08-A3'] = { 'Thẻ InApps Technology': '02-D1', 'Thẻ CLB Doanh nhân trẻ': '02-D4', 'Thẻ Mentor khởi nghiệp': 'toast:Mở chia sẻ Thẻ Mentor khởi nghiệp', '#x': 'back' };
  addTo('08-B4', { 'Đổi thẻ': '03-A4' });

  /* ---- giao diện lọc / sắp xếp ---- */
  addTo('04-A2', { '#sliders-horizontal': '04-B3' });
  S['04-B3'] = { 'Xem 3 kết quả': '04-A2|Đang lọc: 3 danh thiếp chưa lưu', 'Đặt lại': 'toast:Đã đặt lại bộ lọc', '#x': '04-A2' };
  addTo('06-B1', { 'Mới nhất': '06-B2' });
  S['06-B2'] = { 'Mới nhất': '06-B1|Đang xem bình luận mới nhất', 'Nổi bật': '06-B1|Đang xem bình luận nổi bật', 'Người tôi đã kết nối': '06-B1|Chỉ hiện bình luận của người đã kết nối', '*': '06-B1' };
  addTo('06-C2', { 'Mới nhất': '06-C3' });
  S['06-C3'] = { 'Xem 3 kết quả': '06-C2|Đã áp dụng bộ lọc', 'Đặt lại': 'toast:Đã đặt lại bộ lọc', '#x': '06-C2' };
  addTo('08-D5', { 'Lọc': '08-D6' });
  addTo('08-D5', { 'Phạm Thu Lan': '03-B1@lan', 'Nguyễn Gia Bảo': '03-B1@bao', 'Lê Quốc Anh': '03-B1@quocanh', 'Trần Thị Hoài An': '03-B1@an', 'Võ Minh Khoa': '03-B1@khoa', 'Bùi Thanh Hà': 'toast:Mở hồ sơ Bùi Thanh Hà', 'duc.tran@gmail.com': 'toast:Gửi lại lời mời tới duc.tran@gmail.com', '0903 *** 418': 'toast:Gửi lại lời mời qua Zalo', 'Điểm xếp hạng': '02-E3' });
  S['08-D6'] = { 'Xem 8 kết quả': '08-D5', 'Xem 0 kết quả': '08-D5', 'Đặt lại': 'toast:Đã đặt lại bộ lọc', '#x': '08-D5' };
  /* ---- 09 Tin nhắn ---- */
  addTo('09-A1', { '#arrow-left': HOME, '#square-pen': '09-A4', 'Tin nhắn chờ': '09-A3', 'Chưa đọc': '09-A2', 'Trần Thuỷ (Helen)': '09-B1', 'Hồ Văn Tâm': '09-B5', 'Lê Nhật Nam': '09-B3', 'Nguyễn Gia Bảo': '09-B8', 'Đặng Phương': '09-B1@phuong', 'Phạm Thu Lan': '09-B1@lan', 'Hợp tác': 'toast:Lọc cuộc trò chuyện có đề xuất hợp tác', 'Lịch hẹn': 'toast:Lọc cuộc trò chuyện có lịch hẹn' });
  addTo('09-A2', { '#arrow-left': HOME, '#square-pen': '09-A4', 'Tất cả': '09-A1', 'Đã đọc': 'toast:Đã đánh dấu đã đọc', 'Tắt TB': 'toast:Đã tắt thông báo', 'Xoá': 'toast:Đã xoá cuộc trò chuyện · Hoàn tác', 'Trần Thuỷ (Helen)': '09-B1', 'Nguyễn Gia Bảo': '09-B8' });
  addTo('09-A3', { '#arrow-left': '09-A1', '#settings-2': '09-C3', 'Xem & trả lời': '09-B6', 'Từ chối': 'toast:Đã xoá tin nhắn chờ' });
  addTo('09-A4', { '#x': '09-A1', 'Nguyễn Gia Bảo': '09-B8', 'Mời': 'toast:Đã gửi lời mời dùng InCard tới Nguyễn Văn Tú' });
  addTo('09-A5', { 'Tìm người để kết nối': '02-B2', 'Nhắn một kết nối có sẵn': '09-A4' });
  ['09-B1', '09-B2', '09-B5', '09-B7', '09-B8'].forEach(k => addTo(k, { '#calendar-plus': '09-B4', '#phone': 'toast:Mở ứng dụng gọi điện', '#plus': '09-B2', '#mic': 'toast:Giữ để ghi âm', 'Trần Thuỷ (Helen)': '09-C1' }));
  addTo('09-B1', { 'Xem hồ sơ': '03-B1@helen', 'Tìm hiểu thêm': 'toast:Mở chi tiết sản phẩm', 'Hẹn gặp chị thứ Ba nhé!': 'toast:Đã điền câu trả lời Inka gợi ý', 'Em gửi thêm báo giá': 'toast:Đã điền câu trả lời Inka gợi ý', '*': '09-B7' });
  addTo('09-B2', { '#x': '09-B1', 'Gửi thẻ': '09-B3', 'Đặt lịch': '09-B4', 'Ảnh': 'toast:Mở thư viện ảnh', 'Tệp': 'toast:Chọn tệp', 'Sản phẩm': 'toast:Chọn sản phẩm nổi bật của thẻ', 'Hợp tác': 'toast:Gửi đề xuất hợp tác', 'Vị trí': 'toast:Chia sẻ vị trí', '#arrow-up': '09-B1|Đã gửi' });
  S['09-B3'] = SEND_PICK(' vào cuộc trò chuyện');
  addTo('09-B4', { '#x': 'back', 'Xác nhận đặt lịch': 'back|Đã gửi lời mời hẹn gặp T3 17/11, 10:30', 'Gửi lời mời': 'back|Đã gửi lời mời họp T3 17/11, 10:30', '10:30': 'toast:Mở bộ chọn giờ — chọn giờ bất kỳ', '#clock': 'toast:Mở bộ chọn giờ — chọn giờ bất kỳ' });
  addTo('09-B5', { 'Chấp nhận': 'back|Đã thêm lịch hẹn vào Lịch & Google Calendar', 'Đổi giờ': '09-B4', '#arrow-up': 'toast:Đã gửi' });
  addTo('09-B6', { '#arrow-left': '09-A3', 'Chấp nhận': '09-A1|Đã chấp nhận và lưu Phan Đức Thịnh vào danh bạ', 'Xoá': '09-A3|Đã xoá tin nhắn', 'Chặn': '09-C2', 'Xem hồ sơ': '03-B4@thinh', 'Hẹn trao đổi': '09-B4', '#circle-user-round': '03-B4@thinh' });
  addTo('09-B7', { 'Trả lời': '09-B5', 'Sao chép': '09-B1|Đã sao chép', 'Chuyển tiếp': 'toast:Chọn người nhận', 'Ghim tin nhắn': '09-B1|Đã ghim tin nhắn', 'Lưu "anh Quang" vào danh bạ': '09-B1|Đã lưu anh Quang vào danh bạ', 'Tạo công việc': '08-D2|Inka đã điền sẵn công việc', 'Báo cáo': 'toast:Đã gửi báo cáo', '*': '09-B1' });
  addTo('09-C1', { 'Hồ sơ': '03-B1@helen', 'Gọi': 'toast:Mở ứng dụng gọi điện', 'Tắt TB': 'toast:Đã tắt thông báo', 'Tìm': 'toast:Tìm trong cuộc trò chuyện', 'Lịch hẹn': '08-D1', 'Chặn Helen': '09-C2', 'Báo cáo': 'toast:Đã gửi báo cáo', 'Xoá cuộc trò chuyện': '09-A1|Đã xoá cuộc trò chuyện' });
  addTo('09-C2', { 'Huỷ': 'back', 'Chặn': '09-A1|Đã chặn' });
  /* ---- Bổ sung màn còn thiếu (lấy từ screens/ cũ) ---- */
  /* 01 · Nhập hồ sơ từ LinkedIn: C1 → E1 → E2 → E3 → D1 */
  addTo('01-C1', { 'Tạo tài khoản': '01-E1' });
  S['01-E1'] = { 'Tiếp tục': '01-E2', 'Tự điền': '01-D1', 'Lấy từ LinkedIn': 'toast:Đã chọn Lấy từ LinkedIn', '#arrow-left': '01-C1' };
  S['01-E2'] = { 'Lấy thông tin': '01-E3', 'Dán từ bộ nhớ tạm': 'toast:Đã dán link LinkedIn', '#arrow-left': '01-E1' };
  S['01-E3'] = { '@auto': '01-D1|Đã lấy thông tin từ LinkedIn, kiểm tra lại nhé', 'Huỷ, tự điền': '01-D1', '#x': '01-E1' };
  /* 02 · Hết lượt gợi ý */
  addTo('02-B2', { 'Đã dùng': '02-B3' });
  S['02-B3'] = { 'Nâng cấp Premium': '02-E1', 'Để sau': '02-B2', '#arrow-left': HOME };
  /* 04 · Kết quả lọc, sửa / xoá liên hệ */
  addTo('04-B1', { 'Xem 12 kết quả': '04-B4' });
  S['04-B4'] = Object.assign({}, NET, { 'Xoá bộ lọc': '04-A1|Đã xoá bộ lọc', 'Chạm NFC': 'toast:Đã bỏ lọc Chạm NFC', 'Mã QR': 'toast:Đã bỏ lọc Mã QR', 'Thẻ InApps': 'toast:Đã bỏ lọc Thẻ InApps', 'Khách hàng': 'toast:Đã bỏ lọc Khách hàng', 'Phạm Minh Thư': '04-C6', 'Ngô Bích Liên': 'toast:Mở chi tiết Ngô Bích Liên' });
  addTo('04-C2', { 'Sửa thông tin': '04-C6' });
  S['04-C6'] = { 'Lưu thay đổi': '04-C1|Đã lưu thay đổi', 'Xoá liên hệ': '04-C7', 'Quét lại': '05-B1', 'Thêm nhãn': '04-C4', 'Thêm số điện thoại': 'toast:Thêm 1 ô số điện thoại / email', 'Ảnh danh thiếp gốc': 'toast:Xem ảnh danh thiếp cỡ lớn', '#x': 'back' };
  S['04-C7'] = { 'Xoá liên hệ': '04-C8', 'Giữ lại': 'back', '#x': 'back' };
  S['04-C8'] = Object.assign({}, NET, { 'Hoàn tác': '04-A2|Đã khôi phục Phạm Minh Thư' });
  /* 07 · Bộ lọc tìm hồ sơ, đổi tên cuộc trò chuyện */
  addTo('07-B1', { 'CEO': '07-B3', 'Công nghệ': '07-B3', 'TP.HCM': '07-B3' });
  S['07-B3'] = { 'Áp dụng': '07-B1|Inka đã tìm lại theo bộ lọc mới', 'Đặt lại': 'toast:Đã đặt lại bộ lọc', '#x': '07-B1' };
  addTo('07-C1', { 'Đổi tên': '07-C3' });
  S['07-C3'] = { 'Lưu tên': '07-C1|Đã đổi tên cuộc trò chuyện', 'Huỷ': '07-C1' };
  /* 08 · Cài đặt lịch hẹn */
  addTo('08-D1', { '#settings': '08-D1c' });
  addTo('08-D1b', { '#settings': '08-D1c' });
  S['08-D1c'] = { 'Google Calendar': '08-C2', 'Đồng bộ ngay': 'toast:Đang đồng bộ lịch…', 'Nhắc trước cuộc hẹn': 'toast:Chọn: 10 phút · 30 phút · 1 giờ · 1 ngày', 'Thời lượng': 'toast:Chọn: 30 · 45 · 60 · 90 phút', 'Giờ làm việc': 'toast:Chọn ngày và giờ làm việc', '#arrow-left': '08-D1' };
  /* 09 · Inka soạn tin */
  ['09-B1','09-B2','09-B5','09-B7','09-B8'].forEach(k => addTo(k, { '#sparkles': '09-B9' }));
  S['09-B9'] = { 'Giới thiệu bản thân': '09-B10', 'Đề xuất hợp tác': '09-B10', 'Giới thiệu dịch vụ': '09-B10', 'Hẹn gặp': '09-B10', 'Cảm ơn sau buổi gặp': '09-B10', 'Hoặc tự mô tả': 'toast:Gõ yêu cầu cho Inka', '#x': 'back' };
  S['09-B10'] = { 'Đưa vào ô nhập': '09-B2|Đã đưa tin Inka soạn vào ô nhập', 'Viết lại': 'toast:Inka đang viết lại…', 'Thân mật': 'toast:Đã đổi giọng văn: Thân mật', 'Ngắn hơn': 'toast:Đã rút gọn tin', 'English': 'toast:Đã dịch sang tiếng Anh', '#x': '09-B9' };
  /* 10 · Hồ sơ web (incard.biz/…): chỉ "Kết nối" cần đăng nhập; đăng nhập xong tự gửi lời mời */
  const WEB_PUB = {
    'Lưu danh bạ': '10-W7', 'Đặt lịch': 'toast:Mở lịch hẹn của Minh Anh', 'Nhắn tin': 'toast:Mở Zalo nhắn cho Minh Anh',
    'Tạo thẻ InCard miễn phí': '01-A2', 'Báo cáo hồ sơ': 'toast:Gửi báo cáo hồ sơ này', 'Điều khoản': '01-C2', 'Quyền riêng tư': '01-C2',
  };
  S['10-W2'] = Object.assign({}, PF_VIEW, WEB_PUB, { 'Kết nối': '10-W3', 'Đăng nhập': '10-W6|Đã đăng nhập (không gửi lời mời)' });
  S['10-W1'] = S['10-W2'];
  S['10-W3'] = { 'Tiếp tục với Google': '10-W5', 'Tiếp tục với Apple': '10-W5', 'Tiếp tục với Email': '10-W4', 'Đăng ký': '10-W4', '*': 'back' };
  S['10-W4'] = { 'Xác nhận': '10-W5', '#x': 'back' };
  S['10-W5'] = Object.assign({}, PF_VIEW, WEB_PUB, { 'Huỷ': '10-W6|Đã huỷ lời mời', 'Đã gửi lời mời': 'toast:Đang chờ Minh Anh chấp nhận' });
  S['10-W6'] = Object.assign({}, PF_VIEW, WEB_PUB, { 'Kết nối': '10-W5' });
  S['10-W6b'] = Object.assign({}, PF_VIEW, WEB_PUB, { 'Nhắn tin': 'toast:Mở Tin nhắn với Minh Anh', 'Gọi': 'toast:Mở ứng dụng gọi điện', 'Đã kết nối': 'toast:Bạn và Minh Anh đã kết nối' });
  S['10-W7'] = { 'Tải tệp danh bạ': 'back|Đã tải danh bạ Minh Anh', 'Huỷ': 'back', '#x': 'back' };
  S['10-W8'] = Object.assign({}, PF_VIEW, { 'Sao chép link': 'toast:Đã sao chép incard.biz/minhanh', 'QR của tôi': '02-D1', 'Chia sẻ': '02-D1' });
  S['10-W10'] = { 'Tạo thẻ InCard của bạn': '01-A2', 'Về trang chủ InCard': 'toast:Mở incard.biz' };
  ['03-A2', '03-A5', '03-A6', '03-F6'].forEach(k => addTo(k, { 'Hồ sơ web': '10-W8' }));
  S['03-A1'] = S['03-A2'];

  /* ---------- Review 17/11: vá luồng cụt ---------- */
  GLOBAL['#message-circle-more'] = '09-A1';                         // nút Tin nhắn cạnh chuông (Trang chủ)
  addTo('03-D4', { 'Xem trong Thẻ của tôi': '03-E1' });
  // Kích hoạt NFC: chạm thẻ trước (2 bước), quét QR chỉ là cách dự phòng và kích hoạt luôn
  addTo('03-D1', { 'Bắt đầu': '03-D3' });
  addTo('03-D2', { '*': '03-D4|Đã nhận mã thẻ •••• 4F2A' });
  addTo('03-D3', { 'Quét mã QR trên thẻ': '03-D2', 'Không chạm được?': '03-D2' });   // mẹo "Không thấy phản hồi?" → 03-D5 bằng data-go
  ['08-B4', '08-F2', '08-G1'].forEach(k => addTo(k, { 'Thẻ của tôi': '03-E1' }));
  // 09-C3: dòng "Đã chặn" dùng data-go; các dòng có công tắc bật/tắt tại chỗ (localAct)

  /* ---------- Review 17/11: pop-up bổ sung (chỉ giữ loại app thật có / chưa đối chiếu được) ---------- */
  S['07-C4'] = { 'Xoá': '07-C1|Đã xoá cuộc trò chuyện', 'Huỷ': 'back' };      // app thật: "Xoá hội thoại" có xác nhận
  addTo('07-C1', { 'Xoá': '07-C4' });
  S['07-A4'] = { 'Huỷ': 'back', 'Lưu': '07-A3|Đã cập nhật công việc', '#x': 'back' };
  addTo('07-A3', { 'Sửa': '07-A4' });
  S['06-C4'] = { 'Xoá bài viết': '06-C2|Đã xoá bài viết', 'Ẩn thay vì xoá': '06-C2|Đã ẩn bài viết khỏi bảng tin', 'Huỷ': 'back' };
  addTo('06-C2', { 'Xoá bài viết': '06-C4' });
  S['03-E9'] = { 'Xoá thành viên': '03-E5|Đã xoá Trần Quốc Bảo', 'Giữ lại': 'back', '#x': 'back' };
  addTo('03-E6', { 'Xoá thành viên': '03-E9' });
  addTo('03-E7b', { 'Xoá thành viên': '03-E9' });
  S['10-W11'] = { 'Gửi báo cáo': 'back|Đã gửi báo cáo, cảm ơn bạn', 'Huỷ': 'back', '#x': 'back' };
  ['10-W1', '10-W2', '10-W5', '10-W6', '10-W6b'].forEach(k => addTo(k, { 'Báo cáo hồ sơ': '10-W11' }));
  S['01-A3'] = { 'Xong': 'back', '#x': 'back' };
  addTo('01-A2', { 'Tiếng Việt': '01-A3' });

  window.PROTO_ROUTES = { TABS, GLOBAL, SCREENS: S, HOME, START: '01-A1' };
})();
