# 2XceL Digital Media — Design System

> **Version 1.0** | Last Updated: August 3, 2026  
> The source of truth for design decisions. This document ensures consistency as the team grows.

---

## 🎯 Design Read

**What we're building:** B2B SaaS + creative agency landing page for technical founders and decision-makers.

**Aesthetic:** Premium tech with cinematic dark-first design, restrained motion, high visual polish.

**Positioning:** Competing with Linear and Stripe on design quality while maintaining agency-specific production credentials.

---

## 📊 The Three Dials (Core Configuration)

These three values govern **every** layout, motion, and density decision. Document all deviations here.

| Dial | Value | Meaning |
|---|---|---|
| **DESIGN_VARIANCE** | 7 | Asymmetric layouts, varied card heights, deliberate visual breaks (not static, not chaotic) |
| **MOTION_INTENSITY** | 5–6 | Scroll-driven animations, fade-ins, subtle hover states (cinematic but restrained) |
| **VISUAL_DENSITY** | 3–4 | Generous whitespace, breathing room between sections, airy card layouts |

### When to Override
- **Variance:** Increase to 8–9 for hero/feature sections; decrease to 5–6 for admin interfaces
- **Motion:** Reduce to 2–3 for accessibility-first content; increase to 8–10 for marketing splash screens
- **Density:** Increase to 5–6 for data-heavy dashboards; keep at 2–3 for aspirational editorial

---

## 🎨 Color System

### Brand Palette (Do Not Change)

```css
--color-brand-obsidian: #0B0E14;  /* Background, base */
--color-brand-orange:   #E65C2B;  /* Primary action, emotional moments */
--color-brand-blue:     #2B8ED9;  /* Secondary, data, decorative */
--color-brand-cream:    #DEDBC8;  /* Text, high-contrast overlays */
```

### Semantic Roles

```css
:root {
  /* Surfaces */
  --color-surface-primary:   #0B0E14;                    /* Page background */
  --color-surface-elevated:  rgba(16, 22, 31, 0.65);     /* Cards, panels */
  --color-surface-raised:    rgba(13, 18, 25, 0.55);     /* Card base */
  
  /* Text */
  --color-text-primary:      #DEDBC8;                    /* Headings, primary content */
  --color-text-secondary:    #94a3b8;                    /* Body text, descriptions */
  --color-text-muted:        #64748b;                    /* Labels, secondary meta */
  
  /* Interactive */
  --color-accent-primary:    #E65C2B;                    /* Buttons, CTAs */
  --color-accent-secondary:  #2B8ED9;                    /* Secondary actions */
  
  /* Structure */
  --color-border:            rgba(255, 255, 255, 0.08);  /* Dividers, edges */
  --color-border-strong:     rgba(255, 255, 255, 0.12);  /* Emphasized dividers */
}
```

### Usage Rules

- **Orange** (`--color-accent-primary`): Reserve for CTAs, primary navigation, emotional highlights
  - Primary button, active nav state, form focus glow
  - NOT for body text, NOT for secondary elements
- **Blue** (`--color-accent-secondary`): Use for secondary actions, data visualization, decorative accents
  - Secondary buttons, comparison highlights, gradient glows
  - NOT as a primary call-to-action
- **Cream** (`--color-text-primary`): High-contrast text on dark backgrounds
  - Headings, hero copy, featured content
  - NOT for body text (use `--color-text-secondary` instead)

### Light Mode

```css
html.light {
  --color-surface-primary:   linear-gradient(160deg, #fff3eb 0%, #ffffff 45%, #ebf4ff 100%);
  --color-text-primary:      #1a5c8f;     /* Brand blue headings */
  --color-text-secondary:    #46647d;     /* Blue-tinted slate */
  --color-border:            rgba(230, 92, 43, 0.1);     /* Orange-tinted */
}
```

**Light Mode Rule:** When in doubt, map to blue (`#1a5c8f`). Orange stays warm but reserved for accents.

---

## 🔤 Typography System

### Font Stack

```css
--font-sans: Roboto Flex, sans-serif;     /* Body, UI */
--font-mono: JetBrains Mono, monospace;   /* Code, data */
```

### Modular Scale (1.125x Progression)

