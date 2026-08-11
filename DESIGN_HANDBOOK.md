# 2XceL Digital Media — Design Handbook

> **The Complete Design Reference**  
> One-stop guide for designers, developers, and product managers  
> Last Updated: August 3, 2026

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Design Philosophy](#design-philosophy)
3. [The Three Dials](#the-three-dials)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Spacing & Layout](#spacing--layout)
7. [Motion & Animation](#motion--animation)
8. [Shadows & Depth](#shadows--depth)
9. [Border Radius](#border-radius)
10. [Component Patterns](#component-patterns)
11. [Light & Dark Modes](#light--dark-modes)
12. [Responsive Design](#responsive-design)
13. [Accessibility](#accessibility)
14. [Tools & Resources](#tools--resources)
15. [FAQ](#faq)

---

## Quick Start

### For Designers
1. Read: [Design Philosophy](#design-philosophy)
2. Reference: [The Three Dials](#the-three-dials)
3. Bookmark: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)

### For Developers
1. Read: [Quick Start](#quick-start) (this section)
2. Reference: [Component Patterns](#component-patterns)
3. Import: `src/design-tokens.ts`
4. Code: Follow the [Component Patterns](#component-patterns)

### For Product Managers
1. Understand: [Design Philosophy](#design-philosophy)
2. Know: [The Three Dials](#the-three-dials) (your brand's DNA)
3. Share: Link team members to this handbook

---

## Design Philosophy

### The Mission

**Design systems don't restrict—they empower.** A clear system lets teams make faster decisions and ship higher-quality work without debating foundations every time.

### Our Approach

We build interfaces that are:
- **Intentional** — Every decision has a reason
- **Consistent** — Same elements work the same way everywhere
- **Scalable** — New team members understand the rules immediately
- **Premium** — Design feels considered, not templated

### The Problem We Solve

Before this system, designers and developers made independent decisions:
- Motion timing varied (0.3s, 0.6s, 0.75s, 0.8s, 1200ms — which is right?)
- Shadows had 20+ one-off values
- Spacing jumped randomly (gap-6 then gap-14 = 100% increase?)
- Border radius mixed 0.5rem, 0.75rem, 1rem, 1.5rem, 9999px

**Result:** Beautiful individual pieces that didn't feel like a system.

### The Solution: Three Dials

Instead of micro-managing every property, we dial three macro controls:

---

## The Three Dials

These three values govern **every layout, motion, and density decision** on the site.

### Dial 1: DESIGN_VARIANCE (1–10 scale)

**What it controls:** How asymmetrical vs. symmetrical the layout is.

- **1** = Perfect grid, rigid, corporate
- **5** = Balanced, professional
- **7** = Current (intentional breaks, varied heights, organic feel)
- **10** = Chaotic, artistic, unpredictable

**Current Setting: 7**

Why: We're a premium SaaS + creative agency. Not robotic (1), not chaotic (10), but deliberately asymmetric for visual interest.

**When to deviate:**
- Hero sections: Increase to 8–9 (more visual drama)
- Data dashboards: Decrease to 3–4 (structured, organized)
- Admin interfaces: Decrease to 2–3 (maximum clarity)

---

### Dial 2: MOTION_INTENSITY (1–10 scale)

**What it controls:** How much animation and visual effects appear.

- **1** = Static (no motion except interaction feedback)
- **5** = Balanced (purposeful animations, not gratuitous)
- **5.5** = Current (cinematic but restrained)
- **8** = Heavy (multiple overlapping effects, dramatic)
- **10** = Cinematic (every element moves, heavy parallax)

**Current Setting: 5.5**

Why: We want premium feel (cinematic) but don't want to overwhelm or tire out visitors.

**When to deviate:**
- Hero section: Increase to 7–8 (more cinematic)
- Dashboards/data: Decrease to 2–3 (reduce cognitive load)
- Accessibility-first sections: Decrease to 1–2 (respect prefers-reduced-motion)

---

### Dial 3: VISUAL_DENSITY (1–10 scale)

**What it controls:** How packed or spacious the layout feels.

- **1** = Art gallery (massive whitespace, minimal content)
- **3** = Current (generous breathing room)
- **5** = Professional (balanced)
- **8** = Information-dense (dashboards, data tables)
- **10** = Maximum density (cockpit, every pixel used)

**Current Setting: 3.5**

Why: We're a landing page, not a dashboard. Visitors should feel the space to breathe, not overwhelmed by information.

**When to deviate:**
- Landing page hero: Keep at 3–4 (aspirational)
- Feature details: Keep at 3–4 (readable)
- Admin interfaces: Increase to 7–9 (efficient)
- Pricing tiers: Keep at 4–5 (scannable)

---

## Color System

### Brand Palette

**Three core colors. Non-negotiable. Used everywhere.**

```
Obsidian:   #0B0E14   Dark background, anchor color
Orange:     #E65C2B   Action, emotion, primary CTAs
Blue:       #2B8ED9   Data, secondary actions, accents
Cream:      #DEDBC8   Text, high-contrast overlays
```

### Color Semantics

**Every color has a job:**

| Color | Job | Usage | NOT |
|---|---|---|---|
| **Orange** | Primary action | Buttons, CTAs, navigation highlights | Body text, backgrounds |
| **Blue** | Secondary action | Secondary buttons, data viz, decorative accents | Main CTAs |
| **Cream** | High-contrast text | Headings, hero copy, featured content | Regular body text (use text-secondary instead) |
| **Obsidian** | Dark background | Page background, card bases | Text (too dark to read) |

### Dark Mode (Default)

```css
--color-text-primary:      #DEDBC8  /* Headings, primary content */
--color-text-secondary:    #94a3b8  /* Body text, descriptions */
--color-text-muted:        #64748b  /* Labels, secondary meta */
--color-surface-primary:   #0B0E14  /* Page background */
--color-surface-elevated:  rgba(16, 22, 31, 0.65)  /* Cards, panels */
```

### Light Mode

**Same palette, different values. Orange and blue stay warm/cool, text remaps to blue.**

```css
--color-text-primary:      #1a5c8f  /* Brand blue for headings */
--color-text-secondary:    #46647d  /* Blue-tinted slate for body */
--color-surface-primary:   linear-gradient(160deg, #fff3eb 0%, #ffffff 45%, #ebf4ff 100%)  /* Warm-to-cool gradient */
```

**Rule:** When in doubt, map to blue (#1a5c8f). Orange is reserved for accents.

---

## Typography

### Font Stack

```
Headings & UI:   Roboto Flex, sans-serif
Code & Data:     JetBrains Mono, monospace
```

### Scale (Modular, 1.125x Progression)

| Size | Value | Use Case |
|---|---|---|
| **xs** | 12px | Labels, captions, small annotations |
| **sm** | 14px | Small text, helper text |
| **base** | 16px | Body text, standard content |
| **lg** | 18px | Large body, section intro |
| **xl** | ~20px | Section heading intro |
| **2xl** | ~23px | Small heading |
| **3xl** | ~26px | Medium heading |
| **4xl** | ~29px | Large heading |
| **5xl** | ~32px | Hero heading |
| **6xl** | ~36px | Page title |

### Hierarchy

```
h1  → 36px, weight 700, line-height 1.2, letter-spacing -0.02em  /* Page title */
h2  → 32px, weight 700, line-height 1.25, letter-spacing -0.01em /* Section hero */
h3  → 29px, weight 600, line-height 1.3                         /* Subsection */
h4  → 23px, weight 600, line-height 1.4                         /* Small heading */
p   → 16px, weight 400, line-height 1.75, letter-spacing 0.01em /* Body text */
```

### Weight Scale

- **400** — Body text, regular UI
- **500** — Small emphasis, labels
- **600** — Subheadings, medium emphasis
- **700** — Headings, primary emphasis
- **800** — Page titles, maximum emphasis

---

## Spacing & Layout

### Scale (1.5x Progression)

Every step is exactly 1.5x the previous value. No random jumps.

```
4px (1)    8px (2)    12px (3)   16px (4)   24px (6)   32px (8)
48px (12)  64px (16)  80px (20)  96px (24)
```

**Rationale:** Predictable, mathematical progression. Easy to scale responsively (+1 step per breakpoint).

### Responsive Strategy

**Mobile → Tablet → Desktop = Base → +1 Step → +2 Steps**

```
Section padding:
  Mobile:  p-4 (16px)   → Tablet: p-8 (32px)   → Desktop: p-16 (64px)
  (scale 4)              (scale 8)                (scale 16)
  
Section gap:
  Mobile:  gap-8 (32px) → Tablet: gap-12 (48px) → Desktop: gap-16 (64px)
  (scale 8)              (scale 12)               (scale 16)
  
Card padding:
  Mobile:  p-6 (24px)  → Tablet: p-8 (32px)    → Desktop: p-8 (32px)
  (scale 6)             (scale 8)
```

**Key:** Every breakpoint advances by exactly one scale step. No jumping 2–3 steps.

### Component Spacing

Pre-configured spacing for common components:

```
Input padding:        16px horizontal, 12px vertical
Button small:         16px horizontal, 8px vertical
Button medium:        24px horizontal, 12px vertical
Button large:         32px horizontal, 16px vertical
Badge padding:        12px horizontal, 4px vertical
List item gap:        16px between rows
Card interior gap:    16px between child elements
```

---

## Motion & Animation

### Timings (Standardized)

Only 4 values. No inventing durations.

```
fast:   150ms   → Button hover, icon change, quick feedback
base:   300ms   → Standard transitions, fade-in, state change
medium: 500ms   → Scroll reveals, word pull-up, staggered animation
slow:   800ms   → Hero animations, cinematic effects (max for MOTION=5.5)
```

### Easing Functions

```
ease-out:          Snappy start, smooth decelerate (quick interactions)
ease-in-out:       Smooth both directions (loading states)
custom-reveal:     [0.16, 1, 0.3, 1] Premium, cinematic (scroll reveals, word animation)
custom-spring:     Spring physics (modal entrance, smooth pop, lively feel)
```

### Motion by Interaction Type

| Type | Duration | Easing | Example |
|---|---|---|---|
| **Hover** | 150ms | ease-out | Button hover, icon change |
| **State Change** | 300ms | ease-out | Toggle, tab change, show/hide |
| **Scroll Reveal** | 500ms | custom-reveal | Word pull-up, fade-in on scroll |
| **Page Load** | 800ms | custom-reveal | Hero animation, cinematic reveal |

### Motion Intensity Rules

**Respect the dials. High-motion sections can use longer, cinematic animations. Low-motion sections keep it brief.**

| Intensity | Timing | Max Duration | When |
|---|---|---|---|
| **High (8+)** | slow, custom | 1200ms | Hero, splash screens |
| **Medium (5–6)** | medium, custom | 800ms | Default sections (current) |
| **Low (2–3)** | base, ease-out | 300ms | Dashboards, accessibility-first |
| **None (0–1)** | instant | 0ms | Forms, data tables |

**IMPORTANT:** Always respect `prefers-reduced-motion`. If user has enabled it in OS settings, remove animations entirely.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Shadows & Depth

### Shadow Scale (4 Tiers)

Each tier serves a specific visual purpose.

```
sm: 0 1px 2px rgba(0, 0, 0, 0.05)
    → Subtle separation, borders, minimal elevation
    → Use: Underlines, subtle dividers

md: 0 4px 6px rgba(0, 0, 0, 0.1)
    → Standard elevation for cards and panels
    → Use: Blog cards, feature boxes, standard panels

lg: 0 10px 15px rgba(0, 0, 0, 0.15)
    → Interactive elevation, hover state
    → Use: Button hover, card lift, elevated state

xl: 0 20px 25px rgba(0, 0, 0, 0.2)
    → Maximum emphasis for featured elements
    → Use: Hero sections, modals, featured cards

Branded:
  orange-md: 0 4px 12px rgba(230, 92, 43, 0.25)   → Primary CTA glow
  blue-md:   0 4px 12px rgba(43, 142, 217, 0.25)  → Secondary action glow
```

### When to Use Each

| Shadow | Element | Context |
|---|---|---|
| **sm** | Borders, underlines | Subtle separation |
| **md** | Cards, panels | Default, standard elevation |
| **lg** | Button on hover | Interactive feedback |
| **xl** | Hero, modals | Maximum focus, featured |
| **orange-md** | Primary buttons | Brand-colored CTA |
| **blue-md** | Secondary buttons | Brand-colored secondary |

---

## Border Radius

### 3-Tier Hierarchy

Only 4 values across the entire site.

```
xs:   0.25rem (4px)   → Small controls, inputs
sm:   0.5rem (8px)    → Cards, panels, moderate elements
lg:   1rem (16px)     → Large surfaces, hero sections
full: 9999px          → Fully rounded (pills, badges, avatars)
```

### Application

| Element | Radius | Why |
|---|---|---|
| **Input fields** | xs (4px) | Small, tight control |
| **Buttons** | xs (4px) | Consistent with inputs |
| **Cards/panels** | sm (8px) | Moderate, friendly |
| **Large surfaces** | lg (16px) | Bold, generous |
| **Hero sections** | lg (16px) | Premium, spacious |
| **Pills/badges** | full (9999px) | Iconic, distinctive |
| **Avatars** | full (9999px) | Circular, personal |

**Rule:** Don't mix. All cards use `sm`. All buttons use `xs`. Consistency > variety.

---

## Component Patterns

### Buttons

**Three variants, three sizes. Built from `SPACING_RULES` and `BORDER_RADIUS_SCALE`.**

```jsx
// Primary (Orange) — Use for main CTAs
<button className="bg-brand-orange hover:bg-brand-orange/90 text-white shadow-orange-md rounded-xs px-6 py-3">
  Primary Action
</button>

// Secondary (Blue) — Use for supporting actions
<button className="bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue border border-brand-blue/30 rounded-xs px-6 py-3">
  Secondary Action
</button>

// Tertiary (Outline) — Use for low-priority actions
<button className="border border-white/20 hover:border-white/40 text-text-secondary rounded-xs px-6 py-3">
  Tertiary Action
</button>
```

### Cards

**Consistent padding, gap, radius, and shadow.**

```jsx
<div className="card-surface rounded-sm p-6 gap-6 shadow-token-md">
  {/* 
    - card-surface: elevated background (rgba(13, 18, 25, 0.55) + blur)
    - rounded-sm: 8px radius
    - p-6: 24px padding (from SPACING_SCALE)
    - gap-6: 24px gap between children
    - shadow-token-md: standard elevation shadow
  */}
</div>
```

### Forms

**Input styling with consistent padding and focus states.**

```jsx
<div>
  <label className="text-sm font-medium text-text-secondary mb-2">
    Email Address
  </label>
  <input
    type="email"
    className="w-full bg-brand-obsidian border border-white/10 rounded-xs px-4 py-3 text-white focus:border-brand-orange/50 transition-colors"
    placeholder="you@example.com"
  />
  <p className="text-xs text-text-muted mt-2">
    We'll never share your email.
  </p>
</div>
```

### Pricing Cards

**Emphasis variant for featured pricing tier.**

```jsx
<div className="relative overflow-hidden rounded-lg card-surface p-8 shadow-token-md border border-white/10 group hover:border-brand-orange/40 transition-all">
  {/* Standard card styling */}
  <h3 className="text-2xl font-extrabold text-white">Growth</h3>
  <p className="text-4xl font-black text-brand-orange mt-4">$999<span className="text-lg">/mo</span></p>
  {/* Content */}
</div>
```

---

## Light & Dark Modes

### Strategy

**Dark mode is default.** Light mode is an inversion with thoughtful color remaps.

### Dark Mode (Default)

No action needed—this is the baseline.

### Light Mode Behavior

When `.light` class is added to `<html>`:

1. **Background:** Gradient wash (warm orange → white → cool blue)
2. **Headings:** Remap to brand blue (#1a5c8f)
3. **Body text:** Remap to blue-tinted slate (#46647d)
4. **Borders:** Use orange tint (rgba(230, 92, 43, 0.1))
5. **Shadows:** Remain the same (work in both modes)
6. **Glass surfaces:** Higher opacity (0.82 vs 0.03)

### Implementation

```jsx
// Toggle between modes
const toggleTheme = () => {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  if (isDark) {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
  }
};
```

### Testing Both Modes

Always test:
- ✅ Dark mode first (default)
- ✅ Light mode toggle works
- ✅ No jarring color shifts
- ✅ Contrast ratios acceptable in both modes (WCAG AA minimum)
- ✅ Shadows visible and intentional in both modes

---

## Responsive Design

### Breakpoints (Tailwind Standard)

```
sm:  640px   (phones)
md:  768px   (tablets)
lg:  1024px  (small laptops)
xl:  1280px  (desktops)
2xl: 1536px  (large monitors)
```

### Strategy

**Mobile first.** Default styles apply to mobile; add breakpoints for larger screens.

```jsx
{/* Mobile: p-4 (16px), Tablet: p-8 (32px), Desktop: p-16 (64px) */}
<section className="px-4 md:px-8 lg:px-16">
  {/* Follows +1 step spacing progression */}
</section>
```

### Testing Checklist

- [ ] Mobile (375px): All text readable, interactive elements tappable
- [ ] Tablet (768px): Spacing increases appropriately
- [ ] Desktop (1280px): Content doesn't feel stretched
- [ ] No horizontal scrolling on any screen size
- [ ] Images scale responsively (max-width: 100%)

---

## Accessibility

### Color Contrast

**Minimum WCAG AA (4.5:1 for body text, 3:1 for large text).**

Current palettes:
- ✅ Dark mode: Cream on Obsidian = ~19:1 (excellent)
- ✅ Light mode: Blue text on white = ~6:1 (good)
- ✅ Orange on white = ~4.5:1 (minimum acceptable)

### Motion

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States

Every interactive element needs visible focus:

```css
button:focus-visible {
  outline: 2px solid #E65C2B;
  outline-offset: 2px;
}

input:focus {
  border-color: #E65C2B;
  box-shadow: 0 0 0 3px rgba(230, 92, 43, 0.1);
}
```

### Text Sizing

Minimum 16px for body text. Zoom must work (no `user-select: none` on text).

### Semantic HTML

- Use `<button>` for buttons (not `<div>`)
- Use `<a>` for links (not `<div>`)
- Use `<h1>`...`<h6>` for headings (proper nesting)
- Use `<label>` for form labels
- Use `aria-label` for icon-only buttons

---

## Tools & Resources

### Primary Reference

| Resource | Purpose | Link |
|---|---|---|
| **DESIGN_SYSTEM.md** | Full system documentation | [Read](DESIGN_SYSTEM.md) |
| **src/design-tokens.ts** | Design tokens (TypeScript) | Code |
| **src/index.css** | CSS utilities | Code |
| **Storybook** | Component library | http://localhost:6006 |

### For Developers

```tsx
// Import design tokens
import { 
  DESIGN_DIALS,
  MOTION_TIMINGS, 
  SHADOW_SCALE, 
  SPACING_SCALE,
  BORDER_RADIUS_SCALE 
} from '@/design-tokens';

// Use in components
<div style={{ padding: SPACING_SCALE[6], boxShadow: SHADOW_SCALE.md }}>
  Card with consistent design
</div>
```

### For Designers

- Figma: [Link to shared Figma file]
- Brand assets: [Link to asset library]
- Guidelines: This handbook + DESIGN_SYSTEM.md

---

## FAQ

### Q: Can I use a motion timing not in the scale?

**A:** Only if it's unavoidable. Add it to `MOTION_TIMINGS` in `src/design-tokens.ts`, document why, and update this handbook.

**Example:** If a specific animation needs 1200ms instead of 800ms, add it but explain the reason in a comment.

---

### Q: What if the three dials need to change?

**A:** Document the change in `DESIGN_SYSTEM.md` and notify the team. Update `src/design-tokens.ts` to reflect new values.

---

### Q: Can I break the spacing scale for this one component?

**A:** Try to use the scale first. If truly necessary, use a value from the scale that's closest, then document why.

**Example:** "This element needs 22px (not in scale) because XYZ requirement. Used scale-6 (24px) as closest approximation."

---

### Q: Light mode looks wrong. What do I do?

**A:** Check:
1. Is `.light` class on `<html>`?
2. Are text colors remapped? (Should be blue #1a5c8f, not white)
3. Is the gradient background applied?
4. Run lighthouse for contrast ratios

See [Light & Dark Modes](#light--dark-modes) section for the remapping rules.

---

### Q: How do I test accessibility?

**A:** Use:
- **Lighthouse** (Chrome DevTools) — Runs accessibility audit
- **WAVE** (browser extension) — Checks contrast and structure
- **Keyboard navigation** — Tab through interactive elements
- **Screen reader** (NVDA, JAWS) — Test with assistive tech

---

### Q: Who do I ask for design questions?

**A:** 
1. **Check this handbook first** — likely answered here
2. **Read DESIGN_SYSTEM.md** — full reference
3. **Check src/design-tokens.ts** — the source of truth
4. **Ask the team** — if still unclear

---

## Glossary

**Dials:** Three macro controls (Variance, Motion, Density) that govern all design decisions.

**Tokens:** Atomic design values (colors, spacing, motion timings, shadows, radius).

**Semantic:** Meaningful application of tokens (e.g., "primary button" uses orange, "secondary button" uses blue).

**Responsive:** Design that works across mobile, tablet, and desktop without breaking.

**Accessibility:** Ensuring all users (including those with disabilities) can use the interface.

**Contrast ratio:** How different two colors are; 4.5:1 is minimum for readable text (WCAG AA).

---

## Next Steps

1. **Bookmark this handbook** — you'll reference it constantly
2. **Read DESIGN_SYSTEM.md** — the comprehensive reference
3. **Import design-tokens.ts** — use in your code
4. **Follow component patterns** — build using the scale
5. **Test both modes** — ensure consistency

---

**Questions?** Check the FAQ, read DESIGN_SYSTEM.md, or ask the team.

**Ready to build?** Start with [Component Patterns](#component-patterns) and reference the scales as needed.

---

*Version 1.0 | August 3, 2026 | All Phases Complete*
