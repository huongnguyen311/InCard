# AI Agent Widget — Redesign Spec

**Date:** 2026-07-01
**Status:** Implemented (two directions)

## Deliverables

1. `figma-export/ai-agent-flow.html` — **InCard / Ms. Thuy** direction (green, AI-glow),
   4 states side-by-side. (First iteration.)
2. `figma-export/inapps-ai-agent.html` — **InApps / AI Success Agent** direction (purple/violet),
   built to match the user-supplied reference screenshot. 3 states: Before open (closed) /
   After open (welcome) / Active chat. **This is the current preferred direction.**

### InApps direction (reference-matched)
- Brand: InApps agency landing (purple `#7c3aed` primary, purple→orange hero gradient),
  footer "Powered by InCard AI Platform".
- **Before open:** replicated InApps hero (nav, headline, bullets, stat cards, trusted logos)
  + 3D mascot in animated dashed ring with waving hand + teaser bubble "Chat with me" +
  pulsing purple FAB with green online dot.
- **After open (welcome):** purple aurora header ("AI Success Agent · Online · Ready to help",
  sound/more/close icons), welcome bubble, 4 action cards (Explore services / Get estimate /
  View case studies / Book a meeting), 2 outlined quick-reply chips, input with attach + send
  FAB, close FAB.
- **Active chat:** live conversation with staggered message bubbles + typing indicator.
- **Avatar:** `ai-inka.png` used as a PLACEHOLDER. Swap in the InApps 3D mascot PNG at the
  `.mascot img`, `.p-avatar img`, and `.msg .mav img` spots for 1:1 parity.

--- Original spec (InCard green direction) below ---

**Deliverable:** `figma-export/ai-agent-flow.html` — one self-contained HTML mockup, all 4 states side-by-side.

## Goal

Redesign the "Ms. Thuy AI Agent" chat widget currently on the incard.biz landing page.
The live widget looks like a generic third-party chat box. The redesign must feel like an
**"Agentic AI Platform"**: modern AI glow + subtle glassmorphism, on-brand InCard green,
with attention-grabbing but tasteful animation.

## Style Direction

**AI Glow modern + glassmorphism accents.**
- Primary: InCard green gradient `linear-gradient(135deg, #2eb07a 0%, #009037 100%)`.
- Moving aurora/glow behind avatar and header.
- Frosted-glass surfaces (blur + soft light borders) for badges and AI message bubbles.
- Avatar: **AI Inka** mascot (`AI Inka.png`) with a glowing "online" ring.
- No external JS/animation libraries — pure CSS `@keyframes` + minimal vanilla JS only if
  needed for the auto-teaser timing (mockup can loop via CSS instead).

## States (4, shown side-by-side like other workspace flows)

### 1. Floating launcher (bottom-right)
- 64px round button, green gradient, green glow shadow.
- Continuous radar **pulse ring** animation signaling "AI ready".
- Chat icon + subtle sparkle ✨.
- Small Inka avatar peeking at corner with green "online" dot.
- After ~3s, auto-reveals a **teaser bubble**: *"Chào bạn 👋 Mình là Ms. Thuy, cần InCard
  hỗ trợ gì không?"* — slides in softly, dismissible.

### 2. Chat panel (open, 390px)
- Header: moving aurora gradient (green → emerald), Inka avatar 48px with glowing ring,
  glassmorphism "AI Agent" badge.
- Conversation list: 16px-radius cards, hover lift, avatar + preview + timestamp.
- Open animation: scale + fade from launcher origin (bottom-right), spring easing.
- "Start a New Conversation" uses `.btn-primary` gradient with a subtle shimmer.
- Footer "Powered by InCard Agentic AI Platform" with mini glowing logo.

### 3. Active chat screen
- Message bubbles: AI left (frosted white glass), user right (green gradient).
- **Typing indicator**: 3 bouncing dots when AI is "composing".
- Messages appear via staggered slide-up + fade.
- Horizontal-scroll **quick-reply chips** ("Giá dịch vụ?", "NFC card là gì?", ...).
- Input: 9999px-radius field + round gradient send button.

### 4. Welcome state
- The teaser bubble from state 1, plus a light particle/sparkle effect around the avatar on
  first load.

## Technical constraints

- File: `figma-export/ai-agent-flow.html`, `lang="en"`.
- Reuse `button-system.css` + `design-system.css` (root-level link paths).
- All colors via CSS variables in `:root` (design-system tokens) — no inline hex.
- Include Figma capture script in `<head>`; load Public Sans from Google Fonts.
- Screen frames 390px wide, `border-radius: 44px`, side-by-side with `gap: 24px`, matching
  existing flow files.
- Respect `prefers-reduced-motion`: disable non-essential looping animations.

## Out of scope (YAGNI)

- Dark mode.
- Real chat backend / functional messaging.
- Production embed code for the live site (this is a demo mockup).
