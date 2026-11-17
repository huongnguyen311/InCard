# Import CSV Khách hàng → Gửi ZNS → Lưu hội thoại & Tự động phân quyền

> Source scope: Khách hàng có sẵn 1 tệp khách hàng (CSV) gồm thông tin KH, lịch sử mua hàng, Sale phụ trách, kênh nguồn (Zalo OA / Fanpage — page nào). Import vào Agentic AI Console. Sau import: gửi ZNS cho danh sách khách; khách nào follow OA & nhắn lại thì hội thoại được lưu vào dashboard, tự động phân quyền Khách – Sale – Page đúng theo data import ban đầu.
> Generated: 2026-07-08

---

## 1. Mô tả ngắn

Tính năng cho phép bạn **tải lên một tệp danh sách khách hàng có sẵn** vào hệ thống, **gửi tin ZNS qua Zalo** cho danh sách đó, và khi khách quan tâm (theo dõi Zalo OA và nhắn lại) thì **cuộc trò chuyện tự động hiện trong bảng điều khiển**, được giao **đúng nhân viên Sale phụ trách** và gắn **đúng trang (Zalo OA/Fanpage)** như trong tệp bạn đã tải lên.

---

## 2. Trong phạm vi / Ngoài phạm vi

### ✅ Trong phạm vi — tính năng này bao gồm

- **Tải lên tệp khách hàng (CSV)** và ghép các cột trong tệp với các trường trong hệ thống (tên, số điện thoại, lịch sử mua hàng, Sale phụ trách, kênh nguồn, trang cụ thể).
- **Kiểm tra tệp trước khi lưu**: báo dòng nào hợp lệ, dòng nào lỗi, dòng nào trùng — kèm bản báo cáo kết quả import.
- **Chuẩn hoá & gộp khách trùng theo số điện thoại**: nếu một khách đã có sẵn, hệ thống cập nhật thông tin mới và cộng dồn lịch sử mua, thay vì tạo trùng.
- **Lưu hồ sơ khách hàng** kèm lịch sử mua hàng, Sale phụ trách, kênh nguồn và trang.
- **Gắn sẵn phân quyền Khách – Sale – Trang ngay khi import**, trước cả khi khách nhắn tin.
- **Gửi tin ZNS hàng loạt** cho danh sách khách đã chọn, theo mẫu tin đã được Zalo duyệt.
- **Theo dõi trạng thái gửi từng khách**: đã gửi / lỗi / khách không dùng Zalo.
- **Nhận cuộc trò chuyện khi khách nhắn lại** và hiển thị trong bảng điều khiển hội thoại (như luồng hiện có).
- **Tự động giao cuộc trò chuyện cho đúng Sale và gắn đúng trang** theo hồ sơ đã import, **khi hệ thống nhận diện được khách**.
- **Hàng chờ "cần gán tay"**: khi chưa nhận diện được khách, cuộc trò chuyện được đưa vào mục cần xử lý để nhân viên gán thủ công.
- **Nhận diện khách qua liên kết gắn mã riêng trong ZNS**: mỗi tin ZNS gửi đi mang một mã nhận diện riêng cho từng khách; khi khách bấm vào và nhắn Zalo OA, hệ thống dựa vào mã đó để ghép về đúng hồ sơ.

### 🚫 Ngoài phạm vi — tính năng này KHÔNG bao gồm

- **Đảm bảo tin ZNS chắc chắn được Zalo gửi đi.** Việc duyệt mẫu tin, điều kiện tài khoản Zalo OA, định mức và chi phí gửi là do phía Zalo quyết định — hệ thống chỉ thực hiện lệnh gửi (ngoài phạm vi).
- **Đảm bảo khách sẽ mở tin, theo dõi OA hoặc nhắn lại.** Đây là hành động của khách, hệ thống không ép được (ngoài phạm vi).
- **Gửi ZNS cho khách nguồn Fanpage.** ZNS chỉ có trên Zalo; khách đến từ Fanpage cần một kênh liên hệ khác (ngoài phạm vi của tính năng này).
- **Nhận diện tự động 100% mọi khách nhắn lại.** Nếu khách nhắn mà không qua liên kết gắn mã, hoặc dùng số Zalo khác với số trong tệp, hệ thống có thể không tự ghép được và sẽ đưa vào hàng chờ gán tay (ngoài phạm vi việc bảo đảm khớp tuyệt đối).
- **Xin sự đồng ý nhận tin (opt-in) của khách.** Việc khách đã đồng ý nhận tin hay chưa thuộc trách nhiệm dữ liệu của bạn; hệ thống không tạo ra sự đồng ý đó (ngoài phạm vi).
- **Soạn / thiết kế / đăng ký mẫu tin ZNS với Zalo.** Mẫu tin phải được chuẩn bị và duyệt riêng phía Zalo (ngoài phạm vi).
- **Chỉnh sửa hoặc thu hồi tin ZNS sau khi đã gửi** (không nằm trong tính năng này).

---

## 3. Luồng sử dụng

