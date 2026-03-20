# InCard HTML Mockup Restructure Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 8 multi-screen HTML flow files with 35 individual per-screen HTML files and update `index.html` to show all screens as thumbnails grouped by 4 flows.

**Architecture:** Each screen gets its own HTML file under `figma-export/screens/[flow]/`. Content is pulled fresh from Figma via `get_design_context` + `get_screenshot` for each node. `index.html` is rebuilt last once all filenames are resolved.

**Tech Stack:** HTML, CSS (custom properties), Public Sans (Google Fonts), Figma MCP tools (`get_design_context`, `get_screenshot`, `get_metadata`)

**Figma file key:** `aLCvAIDfdTvUfAyd5bkXot`

**Spec:** `docs/superpowers/specs/2026-03-16-incard-mockup-restructure-design.md`

---

## HTML Template (used for every screen)

Every screen file uses this shell — replace `[Screen Name]` and `<!-- Screen content -->`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>InCard — [Screen Name]</title>
  <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --canvas-bg:     #a49d9d;
      --shadow-frame:  0 4px 24px rgba(0,0,0,0.28);
      --green:         #009037;
      --green-dark:    #007a2f;
      --green-light:   #2eb07a;
      --green-bg:      rgba(0,144,55,0.1);
      --green-surface: #dcfce7;
      --emerald:       #10b981;
      --emerald-bg:    #ecfdf5;
      --slate-900:     #0f172a;
      --slate-800:     #1e293b;
      --slate-700:     #334155;
      --slate-600:     #475569;
      --slate-500:     #64748b;
      --slate-400:     #94a3b8;
      --slate-200:     #e2e8f0;
      --slate-100:     #f1f5f9;
      --slate-50:      #f8fafc;
      --gray-bg:       #f8f6f6;
      --red-100:       #fee2e2;
      --red-600:       #dc2626;
      --white:         #ffffff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--canvas-bg);
      font-family: 'Public Sans', sans-serif;
      display: flex;
      justify-content: center;
      padding: 48px 40px;
    }
    .screen {
      width: 390px;
      border-radius: 44px;
      overflow: hidden;
      background: var(--white);
      box-shadow: var(--shadow-frame);
    }
  </style>
</head>
<body>
  <div class="screen">
    <!-- Screen content from Figma -->
  </div>
</body>
</html>
```

**Constraints (must hold for every file):**
- All colors via CSS variables — no hardcoded hex outside `:root`
- Capture script in `<head>`, not `<body>`
- Bottom nav: `position: sticky; margin: 0 16px` (never `position: fixed`)
- Screen width exactly 390px
- `lang="en"` on `<html>`

---

## Chunk 1: Setup + Auth Flow (9 screens)

### Task 1: Create directory structure and delete old files

**Files:**
- Create dirs: `figma-export/screens/auth/`, `figma-export/screens/home/`, `figma-export/screens/profile/`, `figma-export/screens/network/`
- Delete: `figma-export/auth-flow.html`, `figma-export/create-profile-flow.html`, `figma-export/home-flow.html`, `figma-export/settings-flow.html`, `figma-export/potential-flow.html`, `figma-export/edit-profile-flow.html`, `figma-export/profile-flow.html`, `figma-export/network-flow.html`

- [ ] **Step 1: Create screen subdirectories**

```bash
mkdir -p figma-export/screens/auth
mkdir -p figma-export/screens/home
mkdir -p figma-export/screens/profile
mkdir -p figma-export/screens/network
```

- [ ] **Step 2: Delete old multi-screen flow files**

```bash
rm figma-export/auth-flow.html
rm figma-export/create-profile-flow.html
rm figma-export/home-flow.html
rm figma-export/settings-flow.html
rm figma-export/potential-flow.html
rm figma-export/edit-profile-flow.html
rm figma-export/profile-flow.html
rm figma-export/network-flow.html
```

- [ ] **Step 3: Commit**

```bash
git add figma-export/screens/
git rm figma-export/auth-flow.html figma-export/create-profile-flow.html \
       figma-export/home-flow.html figma-export/settings-flow.html \
       figma-export/potential-flow.html figma-export/edit-profile-flow.html \
       figma-export/profile-flow.html figma-export/network-flow.html
