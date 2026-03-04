# 🎨 Design Document — Cinematic Surprise Website for Saarah

> A romantic, cinematic, emotionally-driven interactive experience.
> Every pixel must feel intentional, every transition must feel like a story unfolding.

---

## 1. Design Philosophy

The website is **not** a standard web page — it is a **cinematic digital experience**.

### Core Principles

| Principle | What It Means |
|---|---|
| **Cinematic Flow** | The entire experience should feel like a short film — no abrupt cuts, no jarring transitions. Scenes dissolve into each other with purpose. |
| **Emotional Pacing** | Moments of stillness (reading the letter) contrast with moments of energy (the memory game). The rhythm keeps the viewer emotionally engaged. |
| **Elegance Over Flash** | No gaudy sparkles, no overdone particle storms. Prefer subtle, tasteful micro-animations and refined typography over loud effects. |
| **Story-Driven UI** | The UI is invisible. The user doesn't feel like they are "on a website" — they feel like they are being told a story. |
| **Premium & Polished** | Think Apple keynote meets handwritten love letter. Modern minimalism with emotional warmth. |

---

## 2. Color Palette

### Primary Palette

| Role | Color | Hex | Usage |
|---|---|---|---|
| **Deep Night** | Rich dark navy-black | `#0B0D17` | Primary background. Creates cinematic depth. |
| **Warm Blush** | Soft rose-pink | `#E8A0BF` | Accent highlights, letter elements, romantic touches. |
| **Petal Pink** | Light pink | `#F5C6D0` | Secondary accent, card backs, soft UI elements. |
| **Champagne Gold** | Muted warm gold | `#C9A96E` | Typography accents, borders, "premium" elements. |
| **Ivory Cream** | Off-white | `#FAF3E0` | Body text, letter text, readable surfaces. |
| **Pure White** | White | `#FFFFFF` | High-contrast headings, focus text. |

### Gradient Palette

| Name | Gradient | Usage |
|---|---|---|
| **Romantic Dusk** | `#0B0D17` → `#1a1030` → `#2d1b4e` | Page background — subtle deep-purple atmosphere. |
| **Blush Glow** | `#E8A0BF` → `#F5C6D0` | Button backgrounds, card highlights. |
| **Golden Shimmer** | `#C9A96E` → `#E8D5A3` | Text shimmer effects, decorative borders. |
| **Soft Overlay** | `rgba(0,0,0,0.6)` → `rgba(0,0,0,0.85)` | Modal/overlay backdrops. |

### Background Ambiance

- The page background uses a **subtle radial gradient** from deep navy to muted purple.
- Optional: faint animated **bokeh dots** or **soft floating particles** (very subtle, low opacity — think fireflies, not fireworks).
- The ambiance must never distract from content.

---

## 3. Typography

### Font Families

| Role | Font | Fallback | Source |
|---|---|---|---|
| **Display / Name** | `Playfair Display` | `Georgia, serif` | Google Fonts |
| **Handwritten / Letter** | `Dancing Script` or `Great Vibes` | `cursive` | Google Fonts |
| **Body / UI** | `Inter` or `Poppins` | `system-ui, sans-serif` | Google Fonts |
| **Accent / Labels** | `Outfit` | `sans-serif` | Google Fonts |

### Type Scale

| Element | Font | Size (Desktop) | Size (Mobile) | Weight | Style |
|---|---|---|---|---|---|
| Page heading ("Pleasant Surprise") | Outfit | 18px | 14px | 400 | uppercase, letter-spacing: 4px |
| "To my" label | Playfair Display | 24px | 18px | 400 | italic |
| "Saarah" name | Playfair Display | 80px | 48px | 700 | normal |
| Letter body text | Dancing Script | 22px | 18px | 400 | normal |
| "I friend you Saarah" | Great Vibes | 36px | 28px | 400 | normal |
| Body paragraphs | Inter | 16px | 15px | 300 | normal, line-height: 1.8 |
| Section headings | Outfit | 14px | 12px | 500 | uppercase, letter-spacing: 3px |
| Photo captions | Inter | 14px | 13px | 300 | italic |
| Button text | Outfit | 14px | 13px | 500 | uppercase, letter-spacing: 2px |
| Nav items | Outfit | 13px | 12px | 400 | uppercase, letter-spacing: 2px |

### Typography Rules

