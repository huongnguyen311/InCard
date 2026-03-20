# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: InCard

**InCard** is a mobile app that lets professionals manage their profile via a digital card — share contact info, portfolio, products, and social links through NFC tap or QR scan.

This directory is the **design system + HTML mockup workspace**. The Figma source is at:
`https://www.figma.com/design/aLCvAIDfdTvUfAyd5bkXot/InCard-_-App_-New-UI`

---

## Commands

```bash
# Serve mockups locally (required before Figma capture)
npx serve ./figma-export -p 4444
# Preview: http://localhost:4444
```

> `file://` URLs do not work — always use the HTTP server for Figma capture.

---

## Figma File Structure

Key node IDs for fetching screens (fileKey: `aLCvAIDfdTvUfAyd5bkXot`):

| Screen | Node ID | Description |
|---|---|---|
| Sign Up | `3:6205` | Registration with email, password, referral code, social auth |
| Sign In | `3:6448` | Login with email/password, social auth |
| Home / Dashboard | `3:6604` | Main dashboard after login |
| Digital Profile | `4:11732` | Public card — avatar, stats, NFC button, social links, products, portfolio |
| Account Details | `4:8431` | Settings — personal info, referral, security, subscription, logout |
| Profile (Edit) | `4:8864` | Edit profile form |
| Connections | `4:8583` | Connection cards list |
| Connection Request Sent | `4:9237` | Success modal |
| NFC Step 1: QR Scan | `4:13259` | Scan QR code flow |
| NFC Step 2: Tap Card | `4:13068` | Tap NFC card flow |
| NFC Activation Success | `4:13212` | Success state modal |
| NFC Activation Failed | `4:13162` | Error state modal |
| Add Portfolio (Images) | `4:12426` | Bottom sheet — add portfolio images |
| Connect with me (Social) | `4:12480` | Bottom sheet — social links |
| Compact Add Service | `4:12684` | Bottom sheet — add service |

---

## HTML Mockup Files

| File | Screens | Group |
|---|---|---|
| `figma-export/index.html` | Dashboard / launcher | — |
| `figma-export/auth-flow.html` | Sign Up + Sign In | Auth |
| `figma-export/create-profile-flow.html` | Onboarding: photo upload, basic info, professional details | Auth |
| `figma-export/profile-flow.html` | Digital Profile (public card view) | Profile |
| `figma-export/edit-profile-flow.html` | Edit Profile (inline editing — dashed fields, add/remove) | Profile |
| `figma-export/home-flow.html` | Home / Dashboard | Core App |
| `figma-export/network-flow.html` | Network — Connections / Scanned Cards / Contacts / Leads tabs | Core App |
| `figma-export/settings-flow.html` | Account Details / Settings | Core App |
| `figma-export/potential-flow.html` | Potential Connections list | Core App |

---

## Design System Tokens

### Colors (CSS variables — never hardcode hex inline)

```css
:root {
  --green:         #009037;   /* Primary CTA / buttons */
  --green-dark:    #007a2f;   /* Hover state */
  --green-light:   #2eb07a;   /* Gradient end (green → green-light) */
  --green-bg:      rgba(0,144,55,0.1);  /* Icon backgrounds, tints */
  --green-surface: #dcfce7;   /* Profile header band */
  --emerald:       #10b981;   /* Product cards "Learn More", active dots */
  --emerald-bg:    #ecfdf5;   /* Emerald surface */
  --slate-900:     #0f172a;   /* Primary text */
  --slate-800:     #1e293b;   /* Headings */
  --slate-700:     #334155;   /* Field labels */
  --slate-600:     #475569;   /* Body text */
  --slate-500:     #64748b;   /* Secondary text */
  --slate-400:     #94a3b8;   /* Placeholder, inactive nav, section headers */
  --slate-200:     #e2e8f0;   /* Borders, dividers */
  --slate-100:     #f1f5f9;   /* Card surface, gray icon bg */
  --slate-50:      #f8fafc;   /* Input background */
  --gray-bg:       #f8f6f6;   /* App background (settings screen) */
  --red-100:       #fee2e2;   /* Delete / destructive icon bg */
  --red-600:       #dc2626;   /* Destructive text */
  --white:         #ffffff;
}
```

### Typography

Font: **Public Sans** (Google Fonts). Weights: 400, 500, 600, 700, 800.

| Level | Weight | Size | Usage |
|---|---|---|---|
| Display | 800 | 30px | Sign up / onboarding headline |
| H1 | 700 | 24px | Profile name |
| H2 | 700 | 22px | Screen titles |
| Body Large | 500 | 16px | Row values, button text |
| Body | 400 | 14px | Secondary body text |
| Caption | 400/700 | 12px | Row labels, badges |
| Nav label | 700 | 10px | Bottom nav tab labels |

### Button System

Shared stylesheet: `figma-export/button-system.css` — link with `<link rel="stylesheet" href="../../button-system.css" />`.

| Class | Height | Use |
|---|---|---|
| `.btn-primary` / `.btn-submit` / `.btn-cta` | 56px | Primary CTA — forms, onboarding |
| `.btn-primary-sm` / `.btn-cta-sm` | 48px | Compact CTAs — cards, inline actions |
| `.btn-ghost` | 56px | Secondary / outlined actions |

**Gradient:** `linear-gradient(135deg, #2eb07a 0%, #009037 100%)`