git commit -m "chore: remove old multi-screen flow files, create screens/ directory structure"
```

---

### Task 2: Auth screen 1 — Sign Up (`3:6205`)

**Files:**
- Create: `figma-export/screens/auth/01-sign-up.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:6205")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:6205")`
Keep screenshot open as reference during implementation.

- [ ] **Step 3: Implement `figma-export/screens/auth/01-sign-up.html`**

Use the HTML template above. Adapt the design context code to fit inside `.screen`. Validate visually against screenshot for 1:1 parity.

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/auth/01-sign-up.html
git commit -m "feat: add auth/01-sign-up screen from Figma 3:6205"
```

---

### Task 3: Auth screen 2 — Sign In (`3:6448`)

**Files:**
- Create: `figma-export/screens/auth/02-sign-in.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:6448")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:6448")`

- [ ] **Step 3: Implement `figma-export/screens/auth/02-sign-in.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/auth/02-sign-in.html
git commit -m "feat: add auth/02-sign-in screen from Figma 3:6448"
```

---

### Task 4: Auth screen 3 — Create Profile (`3:6604`)

**Files:**
- Create: `figma-export/screens/auth/03-create-profile.html`

> Note: CLAUDE.md lists `3:6604` as "Home / Dashboard" but this is outdated. Per the 2026-03-16 canvas metadata fetch, `3:6604` is the Create Profile onboarding screen inside the Auth Flow group. The spec node IDs are authoritative.

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:6604")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:6604")`

- [ ] **Step 3: Implement `figma-export/screens/auth/03-create-profile.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/auth/03-create-profile.html
git commit -m "feat: add auth/03-create-profile screen from Figma 3:6604"
```

---

### Task 5: Auth screen 4 — Professional Details (`3:7497`)

**Files:**
- Create: `figma-export/screens/auth/04-professional-details.html`

> Node `3:7497` has Figma name "Body" — fetch screenshot first to confirm it is the Professional Details screen.

- [ ] **Step 1: Fetch screenshot to identify screen**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7497")`
Confirm this is the Professional Details / onboarding form screen. If it shows a different screen, assign the correct filename before proceeding.

- [ ] **Step 2: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7497")`

- [ ] **Step 3: Implement `figma-export/screens/auth/04-professional-details.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/auth/04-professional-details.html
git commit -m "feat: add auth/04-professional-details screen from Figma 3:7497"
```

---

### Task 6: Auth screen 5 — Connect with Me (`3:6742`)

**Files:**
- Create: `figma-export/screens/auth/05-connect-with-me.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:6742")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:6742")`

- [ ] **Step 3: Implement `figma-export/screens/auth/05-connect-with-me.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/auth/05-connect-with-me.html
git commit -m "feat: add auth/05-connect-with-me screen from Figma 3:6742"
```

---

### Task 7: Auth screen 6 — Add Portfolio Video (`3:7853`)

**Files:**
- Create: `figma-export/screens/auth/06-add-portfolio-video.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7853")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7853")`

- [ ] **Step 3: Implement `figma-export/screens/auth/06-add-portfolio-video.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/auth/06-add-portfolio-video.html
git commit -m "feat: add auth/06-add-portfolio-video screen from Figma 3:7853"
```

---

### Task 8: Auth screen 7 — Add Portfolio Image (`3:7908`)

**Files:**
- Create: `figma-export/screens/auth/07-add-portfolio-image.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7908")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7908")`

- [ ] **Step 3: Implement `figma-export/screens/auth/07-add-portfolio-image.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/auth/07-add-portfolio-image.html
git commit -m "feat: add auth/07-add-portfolio-image screen from Figma 3:7908"
```

---

### Task 9: Auth screen 8 — Add Service/Product (`3:7637`)

**Files:**
- Create: `figma-export/screens/auth/08-add-service-product.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7637")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7637")`

- [ ] **Step 3: Implement `figma-export/screens/auth/08-add-service-product.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/auth/08-add-service-product.html
git commit -m "feat: add auth/08-add-service-product screen from Figma 3:7637"
```

---

### Task 10: Auth screen 9 — Success Modal (`3:7826`)

**Files:**
- Create: `figma-export/screens/auth/09-success-modal.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7826")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="3:7826")`

