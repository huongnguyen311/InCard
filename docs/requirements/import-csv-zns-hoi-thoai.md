# Requirement Analysis: Import CSV Khách hàng → Gửi ZNS → Lưu hội thoại + Tự động phân quyền

> Source brief: Khách hàng có sẵn 1 tệp khách hàng (CSV) gồm thông tin KH, lịch sử mua hàng, Sale phụ trách, kênh nguồn (Zalo OA / Fanpage — cụ thể page nào). Cần import vào hệ thống Agentic AI Console. Sau import: gửi ZNS cho danh sách khách; khách nào follow OA & nhắn lại thì hội thoại được lưu vào dashboard, tự động phân quyền Khách – Sale – Page đúng theo data import ban đầu. Cần làm rõ: sau import thấy được gì, phần nào trong scope, phần nào ngoài scope.
> Analyst: Alice (AI)
> Date: 2026-07-08

---

## 0. Ghi chú nền tảng (đọc trước — quyết định toàn bộ scope)

Đây **không phải là requirement do tôi tự nghĩ ra** — là ràng buộc kỹ thuật của nền tảng Zalo/Meta, cần đưa vào ngay từ đầu vì nó chia đôi phần "trong / ngoài scope":

| # | Ràng buộc nền tảng | Hệ quả |
|---|---|---|
| P-01 | **ZNS là tin nhắn 1 chiều (notification), theo template Zalo duyệt trước**, gửi tới **số điện thoại**, tính phí theo tin. | Agentic **không "chat" qua ZNS**; ZNS chỉ để thông báo/mời tương tác. |
| P-02 | **ZNS chỉ tồn tại trên Zalo OA.** Fanpage/Messenger **không có ZNS**. | Khách nguồn Fanpage **không nằm trong luồng ZNS** — cần luồng khác (xem A-03). |
| P-03 | Hội thoại 2 chiều chỉ mở khi **khách chủ động nhắn cho OA** (follow + nhắn lại). Đúng như điều kiện trong brief. | "Nếu khách follow & nhắn lại → lưu hội thoại" là **đúng luồng khả thi duy nhất**. |
| P-04 | **CSV định danh khách bằng SĐT; OA định danh bằng Zalo `user_id`.** Hai mã này không tự khớp nhau. | Việc "tự động phân quyền đúng theo data import" **phụ thuộc vào việc khớp được SĐT ↔ user_id** — đây là mắt xích rủi ro cao nhất (xem M-01, A-01). |
| P-05 | ZNS gửi qua Zalo ZNS API; cần **OA đã xác thực + số dư/định mức ZNS + template được duyệt**. | Gửi ZNS phụ thuộc tài khoản Zalo của khách hàng, **ngoài tầm kiểm soát của Agentic**. |

---

## 1. Business Flow (góc nhìn nghiệp vụ)

**Primary actors:** Client/Admin (người dùng Agentic – Green Bio), Sale (nhân viên phụ trách), End-customer (khách cuối), Hệ thống Agentic, Nền tảng Zalo (ZNS + OA).

**Trigger:** Client tải lên tệp CSV khách hàng.

**Goal (end state):** Danh sách khách được lưu trong hệ thống; ZNS đã gửi; các khách phản hồi qua OA xuất hiện trong dashboard **đã gắn đúng Sale + đúng Page** theo dữ liệu import.

```
1. Client chuẩn bị CSV (thông tin KH, lịch sử mua, Sale phụ trách, kênh nguồn, page cụ thể).
2. Client upload CSV → hệ thống ánh xạ cột (mapping) → validate → import.
3. Hệ thống lưu hồ sơ khách + gắn sẵn liên kết Khách↔Sale↔Page (theo data).
4. Client chọn template ZNS + chọn danh sách khách → hệ thống gửi ZNS qua Zalo.
5. (Nhánh chính) Khách nhận ZNS → follow OA → nhắn lại.
6. Hệ thống nhận tin, KHỚP user_id ↔ hồ sơ đã import → tạo hội thoại trong dashboard, tự gán Sale + Page đúng.
7. AI/Sale xử lý hội thoại trong dashboard (như luồng Live handoff hiện có).
8. (Nhánh phụ) Khách không follow / không nhắn lại → không có hội thoại; chỉ còn ghi nhận "đã gửi ZNS".
9. (Nhánh phụ) Không khớp được user_id ↔ hồ sơ → hội thoại vào dạng "chưa gán / cần xử lý".
```

