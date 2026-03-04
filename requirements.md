# 📋 Requirements Document — Cinematic Surprise Website for Saarah

> Complete functional, interaction, animation, and behavioral requirements for development.

---

## 1. Project Overview

| Field | Detail |
|---|---|
| **Project Name** | Pleasant Surprise — A Cinematic Experience for Saarah |
| **Type** | Single-page interactive React web application |
| **Target User** | One person: Saarah |
| **Platforms** | Mobile (primary), Desktop (secondary), Tablet |
| **Core Experience** | Story-driven, emotionally paced, smooth cinematic flow |

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18+ (with Vite as bundler) |
| Styling | Vanilla CSS (CSS Modules or scoped styles) |
| Animation | Framer Motion |
| Gesture Detection | Framer Motion gestures or `react-use-gesture` |
| Routing | None (single-page scroll experience) |
| State Management | React `useState` / `useReducer` (no Redux needed) |
| Build Tool | Vite |
| Fonts | Google Fonts (Playfair Display, Dancing Script, Great Vibes, Inter, Outfit) |

---

## 3. Full User Experience Flow

The experience follows a **strict linear sequence**. The user cannot skip ahead — each stage transitions into the next.

```
START
  │
  ▼
[1] LETTER INTRO ──────── Full-screen animated envelope
  │                        User sees "Dear Saarah" + "Tap to fully open"
  │                        Tap → envelope opens with 3D animation
  │                        Letter content fades in line-by-line
  │                        Final line: "I friend you Saarah 🎀 🫶🏻"
  │
  ▼
[2] LETTER EXIT ─────────  User swipes up (mobile) or scrolls/clicks (desktop)
  │                        Letter lifts away + dissolves
  │                        Homepage fades in underneath
  │
  ▼
[3] HOMEPAGE ────────────  Navigation bar appears (slides down)
  │                        "Pleasant Surprise" heading
  │                        "To my / Saarah 💫" display
  │                        Emotional paragraph placeholder
  │
  ▼
[4] PHOTO MEMORIES ──────  Auto-sliding photo carousel (every 3s)
  │                        Tap to advance manually
  │                        Captions visible below each photo
  │
  ▼
[5] MEMORY GAME ─────────  Emoji card matching game
  │                        42 cards (21 pairs), shuffled grid
  │                        Flip, match, and complete
  │
  ▼
[6] WIN OVERLAY ─────────  Background blurs
  │                        Congratulations message appears
  │                        Memory slideshow begins (image + caption + date)
  │                        User taps to advance
  │                        After all slides → overlay closes
  │
  ▼
[7] SECRET SECTION ──────  "Secret" button visible below game
  │                        Click → video player modal opens
  │                        Watch, replay, or close
  │
  ▼
END (user can scroll freely after letter is dismissed)
```

---

## 4. Functional Requirements

### FR-01: Intro Letter

| ID | Requirement |
|---|---|
| FR-01.1 | The letter must occupy the **full viewport** on load (100vw × 100vh). |
| FR-01.2 | The envelope must display "Dear Saarah" on the front in a handwritten font. |
| FR-01.3 | Below the name, show "Tap to fully open" as instructional text (Inter font, smaller). |
| FR-01.4 | On tap/click, the envelope top flap must animate open using a 3D CSS rotation (rotateX). |
| FR-01.5 | After the envelope opens, the letter content must slide up from inside the envelope. |
| FR-01.6 | Letter content must appear with staggered line-by-line fade-in animation. |
| FR-01.7 | The letter must contain the following text (verbatim): |

**Letter Content:**

```
Hiii My dear Saarah.. ❤️😉

Here is a little surprise for you,
just an emotional moment shared by me.

We crossed days, months, years
with too much love, fights, jokes,
and funny moments…

This will continue forever… always!!
```

| ID | Requirement |
|---|---|
| FR-01.8 | After all body text appears, a final large styled line must fade in: "I friend you Saarah 🎀 🫶🏻" |
| FR-01.9 | The final line must use a decorative/handwritten font (Great Vibes) in champagne gold color. |
| FR-01.10 | After the letter is fully revealed, a subtle indicator must appear prompting the user to proceed (e.g., pulsing ↓ arrow or "Swipe up to continue" text). |

---

### FR-02: Letter Exit Transition