- [ ] **Step 3: Implement `figma-export/screens/auth/09-success-modal.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/auth/09-success-modal.html
git commit -m "feat: add auth/09-success-modal screen from Figma 3:7826"
```

---

## Chunk 2: Home & Account Flow (8 screens)

> **Note:** Nodes `4:8019`, `4:9026`, `4:9027`, `4:9028`, `4:9062` have generic Figma names ("Body", "Group N"). For each: fetch screenshot first → identify what screen it is → use that as the filename. Node `4:8431` is confirmed as Account Details.

### Task 11: Home screen 1 — Home Dashboard (`4:8019`)

**Files:**
- Create: `figma-export/screens/home/01-home-dashboard.html` (name TBC from screenshot)

- [ ] **Step 1: Fetch screenshot to identify screen**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:8019")`
Confirm this is the Home Dashboard. If not, assign correct filename.

- [ ] **Step 2: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:8019")`

- [ ] **Step 3: Implement with confirmed filename**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/home/01-home-dashboard.html
git commit -m "feat: add home/01-home-dashboard screen from Figma 4:8019"
```

---

### Task 12: Home screen 2 — Account Details (`4:8431`)

**Files:**
- Create: `figma-export/screens/home/02-account-details.html`

> Node `4:8431` has Figma name "Body" — confirmed as Account Details per CLAUDE.md, but fetch screenshot first to visually verify.

- [ ] **Step 1: Fetch screenshot to verify**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:8431")`
Confirm this is the Account Details / Settings screen. If it shows a different screen, assign the correct filename.

- [ ] **Step 2: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:8431")`

- [ ] **Step 3: Implement `figma-export/screens/home/02-account-details.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/home/02-account-details.html
git commit -m "feat: add home/02-account-details screen from Figma 4:8431"
```

---

### Task 13: Home screens 3–6 — Unresolved nodes (`4:9026`, `4:9027`, `4:9028`, `4:9062`)

**Files:**
- Create: `figma-export/screens/home/03-[resolved].html`
- Create: `figma-export/screens/home/04-[resolved].html`
- Create: `figma-export/screens/home/05-[resolved].html`
- Create: `figma-export/screens/home/06-[resolved].html`

For each node below, follow this sequence:

- [ ] **Step 1: Fetch screenshot for `4:9026`**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9026")`
Identify the screen from the visual. Assign descriptive filename `03-[name].html`.

- [ ] **Step 2: Fetch design context for `4:9026`**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9026")`

- [ ] **Step 3: Implement `figma-export/screens/home/03-[resolved-name].html`**

- [ ] **Step 4: Fetch screenshot for `4:9027`**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9027")`
Assign descriptive filename `04-[name].html`.

- [ ] **Step 5: Fetch design context for `4:9027`**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9027")`

- [ ] **Step 6: Implement `figma-export/screens/home/04-[resolved-name].html`**

- [ ] **Step 7: Fetch screenshot for `4:9028`**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9028")`
Assign descriptive filename `05-[name].html`.

- [ ] **Step 8: Fetch design context for `4:9028`**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9028")`

- [ ] **Step 9: Implement `figma-export/screens/home/05-[resolved-name].html`**

- [ ] **Step 10: Fetch screenshot for `4:9062`**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9062")`
Assign descriptive filename `06-[name].html`.

- [ ] **Step 11: Fetch design context for `4:9062`**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9062")`

- [ ] **Step 12: Implement `figma-export/screens/home/06-[resolved-name].html`**

- [ ] **Step 13: Commit all 4 files**

> By this step the 4 resolved filenames are known. Stage each file by its exact resolved name, not a glob.

```bash
# Replace [name-03], [name-04], [name-05], [name-06] with the actual filenames assigned above
git add figma-export/screens/home/03-[name-03].html \
        figma-export/screens/home/04-[name-04].html \
        figma-export/screens/home/05-[name-05].html \
        figma-export/screens/home/06-[name-06].html
git commit -m "feat: add home screens 03-06 from Figma (4:9026, 4:9027, 4:9028, 4:9062)"
```

---

### Task 14: Home screen 7 — Recent Connections (`4:9119`)