- **Never use bold body text** — keep everything airy.
- **Letter content must feel handwritten** — use Dancing Script or Great Vibes with generous line-height (1.9–2.2).
- **"Saarah" is always the visual anchor** — largest text on any screen it appears on.
- Use `text-shadow` subtly on the name to give it a soft glow against the dark background.

---

## 4. Layout Architecture

### Page Flow (Single Scroll Page)

```
┌──────────────────────────────────┐
│        INTRO LETTER              │  ← Full-viewport experience
│        (covers entire screen)    │
├──────────────────────────────────┤
│        ↕ Smooth transition       │
├──────────────────────────────────┤
│        NAVIGATION BAR            │  ← Sticky top nav (appears after letter)
├──────────────────────────────────┤
│        HOMEPAGE SECTION          │  ← "Pleasant Surprise" + "Saarah"
│        + emotional paragraph     │
├──────────────────────────────────┤
│        PHOTO MEMORIES            │  ← Auto-sliding photo carousel
├──────────────────────────────────┤
│        MEMORY GAME               │  ← Interactive emoji card game
├──────────────────────────────────┤
│        SECRET VIDEO BUTTON       │  ← Opens video overlay
├──────────────────────────────────┤
│        FOOTER                    │  ← Subtle closing message
└──────────────────────────────────┘
```

### Section Spacing

- Each section has **generous vertical padding**: `100px` top/bottom on desktop, `60px` on mobile.
- Sections are visually separated by **soft gradient transitions** — not hard lines.
- Content within each section is **centered** with a max-width of `700px` on desktop.

### Grid & Alignment

- All content is **center-aligned** with the exception of the letter text (left-aligned within a centered container).
- The photo carousel is **full-width** with the image centered.
- The memory game grid uses a **responsive CSS grid**: `4×5` on desktop, `4×5` or `5×4` on mobile.

---

## 5. Component Design Specifications

### 5.1 Intro Letter

**Visual Design:**
- The letter is rendered as a **realistic envelope/letter element**.
- The envelope has a soft paper texture background (`#FAF3E0` with subtle noise overlay or paper pattern).
- A faint drop shadow gives it depth: `box-shadow: 0 20px 60px rgba(0,0,0,0.4)`.
- The front of the envelope shows "Dear Saarah" in Dancing Script with "Tap to fully open" below in Inter.
- Rounded corners (`border-radius: 12px`).

**Open Animation:**
- The top flap of the envelope rotates upward (CSS 3D `rotateX` transform) to simulate opening.
- The letter content slides up from inside the envelope.
- Text inside fades in with a staggered animation — each line appearing 0.3s after the previous.

**Color:**
- Envelope exterior: warm cream `#FAF3E0`
- Interior background: slightly lighter cream `#FFFDF5`
- Text: `#2C2C2C` (dark gray, not pure black — softer reading)
- "I friend you Saarah" line: `#C9A96E` (champagne gold)

### 5.2 Letter Exit Transition

**Preferred Approach: Lift + Dissolve**
1. The letter scales down slightly (`scale(0.95)`) and lifts upward (`translateY(-30vh)`).
2. Simultaneously, it fades out (`opacity: 0`).
3. The dark background of the homepage fades in underneath.
4. The navigation bar slides down from above.
5. The homepage content fades up from below.
6. Total duration: **1.2–1.5 seconds**, eased with `cubic-bezier(0.4, 0, 0.2, 1)`.

**Interaction Trigger:**
- **Mobile:** Swipe up gesture (touch move detection).
- **Desktop:** Scroll down or click a "Continue" indicator (subtle pulsing arrow ↓).

### 5.3 Navigation Bar

**Visual:**
- **Glassmorphism** style: semi-transparent background with backdrop blur.
- Background: `rgba(11, 13, 23, 0.7)` with `backdrop-filter: blur(20px)`.
- Bottom border: `1px solid rgba(200, 169, 110, 0.15)` (faint gold line).
- Fixed to top of viewport after letter exit.
- Height: `56px`.

**Items:**
- `Surprise` · `Photos` · `Memory Game` · `Secret`
- Styled in Outfit, uppercase, letter-spaced.
- Color: `rgba(255,255,255,0.6)` default, `#E8A0BF` on hover/active.
- Hover underline animation: a thin line slides in from center outward.

**Mobile:**
- Horizontal scrollable row, or a compact pill-style layout.
- No hamburger menu — all items must be visible.

### 5.4 Homepage Section