---

## 2. Functional Requirements

### Core FR (happy path)
- **FR-01:** Hệ thống cho phép upload tệp CSV và **ánh xạ cột** (SĐT, tên, lịch sử mua, Sale phụ trách, kênh nguồn, page).
- **FR-02:** Hệ thống **validate** dữ liệu import (định dạng SĐT, trùng lặp, thiếu trường bắt buộc) và báo cáo kết quả (thành công / lỗi từng dòng).
- **FR-03:** Hệ thống **lưu hồ sơ khách hàng** kèm lịch sử mua hàng, Sale phụ trách, kênh nguồn, page.
- **FR-04:** Hệ thống **tạo liên kết phân quyền** Khách ↔ Sale ↔ Page ngay khi import (trước khi có hội thoại).
- **FR-05:** Hệ thống cho phép **chọn template ZNS + chọn tập khách** và **gửi ZNS** tới danh sách.
- **FR-06:** Khi khách nhắn lại OA, hệ thống **tạo hội thoại trong dashboard** và **khớp** với hồ sơ đã import.
- **FR-07:** Sau khi khớp, hệ thống **tự gán hội thoại cho đúng Sale** và **gắn đúng Page** theo data import.

### Alternate FR
- **FR-08:** Nếu **không khớp được** khách nhắn tới với hồ sơ import → đưa hội thoại vào hàng "chưa gán / cần xử lý" để gán thủ công.
- **FR-09:** Hệ thống cho phép **gán/đổi Sale thủ công** cho hội thoại.
- **FR-10:** Hệ thống **ghi nhận trạng thái gửi ZNS** từng khách (đã gửi / lỗi / khách không có Zalo).

### Edge FR
- **FR-11:** Xử lý **CSV rỗng / sai định dạng / vượt số dòng tối đa**.
- **FR-12:** Xử lý **SĐT trùng** giữa CSV và khách đã tồn tại (cập nhật hay bỏ qua — cần quyết định, xem A-02).
- **FR-13:** Xử lý khách **nhắn lại sau thời gian dài** hoặc **nhắn nhiều lần** (không tạo trùng hội thoại).

---

## 3. Non-Functional Requirements

| Category | Requirement | Source |
|---|---|---|
| Performance | Import tệp lớn (hàng nghìn dòng) không treo UI; xử lý nền + báo tiến độ | [implied] |
| Security | Dữ liệu khách (SĐT, lịch sử mua) lưu bảo mật; chỉ Sale/Page được phân quyền mới thấy khách của mình | [implied] |
| Compliance | ZNS phải dùng **template Zalo duyệt**; xử lý dữ liệu cá nhân theo quy định (đồng ý nhận tin) | [implied] |
| Reliability | Gửi ZNS hàng loạt cần **retry / báo lỗi từng tin**, không mất trạng thái | [implied] |
| Usability | Realtime dashboard ổn định (hiện đang có cảnh báo "Đang mất kết nối real-time") | [stated — từ ảnh dashboard] |
| Scalability | Hỗ trợ nhiều Page/OA và nhiều Sale đồng thời | [implied] |

---

## 4. Use Cases

**UC-01: Import CSV khách hàng**
- Actor: Client/Admin
- Precondition: Có tệp CSV hợp lệ; đã kết nối OA/Page
- Main Flow: Upload → mapping cột → validate → xác nhận → lưu hồ sơ + tạo liên kết Khách/Sale/Page
- Alternate: File lỗi → hiển thị lỗi từng dòng, cho tải lại
- Postcondition: Hồ sơ khách + phân quyền đã tồn tại trong hệ thống

**UC-02: Gửi ZNS hàng loạt**
- Actor: Client/Admin
- Precondition: Đã import; template ZNS được duyệt; OA đủ điều kiện gửi
- Main Flow: Chọn template → chọn tập khách → gửi → ghi nhận trạng thái từng tin
- Alternate: Khách không có Zalo / SĐT sai → đánh dấu lỗi
- Postcondition: Trạng thái gửi được ghi nhận từng khách