| ID | Requirement |
|---|---|
| FR-02.1 | On **mobile**: detect swipe-up gesture (minimum 50px vertical movement). |
| FR-02.2 | On **desktop**: detect scroll-down event or click on the continue indicator. |
| FR-02.3 | The letter must animate away: scale down slightly, translate upward, and fade out. |
| FR-02.4 | **Simultaneously**, the homepage background must fade in from behind. |
| FR-02.5 | The transition duration must be 1.2–1.5 seconds. |
| FR-02.6 | After the transition completes, the letter component must be **unmounted** from the DOM. |
| FR-02.7 | The transition must use `cubic-bezier(0.4, 0, 0.2, 1)` easing. |
| FR-02.8 | The scrollable page content must become active only **after** the letter is fully dismissed. |

---

### FR-03: Navigation Bar

| ID | Requirement |
|---|---|
| FR-03.1 | The navigation bar must appear only **after** the letter is dismissed. |
| FR-03.2 | It must slide in from the top with a smooth animation. |
| FR-03.3 | It must use a glassmorphism style (semi-transparent + backdrop blur). |
| FR-03.4 | It must be **fixed** to the top of the viewport (sticky/position: fixed). |
| FR-03.5 | Nav items: `Surprise`, `Photos`, `Memory Game`, `Secret`. |
| FR-03.6 | Each nav item must scroll smoothly to its corresponding section when clicked. |
| FR-03.7 | Smooth scrolling must use `scroll-behavior: smooth` or programmatic `scrollIntoView({ behavior: 'smooth' })`. |
| FR-03.8 | The active section must be **visually highlighted** in the nav (based on scroll position using Intersection Observer). |
| FR-03.9 | On mobile, all nav items must be visible without a hamburger menu. Use smaller text or horizontal scroll if needed. |

---

### FR-04: Homepage Section

| ID | Requirement |
|---|---|
| FR-04.1 | Section must have an `id` attribute for navigation targeting (e.g., `id="surprise"`). |
| FR-04.2 | Display "Pleasant Surprise" as a small, uppercase, gold heading with optional shimmer animation. |
| FR-04.3 | Display "To my" above "Saarah" — both in Playfair Display. "To my" smaller and italic, "Saarah" large and bold. |
| FR-04.4 | "Saarah" must have a subtle pink glow text-shadow. |
| FR-04.5 | A 💫 emoji must appear next to or after "Saarah". |
| FR-04.6 | Below the name, a paragraph placeholder must read: "Short emotional paragraph will be added here." |
| FR-04.7 | All elements must **fade-slide in from below** when the section enters the viewport (scroll-triggered). |

---

### FR-05: Photo Memories Carousel

| ID | Requirement |
|---|---|
| FR-05.1 | Section must have `id="photos"` for navigation. |
| FR-05.2 | Display a section heading (e.g., "Our Moments" or similar). |
| FR-05.3 | Photos must be displayed one at a time inside a rounded container. |
| FR-05.4 | Photos must auto-advance every **3 seconds**. |
| FR-05.5 | Tapping/clicking the photo must advance to the next image immediately. |
| FR-05.6 | Photo transitions must use a **smooth crossfade** with a subtle scale effect. |
| FR-05.7 | Photo transition duration: **0.8 seconds**. |
| FR-05.8 | Each photo must have a **caption** displayed below it. |
| FR-05.9 | Captions must fade in sync with their corresponding photo. |
| FR-05.10 | Dot indicators must show below the caption — active dot highlighted in pink. |
| FR-05.11 | Photos and captions are **placeholder content** — must be easily editable by the user in the source code. The photo array should be a clearly marked constant. |
| FR-05.12 | Support a minimum of 6 and a maximum of 15 photos. |

---

### FR-06: Memory Card Game

| ID | Requirement |
|---|---|
| FR-06.1 | Section must have `id="memory-game"` for navigation. |
| FR-06.2 | Display a section heading (e.g., "Memory Game" or "Test Your Memory"). |
| FR-06.3 | Use the following 21 emojis as the card set: `🤌🏻 🫶🏻 🎀 😉 🙈 🫣 😴 🫂 💫 ✨ 🧑‍🍼 🥰 🫶🏻 💤 😌 😂 😅 🥱 ❤️ 😘 💋` |
| FR-06.4 | **Note:** Some emojis may appear duplicated in the set. Deduplicate to exactly 10–12 unique emojis for a reasonable grid (e.g., 12 unique × 2 = 24 cards → 4×6 or 6×4 grid). The developer may adjust the count for a clean grid. |
| FR-06.5 | Each emoji is duplicated to create pairs. |
| FR-06.6 | All cards must be **shuffled randomly** at the start of each game. |
| FR-06.7 | Cards start face-down (showing a decorative card back). |
| FR-06.8 | Tapping a card must **flip** it face-up with a 3D rotation animation. |
| FR-06.9 | Only **two cards** may be flipped at any time. |
| FR-06.10 | If two flipped cards **match**: both remain face-up with a brief glow/pulse animation. |
| FR-06.11 | If two flipped cards **do not match**: both flip back face-down after a 0.8s delay. |
| FR-06.12 | While two non-matching cards are displayed, **no additional cards may be flipped**. |
| FR-06.13 | The game must detect when **all pairs are matched** (game complete). |
| FR-06.14 | Card flip animation: 3D `rotateY(180deg)` with `perspective(600px)`, duration 0.5s. |
| FR-06.15 | A **move counter** or **match counter** may optionally be displayed. |
| FR-06.16 | A **reset/play again** button must be available. |