1. Bạn mở màn hình **Import khách hàng** và tải lên tệp CSV.
2. Bạn **ghép các cột** trong tệp với các trường của hệ thống (tên, số điện thoại, lịch sử mua, Sale phụ trách, kênh nguồn, trang).
3. Hệ thống **kiểm tra tệp** và hiển thị bản xem trước: số dòng hợp lệ, dòng lỗi, dòng trùng.
4. Bạn xác nhận, hệ thống **lưu hồ sơ khách** và **gắn sẵn Sale + trang** cho từng khách.
5. Bạn chọn **mẫu tin ZNS** và **danh sách khách** cần gửi, rồi bấm **Gửi**.
6. Hệ thống **gửi ZNS** và cập nhật **trạng thái gửi từng khách**.
7. Khách nhận tin → **theo dõi Zalo OA và nhắn lại**.
8. Hệ thống **nhận diện khách** (qua mã gắn trong tin) và **tạo cuộc trò chuyện** trong bảng điều khiển.
9. Cuộc trò chuyện được **giao đúng Sale và gắn đúng trang** theo hồ sơ import.
10. Nếu không nhận diện được, cuộc trò chuyện vào mục **"cần xử lý"** để nhân viên **gán thủ công**.
11. Sale (hoặc AI) **tiếp tục xử lý** cuộc trò chuyện trong bảng điều khiển.

---

## 4. Hệ thống làm gì phía sau

**Các kiểm tra hệ thống thực hiện:**
- Kiểm tra tệp **đúng định dạng** và **các cột bắt buộc đã được ghép**.
- Kiểm tra **số điện thoại hợp lệ** và **chuẩn hoá về cùng một dạng** để so khớp.
- Phát hiện **khách trùng** dựa trên số điện thoại.

**Các việc hệ thống làm thay bạn:**
- **Lưu và sắp xếp** thông tin khách để tìm lại được sau này.
- **Gắn liên kết** giữa mỗi khách với Sale phụ trách và trang tương ứng.
- **Gửi tin ZNS** tới danh sách và **ghi lại trạng thái gửi** từng khách.
- Khi khách nhắn lại, **ghép cuộc trò chuyện về đúng hồ sơ** và **giao đúng người phụ trách**.

**Điều gì thay đổi sau đó:**
- Danh sách khách xuất hiện trong hệ thống kèm phân quyền Khách–Sale–Trang.
- Mỗi khách có trạng thái gửi ZNS rõ ràng.
- Cuộc trò chuyện của khách phản hồi hiện trong bảng điều khiển, đã giao đúng Sale và trang (hoặc nằm ở mục cần xử lý nếu chưa nhận diện được).

---

## 5. Các trường hợp lỗi

- **Tệp sai định dạng hoặc thiếu cột bắt buộc** → hệ thống báo lỗi và yêu cầu tải lại / ghép lại cột.
- **Dòng có số điện thoại không hợp lệ** → hệ thống đánh dấu dòng đó lỗi trong bản báo cáo và không import dòng đó.
- **Khách đã tồn tại (trùng số điện thoại)** → hệ thống cập nhật thông tin và cộng dồn lịch sử, không tạo bản ghi trùng.
- **Gửi ZNS thất bại cho một khách** (khách không dùng Zalo / số sai / Zalo từ chối) → hệ thống đánh dấu "gửi lỗi" cho khách đó, các khách còn lại vẫn được gửi.
- **Khách nhắn lại nhưng không nhận diện được** → cuộc trò chuyện được đưa vào mục "cần xử lý" thay vì bị bỏ sót.

---

## 6. Ràng buộc

- **ZNS chỉ áp dụng cho Zalo OA**, không áp dụng cho Fanpage/Messenger.
- **Mẫu tin ZNS phải được Zalo duyệt trước** và tài khoản Zalo OA phải đủ điều kiện, còn định mức gửi.
- **Cuộc trò chuyện hai chiều chỉ mở khi khách chủ động nhắn** cho Zalo OA.
- **Việc nhận diện khách tự động dựa vào liên kết gắn mã trong ZNS** hoặc số điện thoại khách chia sẻ; ngoài các cách này, có thể phải gán thủ công.

---

## 7. Tiêu chí nghiệm thu

**Happy path:**
- Người dùng có thể tải lên tệp CSV, ghép cột và xem bản báo cáo kiểm tra trước khi lưu.
- Người dùng có thể import và thấy danh sách khách kèm lịch sử mua, Sale phụ trách, kênh nguồn và trang.
- Người dùng có thể chọn mẫu tin ZNS và danh sách khách, rồi gửi ZNS hàng loạt.
- Người dùng thấy được trạng thái gửi ZNS của từng khách.
- Khi một khách được nhận diện nhắn lại, cuộc trò chuyện hiện trong bảng điều khiển đã giao đúng Sale và gắn đúng trang.

**System behavior:**
- Hệ thống chuẩn hoá và so khớp khách theo số điện thoại, cập nhật thay vì tạo trùng.
- Hệ thống gắn liên kết Khách–Sale–Trang ngay tại bước import.
- Hệ thống ghi lại trạng thái gửi từng tin ZNS.
- Hệ thống tự giao cuộc trò chuyện cho đúng Sale/trang khi nhận diện được khách.
- Hệ thống đưa cuộc trò chuyện chưa nhận diện được vào mục "cần xử lý".

**Error handling:**
- Hệ thống báo lỗi và yêu cầu tải/ghép lại khi tệp sai định dạng hoặc thiếu cột bắt buộc.
- Hệ thống đánh dấu và bỏ qua dòng có số điện thoại không hợp lệ, vẫn import các dòng còn lại.
- Hệ thống đánh dấu "gửi lỗi" cho khách không gửi được ZNS mà không dừng cả lô.
- Hệ thống không làm mất cuộc trò chuyện khi không nhận diện được khách — đưa vào hàng chờ gán tay.
