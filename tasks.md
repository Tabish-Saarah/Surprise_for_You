# 🗺️ Tasks — Development Roadmap

> Structured development plan for the Cinematic Surprise Website for Saarah.
> Each phase builds on the previous. Follow the order for smooth development.

---

## Phase 1: Project Setup & Foundation

### Task 1.1 — Initialize React Project

- [ ] Create a new React project using Vite: `npx -y create-vite@latest ./ --template react`
- [ ] Clean up boilerplate files (remove default App content, logos, etc.)
- [ ] Set up folder structure:

```
src/
├── components/
│   ├── Letter/
│   ├── Navbar/
│   ├── Homepage/
│   ├── PhotoCarousel/
│   ├── MemoryGame/
│   ├── WinOverlay/
│   ├── VideoModal/
│   └── common/
├── data/
│   ├── photos.js
│   ├── slideshow.js
│   ├── gameEmojis.js
│   └── video.js
├── styles/
│   ├── global.css
│   ├── variables.css
│   ├── animations.css
│   └── [component].css
├── hooks/
│   ├── useIntersectionObserver.js
│   └── useSwipeGesture.js
├── assets/
│   ├── photos/
│   └── videos/
├── App.jsx
└── main.jsx
```

- [ ] Set up public directory for static assets (photos, videos)

### Task 1.2 — Install Dependencies

- [ ] Install Framer Motion: `npm install framer-motion`
- [ ] No other major dependencies required

### Task 1.3 — Configure Global Styles & Design Tokens