---

### FR-07: Win Overlay & Memory Slideshow

| ID | Requirement |
|---|---|
| FR-07.1 | When all cards are matched, a full-screen **overlay** must appear after a 1-second delay. |
| FR-07.2 | The overlay backdrop must be dark (rgba(0,0,0,0.85)) with backdrop blur. |
| FR-07.3 | The overlay must fade in smoothly (0.4s). |
| FR-07.4 | First, the following congratulations text must appear (centered, staggered fade-in): |

**Win Text (verbatim):**

```
You won 🥳🥳
Finally atleast in this game you showcased your memory skills 😜😝

Jokes apart you are my true one 🫶🏻🥰
```

| ID | Requirement |
|---|---|
| FR-07.5 | After displaying the text for 3 seconds (or on tap), the text must fade out and the **slideshow** must begin. |
| FR-07.6 | Each slide must display: **image** (centered, rounded), **caption** (below image), **date** (below caption). |
| FR-07.7 | User must **tap/click** to advance to the next slide. There is no auto-advance. |
| FR-07.8 | Slide transition: smooth crossfade, 0.6s duration. |
| FR-07.9 | A subtle "Tap to continue" hint must appear at the bottom of the overlay. |
| FR-07.10 | After the last slide, the overlay must smoothly fade out and return focus to the page. |
| FR-07.11 | Slideshow images, captions, and dates must be easily editable in the source code (clearly marked data array). |

---

### FR-08: Secret Video Section

| ID | Requirement |
|---|---|
| FR-08.1 | Section must have `id="secret"` for navigation. |
| FR-08.2 | Display a centered "Secret" button with elegant styling. |
| FR-08.3 | On click, a **video player modal** must open. |
| FR-08.4 | The modal must have a **blurred backdrop** (backdrop-filter: blur). |
| FR-08.5 | The modal must animate in with a **scale-up + fade** effect. |
| FR-08.6 | The video player must support standard HTML5 video controls. |
| FR-08.7 | A **fullscreen** option must be available. |
| FR-08.8 | A **close button (×)** must be positioned at the top-right corner of the modal. |
| FR-08.9 | Clicking the close button or clicking outside the video must close the modal. |
| FR-08.10 | The modal must close with a **scale-down + fade** animation. |
| FR-08.11 | When the video ends, a **"Replay"** button must appear on the video. |
| FR-08.12 | The video source must be easily configurable in the source code. |
| FR-08.13 | The video must **not** auto-play when the modal opens. User must press play. |

---

## 5. Interaction Requirements

### IR-01: Touch & Click

| ID | Requirement |
|---|---|
| IR-01.1 | All interactive elements must have a minimum touch target of **44px × 44px**. |
| IR-01.2 | Buttons and cards must have visible **hover/active states** on desktop. |
| IR-01.3 | On mobile, **tap feedback** (slight scale or opacity change) must be provided on interactive elements. |

### IR-02: Gestures

| ID | Requirement |
|---|---|
| IR-02.1 | **Swipe up** on the letter screen must trigger the letter exit transition. |
| IR-02.2 | Swipe threshold: **50px** vertical movement minimum. |
| IR-02.3 | If the user swipes less than 50px and releases, the letter must **spring back** to its original position. |
| IR-02.4 | The letter must follow the user's finger/cursor during the drag (before threshold is met). |

### IR-03: Scroll

| ID | Requirement |
|---|---|
| IR-03.1 | Page scrolling must be **disabled** while the letter intro is active. |
| IR-03.2 | After the letter is dismissed, normal scrolling must be enabled. |
| IR-03.3 | Navigation clicks must trigger **smooth scroll** to target sections. |
| IR-03.4 | Scroll-triggered animations must use **Intersection Observer** to detect section visibility. |

