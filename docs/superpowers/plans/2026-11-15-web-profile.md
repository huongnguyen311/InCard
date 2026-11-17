# Hồ sơ web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the public web profile mockup (screens W1–W10) as `figma-export/redesign/10-web-profile.html` and wire it into the clickable prototype.

**Architecture:** One new static mockup file in the same format as 01–09 (each screen is a `.rd-shot` containing a `.phone` frame and a `.cap` caption "W1 · Title<small>note</small>"). The prototype (`prototype.html`) discovers screens by fetching files listed in `FLOWS` and reading captions; clicks are routed by label in `proto/routes.js`.

**Tech Stack:** Static HTML/CSS, `rd.css`, Lucide 0.469.0 (unpkg), Public Sans; Playwright MCP for verification; server `npx serve ./figma-export -p 4444` (already running).

**Spec:** `docs/superpowers/specs/2026-11-15-web-profile-design.md`

## Global Constraints

- Head identical to `09-chat.html` lines 1–13 (capture script, Public Sans, `../button-system.css`, `../design-system.css`, `rd.css`, lucide@0.469.0), `lang="en"`, title `InCard Redesign — 10 Hồ sơ web`.
- Colors only via CSS variables; no inline hex.
- Phone frames 390px wide (W9 desktop is the only exception, see Task 3).
- Sample data: Nguyễn Minh Anh, thẻ InApps Technology, URL `incard.biz/minhanh`, avatar `https://i.pravatar.cc/150?img=47`, cover `assets/covers/office.jpg`. Position rows have **no** `.lg` logo badges.
- All copy in Vietnamese with diacritics.
- Do not commit (user commits manually).

## Review Focus

1. Not-logged-in visitor taps Lưu danh bạ / Đặt lịch / Nhắn tin / social → must work without login (only "Kết nối" leads to W3). Checked in Task 4 route test.
2. After login (W3 Google/Apple or W4 OTP) the user lands on W5 with button "Đã gửi lời mời", not back on W1. Checked in Task 4.
3. Long names/titles in the browser address bar and header must ellipsize, not overflow 390px. Checked in Task 1 overflow test.
4. Prototype registry must not break other flows if 10 fails to load, and W9 (desktop) must not appear in the 390px prototype list. Checked in Task 4.
5. Owner opening own link (W8) must not show "Kết nối". Checked in Task 3.

---

### Task 1: File scaffold + W1/W2 (chưa đăng nhập)

**Files:**
- Create: `figma-export/redesign/10-web-profile.html`
- Modify: `figma-export/redesign/index.html` (add flow-card after the 09 card, line ~67)

**Interfaces:**
- Produces: CSS classes reused by later tasks — `.wb-bar` (fake browser address bar: lock icon + `incard.biz/minhanh`, ellipsis), `.wb-head` (web header: InCard logo left, right slot `.wb-login` button "Đăng nhập" or `.wb-me` avatar), `.wb-promo` (bottom band "Tạo thẻ InCard miễn phí"), `.wb-foot` (footer: "Được tạo bằng InCard · Điều khoản · Báo cáo hồ sơ").
- Profile body markup/CSS copied from `03-profile-nfc.html`: rules starting `.pf`, `.pf-*`, `.st-i`, `.pf-pos*` (lines ~350–412, 663–698, 756–797) and the A2 body (line ~996 onward) minus `.lg` spans, minus stats (views/scans are owner-only).

- [ ] **Step 1:** Write W1 "Hồ sơ web — chưa đăng nhập (màn đầu)" and W2 "Hồ sơ web — toàn trang (chưa đăng nhập)": `.statusbar` → `.wb-bar` → `.wb-head` (Đăng nhập) → cover/avatar/name/positions → `button.btn.primary.pf-cta` "Kết nối" → `.pf-acts` Lưu danh bạ / Đặt lịch / Nhắn tin → Kết nối với tôi → sections as A2 → (W2 only) Sản phẩm, Portfolio, `.wb-promo`, `.wb-foot`. Captions explain rules from the spec.
- [ ] **Step 2:** Add index card: `<a class="flow-card" href="10-web-profile.html"><span class="n"><i data-lucide="globe"></i></span><b>10 · Hồ sơ web</b><span>Trang công khai incard.biz/… mở từ QR / NFC / link, không cần app; đăng nhập trên web để kết nối</span></a>`.
- [ ] **Step 3: Verify** via Playwright on `http://localhost:4444/redesign/10-web-profile.html`: `document.querySelectorAll('.rd-shot').length === 2`, zero `pageerror`, every `.phone` has `scrollWidth <= 390`, `.pf-pos .lg` count 0; screenshot W1 and compare visually against 03-A3.

### Task 2: Kết nối flow W3–W7

**Files:** Modify `figma-export/redesign/10-web-profile.html`

**Interfaces:** Consumes Task 1 classes. Produces sheet markup using existing rd.css `.scrim` + `.sheet` (as in `02-home.html` D1).

