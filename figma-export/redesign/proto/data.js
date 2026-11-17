/* ==========================================================================
   InCard Prototype — Dữ liệu mẫu (fake data)
   Sửa giá trị trong PERSONA → prototype tự thay trên mọi màn hình.
   Các danh sách còn lại dùng cho bảng "Dữ liệu mẫu" và để đối chiếu nội dung.
   Toàn bộ là dữ liệu giả, không phải người/công ty thật.
   ========================================================================== */
window.PROTO_DATA = {
  /* Tài khoản demo để đăng nhập trong prototype */
  login: { email: 'minhanh@inapps.net', password: 'InCard@2026' },

  /* Người dùng chính. Key "canon" = chuỗi đang có trong mockup; value = giá trị hiển thị
     name / short (và ảnh đại diện) là của tài khoản = giá trị mặc định của thẻ; MỖI THẺ có tên hiển thị
     và ảnh đại diện riêng (cards[].displayName / avatar), không dùng chung. Email đăng nhập thuộc tài khoản.
     title, company, email, phone, link ở đây là giá trị của THẺ 1 (Thẻ InApps Technology);
     SĐT, email, link, mạng xã hội là theo từng thẻ, xem cards[]. */
  PERSONA: {
    name:      { canon: 'Nguyễn Minh Anh',        value: 'Nguyễn Minh Anh' },
    short:     { canon: 'Minh Anh',               value: 'Minh Anh' },
    title:     { canon: 'Giám đốc kinh doanh',    value: 'Giám đốc kinh doanh' },
    company:   { canon: 'InApps Technology',      value: 'InApps Technology' },
    email:     { canon: 'minhanh@inapps.net',     value: 'minhanh@inapps.net' },   // email thẻ 1 (trùng email đăng nhập)
    phone:     { canon: '0908 112 222',           value: '0908 112 222' },         // SĐT thẻ 1
    link:      { canon: 'incard.biz/minhanh',     value: 'incard.biz/minhanh' },   // link công khai thẻ 1
    referral:  { canon: 'incard.biz/ref/nkax5v',  value: 'incard.biz/ref/nkax5v' },
  },

  plan: { name: 'Miễn phí', aiQuota: '10 lượt/ngày', scans: '24 danh thiếp đã quét' },

  /* 1 người dùng có nhiều thẻ (KHÔNG giới hạn số thẻ); mỗi thẻ có nhiều chức vụ / công ty (vị trí đầu = Chính).
     link / phone / email / social / completion là RIÊNG của từng thẻ. Khi chia sẻ hoặc gửi kết nối luôn hỏi chọn thẻ. */
  cards: [
    { name: 'Thẻ InApps Technology', displayName: 'Nguyễn Minh Anh', avatar: 47, type: 'Thẻ NFC', color: 'Graphite', views: 1248, scans: 458, meetings: 5, status: 'Đang dùng',
      link: 'incard.biz/minhanh', phone: '0908 112 222', email: 'minhanh@inapps.net', completion: '100%',
      social: { zalo: '0908 112 222', linkedin: 'linkedin.com/in/minhanh', facebook: '' },
      positions: [
        { title: 'Giám đốc kinh doanh', company: 'InApps Technology', since: '2021', main: true },
        { title: 'Cố vấn chiến lược', company: 'InCard Technology', since: '2024' },
        { title: 'Thành viên Hội đồng cố vấn', company: 'Hiệp hội Phần mềm VINASA', since: '2025' },   // vị trí thứ 3 → ẩn sau "Xem thêm" trên hồ sơ
      ] },
    { name: 'Thẻ CLB Doanh nhân trẻ', displayName: 'Nguyễn Minh Anh', avatar: 47, type: 'Thẻ NFC', color: 'Pearl', views: 312, scans: 87, meetings: 2, status: 'Đang dùng',
      link: 'incard.biz/minhanh/clb-dnt', phone: '0908 112 333', email: 'minhanh@clbdntsg.vn', completion: '60%',
      social: { zalo: '0908 112 333', linkedin: '', facebook: 'facebook.com/clbdntsg' },
      positions: [
        { title: 'Phó Chủ tịch', company: 'CLB Doanh nhân trẻ Sài Gòn', since: '2023', main: true },
        { title: 'Ủy viên BCH', company: 'Hội Doanh nghiệp Quận 1', since: '2025' },
      ] },
    { name: 'Thẻ Mentor khởi nghiệp', displayName: 'Nguyễn Minh Anh', avatar: 47, type: 'Chỉ QR', color: 'Stone', views: 96, scans: 21, meetings: 0, status: 'Chỉ QR',
      link: 'incard.biz/minhanh/mentor', phone: '0908 112 444', email: 'mentor.minhanh@gmail.com', completion: '35%',
      social: { zalo: '', linkedin: 'linkedin.com/in/minhanh', facebook: '' },
      positions: [ { title: 'Diễn giả', company: 'Mentor khởi nghiệp', since: '2022', main: true } ] },
  ],
  /* Tổng của mọi thẻ (lượt xem / lượt quét = chạm NFC + quét QR / cuộc hẹn tính RIÊNG theo từng thẻ; Tài khoản hiển thị tổng).
     stats.cards = số DANH THIẾP GIẤY đã quét (không phải số thẻ InCard của user). Giữ tên key vì prototype.html đang đọc D.stats.cards.
     % hoàn thiện là theo từng thẻ (cards[].completion), không có % chung của user; stats.completion chỉ còn là chuỗi tóm tắt theo thẻ
     để bảng "Dữ liệu mẫu" trong prototype.html không vỡ. */
  stats: { views: 1656, scans: 566, meetings: 7, connections: 128, cards: 24, contacts: 312, completion: 'Theo thẻ: 100% · 60% · 35%' },

  /* Hồ sơ từng người. Prototype dùng để thay nội dung màn mẫu (03-B Hồ sơ, 04-C Chi tiết liên hệ)
     → bấm vào ai sẽ thấy đúng hồ sơ người đó. img = số ảnh pravatar, hoặc null để hiện chữ viết tắt. */
  people: {
    helen: { name: 'Trần Thuỷ (Helen)', short: 'Helen', img: 32, initials: 'TT',
      pos1T: 'CRO', pos1C: 'Incard Technology Corporation', pos1I: 'IC', pos2T: 'Cố vấn', pos2C: 'Mạng lưới Startup Việt', pos2I: 'SV', pos3T: 'Thành viên BCH', pos3C: 'Hội Doanh nhân trẻ TP.HCM', pos3I: 'DN', link: 'incard.biz/helen',
      svc1: 'Tư vấn triển khai CRM cho SME', svc2: 'Đào tạo đội sales B2B', look: ['Đại lý phân phối', 'Khách hàng SME', 'Nhà đầu tư'], col: ['Giới thiệu khách hàng', 'Co-marketing'],   // có svc1 → hiện 3 mục Dịch vụ / Đang tìm kiếm / Hợp tác; không có → ẩn
     
      views: '3.920', scans: '1.104', conn: 'Đã kết nối · 12/11/2026', cover: 'summit', tags: ['Đối tác', 'Khách hàng tiềm năng'],
      ind: ['Nông nghiệp', 'Hoá chất', 'Thương mại', 'Xây dựng'],
      about: 'Hơn 8 năm tư vấn giải pháp công nghệ cho doanh nghiệp và hộ kinh doanh. Từng là Trưởng phòng Kinh doanh tại Quang Dũng Technology và Giám đốc Kinh doanh tại MISA. Hiện phụ trách doanh thu tại InCard, xây dựng kênh đại lý ở 12 tỉnh thành và đồng hành cùng hơn 300 doanh nghiệp SME trong chuyển đổi số bán hàng.',
      str: ['Bán hàng giải pháp SaaS', 'Quản trị doanh thu (CRO)', 'Xây dựng kênh đối tác', 'Đào tạo đội sales'],
      p1: 'InCard cho đội Sales', p1d: 'Quản lý danh thiếp & lead tập trung', p2: 'Digital Marketing', p2d: 'Tăng nhận diện thương hiệu',
      feat: 'Gặp InCard tại CTO Summit 2025', tiles: ['Vietglobal Founders', 'Workshop Sales', 'Đối tác MISA', 'Tư vấn SME'],
      crmT: 'CRO', crmC: 'Incard Technology', coFull: 'Công ty CP Công nghệ InCard', phone: '0987 656 798', email: 'helen@incard.vn',
      note1: 'Đề xuất hợp tác phân phối thẻ NFC khu vực miền Nam.', note2: 'Gặp tại CTO Summit 2025, quan tâm gói doanh nghiệp.' },
    tam: { name: 'Hồ Văn Tâm', short: 'Tâm', img: 68, initials: 'HT',
      pos1T: 'Founder & CEO', pos1C: 'InApps Technology', pos1I: 'IA', pos2T: 'Chủ tịch', pos2C: 'Hội Doanh nghiệp Phần mềm TP.HCM', pos2I: 'HP',
      views: '5.410', scans: '2.230', conn: 'Đã kết nối · 12/11/2026', cover: 'skyline',
      ind: ['Công nghệ', 'Phần mềm', 'Outsourcing', 'Nhân sự IT'],
      about: 'Sáng lập InApps năm 2016, đội ngũ 300+ kỹ sư phục vụ khách hàng Mỹ, Úc, Singapore. Quan tâm hợp tác cung ứng nhân sự IT và chuyển đổi số…',
      str: ['Xây dựng đội ngũ kỹ sư', 'Outsourcing phần mềm', 'Mở rộng thị trường quốc tế', 'Gọi vốn & M&A'],
      p1: 'Đội ngũ kỹ sư thuê ngoài', p1d: '300+ kỹ sư, bàn giao nhanh', p2: 'Phát triển ứng dụng', p2d: 'Web, mobile, AI theo yêu cầu',
      feat: 'InApps 10 năm – Hành trình 300 kỹ sư', tiles: ['Văn phòng InApps', 'Hackathon 2026', 'Khách hàng Úc', 'Đội ngũ AI'],
      crmT: 'Founder, CEO', crmC: 'InApps Technology', coFull: 'Công ty CP Công nghệ InApps', phone: '0903 556 781', email: 'tam.ho@inapps.net',
      note1: 'Quan tâm gói thẻ NFC cho 50 nhân viên, cần báo giá trước 20/11.', note2: 'Gặp tại sự kiện Vietnam Tech Summit, trao đổi về chuyển đổi số.' },
    nam: { name: 'Lê Nhật Nam', short: 'Nam', img: null, initials: 'LN', pos1T: 'Giám đốc', pos1C: 'ICTGO', pos1I: 'IG', crmT: 'Giám đốc', crmC: 'ICTGO', coFull: 'Công ty TNHH ICTGO', phone: '0912 330 845', email: 'nam.le@ictgo.vn', cover: 'city' },
    phuong: { name: 'Đặng Phương', short: 'Phương', img: 45, initials: 'ĐP', pos1T: 'Trưởng phòng Mua hàng', pos1C: 'Sunnycare', pos1I: 'SC', crmT: 'Trưởng phòng Mua hàng', crmC: 'Sunnycare', coFull: 'Công ty CP Sunnycare', phone: '0938 715 602', email: 'phuong.dang@sunnycare.vn', cover: 'clinic' },
    khoa: { name: 'Võ Minh Khoa', short: 'Khoa', img: null, initials: 'VK', pos1T: 'Trưởng nhóm Sales', pos1C: 'FPT Retail', pos1I: 'FR', crmT: 'Trưởng nhóm Sales', crmC: 'FPT Retail', coFull: 'Công ty CP Bán lẻ Kỹ thuật số FPT', phone: '0909 456 128', email: 'khoa.vo@fptretail.vn', cover: 'store' },
    lan: { name: 'Phạm Thu Lan', short: 'Lan', img: null, initials: 'PL', pos1T: 'Marketing Manager', pos1C: 'VNG', pos1I: 'VN', crmT: 'Marketing Manager', crmC: 'VNG', coFull: 'Công ty CP VNG', phone: '0987 224 590', email: 'lan.pham@vng.com.vn', cover: 'studio' },
    an: { name: 'Trần Thị Hoài An', connected: true, short: 'An', img: null, initials: 'HA', pos1T: 'Giám đốc Marketing', pos1C: 'NextGen Software', pos1I: 'NG', crmT: 'Giám đốc Marketing', crmC: 'NextGen Software', coFull: 'Công ty TNHH NextGen Software', phone: '0903 482 117', email: 'an.tran@nextgen.vn', cover: 'workspace', tags: ['Khách hàng', 'Tiềm năng'] },
    quocanh: { name: 'Lê Quốc Anh', connected: true, short: 'Quốc Anh', img: 15, initials: 'QA', pos1T: 'CTO', pos1C: 'FPT Software', pos1I: 'FS', crmT: 'CTO', crmC: 'FPT Software', coFull: 'Công ty TNHH Phần mềm FPT', phone: '0912 778 301', email: 'anh.le@fsoft.vn', cover: 'code' },
    bao: { name: 'Nguyễn Gia Bảo', connected: true, short: 'Bảo', img: null, initials: 'GB', pos1T: 'Trưởng phòng Kinh doanh', pos1C: 'Trung Nguyên Legend', pos1I: 'TN', crmT: 'Trưởng phòng Kinh doanh', crmC: 'Trung Nguyên Legend', coFull: 'Tập đoàn Trung Nguyên Legend', phone: '0918 205 663', email: 'bao.nguyen@trungnguyen.vn', cover: 'coffee' },
    /* Kết nối tiềm năng: CHƯA kết nối (không có trong Danh bạ) */
    ha: { name: 'Vũ Thanh Hà', short: 'Hà', img: 49, initials: 'TH', connected: false, pos1T: 'Giám đốc Kinh doanh', pos1C: 'Haravan', pos1I: 'HR', crmT: 'Giám đốc Kinh doanh', crmC: 'Haravan', coFull: 'Công ty CP Haravan', phone: '0905 214 388', email: 'ha.vu@haravan.com', cover: 'retail' },
    huy: { name: 'Đinh Quang Huy', short: 'Huy', img: null, initials: 'QH', connected: false, pos1T: 'CTO', pos1C: 'Base.vn', pos1I: 'BV', crmT: 'CTO', crmC: 'Base.vn', coFull: 'Công ty CP Base Enterprise', phone: '0916 532 701', email: 'huy.dinh@base.vn', cover: 'server' },
    tram: { name: 'Lý Ngọc Trâm', short: 'Trâm', img: 26, initials: 'NT', connected: false, pos1T: 'Trưởng phòng Đối tác', pos1C: 'Sapo', pos1I: 'SP', crmT: 'Trưởng phòng Đối tác', crmC: 'Sapo', coFull: 'Công ty CP Công nghệ Sapo', phone: '0938 660 129', email: 'tram.ly@sapo.vn', cover: 'meeting' },
    thinh: { name: 'Phan Đức Thịnh', connected: false, short: 'Thịnh', img: 33, initials: 'ĐT', pos1T: 'Giám đốc dự án', pos1C: 'KMS Technology', pos1I: 'KM', crmT: 'Giám đốc dự án', crmC: 'KMS Technology', coFull: 'Công ty TNHH KMS Technology Việt Nam', phone: '0907 118 452', email: 'thinh.phan@kms-technology.com', cover: 'team', conn: 'Đã kết nối · 12/11/2026' },
    /* Liên hệ KHÔNG dùng InCard (saved: true) — chỉ là bản ghi danh bạ, KHÔNG có hồ sơ InCard.
       Tab Đã lưu (nguồn Google / danh thiếp) → 04-E1 Chi tiết liên hệ đã lưu.
       Tab Điện thoại (danh bạ trong máy) → 04-E2 Liên hệ trong điện thoại. */
    tuananh: { name: 'Vũ Tuấn Anh', saved: true, short: 'Tuấn Anh', img: null, initials: 'TA', crmT: 'Trưởng phòng IT', crmC: 'Vinamilk', coFull: 'Công ty CP Sữa Việt Nam (Vinamilk)', phone: '0912 330 845', email: 'tuananh.vu@vinamilk.com.vn', src: 'Google Danh bạ', srcD: 'Đồng bộ lúc 9:39 hôm nay', note1: 'Hỏi lại về đơn thẻ NFC cho phòng IT sau Tết.' },
    hang: { name: 'Lý Minh Hằng', saved: true, short: 'Hằng', img: null, initials: 'MH', crmT: 'Kế toán trưởng', crmC: 'Điện Quang', coFull: 'Công ty CP Bóng đèn Điện Quang', phone: '0987 224 590', email: 'hang.ly@dienquang.com', src: 'Google Danh bạ', srcD: 'Đồng bộ lúc 9:39 hôm nay', note1: 'Phụ trách thanh toán hợp đồng, liên hệ giờ hành chính.' },
    hai: { name: 'Đỗ Thanh Hải', saved: true, short: 'Hải', img: null, initials: 'ĐH', crmT: 'Phó GĐ Phát triển dự án', crmC: 'Nam Long Group', coFull: 'Công ty CP Đầu tư Nam Long', phone: '0938 715 602', email: 'hai.do@namlong.vn', src: 'Quét danh thiếp giấy', srcD: '10/11/2026', note1: 'Gặp ở hội thảo bất động sản, cần gửi hồ sơ năng lực.' },
    kimchi: { name: 'Kim Chi', saved: true, phoneOnly: true, short: 'Kim Chi', img: null, initials: 'KC', phone: '0909 668 214' },
    long: { name: 'Anh Long điện lạnh', saved: true, phoneOnly: true, short: 'Anh Long', img: null, initials: 'AL', phone: '0918 442 097' },
    mai: { name: 'Bùi Thị Mai', saved: true, phoneOnly: true, short: 'Mai', img: null, initials: 'BM', phone: '0983 105 726' },
    hanh: { name: 'Chị Hạnh kế toán', saved: true, phoneOnly: true, short: 'Chị Hạnh', img: null, initials: 'CH', phone: '0903 778 160' },
    quocbao: { name: 'Dương Quốc Bảo', saved: true, phoneOnly: true, short: 'Quốc Bảo', img: null, initials: 'QB', phone: '0935 201 884' },
  },
  /* Màn mẫu dựng theo người nào (để biết cần thay chuỗi nào) */
  personTemplates: { '04-E1': 'tuananh', '04-E2': 'kimchi', '03-B1': 'helen', '03-B2': 'helen', '03-B3': 'helen', '03-B4': 'helen', '03-B5': 'helen', '03-B6': 'helen', '03-B7': 'helen', '03-B8': 'helen', '03-B9': 'helen', '03-B10': 'helen', '03-B11': 'helen', '03-B12': 'helen', '03-B13': 'helen', '03-B14': 'helen', '03-B15': 'helen', '03-B16': 'helen', '09-B1': 'helen', '04-C1': 'tam', '04-C2': 'tam', '04-C3': 'tam', '04-C4': 'tam' },

  connections: [
    { name: 'Trần Thuỷ (Helen)', title: 'CRO', company: 'Incard Technology', source: 'Chạm thẻ NFC', date: '12/11/2026', labels: ['Đối tác'] },
    { name: 'Hồ Văn Tâm',        title: 'Founder & CEO', company: 'InApps', source: 'Chạm thẻ NFC', date: '12/11/2026', labels: ['Khách hàng', 'Tiềm năng'] },
    { name: 'Lê Nhật Nam',       title: 'Giám đốc', company: 'ICTGO', source: 'Mã QR', date: '10/11/2026', labels: [] },
    { name: 'Đặng Phương',       title: 'Trưởng phòng Mua hàng', company: 'Sunnycare', source: 'Mã QR', date: '08/11/2026', labels: ['Khách hàng'] },
    { name: 'Võ Minh Khoa',      title: 'Trưởng nhóm Sales', company: 'FPT Retail', source: 'Danh thiếp', date: '05/11/2026', labels: [] },
    { name: 'Phạm Thu Lan',      title: 'Marketing Manager', company: 'VNG', source: 'Google', date: '01/11/2026', labels: ['Đối tác'] },
  ],

  scannedCards: [
    { name: 'Phạm Minh Thư', title: 'Giám đốc Nhân sự', company: 'Tập đoàn Masan', status: 'Đã nhận diện' },
    { name: 'Đỗ Thanh Hải',  title: 'Phó GĐ Phát triển dự án', company: 'Nam Long Group', status: 'Cần kiểm tra email' },
    { name: 'Lê Hoàng Yến',  title: 'Chuyên viên KHDN', company: 'Vietcombank', status: 'Đã nhận diện' },
  ],

  notifications: [
    { text: 'Hồ Tâm muốn kết nối với bạn', type: 'Lời mời', time: 'Hôm nay' },
    { text: 'Đặng Phương muốn kết nối với bạn', type: 'Lời mời', time: 'Hôm nay' },
    { text: 'Lê Nhật Nam đã xem hồ sơ của bạn', type: 'Hoạt động', time: 'Hôm nay' },
    { text: 'Trần Thuỷ (Helen) đã chấp nhận lời mời', type: 'Kết nối', time: 'Trước đó' },
  ],

  appointments: [
    { title: 'Cà phê bàn hợp tác với Hồ Văn Tâm', time: 'T2 16/11 · 09:00', place: 'The Coffee House Q.3' },
    { title: 'Demo thẻ NFC cho Sunnycare', time: 'T4 18/11 · 14:00', place: 'Online' },
  ],

  tasks: [
    { title: 'Gọi điện cho anh Hồ Tâm', due: 'T6 13/11 · 15:00' },
    { title: 'Gửi báo giá 50 thẻ NFC', due: 'T5 12/11 · Quá hạn' },
  ],

  posts: [
    { title: 'Tìm đối tác cung ứng IT Talents giao tiếp tiếng Anh tốt tại HMC', author: 'Hồ Tâm', type: 'Tìm đối tác' },
    { title: 'Gặp InCard tại CTO Summit 2025', author: 'Trần Thuỷ (Helen)', type: 'Sự kiện' },
    { title: 'Tìm nhà phân phối thẻ NFC cho doanh nghiệp tại Đà Nẵng', author: 'Nguyễn Minh Anh', type: 'Tìm đối tác' },
  ],
};