**Files:**
- Create: `figma-export/screens/home/07-recent-connections.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9119")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9119")`

- [ ] **Step 3: Implement `figma-export/screens/home/07-recent-connections.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/home/07-recent-connections.html
git commit -m "feat: add home/07-recent-connections screen from Figma 4:9119"
```

---

### Task 15: Home screen 8 — Connection Sent (`4:9237`)

**Files:**
- Create: `figma-export/screens/home/08-connection-sent.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9237")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:9237")`

- [ ] **Step 3: Implement `figma-export/screens/home/08-connection-sent.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/home/08-connection-sent.html
git commit -m "feat: add home/08-connection-sent screen from Figma 4:9237"
```

---

## Chunk 3: Profile Flow (17 screens)

> **Note:** Nodes `28:2044`, `4:11706`, `4:11707`, `4:11971`, `4:12425` have generic names. Fetch screenshot first for these to identify and name them.

### Task 16: Profile screen 1 — Digital Profile (`28:2044`)

**Files:**
- Create: `figma-export/screens/profile/01-digital-profile.html`

- [ ] **Step 1: Fetch screenshot to verify**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:2044")`

- [ ] **Step 2: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:2044")`

- [ ] **Step 3: Implement `figma-export/screens/profile/01-digital-profile.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/01-digital-profile.html
git commit -m "feat: add profile/01-digital-profile screen from Figma 28:2044"
```

---

### Task 17: Profile screens 2–4 — Unresolved nodes (`4:11706`, `4:11707`, `4:11971`)

**Files:**
- Create: `figma-export/screens/profile/02-[resolved].html`
- Create: `figma-export/screens/profile/03-[resolved].html`
- Create: `figma-export/screens/profile/04-[resolved].html`

- [ ] **Step 1: Fetch screenshot for `4:11706`**, identify screen, assign filename `02-[name].html`

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:11706")`

- [ ] **Step 2: Fetch design context for `4:11706`**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:11706")`

- [ ] **Step 3: Implement `figma-export/screens/profile/02-[resolved-name].html`**

- [ ] **Step 4: Fetch screenshot for `4:11707`**, assign filename `03-[name].html`

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:11707")`

- [ ] **Step 5: Fetch design context for `4:11707`**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:11707")`

- [ ] **Step 6: Implement `figma-export/screens/profile/03-[resolved-name].html`**

- [ ] **Step 7: Fetch screenshot for `4:11971`**, assign filename `04-[name].html`

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:11971")`

- [ ] **Step 8: Fetch design context for `4:11971`**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:11971")`

- [ ] **Step 9: Implement `figma-export/screens/profile/04-[resolved-name].html`**

- [ ] **Step 10: Commit all 3 files**

> By this step the 3 resolved filenames are known. Stage each file by its exact resolved name, not a glob.

```bash
# Replace [name-02], [name-03], [name-04] with the actual filenames assigned above
git add figma-export/screens/profile/02-[name-02].html \
        figma-export/screens/profile/03-[name-03].html \
        figma-export/screens/profile/04-[name-04].html
git commit -m "feat: add profile screens 02-04 from Figma (4:11706, 4:11707, 4:11971)"
```

---

### Task 18: Profile screen 5 — NFC Tap (`4:13068`)

**Files:**
- Create: `figma-export/screens/profile/05-nfc-tap.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:13068")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:13068")`

- [ ] **Step 3: Implement `figma-export/screens/profile/05-nfc-tap.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/05-nfc-tap.html
git commit -m "feat: add profile/05-nfc-tap screen from Figma 4:13068"
```

---

### Task 19: Profile screen 6 — Add Portfolio Images (`4:12426`)

**Files:**
- Create: `figma-export/screens/profile/06-add-portfolio-images.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12426")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12426")`

- [ ] **Step 3: Implement `figma-export/screens/profile/06-add-portfolio-images.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/06-add-portfolio-images.html
git commit -m "feat: add profile/06-add-portfolio-images screen from Figma 4:12426"
```

---

### Task 20: Profile screen 7 — Activation Failed (`4:13162`)

**Files:**
- Create: `figma-export/screens/profile/07-activation-failed.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:13162")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:13162")`