**UC-03: Nhận & định tuyến hội thoại về đúng Sale/Page**
- Actor: End-customer, Hệ thống, Sale
- Precondition: Khách đã follow OA và nhắn lại
- Main Flow: Nhận tin → khớp user_id ↔ hồ sơ → tạo hội thoại → gán Sale + Page
- Alternate: Không khớp → vào "cần xử lý" → gán thủ công
- Postcondition: Hội thoại hiển thị trong dashboard đúng phân quyền

---

## 5. Missing Cases & Ambiguities (phần quan trọng nhất)

### Missing Cases

| # | Missing Case | Rủi ro nếu bỏ qua |
|---|---|---|
| M-01 | **Cách khớp SĐT (CSV) ↔ user_id (OA)** khi khách nhắn lại chưa được định nghĩa | "Tự động phân quyền đúng" **có thể không chạy được** — đây là rủi ro số 1 |
| M-02 | Khách nguồn **Fanpage** xử lý thế nào (ZNS không áp dụng cho Messenger)? | Một phần tệp khách bị bỏ rơi khỏi luồng |
| M-03 | Khách **chưa từng follow OA** — làm sao khớp được khi họ nhắn? | Hội thoại rơi vào "chưa gán" hàng loạt |
| M-04 | **Đồng ý nhận tin (opt-in)** của khách cho ZNS — đã có chưa? | Rủi ro pháp lý / bị Zalo khóa OA |
| M-05 | **Chi phí ZNS** và định mức — ai kiểm soát, cảnh báo hết định mức? | Gửi thất bại giữa chừng, tốn phí ngoài dự tính |
| M-06 | 1 khách có **nhiều Sale / đổi Sale** theo thời gian → gán theo cái nào? | Định tuyến sai người |
| M-07 | Khách **nhắn từ số/khác Zalo** với SĐT trong CSV | Không khớp được |
| M-08 | **Undo/rollback import** khi import nhầm | Dữ liệu bẩn, khó dọn |

### Ambiguities

| # | Câu chưa rõ | Các cách hiểu | Cần ai quyết |
|---|---|---|---|
| A-01 | "tự động phân quyền đúng từ data import" | (A) Khớp tự động qua SĐT-đã-xác-thực trên Zalo / (B) Khớp qua deep-link/tracking gắn từng khách trong ZNS / (C) Gán thủ công | Tech lead + Zalo API |
| A-02 | "import khách hàng" khi SĐT đã tồn tại | (A) Ghi đè / (B) Bỏ qua / (C) Tạo bản ghi mới | Product owner |
| A-03 | "gửi ZNS cho danh sách khách" — gồm cả khách Fanpage? | (A) Chỉ khách Zalo OA / (B) Cả hai (Fanpage dùng kênh khác) | Product owner |
| A-04 | "sau khi import khách hàng thấy được gì" — "khách hàng" là ai? | (A) Client/Admin (người dùng Agentic) / (B) End-customer nhận ZNS | Product owner (tôi giả định = Client/Admin ở mục 7) |
| A-05 | Lịch sử mua hàng import vào để **hiển thị** hay để **AI dùng ngữ cảnh trả lời**? | (A) Chỉ hiển thị / (B) Feed vào AI | Product owner |

---

## 6. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Không khớp được SĐT ↔ user_id → phân quyền tự động thất bại (M-01/A-01) | High | High | Dùng **deep-link ZNS gắn mã khách** để khi khách nhắn OA hệ thống nhận diện được; hoặc yêu cầu khách chia sẻ SĐT qua OA |
| Khách Fanpage bị bỏ khỏi luồng ZNS (P-02/M-02) | High | Med | Tách rõ luồng Zalo vs Fanpage ngay từ import; ZNS chỉ cho Zalo |
| OA bị Zalo hạn chế/khóa do gửi tin không opt-in (M-04) | Med | High | Chỉ gửi cho khách đã đồng ý; dùng template đúng loại |
| Hết định mức/chi phí ZNS giữa chừng (M-05) | Med | Med | Cảnh báo định mức + báo cáo trạng thái từng tin |
| Realtime dashboard mất kết nối (đang thấy trên ảnh) | Med | Med | Cơ chế reconnect + hàng đợi tin đến |