```css
:root {
  --text-xs:    0.75rem;    /* 12px - Labels, captions */
  --text-sm:    0.875rem;   /* 14px - Small text */
  --text-base:  1rem;       /* 16px - Body text */
  --text-lg:    1.125rem;   /* 18px - Large body */
  --text-xl:    1.266rem;   /* ~20px - Section intro */
  --text-2xl:   1.424rem;   /* ~23px - Small heading */
  --text-3xl:   1.602rem;   /* ~26px - Medium heading */
  --text-4xl:   1.802rem;   /* ~29px - Large heading */
  --text-5xl:   2.027rem;   /* ~32px - Hero heading */
  --text-6xl:   2.281rem;   /* ~36px - Page title */
}
```

### Heading Hierarchy

```css
h1 {
  font-size: var(--text-6xl);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

h2 {
  font-size: var(--text-5xl);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

h3 {
  font-size: var(--text-4xl);
  font-weight: 600;
  line-height: 1.3;
}

h4, h5, h6 {
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.4;
}

p {
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.01em;
}
```

### Font Weight Scale

- **400** - Body text, regular UI
- **500** - Small emphasis, labels
- **600** - Subheadings, medium emphasis
- **700** - Headings, primary emphasis
- **800** - Page titles, maximum emphasis

---

## 📏 Spacing System

### Scale (1.5x Progression)

```css
:root {
  --space-1:   0.25rem;   /* 4px - Micro spacing */
  --space-2:   0.5rem;    /* 8px - Tight spacing */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px - Base unit */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-12:  3rem;      /* 48px - Generous gap */
  --space-16:  4rem;      /* 64px - Large section break */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px - Page section gap */
}
```

### Responsive Strategy

- **Mobile:** Base scale (var(--space-4), var(--space-8), var(--space-12))
- **Tablet:** +1 step (var(--space-6), var(--space-12), var(--space-16))
- **Desktop:** +2 steps (var(--space-8), var(--space-16), var(--space-20))

```jsx
// Example: Section padding
<section className="px-4 md:px-8 lg:px-16">
  {/* Mobile: gap-8, Tablet: gap-12, Desktop: gap-16 */}
  <div className="gap-8 md:gap-12 lg:gap-16">
```

### Interior Spacing (Cards, Lists)

- **Padding:** var(--space-6) to var(--space-8) (24–32px)
- **Gap (rows):** var(--space-4) (16px)
- **Gap (columns):** var(--space-6) to var(--space-8) (24–32px)

---

## 🎛️ Border Radius System

### Three-Tier Hierarchy

```css
:root {
  --radius-xs: 0.25rem;    /* 4px - Small controls, inputs */
  --radius-sm: 0.5rem;     /* 8px - Cards, panels, moderate elements */
  --radius-lg: 1rem;       /* 16px - Large surfaces, featured sections */
  --radius-full: 9999px;   /* Fully rounded - Pills, badges, avatars */
}
```

### Application Rules

| Element | Radius | Example |
|---|---|---|
| Input fields, small buttons | `--radius-xs` | Form inputs, icon buttons |
| Cards, panels, medium components | `--radius-sm` | Blog cards, feature boxes |
| Large surfaces, featured sections | `--radius-lg` | Hero sections, full-width panels |
| Pills, badges, avatars | `--radius-full` | Navigation pills, user badges |

---

## 🎬 Motion System

### Timing Scale (ms)

```javascript
const MOTION_TIMINGS = {
  fast:   150,   // Quick interactions (button hover, icon change)
  base:   300,   // Standard transitions (fade-in, slide)
  medium: 500,   // Scroll reveals (staggered element animation)
  slow:   800,   // Hero animations (page load, cinematic effects)
};
```

### Easing Functions

```javascript
const EASINGS = {
  ease_out:         'ease-out',                      // Quick start, smooth decelerate
  ease_inout:       'ease-in-out',                   /* Smooth both directions */
  custom_reveal:    [0.16, 1, 0.3, 1],              // Word pull-up, scroll reveals
  custom_spring:    { damping: 25, stiffness: 180 }, // Modal entrance, smooth pop
};
```

### Animation Categories

| Type | Duration | Easing | Use Case |
|---|---|---|---|
| **Hover/Focus** | 150ms | ease-out | Button hover, icon change, focus ring |
| **State Change** | 300ms | ease-out | Toggle switches, tab changes, show/hide |
| **Scroll Reveal** | 500ms | custom_reveal | Word pull-up, fade-in on scroll, stagger |
| **Page Load** | 800ms | custom_reveal | Hero animation, cinematic reveal |