- [ ] **Step 3: Implement `figma-export/screens/profile/07-activation-failed.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/07-activation-failed.html
git commit -m "feat: add profile/07-activation-failed screen from Figma 4:13162"
```

---

### Task 21: Profile screen 8 — Activation Success (`4:13212`)

**Files:**
- Create: `figma-export/screens/profile/08-activation-success.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:13212")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:13212")`

- [ ] **Step 3: Implement `figma-export/screens/profile/08-activation-success.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/08-activation-success.html
git commit -m "feat: add profile/08-activation-success screen from Figma 4:13212"
```

---

### Task 22: Profile screen 9 — Add Portfolio Modal (`4:12630`)

**Files:**
- Create: `figma-export/screens/profile/09-add-portfolio-modal.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12630")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12630")`

- [ ] **Step 3: Implement `figma-export/screens/profile/09-add-portfolio-modal.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/09-add-portfolio-modal.html
git commit -m "feat: add profile/09-add-portfolio-modal screen from Figma 4:12630"
```

---

### Task 23: Profile screen 10 — Compact Add Service (`4:12684`)

**Files:**
- Create: `figma-export/screens/profile/10-compact-add-service.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12684")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12684")`

- [ ] **Step 3: Implement `figma-export/screens/profile/10-compact-add-service.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/10-compact-add-service.html
git commit -m "feat: add profile/10-compact-add-service screen from Figma 4:12684"
```

---

### Task 24: Profile screen 11 — NFC Scan QR (`4:13259`)

**Files:**
- Create: `figma-export/screens/profile/11-nfc-scan-qr.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:13259")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:13259")`

- [ ] **Step 3: Implement `figma-export/screens/profile/11-nfc-scan-qr.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/11-nfc-scan-qr.html
git commit -m "feat: add profile/11-nfc-scan-qr screen from Figma 4:13259"
```

---

### Task 25: Profile screen 12 — Unresolved (`4:12425`)

**Files:**
- Create: `figma-export/screens/profile/12-[resolved].html`

- [ ] **Step 1: Fetch screenshot to identify**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12425")`
Identify the screen and assign filename `12-[name].html`.

- [ ] **Step 2: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12425")`

- [ ] **Step 3: Implement `figma-export/screens/profile/12-[resolved-name].html`**

- [ ] **Step 4: Commit**

> By this step the resolved filename is known. Stage the exact filename, not a glob.

```bash
# Replace [name-12] with the actual filename assigned above
git add figma-export/screens/profile/12-[name-12].html
git commit -m "feat: add profile/12-[name] screen from Figma 4:12425"
```

---

### Task 26: Profile screen 13 — Connect Social (`4:12480`)

**Files:**
- Create: `figma-export/screens/profile/13-connect-social.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12480")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="4:12480")`

- [ ] **Step 3: Implement `figma-export/screens/profile/13-connect-social.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/13-connect-social.html
git commit -m "feat: add profile/13-connect-social screen from Figma 4:12480"
```

---

### Task 27: Profile screen 14 — Add Portfolio Video (`28:4620`)

**Files:**
- Create: `figma-export/screens/profile/14-add-portfolio-video.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:4620")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:4620")`

- [ ] **Step 3: Implement `figma-export/screens/profile/14-add-portfolio-video.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/14-add-portfolio-video.html
git commit -m "feat: add profile/14-add-portfolio-video screen from Figma 28:4620"
```

---

### Task 28: Profile screen 15 — Add Portfolio Image (`28:4674`)

**Files:**
- Create: `figma-export/screens/profile/15-add-portfolio-image.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:4674")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:4674")`

- [ ] **Step 3: Implement `figma-export/screens/profile/15-add-portfolio-image.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/15-add-portfolio-image.html
git commit -m "feat: add profile/15-add-portfolio-image screen from Figma 28:4674"
```

---

### Task 29: Profile screen 16 — Add Service/Product (`28:4728`)

**Files:**
- Create: `figma-export/screens/profile/16-add-service-product.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:4728")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:4728")`

- [ ] **Step 3: Implement `figma-export/screens/profile/16-add-service-product.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/16-add-service-product.html
git commit -m "feat: add profile/16-add-service-product screen from Figma 28:4728"
```

---