**Layout:**
```
         ┌─────────────────────┐
         │   Pleasant Surprise │  ← small, uppercase, gold
         │                     │
         │   To my             │  ← Playfair Display, italic, small
         │   Saarah 💫         │  ← Playfair Display, very large
         │                     │
         │   [paragraph text]  │  ← Inter, soft white, gentle opacity
         └─────────────────────┘
```

- "Pleasant Surprise" — has a subtle **shimmer animation** (a CSS gradient moving across the text using `background-clip: text`).
- "Saarah" — soft text-shadow glow: `0 0 40px rgba(232,160,191,0.3)`.
- Entrance animation: elements fade-slide in from bottom, staggered.

### 5.5 Photo Memories Carousel

**Container:**
- Rounded rectangle container (`border-radius: 16px`).
- Soft border: `1px solid rgba(255,255,255,0.08)`.
- Overflow hidden with `aspect-ratio: 3/4` (portrait photos).
- Max-width: `400px` on desktop, `90vw` on mobile.

**Transition Style: 3D Card Flip / Cinematic Crossfade**
- Primary: **smooth crossfade** with a slight **scale pulse** (image scales from 1.02 → 1.0 as it fades in).
- Duration: `0.8s` per transition. Auto-advances every `3 seconds`.
- On tap/click: immediately transitions to next image.

**Caption:**
- Below the photo container.
- Font: Inter italic, 14px, `rgba(255,255,255,0.6)`.
- Caption fades in sync with the photo.

**Progress Indicators:**
- Small dots below the caption indicating which photo is active.
- Active dot: `#E8A0BF`. Inactive dots: `rgba(255,255,255,0.2)`.

### 5.6 Memory Game

**Card Design:**
- Card size: `70px × 70px` on desktop, adaptive on mobile.
- Card back: `#1a1030` with a subtle `🎀` or `✨` watermark at 10% opacity. Border: `1px solid rgba(232,160,191,0.2)`.
- Card face (revealed): slightly lighter background with the emoji centered, font-size `28px`.
- Rounded corners: `10px`.

**Flip Animation:**
- CSS 3D flip using `rotateY(180deg)` with `perspective(600px)`.
- Duration: `0.5s`, eased.
- When two cards match: both cards do a brief **pulse glow** animation and stay revealed.
- When cards don't match: after `0.8s` delay, both flip back.

**Grid:**
- Desktop: `6 columns` (adjust based on emoji count; for 21 emojis → 42 cards → 6×7 grid).
- Mobile: `6 columns` with smaller card sizes.
- Gap: `8px`.

**Note on Emoji Count:**
- 21 unique emojis × 2 = 42 cards.
- Grid: 6 columns × 7 rows.

### 5.7 Win Overlay & Memory Slideshow

**Overlay Backdrop:**
- `background: rgba(0,0,0,0.85)` with `backdrop-filter: blur(12px)`.
- Fades in over `0.4s`.

**Win Message:**
- Centered text, staggered fade-in.
- "You won 🥳🥳" — large, Playfair Display, white.
- Body text — Inter, `rgba(255,255,255,0.8)`, line-height 1.8.

**Slideshow:**
- After 3 seconds (or tap to continue), the text fades out and the slideshow begins.
- Each slide: centered image (`border-radius: 12px`, max-width 85vw or 400px), caption below in Inter italic, date below caption in Outfit small uppercase.
- Transition: **smooth crossfade**, `0.6s`.
- Tap anywhere to advance. Subtle "Tap to continue" hint text at bottom, very low opacity.
- After final slide: overlay smoothly fades out and returns to the page.

### 5.8 Secret Video Modal

**Button:**
- Pill-shaped button at center of section.
- Text: "Secret" in Outfit uppercase.
- Background: transparent with `1px solid rgba(232,160,191,0.4)` border.
- Hover: background fills with `rgba(232,160,191,0.15)`, border brightens.
- Subtle pulsing animation to draw attention.

**Modal:**
- Opens with a **scale-up + fade** animation from the button's position.
- Backdrop: blurred (`backdrop-filter: blur(20px)`, dark overlay).
- Video container: `border-radius: 12px`, max-width `800px`, aspect-ratio `16/9`.
- Close button (×): top-right corner, white, `32px`, hover: rotate + scale.
- Fullscreen button available within controls.
- After video ends: a gentle "Replay" button fades in at center of video.

---

## 6. Animation System

### Animation Principles

