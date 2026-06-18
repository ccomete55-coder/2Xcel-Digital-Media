# 2XceL Digital Media — Project Reference

> Working reference for editing this project in Claude Code. Keep this updated as the
> structure changes. This is the single-page marketing/portfolio site for 2XceL Digital Media.

## What this is
A cinematic single-page React site for **2XceL Digital Media** — an agency offering custom
web design (with marketing baked into the backend), 24/7 AI sales agents, AI-generated
cinematic media, and strategic marketing plans. Led by Executive Director Christian Cométe.
Originally scaffolded as an AI Studio app (see `README.md`).

## Tech stack
- **React 19** + **TypeScript** (`~5.8`)
- **Vite 6** (dev server on port `3000`, host `0.0.0.0`)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **motion** (Framer Motion `motion/react`) for animation
- **gsap** for advanced motion
- **lucide-react** + **react-icons** for icons
- **@radix-ui/react-toggle** (theme toggle)
- **@google/genai** (Gemini — needs `GEMINI_API_KEY`)
- **express** (lightweight server, used by `download_videos` / preview tooling)

## Commands
| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server on http://localhost:3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check only (`tsc --noEmit`) |

**Setup:** copy `.env.example` → `.env.local` and set `GEMINI_API_KEY`.

## File map
```
index.html                       App entry HTML
metadata.json                    AI Studio app metadata
vite.config.ts                   Vite config
tsconfig.json                    TS config
src/
  main.tsx                       React root mount
  index.css                      Global styles, Tailwind, brand tokens, .glass utilities
  App.tsx                        ⭐ The whole page — all sections + data live here (~1.9k lines)
  download_videos.ts             Script to fetch/stage video assets
  lib/utils.ts                   cn() classnames helper
  components/
    BlueprintsSection.tsx        "AI Workspace Blueprints" lead funnel section
    PricingSection.tsx           Strategic Marketing Plans & Pricing tiers
    CaseStudiesSection.tsx       Media / case studies (video showcase)
    CustomCursor.tsx             Magnetic circular cursor trail
    ui/
      AnimatedIcon.tsx           AnimatedIconWrapper + animation types
      ActivityIcon / BotIcon / CogIcon / WaypointsIcon   Animated lucide-style icons
      scroll-expansion-hero.tsx  ScrollExpandMedia — cinematic scroll hero
      motion-footer.tsx          CinematicFooter
      interactive-selector.tsx   Live web-projects portfolio selector
      interactive-image-accordion.tsx
      circular-gallery.tsx
      toggle.tsx                 Radix toggle wrapper (theme switch)
      demo.tsx
```

## App.tsx structure (sections, in order)
All page content is rendered from `App.tsx`. Sections (by `id`):
1. Flying brand portal logo (scroll-driven, fixed, interpolates to navbar slot)
2. Floating pill navbar (`<header>`) — responsive, mobile drawer, theme toggle
3. `ScrollExpandMedia` hero wraps the rest of the page:
   - `#our-story` — mission statement
   - `#what-we-do` — services grid (`servicesData`, 4 cards)
   - `#custom-web-design` — web design + `InteractiveSelector` live demo
   - `#media-section` — `CaseStudiesSection`
   - `#blueprints` — `BlueprintsSection`
   - `PricingSection` (`#pricing`) — current pricing; `#pricing-old` is a hidden legacy block
   - `#blog` — insights, data in `blogPosts` array
   - `#reviews` — testimonials
   - `#inquiries` — contact / interactive CTA form (lead simulation)
4. `CinematicFooter`

### Key in-file data/state (App.tsx)
- `blogPosts` — array of blog/insight articles (title, category, date, content)
- `servicesData` — 4 service cards
- `objections` — AI-agent objection/answer pairs
- Theme: `theme` state toggles `dark`/`light` class on `<html>`
- Lead form state: `firstNameInput`, `emailInput`, `phoneInput`, `industryInput`,
  `serviceInterested`, plus simulation state (`isSimulating`, `simStep`, `isSubmitted`)
- Booking state: `selectedDate`, `selectedTime`, `isBooked`

## Brand / design tokens
- Background: `#0B0E14` (near-black)
- Brand orange: `#E55B2B` (Tailwind `brand-orange`)
- Brand blue: `#229AD6` (Tailwind `brand-blue`)
- Body text: `#DEDBC8` / `#E1E0CC` (warm off-white)
- Accent green: `#32D74B`
- Logo wordmark: **2** orange · **X** blue · **ceL** white
- Tagline: "Strategy | Automation | Growth"
- Heavy use of `.glass` (frosted glass), radial noise, gradient glows, and `motion` reveals.

## Notes for editing
- This is a **separate clone** at `2Xcel Media/2Xcel-Digital-Media`, distinct from the
  sibling `Ampcrew-Phoenix` project. Git remote: `ccomete55-coder/2Xcel-Digital-Media`.
- Most edits to copy, sections, services, blog posts, and pricing happen in **`App.tsx`**.
- Reusable/animated pieces live under `src/components/ui/`.
- Run `npm run lint` after TS changes to catch type errors before building.