---

## 7. Trả lời trực tiếp 3 câu hỏi của khách

### 7.1. Sau khi import, khách hàng (Client/Admin) thấy được gì?
- Danh sách **hồ sơ khách hàng** đã import: tên, SĐT, lịch sử mua, Sale phụ trách, kênh nguồn + page.
- **Liên kết phân quyền Khách–Sale–Page** đã gắn sẵn (dạng metadata), *trước cả khi* có hội thoại.
- **Báo cáo import**: bao nhiêu dòng thành công / lỗi / trùng.
- **Trạng thái gửi ZNS** từng khách (sau khi bấm gửi).
- Khi khách nhắn lại → **hội thoại xuất hiện trong dashboard** (mục "Hội thoại") đã gán đúng Sale + Page.
> ⚠️ Lưu ý: đây là những gì thấy được **nếu** mắt xích khớp SĐT↔user_id (M-01/A-01) được giải quyết. Nếu chưa, phần hội thoại sẽ vào "cần xử lý" và phải gán tay.

### 7.2. Phần nào TRONG scope (Agentic làm được)
- ✅ Import CSV + mapping + validate + lưu hồ sơ khách (FR-01→03).
- ✅ Lưu lịch sử mua, Sale phụ trách, kênh nguồn, page (FR-03).
- ✅ Tạo & lưu liên kết phân quyền Khách–Sale–Page (FR-04).
- ✅ Nhận hội thoại khi khách nhắn OA và hiển thị trong dashboard (FR-06) — *đã có sẵn trong sản phẩm*.
- ✅ Tự động định tuyến hội thoại về đúng Sale/Page **khi khớp được** hồ sơ (FR-07).
- ✅ Gán thủ công khi không khớp (FR-08/09).

### 7.3. Phần nào NGOÀI scope / phụ thuộc bên ngoài
- ❌ **Bản thân việc gửi ZNS** phụ thuộc Zalo: template phải được Zalo duyệt, OA đủ điều kiện, có định mức/phí (P-01, P-05). Agentic chỉ *gọi API*, không quyết định được Zalo có gửi hay không.
- ❌ **Đảm bảo khách nhận & nhắn lại** — nằm ở phía khách, không kiểm soát được (P-03).
- ❌ **ZNS cho khách nguồn Fanpage** — ZNS không tồn tại trên Messenger (P-02). Cần kênh khác.
- ❌ **Khớp tự động 100% SĐT ↔ user_id** — không được đảm bảo nếu không có deep-link/opt-in chia sẻ SĐT (P-04/M-01). Đây là ranh giới scope cần chốt.
- ❌ Đồng ý nhận tin (opt-in) của khách — trách nhiệm dữ liệu của khách hàng, không phải Agentic tạo ra.

---

## Summary

- **Business Flow:** Import CSV → gắn phân quyền → gửi ZNS → khách nhắn lại OA → hội thoại vào dashboard đúng Sale/Page.
- **Functional Requirements:** 13 FR (7 core, 3 alternate, 3 edge).
- **Non-Functional Requirements:** 6 NFR (Performance, Security, Compliance, Reliability, Usability, Scalability).
- **Use Cases:** 3 UC.
- **Missing Cases:** 8 flagged.
- **Ambiguities:** 5 flagged.
- **Risk Level:** **High** — chủ yếu do mắt xích khớp SĐT ↔ user_id (M-01/A-01) và phụ thuộc nền tảng Zalo.

## Recommended Next Steps
1. **Chốt A-01/M-01 với tech lead + Zalo API**: cơ chế khớp danh tính (đề xuất: deep-link ZNS gắn mã khách). Đây là điều kiện tiên quyết cho "tự động phân quyền".
2. Chốt A-03/M-02: khách Fanpage đi luồng nào (ZNS không áp dụng).
3. Chốt A-02: quy tắc trùng SĐT khi import.
4. Sau khi chốt → chuyển sang `alice-scope-detail` để viết đặc tả In/Out scope chi tiết cho khách ký.
