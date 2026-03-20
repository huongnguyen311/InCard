# InCard HTML Mockup Restructure — Design Spec

**Date:** 2026-03-16
**Status:** Approved

---

## Overview

Restructure the InCard HTML mockup workspace from multi-screen flow files into individual per-screen HTML files. Update `index.html` to display all 35 screens as individual thumbnails grouped by 4 flows.

---

## Problem

Current structure has one HTML file per flow (e.g., `auth-flow.html` contains Sign Up + Sign In + Create Profile all in one file). This makes it hard to:
- Capture individual screens to Figma
- Navigate directly to a specific screen
- Maintain 1:1 parity with Figma designs as they evolve

---

## Goal

- One HTML file per screen (35 screens total)
- `index.html` shows all screens as individual thumbnails grouped by flow
- All screens pulled fresh from Figma for 1:1 design parity
- Clean, predictable file naming for easy reference

---

## File Structure

### Delete (old multi-screen files)
```
figma-export/auth-flow.html
figma-export/create-profile-flow.html
figma-export/home-flow.html
figma-export/settings-flow.html
figma-export/potential-flow.html
figma-export/edit-profile-flow.html
figma-export/profile-flow.html
figma-export/network-flow.html
```

### Create (new per-screen files)

```
figma-export/screens/
  auth/
    01-sign-up.html
    02-sign-in.html
    03-create-profile.html
    04-professional-details.html
    05-connect-with-me.html
    06-add-portfolio-video.html
    07-add-portfolio-image.html
    08-add-service-product.html
    09-success-modal.html
  home/
    01-home-dashboard.html
    02-account-details.html
    03-[resolved-after-screenshot].html
    04-[resolved-after-screenshot].html
    05-[resolved-after-screenshot].html
    06-[resolved-after-screenshot].html
    07-recent-connections.html
    08-connection-sent.html
  profile/
    01-digital-profile.html
    02-[resolved-after-screenshot].html
    03-[resolved-after-screenshot].html
    04-[resolved-after-screenshot].html
    05-nfc-tap.html
    06-add-portfolio-images.html
    07-activation-failed.html
    08-activation-success.html
    09-add-portfolio-modal.html
    10-compact-add-service.html
    11-nfc-scan-qr.html
    12-[resolved-after-screenshot].html
    13-connect-social.html
    14-add-portfolio-video.html
    15-add-portfolio-image.html
    16-add-service-product.html
    17-success-modal.html
  network/
    01-network.html
```

> Note: screens marked `[resolved-after-screenshot]` have generic Figma names ("Body", "Group N"). During implementation, fetch `get_screenshot` for each node first, identify the screen, then assign a descriptive filename before writing the HTML file. Build `index.html` last, after all per-screen filenames have been resolved and all HTML files exist.

---

## Figma Node IDs

> **Note on node ID discrepancies:** The node IDs below are sourced from a live metadata fetch of the Figma canvas (2026-03-16) and supersede any node IDs listed in `CLAUDE.md`. The Figma file has been updated since CLAUDE.md was written.

### Flow 1 — InCard Auth Flow (9 screens)
| File | Node ID | Figma Name |
|---|---|---|
| `auth/01-sign-up.html` | `3:6205` | Sign up |
| `auth/02-sign-in.html` | `3:6448` | Sign In |
| `auth/03-create-profile.html` | `3:6604` | Create profile |
| `auth/04-professional-details.html` | `3:7497` | Body |
| `auth/05-connect-with-me.html` | `3:6742` | Create profile - Connect with me |
| `auth/06-add-portfolio-video.html` | `3:7853` | Create profile - Add portfolio video |
| `auth/07-add-portfolio-image.html` | `3:7908` | Create profile - Add portfolio image |
| `auth/08-add-service-product.html` | `3:7637` | Create profile - Add Service/Product |
| `auth/09-success-modal.html` | `3:7826` | Create profile - successful modal |

### Flow 2 — InCard Home & Account (8 screens)
| File | Node ID | Figma Name |
|---|---|---|
| `home/01-home-dashboard.html` | `4:8019` | Body — requires screenshot verification (generic name) |
| `home/02-account-details.html` | `4:8431` | Body (confirmed = Account Details per CLAUDE.md) |
| `home/03-[resolved].html` | `4:9026` | Group 1 — requires screenshot verification |
| `home/04-[resolved].html` | `4:9027` | Group 2 — requires screenshot verification |
| `home/05-[resolved].html` | `4:9028` | Body — requires screenshot verification |
| `home/06-[resolved].html` | `4:9062` | Body — requires screenshot verification |
| `home/07-recent-connections.html` | `4:9119` | Recent Connections - Synchronized Menu |
| `home/08-connection-sent.html` | `4:9237` | Connection Request Sent Success |