---

## 6. Animation Requirements

### AR-01: General

| ID | Requirement |
|---|---|
| AR-01.1 | All animations must run at **60fps** minimum. |
| AR-01.2 | Only `transform` and `opacity` may be animated (GPU-accelerated properties). |
| AR-01.3 | All animations must use custom easing: `cubic-bezier(0.4, 0, 0.2, 1)` as default. |
| AR-01.4 | No animation may block user interaction for more than **2 seconds**. |
| AR-01.5 | Animations must **not** trigger layout recalculations (no animating width, height, margin, padding). |

### AR-02: Entrance Animations

| ID | Requirement |
|---|---|
| AR-02.1 | Section content must animate in when **50% of the section** is visible in the viewport. |
| AR-02.2 | Entrance animation: fade-in + translate upward by 30px, duration 0.6s. |
| AR-02.3 | Child elements must stagger by **0.1s** intervals. |
| AR-02.4 | Entrance animations must fire only **once** (not re-trigger on scroll back up). |

### AR-03: Transition Animations

| ID | Requirement |
|---|---|
| AR-03.1 | Letter → Homepage: duration 1.2–1.5s. |
| AR-03.2 | Photo crossfade: duration 0.8s. |
| AR-03.3 | Card flip: duration 0.5s. |
| AR-03.4 | Overlay fade-in: duration 0.4s. |
| AR-03.5 | Slideshow crossfade: duration 0.6s. |
| AR-03.6 | Modal open/close: duration 0.3s. |

---

## 7. Data Structures

The following data must be **easily editable** by the user. They should be defined as clearly labeled constants in a dedicated data/config file.

### Photos Data

```javascript
// src/data/photos.js
export const GALLERY_PHOTOS = [
  {
    id: 1,
    src: '/photos/photo1.jpg',
    caption: 'Caption for photo 1',
  },
  // ... more photos
];
```

### Slideshow Data

```javascript
// src/data/slideshow.js
export const SLIDESHOW_MEMORIES = [
  {
    id: 1,
    src: '/photos/memory1.jpg',
    caption: 'A beautiful memory',
    date: 'January 2024',
  },
  // ... more memories
];
```

### Game Emojis

```javascript
// src/data/gameEmojis.js
export const GAME_EMOJIS = [
  '🤌🏻', '🫶🏻', '🎀', '😉', '🙈', '🫣',
  '😴', '🫂', '💫', '✨', '🥰', '❤️',
];
```

### Video Source

```javascript
// src/data/video.js
export const SECRET_VIDEO = {
  src: '/videos/secret.mp4',
  type: 'video/mp4',
};
```

---

## 8. Accessibility & Edge Cases

| ID | Requirement |
|---|---|
| AE-01 | The website must be functional with **JavaScript enabled** (no SSR required). |
| AE-02 | If a photo fails to load, display a subtle placeholder (gradient with 📷 emoji). |
| AE-03 | If the video fails to load, show an error message inside the modal. |
| AE-04 | The memory game must handle rapid tapping gracefully (card flip lock during evaluation). |
| AE-05 | All overlays must be closable via the **Escape key** on desktop. |
| AE-06 | The letter must work with both **touch** and **mouse** interactions. |
| AE-07 | Page must not break if the user rotates their device mid-experience. |

---

## 9. Browser Support

| Browser | Version |
|---|---|
| Chrome (Android & Desktop) | Latest 2 versions |
| Safari (iOS & macOS) | Latest 2 versions |
| Firefox | Latest 2 versions |
| Samsung Internet | Latest version |
| Edge | Latest version |

**CSS Requirements:**
- `backdrop-filter` support (Safari might need `-webkit-` prefix).
- CSS 3D transforms support.
- Intersection Observer API support.

---

## 10. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NF-01 | Total page weight (excluding video): **< 5MB**. |
| NF-02 | First Contentful Paint: **< 2 seconds** on 4G. |
| NF-03 | All images must be **lazy-loaded** except the first gallery image. |
| NF-04 | The video must be **streamed** (not fully preloaded). |
| NF-05 | Framer Motion tree-shaking must be enabled to minimize bundle size. |
| NF-06 | Images should use modern formats (WebP preferred) with JPEG fallback. |
| NF-07 | Fonts must use `font-display: swap` to avoid FOIT (Flash of Invisible Text). |