- [ ] **Step 1:** W3 "Đăng nhập để kết nối": W1 dimmed + sheet: avatar Minh Anh small, title "Đăng nhập để kết nối với Minh Anh", sub "Lời mời sẽ được gửi ngay sau khi đăng nhập.", buttons "Tiếp tục với Google", "Tiếp tục với Apple", "Tiếp tục với Email", line "Chưa có tài khoản? Đăng ký".
- [ ] **Step 2:** W4 "Đăng nhập bằng email": sheet with email field (value `lan.pham@gmail.com`) → OTP 6 ô, "Gửi lại mã sau 0:42", button "Xác nhận".
- [ ] **Step 3:** W5 "Đã gửi lời mời": W1 with `.wb-me` avatar (Phạm Thu Lan, pravatar img=32), CTA becomes ghost/disabled-looking "Đã gửi lời mời" with `clock` icon + link "Huỷ", toast "Đã gửi lời mời kết nối tới Minh Anh".
- [ ] **Step 4:** W6 "Đã đăng nhập": header `.wb-me`, CTA "Kết nối" (tap sends immediately, no sheet); include caption note for variant "Đã kết nối" → CTA "Nhắn tin" + chip "Đã kết nối".
- [ ] **Step 5:** W7 "Lưu danh bạ": sheet "Lưu Minh Anh vào danh bạ" with preview row (avatar, name, SĐT, email) + buttons "Tải tệp danh bạ (.vcf)" and "Huỷ"; caption: works without login.
- [ ] **Step 6: Verify:** 7 `.rd-shot`, zero `pageerror`, all phones `scrollWidth <= 390`, screenshots of W3, W5 look right.

### Task 3: W8 chủ thẻ, W9 desktop, W10 link hết hiệu lực

**Files:** Modify `figma-export/redesign/10-web-profile.html`

- [ ] **Step 1:** W8 "Chủ thẻ xem link của mình": header `.wb-me` = Minh Anh; green band under header "Đây là hồ sơ web của bạn · Mọi người thấy đúng như thế này" + link "Chỉnh sửa trong app"; **no** "Kết nối" button; `.pf-acts` replaced with "Sao chép link" / "QR của tôi" / "Chia sẻ".
- [ ] **Step 2:** W9 "Desktop": `.rd-shot` with attribute `data-pv="skip"`, frame class `.wb-desk` 1280×800, radius 16px, browser bar on top; 2 columns: left sticky card 360px (cover, avatar, name, positions, Kết nối, 3 actions, social), right content (sections, products grid 3 cols, portfolio).
- [ ] **Step 3:** W10 "Link không còn hiệu lực": `.wb-bar` `incard.biz/minhanh-cu`, icon `link-2-off` in circle, title "Hồ sơ này không còn hoạt động", sub "Chủ thẻ đã tắt hoặc đổi đường dẫn.", buttons "Tạo thẻ InCard của bạn" (primary) and "Về trang chủ InCard" (ghost).
- [ ] **Step 4: Verify:** 10 `.rd-shot`; W8 contains no element with text "Kết nối" as CTA (`.pf-cta` absent); zero `pageerror`.

### Task 4: Prototype wiring

**Files:**
- Modify: `figma-export/redesign/prototype.html:147-157` (FLOWS) and `:172` (registry loop)
- Modify: `figma-export/redesign/proto/routes.js` (S map + addTo block ~line 252)

- [ ] **Step 1:** FLOWS add `{ f: '10-web-profile', n: '10', t: 'Hồ sơ web', ic: 'globe' }`. In registry loop skip shots with `sh.dataset.pv === 'skip'` (still increment `idx`, so indices stay aligned with the real file).
- [ ] **Step 2:** Routes:
  - `'10-W1'`/`'10-W2'`: `'Kết nối': '10-W3'`, `'Đăng nhập': '10-W3'`, `'Lưu danh bạ': '10-W7'`, `'Đặt lịch': 'toast:Mở lịch hẹn của Minh Anh'`, `'Nhắn tin': 'toast:Mở Zalo'`, `'Tạo thẻ InCard miễn phí': '01-A2'`; `S['10-W1'] = S['10-W2']` style alias.
  - `'10-W3'`: `'Tiếp tục với Google': '10-W5'`, `'Tiếp tục với Apple': '10-W5'`, `'Tiếp tục với Email': '10-W4'`, `'Đăng ký': '01-C1'`, `'#x': 'back'`.
  - `'10-W4'`: `'Xác nhận': '10-W5'`, `'Gửi lại': 'toast:Đã gửi lại mã'`.
  - `'10-W5'`: `'Huỷ': '10-W6|Đã huỷ lời mời'`.
  - `'10-W6'`: `'Kết nối': '10-W5'`.
  - `'10-W7'`: `'Tải tệp danh bạ': 'back|Đã tải danh bạ Minh Anh'`, `'Huỷ': 'back'`.
  - `'10-W8'`: `'Chỉnh sửa trong app': '03-F1'`, `'Sao chép link': 'toast:Đã sao chép incard.biz/minhanh'`, `'QR của tôi': '02-D1'`, `'Chia sẻ': '02-D1'`, `'#arrow-left': 'back'`.
  - `'10-W10'`: `'Tạo thẻ InCard của bạn': '01-A2'`.
  - Replace `'Hồ sơ web': 'toast:…'` in 03-A2 / 03-A5 / 03-A6 with `'10-W8'`.
- [ ] **Step 3: Verify** with Playwright on `http://localhost:4444/redesign/prototype.html`: sidebar lists group "10 · Hồ sơ web" with W2–W8, W10 (no W1 "màn đầu", no W9); from 03-A2 click "Hồ sơ web" → title shows W8; from 10-W2 click "Kết nối" → W3 → "Tiếp tục với Email" → W4 → "Xác nhận" → W5; from 10-W2 click "Lưu danh bạ" → W7 (no login); zero `pageerror` across the run; other flows (01–09) still listed.