1. **Duration:** Most UI transitions = `0.3–0.5s`. Cinematic transitions = `0.8–1.5s`.
2. **Easing:** Use custom cubic-bezier curves. Never use `linear` or `ease`. Preferred: `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease-out).
3. **Stagger:** When multiple elements enter, stagger them by `0.08–0.15s` for a cascading feel.
4. **Scroll-Triggered:** Sections and elements animate in as they enter the viewport. Use Intersection Observer or Framer Motion's `whileInView`.
5. **No Jank:** All animations use `transform` and `opacity` only — never animate `width`, `height`, `top`, `left`, or `margin`.

### Animation Library Choice

**Framer Motion** (recommended for React):
- `AnimatePresence` for mount/unmount transitions.
- `motion.div` for scroll-triggered reveals.
- `useMotionValue` + `useTransform` for gesture-driven letter interaction.
- `layoutId` for shared-layout transitions (letter → homepage).

### Key Animations Catalog

| Element | Animation | Trigger |
|---|---|---|
| Envelope open | 3D flap rotation + letter slide up | Tap/click |
| Letter text reveal | Staggered line-by-line fade-in | After envelope opens |
| Letter exit | Lift + dissolve + homepage fade-in | Swipe up / scroll |
| Nav bar enter | Slide down from above | After letter exits |
| Homepage text | Fade-up with stagger | On section enter |
| "Saarah" name | Soft glow pulse (loop, very subtle) | Always |
| Photo carousel | Crossfade + slight scale | Auto / tap |
| Memory card flip | 3D Y-axis rotation | Tap |
| Match found | Pulse glow + slight scale | On match |
| Win overlay | Backdrop blur + content fade-in | Game complete |
| Slideshow transition | Crossfade | Tap |
| Video modal open | Scale-up from button + backdrop | Button click |
| Video modal close | Scale-down + fade | Close button / outside click |

---

## 7. Responsiveness Strategy

### Breakpoints

| Name | Range | Target |
|---|---|---|
| **Mobile** | `< 640px` | Primary target (most users will view on phone) |
| **Tablet** | `640px – 1024px` | Secondary |
| **Desktop** | `> 1024px` | Tertiary |

### Key Responsive Behaviors

| Component | Mobile | Desktop |
|---|---|---|
| Navigation | Compact horizontal scroll or small pills | Spaced horizontal row |
| "Saarah" text | 48px | 80px |
| Photo carousel | 90vw width | 400px max-width |
| Memory grid | 6 columns, smaller cards | 6 columns, 70px cards |
| Video modal | Near full-screen | max-width 800px centered |
| Section padding | 60px vertical | 100px vertical |
| Letter | 85vw width | 450px max-width |

### Touch Optimization

- All interactive elements must have a minimum touch target of `44px × 44px`.
- Swipe gestures should have a **low threshold** (50px) to feel responsive.
- No hover-dependent interactions — all hover effects are enhancements, not requirements.

---

## 8. Micro-Interactions & Details

- **Cursor:** Custom cursor on desktop — a soft glowing dot or a small heart trail (optional, only if performant).
- **Scroll progress:** A very thin, subtle progress line at the very top of the viewport showing scroll progress (color: champagne gold, 2px height).
- **Loading state:** If any assets are loading, show a minimal pulsing `✨` centered on screen.
- **Haptic feedback (mobile):** If supported by browser, trigger subtle vibration on card flip and on match found.
- **Sound (optional):** Ambient soft music or a gentle chime on interactions. Must be opt-in (muted by default).

---

## 9. Asset Requirements

| Asset Type | Count | Notes |
|---|---|---|
| Photo memories (gallery) | 6–12 | Portrait orientation preferred (3:4 or 4:5) |
| Slideshow images | 6–12 | Can overlap with gallery; each needs caption + date |
| Secret video | 1 | MP4 format, optimized for web (< 50MB ideally) |
| Paper texture (optional) | 1 | Subtle noise/grain for letter background |
| Favicon | 1 | Emoji or custom 🎀 icon |

---

## 10. Performance Considerations

- **Lazy-load** all images below the fold.
- **Preload** the first gallery image and the letter assets.
- Use `will-change: transform` sparingly and only during active animations.
- Keep the total page weight under **5MB** (excluding the video).
- The video should be **streamed**, not preloaded.
- Target **60fps** for all animations — test on mid-range mobile devices.
- Use `requestAnimationFrame` for any custom animations.