### Flow 3 — InCard Profile Flow (17 screens)
| File | Node ID | Figma Name |
|---|---|---|
| `profile/01-digital-profile.html` | `28:2044` | Body |
| `profile/02-[resolved].html` | `4:11706` | Group 3 |
| `profile/03-[resolved].html` | `4:11707` | Body |
| `profile/04-[resolved].html` | `4:11971` | Group 4 |
| `profile/05-nfc-tap.html` | `4:13068` | Step 2: Tap NFC - Refined Card |
| `profile/06-add-portfolio-images.html` | `4:12426` | Add Portfolio - Images Tab |
| `profile/07-activation-failed.html` | `4:13162` | Activation Failed - Simplified |
| `profile/08-activation-success.html` | `4:13212` | Activation Success - Dashboard Flow |
| `profile/09-add-portfolio-modal.html` | `4:12630` | Add Portfolio Modal Modified |
| `profile/10-compact-add-service.html` | `4:12684` | Compact Add Service Modal |
| `profile/11-nfc-scan-qr.html` | `4:13259` | Step 1: Scan QR Code - Updated |
| `profile/12-[resolved].html` | `4:12425` | Group 5 |
| `profile/13-connect-social.html` | `4:12480` | Connect with me - Colorful Brand Icons |
| `profile/14-add-portfolio-video.html` | `28:4620` | Create profile - Add portfolio video |
| `profile/15-add-portfolio-image.html` | `28:4674` | Create profile - Add portfolio image |
| `profile/16-add-service-product.html` | `28:4728` | Create profile - Add Service/Product |
| `profile/17-success-modal.html` | `28:4791` | Create profile - successful modal |

### Flow 4 — InCard Network Flow (1 screen)
| File | Node ID | Figma Name |
|---|---|---|
| `network/01-network.html` | `28:5091` | Body |

---

## Per-Screen HTML Template

Each screen file follows this structure:

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
      --canvas-bg:     #a49d9d;   /* Mockup-only: page background behind phone frame — not a product design token */
      --shadow-frame:  0 4px 24px rgba(0,0,0,0.28); /* Mockup-only: phone frame drop shadow — not a product design token */
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
      box-shadow: var(--shadow-frame); /* mockup-only chrome shadow */
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

---

## `index.html` Structure

Four `flow-group` sections. Each group shows thumbnails for its screens in a flex row (wrapping). Each thumbnail:
- Phone frame wrapper: `width: 195px; height: 422px; overflow: hidden; border-radius: 22px`
- Inside: `<iframe>` at `width: 390px; height: 844px; transform: scale(0.5); transform-origin: top left; pointer-events: none; border: none` — 844px is a fixed standard viewport height (iPhone viewport). Screens shorter than 844px will show white space at the bottom; screens taller will be clipped. This is intentional for consistent thumbnail sizing in the index grid.
- `src` pointing to `screens/[flow]/[file].html`
- Screen label below (font-size: 11px, font-weight: 600)
- Copy URL button on hover (copies `http://localhost:4444/screens/[flow]/[file].html`)
- Clicking the thumbnail links to the screen file directly

Flow group labels:
1. `InCard Auth Flow`
2. `InCard Home & Account`
3. `InCard Profile Flow`
4. `InCard Network Flow`

---

## Workflow

**Pre-flight:** Node `3:6604` appears in CLAUDE.md as "Home / Dashboard" but is assigned in the Auth Flow here as `auth/03-create-profile.html`. This is correct — `3:6604` is the Create Profile screen in the Auth group. The actual Home Dashboard is `4:8019` (confirmed via 2026-03-16 canvas metadata fetch). CLAUDE.md node IDs are outdated; spec node IDs are authoritative.

**Per screen:**
1. `get_design_context(fileKey, nodeId)` — structured code representation
2. If truncated: `get_metadata` → re-fetch child nodes individually
3. `get_screenshot(fileKey, nodeId)` — keep open as live reference during implementation
4. Identify screen name (for generic-named nodes like "Body", "Group N") — assign final filename
5. Implement HTML with screenshot as side-by-side reference; validate 1:1 parity before marking complete

**Final step (after all 35 screens complete):**
6. All `[resolved]` filenames are now finalized → build `index.html` with all 35 thumbnail entries

Figma file key: `aLCvAIDfdTvUfAyd5bkXot`

---

## Constraints

- All colors as CSS variables — never hardcode hex inline
- Capture script in `<head>`, not `<body>`
- Bottom nav uses `position: sticky` + `margin: 0 16px` (not `position: fixed`)
- Screen width exactly 390px
- `lang="en"` on all HTML files
- iframe thumbnail scaling: `transform: scale(0.5); transform-origin: top left` on 390×844px iframe inside 195×422px container with `overflow: hidden`