- [ ] Create `variables.css` with all CSS custom properties:
  - Color palette (Deep Night, Warm Blush, Petal Pink, Champagne Gold, Ivory Cream)
  - Font families
  - Spacing scale
  - Border radii
  - Transition durations and easings
  - Breakpoints (as comments — CSS custom properties don't work in media queries)
- [ ] Create `global.css`:
  - CSS reset / normalize
  - Base body styles (background gradient, font defaults)
  - Scrollbar styling (thin, subtle)
  - Selection color styling
  - `::selection` and `::placeholder` styles
- [ ] Load Google Fonts in `index.html`:
  - Playfair Display (400, 700)
  - Dancing Script (400)
  - Great Vibes (400)
  - Inter (300, 400)
  - Outfit (400, 500)

### Task 1.4 — Create Animation Utilities

- [ ] Create `animations.css` with reusable animation keyframes:
  - `fadeIn`, `fadeUp`, `fadeOut`
  - `shimmer` (for text gradient animation)
  - `pulse` (for glow effects)
  - `slideDown` (for nav entrance)
- [ ] Create Framer Motion animation variants in a shared config file:
  - `fadeUpVariant` (initial → animate → exit)
  - `staggerContainerVariant`
  - `cardFlipVariant`
  - `overlayVariant`
  - `modalVariant`

### Task 1.5 — Create Data Files (Placeholders)

- [ ] Create `src/data/photos.js` with placeholder gallery photo array
- [ ] Create `src/data/slideshow.js` with placeholder slideshow memory array
- [ ] Create `src/data/gameEmojis.js` with the emoji set for the memory game
- [ ] Create `src/data/video.js` with placeholder video source config
- [ ] Add clear comments in each file explaining how the user should edit the data

---

## Phase 2: Letter Intro Experience

### Task 2.1 — Build Envelope Component

- [ ] Create the `Letter` component (full-screen container)
- [ ] Design the envelope visual:
  - Cream-colored rectangular card with rounded corners
  - Top triangular flap (CSS `clip-path` or separate rotated element)
  - Shadow for depth
- [ ] Add "Dear Saarah" text on envelope front (Dancing Script font)
- [ ] Add "Tap to fully open" instruction text (Inter font, subtle opacity)
- [ ] Center the envelope vertically and horizontally in the viewport
- [ ] Prevent page scrolling while the letter is active (`overflow: hidden` on body)

### Task 2.2 — Envelope Open Animation

- [ ] On tap/click, trigger flap opening animation:
  - Top flap rotates upward using `rotateX(-180deg)` with `transform-origin: top`
  - Duration: 0.6s, eased
  - `perspective` on parent container (800px)
- [ ] After flap opens, slide the letter content up from inside the envelope:
  - `translateY` from inside the envelope to visible position
  - Duration: 0.5s
- [ ] Implement state management: `isTapped` → `isOpening` → `isOpen`

### Task 2.3 — Letter Content Reveal

- [ ] After envelope is open, reveal the letter body text:
  - Each line fades in with 0.3s delay between lines
  - Use Framer Motion `staggerChildren` in a container variant
- [ ] Apply Dancing Script font to all letter body text
- [ ] Final line ("I friend you Saarah 🎀 🫶🏻") in Great Vibes, champagne gold, larger size
- [ ] After all text is revealed (after ~2.5s), show the "continue" indicator:
  - A subtle pulsing down-arrow `↓` or "Swipe up to continue"
  - Infinite gentle bounce animation

### Task 2.4 — Letter Exit (Swipe / Scroll Away)

- [ ] Create `useSwipeGesture` hook:
  - Track touch start, touch move, touch end
  - Calculate vertical swipe distance
  - If distance > 50px: trigger exit
  - If distance < 50px: spring back to original position
- [ ] Desktop fallback: detect scroll event or click on the continue indicator
- [ ] Implement the exit animation:
  - Letter: `scale(0.95)` → `translateY(-30vh)` → `opacity: 0`
  - Duration: 1.2s, `cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] On animation complete:
  - Set `letterDismissed: true` in parent state
  - Re-enable page scrolling
  - Unmount the Letter component using `AnimatePresence`

---

## Phase 3: Navigation System

### Task 3.1 — Build Navbar Component

- [ ] Create the `Navbar` component
- [ ] Apply glassmorphism styling:
  - `background: rgba(11, 13, 23, 0.7)`
  - `backdrop-filter: blur(20px)`
  - `border-bottom: 1px solid rgba(200, 169, 110, 0.15)`
- [ ] Position: `fixed`, top: 0, full width, z-index: 1000
- [ ] Content: four navigation items — `Surprise`, `Photos`, `Memory Game`, `Secret`
- [ ] Style items: Outfit font, uppercase, letter-spacing: 2px, subtle color
- [ ] Hover effect: underline slides in from center, color transitions to blush pink

### Task 3.2 — Scroll-to-Section Functionality

- [ ] Assign `id` attributes to each section: `surprise`, `photos`, `memory-game`, `secret`
- [ ] On nav item click, scroll to corresponding section:
  - Use `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`
  - Account for navbar height offset (scroll to element top minus navbar height)

### Task 3.3 — Active Section Highlighting

- [ ] Create `useIntersectionObserver` hook:
  - Observe all section elements
  - Track which section is currently most visible
  - Return the active section ID
- [ ] Highlight the active nav item with the blush pink color and underline

### Task 3.4 — Navbar Entrance Animation

- [ ] Navbar must be hidden while the letter is active
- [ ] When `letterDismissed` becomes true, animate the navbar in:
  - `translateY(-100%)` → `translateY(0)` + fade in
  - Duration: 0.5s, eased
- [ ] Conditional rendering: only render Navbar when `letterDismissed` is true

---

## Phase 4: Homepage Section

### Task 4.1 — Build Homepage Layout

- [ ] Create the `Homepage` component
- [ ] Section wrapper with proper id, padding, and center alignment
- [ ] "Pleasant Surprise" heading:
  - Outfit font, small uppercase, champagne gold color
  - Shimmer animation: moving gradient across text using `background-clip: text`
- [ ] "To my" label:
  - Playfair Display, italic, smaller size
  - Positioned above "Saarah" on the left side
- [ ] "Saarah 💫" name:
  - Playfair Display 700, very large (80px desktop / 48px mobile)
  - Soft glow: `text-shadow: 0 0 40px rgba(232,160,191,0.3)`
  - Subtle looping glow pulse animation (opacity oscillation on the text-shadow)
- [ ] Paragraph placeholder text below the name

### Task 4.2 — Scroll-Triggered Entrance Animation

- [ ] All homepage elements fade-slide in from below when section enters viewport
- [ ] Use Framer Motion `motion.div` with `whileInView` or custom Intersection Observer
- [ ] Stagger children by 0.15s
- [ ] Animate only on first view (set `once: true`)

---

## Phase 5: Photo Memories Carousel

### Task 5.1 — Build Carousel Container

- [ ] Create the `PhotoCarousel` component
- [ ] Section wrapper with `id="photos"`
- [ ] Section heading (e.g., "Our Moments ✨")
- [ ] Photo container:
  - Rounded rectangle, `border-radius: 16px`
  - Fixed aspect ratio (3:4 portrait)
  - `overflow: hidden`
  - Max-width: 400px (desktop), 90vw (mobile)
  - Subtle border: `1px solid rgba(255,255,255,0.08)`
- [ ] Dot indicator row below the caption

### Task 5.2 — Implement Auto-Advance & Manual Navigate

- [ ] Manage state: `currentIndex` for active photo
- [ ] Auto-advance timer: `setInterval` every 3000ms
  - Reset timer when user manually taps
  - Clear interval on component unmount
- [ ] On tap/click on the photo: increment `currentIndex` (wrap around to 0)
- [ ] Photo transition: Framer Motion `AnimatePresence` with crossfade + scale variant:
  - Enter: `opacity: 0, scale: 1.02` → `opacity: 1, scale: 1`
  - Exit: `opacity: 1` → `opacity: 0`
  - Duration: 0.8s

### Task 5.3 — Caption & Indicators

- [ ] Display the current photo's caption below the image
- [ ] Caption fades in/out in sync with the photo
- [ ] Render dot indicators:
  - One dot per photo
  - Active dot: blush pink, slightly larger
  - Inactive dots: low-opacity white
  - `transition: all 0.3s`

---

## Phase 6: Memory Card Game

### Task 6.1 — Game Setup & State

- [ ] Create the `MemoryGame` component
- [ ] Section wrapper with `id="memory-game"`
- [ ] Initialize game state:
  - `cards`: array of card objects `{ id, emoji, isFlipped, isMatched }`
  - `selectedCards`: array of 0–2 currently flipped card IDs
  - `matchedPairs`: count of matched pairs
  - `isLocked`: boolean to prevent tapping during evaluation
  - `isGameComplete`: boolean
- [ ] On mount (and on reset):
  - Take the emoji set, duplicate each emoji to create pairs
  - Shuffle using Fisher-Yates algorithm
  - Assign unique IDs to each card

### Task 6.2 — Card Component & Flip Animation

- [ ] Create a `Card` sub-component
- [ ] Card layout:
  - Fixed size (responsive based on viewport)
  - `perspective(600px)` on card container
  - Two faces: `.card-front` (back design) and `.card-back` (emoji face)
  - Use `backface-visibility: hidden` on both faces
  - Flip via `rotateY(180deg)` on the inner container
- [ ] Card back design:
  - Dark background (`#1a1030`)
  - Border: `1px solid rgba(232,160,191,0.2)`
  - Faint watermark emoji (🎀 at 10% opacity)
  - `border-radius: 10px`
- [ ] Card face (revealed):
  - Slightly lighter background
  - Emoji centered, large font size (~28px)

### Task 6.3 — Card Flip Animation (CSS / Framer Motion)

- [ ] On tap, flip the card with 3D Y-axis rotation
- [ ] Duration: 0.5s, eased
- [ ] Implementation: toggle a CSS class `.flipped` or use Framer Motion `animate`
- [ ] Flip only if:
  - Card is not already flipped
  - Card is not already matched
  - Game is not locked (no two unmatched cards currently visible)

### Task 6.4 — Match Detection Logic

- [ ] When a second card is flipped:
  - Set `isLocked: true` (prevent further flips)
  - Compare emojis of the two selected cards
  - **Match:** 
    - Mark both cards as `isMatched: true`
    - Play a pulse/glow animation on both cards
    - Increment `matchedPairs`
    - Clear selected cards
    - Set `isLocked: false`
  - **No match:**
    - Wait 0.8 seconds
    - Flip both cards back to face-down
    - Clear selected cards
    - Set `isLocked: false`

### Task 6.5 — Game Completion Detection

- [ ] After each match, check: `matchedPairs === totalPairs`
- [ ] If complete:
  - Set `isGameComplete: true`
  - After 1 second delay, trigger the win overlay (via callback to parent or context)

### Task 6.6 — Game Grid Layout & Responsiveness

- [ ] CSS Grid: `grid-template-columns: repeat(6, 1fr)` (adjust based on card count)
- [ ] Gap: 8px
- [ ] Center the grid horizontally
- [ ] Mobile: reduce card size, maintain 6 columns or switch to fewer columns if needed
- [ ] Ensure the grid doesn't overflow the viewport width

### Task 6.7 — Reset / Play Again

- [ ] Add a "Play Again" button below the grid
- [ ] On click: re-shuffle cards, reset all state, restart the game
- [ ] Subtle styling — don't make it too prominent

---

## Phase 7: Win Overlay & Memory Slideshow

### Task 7.1 — Win Overlay Container

- [ ] Create the `WinOverlay` component
- [ ] Full-screen fixed overlay (position: fixed, inset: 0, z-index: 2000)
- [ ] Backdrop: `rgba(0,0,0,0.85)` with `backdrop-filter: blur(12px)`
- [ ] Use Framer Motion `AnimatePresence` for mount/unmount transitions
- [ ] Entry animation: fade-in, 0.4s
- [ ] Exit animation: fade-out, 0.4s
- [ ] Prevent background scrolling while overlay is active

### Task 7.2 — Congratulations Message

- [ ] Center the win text vertically and horizontally
- [ ] Display the three-line message with staggered fade-in:
  - "You won 🥳🥳" — large, Playfair Display, white
  - "Finally atleast in this game you showcased your memory skills 😜😝" — Inter, softer white
  - "Jokes apart you are my true one 🫶🏻🥰" — Inter, blush pink accent
- [ ] After 3 seconds (or on tap), fade out the text and transition to slideshow mode

### Task 7.3 — Memory Slideshow

- [ ] Manage state: `currentSlide` index
- [ ] Display each slide:
  - Image: centered, `border-radius: 12px`, max-width ~85vw or 400px
  - Caption: below image, Inter italic
  - Date: below caption, Outfit small uppercase
- [ ] Transition between slides: Framer Motion crossfade (AnimatePresence with mode="wait")
  - Duration: 0.6s
- [ ] Navigation: tap anywhere on the overlay to advance to next slide
- [ ] Show subtle "Tap to continue" hint at the bottom (low-opacity, small text)
- [ ] After the final slide: close the overlay (set parent state, AnimatePresence unmounts)

---

## Phase 8: Secret Video Modal

### Task 8.1 — Secret Button

- [ ] Create the video section with `id="secret"`
- [ ] Center a "Secret" button:
  - Pill shape (large border-radius)
  - Transparent background, blush pink border
  - Outfit uppercase text
  - Hover: background fills slightly, border brightens
  - Subtle pulsing/breathing animation to attract attention

### Task 8.2 — Video Modal Component

- [ ] Create the `VideoModal` component
- [ ] Overlay backdrop: dark (`rgba(0,0,0,0.85)`) with `backdrop-filter: blur(20px)`
- [ ] Modal container:
  - `border-radius: 12px`
  - Max-width: 800px (desktop), 95vw (mobile)
  - Aspect ratio: 16:9
  - Centered vertically and horizontally
- [ ] Open animation: scale from 0.8 → 1.0 + fade in (0.3s)
- [ ] Close animation: scale from 1.0 → 0.8 + fade out (0.3s)

### Task 8.3 — Video Player Integration

- [ ] Use HTML5 `<video>` element with `controls` attribute
- [ ] Set video source from the data config file
- [ ] Do not auto-play — user must click play
- [ ] Add fullscreen support (native browser fullscreen API)
- [ ] On video end:
  - Show a "Replay" button overlaid on the video
  - On replay click: `video.currentTime = 0; video.play()`

### Task 8.4 — Modal Controls

- [ ] Close button (×) at top-right corner:
  - White color, 32px font-size
  - Fixed position relative to modal
  - Hover: slight rotation + scale
- [ ] Click outside the video container to close the modal
- [ ] Escape key closes the modal
- [ ] On close: pause the video, then animate out

---

## Phase 9: App Assembly & Integration

### Task 9.1 — Main App Component

- [ ] Wire up `App.jsx`:
  - State: `letterDismissed` (boolean)
  - Conditional rendering: show `Letter` or main page content
  - Use `AnimatePresence` for smooth transition between letter and page
- [ ] Structure:

```jsx
<App>
  <AnimatePresence>
    {!letterDismissed && <Letter onDismiss={() => setLetterDismissed(true)} />}
  </AnimatePresence>
  
  {letterDismissed && (
    <>
      <Navbar />
      <Homepage />
      <PhotoCarousel />
      <MemoryGame onWin={() => setShowOverlay(true)} />
      <SecretSection />
    </>
  )}
  
  <AnimatePresence>
    {showOverlay && <WinOverlay onClose={() => setShowOverlay(false)} />}
  </AnimatePresence>
  
  <AnimatePresence>
    {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}
  </AnimatePresence>
</App>
```

### Task 9.2 — State Coordination

- [ ] Ensure proper state flow:
  - `letterDismissed` → shows main content + navbar
  - `isGameComplete` → triggers `showOverlay`
  - `showVideoModal` → opens/closes video player
- [ ] Ensure overlays prevent background scroll

### Task 9.3 — Scroll-Triggered Animations

- [ ] Wrap each section's content in motion containers with `whileInView`
- [ ] Confirm animations fire correctly on scroll
- [ ] Ensure navbar active-section highlighting updates on scroll

---

## Phase 10: Polish & Responsiveness

### Task 10.1 — Mobile Responsiveness Audit

- [ ] Test all components at 375px, 390px, 414px widths (common phone sizes)
- [ ] Verify:
  - Letter fits and is readable on small screens
  - Navbar items are all visible and tappable
  - "Saarah" text scales appropriately
  - Photo carousel fits within viewport
  - Memory game grid doesn't overflow
  - Video modal is usable
- [ ] Apply media query adjustments as needed

### Task 10.2 — Tablet & Desktop Audit

- [ ] Test at 768px, 1024px, 1440px widths
- [ ] Ensure content is centered with max-widths applied
- [ ] Verify hover effects work on desktop
- [ ] Verify scroll-based interactions work with mouse wheel

### Task 10.3 — Animation & Performance Audit

- [ ] Test all animations for smoothness (target 60fps)
- [ ] Profile with browser dev tools — check for layout thrashing
- [ ] Ensure `will-change` is used sparingly and correctly
- [ ] Verify no memory leaks from intervals, event listeners, or animation frames
- [ ] Test on a mid-range Android device if possible

### Task 10.4 — Edge Case Handling

- [ ] Test rapid tapping in the memory game
- [ ] Test device rotation during active game
- [ ] Test with missing images / failed image loads
- [ ] Test with missing video / failed video load
- [ ] Test overlays dismiss properly with Escape key
- [ ] Test nav scroll when overlays are active (should be blocked)

---

## Phase 11: Final Integration & Content

### Task 11.1 — Add Real Content

- [ ] Replace placeholder photos with real photos in `src/data/photos.js`
- [ ] Add real captions and dates to `src/data/slideshow.js`
- [ ] Add the secret video file
- [ ] Write the emotional paragraph for the homepage
- [ ] Optimize all images (WebP format, appropriate dimensions)

### Task 11.2 — Meta & Favicon

- [ ] Set page title: "Pleasant Surprise 💫"
- [ ] Add meta description
- [ ] Add favicon (🎀 emoji or custom icon)
- [ ] Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Add `<meta name="theme-color" content="#0B0D17">`
- [ ] Prevent search engine indexing: `<meta name="robots" content="noindex, nofollow">`

### Task 11.3 — Build & Deploy

- [ ] Run `npm run build` to create production bundle
- [ ] Verify build output works correctly
- [ ] Deploy to hosting platform (Vercel, Netlify, or similar)
- [ ] Test the deployed version on real devices
- [ ] Share the link with Saarah 🎀

---

## Summary

| Phase | Focus | Est. Effort |
|---|---|---|
| Phase 1 | Project setup, styles, tokens | 🟢 Light |
| Phase 2 | Letter intro experience | 🟡 Medium |
| Phase 3 | Navigation system | 🟢 Light |
| Phase 4 | Homepage section | 🟢 Light |
| Phase 5 | Photo carousel | 🟡 Medium |
| Phase 6 | Memory card game | 🔴 Heavy |
| Phase 7 | Win overlay & slideshow | 🟡 Medium |
| Phase 8 | Secret video modal | 🟡 Medium |
| Phase 9 | App assembly & wiring | 🟡 Medium |
| Phase 10 | Polish & responsiveness | 🟡 Medium |
| Phase 11 | Real content & deployment | 🟢 Light |

---

> **Total estimated development time:** 15–25 hours for an experienced developer, depending on animation polish level.