| State | Treatment |
|---|---|
| Default | Gradient + `box-shadow: 0 4px 14px rgba(0,144,55,0.35)` |
| Hover | Brighter gradient + elevated shadow |
| Active | Darker gradient + reduced shadow + `scale(0.985)` |
| Disabled | Same gradient at `opacity: 0.4`, no shadow, `cursor: not-allowed` |
| Focus | `outline: 3px solid rgba(0,144,55,0.4)`, `outline-offset: 2px` |

### Shape & Spacing

- Screen width: 390px
- Screen padding: 24px horizontal (main content), 16px (header/nav)
- Button height: 56px (forms), 54px (profile gradient CTA)
- Input height: 56px, `border-radius: 12px`
- Settings card: `border-radius: 12px`
- Product / portfolio card: `border-radius: 24px`
- Bottom nav: 64px height, `border-radius: 9999px`, floating pill with 16px side margin
- NFC FAB: 64px circle, centered above bottom nav, 4px white border
- Avatar (settings): 160px, 4px white border + green ring shadow
- Avatar (profile card): 112px, 4px white border

---

## App Architecture

### Navigation — Bottom Tab Bar

5 items: 4 tabs + central NFC FAB (flat bar with top border, not floating pill):

| Tab | Active color |
|---|---|
| Home | `--green` |
| Network | `--green` |
| **[Scan FAB]** | `--green` circle, no border ring |
| Activity | `--green` |
| Profile | `--green` |

Nav style: `background: rgba(255,255,255,0.9)`, `border-top: 1px solid #e2e8f0`, `padding: 9px 8px 24px`. FAB sits above nav baseline (`margin-top: -20px`).

### Key Screens

**Auth:** Sign Up → Sign In (email+password, Google, Apple)

**Digital Profile (Public Card):** Green header band → avatar (112px) + views/scans stats → name + title → NFC activate gradient button → Edit / Web profile buttons → Social connect circles → Accordion (Industries, About Me, Key Strengths, Main Services, Looking For, Collaboration) → Signature Products horizontal scroll carousel → Portfolio grid (featured + 2×2)

**Account Details:** Personal Information → Referral (link + history + Invite Friends) → Security → Account Management (subscription plan + delete) → Log Out

**NFC Activation Flow:** QR Scan → Tap NFC card → Success / Failed modals (bottom sheets)

**Connections:** Cards list (accept / decline requests)

---

## HTML Mockup Rules

- All files go in `figma-export/` — one HTML file per flow
- Screen frame: exactly 390px wide, `border-radius: 44px`, screens side-by-side with `gap: 24px`
- Always include capture script in `<head>`: `<script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>`
- Load Public Sans from Google Fonts in `<head>`
- All colors as CSS variables in `:root` — never hardcode hex inline
- `lang="en"`

---

## Figma MCP Workflow (Required Order)

1. `get_design_context(fileKey, nodeId)` — structured representation
2. If truncated: `get_metadata` for node map → re-fetch child nodes individually
3. `get_screenshot(fileKey, nodeId)` — visual reference
4. Implement only after steps 1–3
5. Validate output against screenshot for 1:1 parity before marking complete

---

## Shared CSS Files

Every HTML screen must link both files in `<head>`, in this order:

```html
<!-- screens in figma-export/screens/*/*.html -->
<link rel="stylesheet" href="../../button-system.css" />
<link rel="stylesheet" href="../../design-system.css" />

<!-- screens in figma-export/*.html root -->
<link rel="stylesheet" href="button-system.css" />
<link rel="stylesheet" href="design-system.css" />
```

### `figma-export/button-system.css`
Primary/ghost button classes with gradient, hover, active, focus, and disabled states.

| Class | Description |
|---|---|
| `.btn-primary` / `.btn-submit` / `.btn-cta` | Full-width 56px gradient button |
| `.btn-primary-sm` / `.btn-cta-sm` | 48px compact variant |
| `.btn-ghost` | Outlined secondary button |

### `figma-export/design-system.css`
Full design system: tokens, typography, spacing, inputs, cards, badges, icons, interactions, accessibility, layout helpers.

**Key class families:**

| Prefix | What it covers |
|---|---|
| `.ds-field`, `.ds-input`, `.ds-label` | Form inputs, labels, error states |
| `.ds-card`, `.ds-settings-row`, `.ds-profile-card` | Card surface components |
| `.ds-badge-*`, `.ds-tag`, `.ds-dot` | Status badges, chips, notification dots |
| `.ds-icon`, `.ds-icon-*` | Icon sizing (`-xs` → `-xl`) and color helpers |
| `.ds-skeleton` | Loading shimmer states |
| `.ds-bottom-nav`, `.ds-nav-item`, `.ds-nav-fab` | Bottom navigation bar |
| `.ds-tabs`, `.ds-tab` | Tab bar (network screen) |
| `.ds-sheet`, `.ds-sheet-overlay` | Bottom sheet / modal |
| `.ds-stack-*`, `.ds-row`, `.ds-grid-2` | Layout primitives |
| `.text-*` | Typography scale classes |
| `.sr-only`, `.ds-disabled`, `.ds-tap-target` | Accessibility helpers |

**Icon SVG conventions** (apply on `<svg>` directly):
```
stroke-width="1.75"  stroke-linecap="round"  stroke-linejoin="round"
viewBox="0 0 22 22"
```

---

## Gotchas

- Capture script must be in `<head>`, not `<body>`
- Figma MCP tools only appear in VSCode after authorizing the MCP connection in the Claude Code panel
- Keep `~/.claude.json` private — never commit it (contains Figma token)
- Re-capturing creates a new Figma frame — delete the old one manually
- Bottom nav uses `position: sticky` + `margin: 0 16px` in HTML mockups (not `position: fixed`) so it scrolls correctly with tall screens