### Task 30: Profile screen 17 — Success Modal (`28:4791`)

**Files:**
- Create: `figma-export/screens/profile/17-success-modal.html`

- [ ] **Step 1: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:4791")`

- [ ] **Step 2: Fetch screenshot**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:4791")`

- [ ] **Step 3: Implement `figma-export/screens/profile/17-success-modal.html`**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/profile/17-success-modal.html
git commit -m "feat: add profile/17-success-modal screen from Figma 28:4791"
```

---

## Chunk 4: Network Flow + Index Rebuild

### Task 31: Network screen 1 — Network (`28:5091`)

**Files:**
- Create: `figma-export/screens/network/01-network.html`

- [ ] **Step 1: Fetch screenshot to identify**

Call: `get_screenshot(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:5091")`
Confirm this is the Network / Connections screen. If it shows a different screen, assign a more accurate filename (e.g., `01-[actual-screen-name].html`) and update the commit command accordingly.

- [ ] **Step 2: Fetch design context**

Call: `get_design_context(fileKey="aLCvAIDfdTvUfAyd5bkXot", nodeId="28:5091")`

- [ ] **Step 3: Implement with confirmed filename**

- [ ] **Step 4: Commit**

```bash
git add figma-export/screens/network/01-network.html
git commit -m "feat: add network/01-network screen from Figma 28:5091"
```

---

### Task 32: Rebuild `index.html`

> All 35 screen files must exist and all `[resolved]` filenames must be finalized before this task.

**Files:**
- Modify: `figma-export/index.html`

- [ ] **Step 1: Collect all final filenames**

List all files under `figma-export/screens/` to confirm 35 files exist and all names are resolved (no `[resolved]` placeholders remain).

```bash
find figma-export/screens -name "*.html" | sort
```

Expected: 35 files total (9 auth + 8 home + 17 profile + 1 network).

- [ ] **Step 2: Rewrite `figma-export/index.html`**

Replace the entire file with the new structure. Each thumbnail entry follows this pattern:

```html
<a class="screen-link" href="screens/[flow]/[file].html">
  <div class="phone-frame">
    <iframe src="screens/[flow]/[file].html" loading="lazy" title="[Screen Name]"></iframe>
    <button class="copy-btn" onclick="event.preventDefault();navigator.clipboard.writeText('http://localhost:4444/screens/[flow]/[file].html')">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="7" height="8" rx="1" stroke="white" stroke-width="1.3"/><path d="M3 3V2a1 1 0 011-1h5a1 1 0 011 1v7a1 1 0 01-1 1H9" stroke="white" stroke-width="1.3"/></svg>
      Copy URL
    </button>
  </div>
  <div class="screen-name">[Screen Name]</div>
</a>
```

The `.phone-frame` CSS must be:
```css
.phone-frame {
  width: 195px;
  height: 422px;
  border-radius: 22px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.14);
  position: relative;
}
.phone-frame iframe {
  width: 390px;
  height: 844px;
  border: none;
  transform: scale(0.5);
  transform-origin: top left;
  pointer-events: none;
}
```

Four `flow-group` sections with labels:
1. `InCard Auth Flow` — 9 thumbnails
2. `InCard Home & Account` — 8 thumbnails
3. `InCard Profile Flow` — 17 thumbnails
4. `InCard Network Flow` — 1 thumbnail

- [ ] **Step 3: Verify locally**

```bash
npx serve ./figma-export -p 4444
```

Open `http://localhost:4444` and confirm:
- 4 flow groups visible
- All 35 thumbnails render
- Hover shows Copy URL button
- Click navigates to individual screen

- [ ] **Step 4: Commit**

```bash
git add figma-export/index.html
git commit -m "feat: rebuild index.html with 35 individual screen thumbnails across 4 flows"
```

---

## Completion Checklist

- [ ] 35 screen HTML files exist under `figma-export/screens/`
- [ ] No `[resolved]` placeholder filenames remain
- [ ] `index.html` shows all 35 thumbnails in 4 flow groups
- [ ] All 8 old multi-screen flow files deleted
- [ ] All colors use CSS variables (no hardcoded hex inline outside `:root`)
- [ ] Capture script in `<head>` of every file
- [ ] `lang="en"` on every file