### Motion Intensity Rules

- **Pages with high MOTION_INTENSITY (8+):** Use slow timings, multiple overlapping animations
- **Pages with low MOTION_INTENSITY (2–3):** Use fast timings, single element animations only
- **Default (5–6):** Mix of fast & medium, no animations over 500ms

---

## 🔲 Shadow System

### Shadow Depth Scale

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.2);
  
  /* Branded: Orange glow for premium emphasis */
  --shadow-orange-md: 0 4px 12px rgba(230, 92, 43, 0.25);
  --shadow-blue-md:   0 4px 12px rgba(43, 142, 217, 0.25);
}
```

### Application

| Element | Shadow | When to Use |
|---|---|---|
| Subtle dividers | `--shadow-sm` | Borders, underlines, subtle separation |
| Elevated cards | `--shadow-md` | Blog cards, feature boxes, standard panels |
| Interactive hover | `--shadow-lg` | Button hover, card lift, elevated state |
| Featured/Hero | `--shadow-xl` | Hero sections, modals, maximum emphasis |
| CTA buttons | `--shadow-orange-md` | Primary buttons, emphasized actions |
| Secondary actions | `--shadow-blue-md` | Secondary buttons, data highlights |

---

## 🧩 Component Principles

### Buttons

```jsx
// Primary (Orange)
<button className="bg-brand-orange hover:bg-brand-orange/90 text-white shadow-orange-md">
  Primary Action
</button>

// Secondary (Blue)
<button className="bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue border border-brand-blue/30">
  Secondary Action
</button>

// Tertiary (Outline)
<button className="border border-white/20 hover:border-white/40 text-text-secondary">
  Tertiary Action
</button>
```

### Cards

```jsx
<div className="card-surface rounded-sm p-6 gap-6">
  {/* card-surface = rgba(13, 18, 25, 0.55) + blur(12px) */}
  {/* Consistent padding, gap, radius */}
</div>
```

### Glass Surfaces

```jsx
<div className="glass rounded-sm">
  {/* glass = rgba(255, 255, 255, 0.03) + blur(12px) */}
  {/* Use for nav, floating panels, subtle backgrounds */}
</div>
```

---

## ✅ Checklist for New Components

When creating a new component or section:

- [ ] Does it use the brand color palette only? (No random hex colors)
- [ ] Is padding/gap using the spacing scale? (No arbitrary values)
- [ ] Is border radius using the 3-tier system? (xs, sm, lg, full)
- [ ] Are text sizes from the typographic scale? (No 17px, 23px, etc.)
- [ ] Does motion use the timing scale? (fast, base, medium, slow)
- [ ] Are shadows from the shadow scale? (sm, md, lg, xl)
- [ ] Does it respect the three dials? (Variance: 7, Motion: 5–6, Density: 3–4)
- [ ] Does it work in both dark and light modes?
- [ ] Is accessibility considered? (Contrast, focus states, keyboard nav)

---

## 🚀 Governance

### How to Request a Design Decision

If a decision isn't documented:

1. **Check this file first** — It may already be covered
2. **Open an issue or discussion** with:
   - What you're building
   - Why the existing system doesn't fit
   - Your proposed solution
3. **Team review** — Discuss impact on consistency
4. **Document the decision** — Update this file

### Design Debt Tracking

Track inconsistencies in a `/docs/DESIGN_DEBT.md` file:

```markdown
# Design Debt

## High Priority
- [ ] Consolidate 50+ CSS custom properties → 15–20 core tokens
- [ ] Replace --text-5xl +5px overrides with clean modular scale
- [ ] Define shadow scale consistently across all components

## Medium Priority
- [ ] Audit all card opacity values (0.55, 0.6, 0.65, 0.8 → standardize)
- [ ] Document all animation timings used in codebase
```

---

## 📚 Resources

- **Audit Report:** See `DESIGN_AUDIT.md` (comprehensive consistency audit)
- **Taste Skill:** https://github.com/Leonxlnx/taste-skill (design framework)
- **Figma Brand Kit:** [Link to shared Figma file]
- **Component Storybook:** [Link when set up]

---

## Questions?

Reach out to the design team or open a discussion in the repo.

**Last reviewed:** August 3, 2026  
**Next review:** Quarterly or when major features ship
