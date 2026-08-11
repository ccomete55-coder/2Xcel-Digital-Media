# Phase 1: Dials, Motion Timings & Shadows — Implementation Guide

**Status:** ✅ Configuration files created  
**Date:** August 3, 2026  
**Time to Complete:** 2–3 hours for full implementation

---

## What's New

### 1. ✅ Design Dials Documented

**File:** `src/design-tokens.ts`

```typescript
export const DESIGN_DIALS = {
  DESIGN_VARIANCE: 7,      // Asymmetric, intentional breaks
  MOTION_INTENSITY: 5.5,   // Cinematic but restrained
  VISUAL_DENSITY: 3.5,     // Airy, breathing room
};
```

**What this means:**
- Every layout, motion, and spacing decision should reflect these values
- If you need to deviate, document WHY in code comments
- Update `DESIGN_SYSTEM.md` if the values change

---

### 2. ✅ Motion Timings Standardized

**File:** `src/design-tokens.ts` → `MOTION_TIMINGS`

```typescript
export const MOTION_TIMINGS = {
  fast:   150,   // Button hover, icon change
  base:   300,   // Standard transitions, fade-in
  medium: 500,   // Scroll reveals, word pull-up
  slow:   800,   // Hero animations, cinematic
};
```

**Replace all of these:**
- ❌ `duration-0.3` → ✅ `duration-300` (use MOTION_TIMINGS.base)
- ❌ `duration-0.6` → ✅ `duration-500` (use MOTION_TIMINGS.medium)
- ❌ `duration-0.75` → ✅ `duration-500` (use MOTION_TIMINGS.medium)
- ❌ `duration-0.8` → ✅ `duration-800` (use MOTION_TIMINGS.slow)
- ❌ `1200ms` → ✅ `800` (use MOTION_TIMINGS.slow, cinematic is capped at 800ms)

---

### 3. ✅ Shadow Scale Defined

**File:** `src/design-tokens.ts` → `SHADOW_SCALE`

```typescript
export const SHADOW_SCALE = {
  sm:         "0 1px 2px rgba(0, 0, 0, 0.05)",
  md:         "0 4px 6px rgba(0, 0, 0, 0.1)",
  lg:         "0 10px 15px rgba(0, 0, 0, 0.15)",
  xl:         "0 20px 25px rgba(0, 0, 0, 0.2)",
  orange_md:  "0 4px 12px rgba(230, 92, 43, 0.25)",
  blue_md:    "0 4px 12px rgba(43, 142, 217, 0.25)",
};
```

**Replace these shadows in code:**
- ❌ `shadow-lg shadow-brand-orange/25` → ✅ Use `SHADOW_SCALE.orange_md`
- ❌ Multiple `box-shadow` values → ✅ Pick one from the scale

---

## How to Use in Code

### Option 1: TypeScript / React Components

```typescript
import { MOTION_TIMINGS, SHADOW_SCALE, MOTION_PRESETS } from '@/design-tokens';

// Use in styles
<div style={{ boxShadow: SHADOW_SCALE.md }}>
  Card with standard shadow
</div>

// Use with Framer Motion
<motion.div {...MOTION_PRESETS.fadeIn}>
  Fade in on mount
</motion.div>

// Use in motion.div
<motion.div
  transition={{ duration: MOTION_TIMINGS.base / 1000 }}
>
  Standard transition
</motion.div>
```

### Option 2: Tailwind Classes

```jsx
// Duration (convert ms to Tailwind duration units)
<div className="transition-all" style={{ transitionDuration: `${MOTION_TIMINGS.base}ms` }}>
  300ms transition
</div>

// Shadow (use Tailwind classes or inline styles)
<div className="shadow-lg">
  {/* or */}
</div>
<div style={{ boxShadow: SHADOW_SCALE.lg }}>
  Large shadow
</div>
```

### Option 3: CSS (index.css)

```css
/* Define shadow classes */
.shadow-token-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.shadow-token-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Then use in Tailwind */
<div className="shadow-token-md">
```

---

## Refactoring Checklist

### Dials Documentation
- [ ] Add a comment block to any section that deviates from default dials
  ```typescript
  // Custom dials for hero section (more cinematic)
  // VARIANCE: 8, MOTION: 8, DENSITY: 3
  <section className="hero">
  ```

### Motion Timings (Search & Replace)
- [ ] Replace `duration-0.3` → `duration-300` (with MOTION_TIMINGS.base comment)
- [ ] Replace `duration-0.4` → `duration-300` (base equivalent)
- [ ] Replace `duration-0.6` → `duration-500` (medium)
- [ ] Replace `duration-0.75` → `duration-500` (medium)
- [ ] Replace `duration-0.8` → `duration-800` (slow)
- [ ] Replace `1200ms` → `800ms` (slow, capped)
- [ ] Replace all cubic-bezier values → Use MOTION_EASINGS.custom_reveal
- [ ] Add `MOTION_TIMINGS.fast` (150ms) to all hover states

### Shadow Scale (Search & Replace)
- [ ] Find all `box-shadow` inline styles → Replace with SHADOW_SCALE
- [ ] Find all `shadow-lg shadow-brand-orange/25` → Use `SHADOW_SCALE.orange_md`
- [ ] Find all `shadow-md shadow-brand-blue/15` → Use `SHADOW_SCALE.blue_md`
- [ ] Verify card surfaces use `SHADOW_SCALE.md` consistently
- [ ] Verify hover lift uses `SHADOW_SCALE.lg`

---

## Before & After Examples

### Example 1: Motion Timing

**Before:**
```jsx
<motion.div
  transition={{
    duration: 0.6,
    ease: "easeOut"
  }}
>
  Fade in section
</motion.div>
```

**After:**
```jsx
import { MOTION_TIMINGS, MOTION_EASINGS } from '@/design-tokens';

<motion.div
  transition={{
    duration: MOTION_TIMINGS.medium / 1000,  // 500ms
    ease: MOTION_EASINGS.ease_out
  }}
>
  Fade in section
</motion.div>
```

### Example 2: Shadow Scale

**Before:**
```jsx
<div
  className="card-surface rounded-3xl p-8"
  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
>
  Custom card
</div>
```

**After:**
```jsx
import { SHADOW_SCALE } from '@/design-tokens';

<div
  className="card-surface rounded-3xl p-8"
  style={{ boxShadow: SHADOW_SCALE.md }}
>
  Consistent card
</div>
```

### Example 3: Dials Documentation

**Before:**
```jsx
// No documentation of why this animation is longer
<motion.div transition={{ duration: 1.2 }}>
  Hero animation
</motion.div>
```

**After:**
```jsx
import { DESIGN_DIALS, MOTION_TIMINGS } from '@/design-tokens';

// Hero section uses elevated dials: VARIANCE=8, MOTION=8, DENSITY=3
// Justifies longer 800ms animation for cinematic feel
<motion.div transition={{ duration: MOTION_TIMINGS.slow / 1000 }}>
  Hero animation
</motion.div>
```

---

## Files to Update (Priority Order)

### High Priority (Used Everywhere)
1. [ ] `src/App.tsx` — Replace motion transitions with MOTION_TIMINGS
2. [ ] `src/index.css` — Add shadow scale utilities
3. [ ] `src/components/ui/scroll-expansion-hero.tsx` — Use motion presets
4. [ ] `src/components/ui/motion-footer.tsx` — Use motion timings

### Medium Priority (Multiple Uses)
5. [ ] `src/components/CaseStudiesSection.tsx` — Motion timings
6. [ ] `src/components/PricingSection.tsx` — Shadow scale
7. [ ] `src/components/FeaturedAgentsSection.tsx` — Motion + shadows
8. [ ] `src/components/LunaVoiceAgentSection.tsx` — Shadow consistency

### Lower Priority (Future)
9. [ ] All other components — Gradually update as you touch them
10. [ ] Storybook stories — Reference SHADOW_SCALE in controls

---

## Testing Checklist

After refactoring:

- [ ] **Motion consistency:** All hover states use `MOTION_TIMINGS.fast` (150ms)
- [ ] **Shadow consistency:** Cards use `SHADOW_SCALE.md`, not custom values
- [ ] **Easing consistency:** All scroll reveals use `MOTION_EASINGS.custom_reveal`
- [ ] **Dial documentation:** Hero section has comment explaining elevated dials
- [ ] **No hardcoded values:** Search for `0.3`, `0.6`, `0.8` in code — should find none
- [ ] **Visual regression:** Site looks identical before/after (no unintended changes)
- [ ] **Performance:** Motion feels smooth (60fps), no jank on scroll

---

## Quick Reference Commands

```bash
# Search for motion timings that need updating
grep -r "duration-0\." src/

# Search for shadow values to standardize
grep -r "box-shadow" src/

# Search for easing functions to consolidate
grep -r "ease\|cubic-bezier" src/

# Find inline styles needing refactor
grep -r "style={{" src/ | grep -i "shadow\|duration"
```

---

## Import Template for New Files

Copy this to the top of any component using design tokens:

```typescript
import { 
  DESIGN_DIALS,
  MOTION_TIMINGS, 
  MOTION_EASINGS,
  SHADOW_SCALE,
  MOTION_PRESETS 
} from '@/design-tokens';
```

---

## Documentation Standards

### When to Comment

```typescript
// ✅ DO: Explain why you're deviating from dials
// This hero section uses elevated MOTION_INTENSITY (8 vs 5.5 baseline)
// to create cinematic scroll-driven animation. Justification: hero is above-fold hero positioning with video background — deserves premium motion feel.
<motion.div transition={{ duration: MOTION_TIMINGS.slow / 1000 }}>

// ❌ DON'T: Just repeat what the code says
// 800ms duration
<motion.div transition={{ duration: 800 }}>
```

### When to Update DESIGN_SYSTEM.md

If you change dial values, shadow scale, or motion timings:
1. Update `src/design-tokens.ts`
2. Add a note to `DESIGN_SYSTEM.md` explaining the change
3. Update the Storybook stories that reference the changed values

---

## Success Metrics

After Phase 1 is complete:

✅ **Consistency**
- All hover states animate in 150ms
- All scrolls reveals animate in 500ms
- All cards have consistent shadow depth

✅ **Maintainability**
- New team member can search `MOTION_TIMINGS.base` instead of guessing "should this be 0.3 or 0.4?"
- Shadow values centralized in one place (no more "why do these cards have different shadows?")

✅ **Documentation**
- Dials are documented in code comments where they deviate
- Every motion transition references MOTION_TIMINGS
- Every shadow references SHADOW_SCALE

---

## Troubleshooting

**Q: I have motion code that doesn't fit MOTION_TIMINGS**  
A: Add it to the scale. Document why (e.g., "Added MOTION_TIMINGS.ultraSlow (1200ms) for hero parallax"). Update DESIGN_SYSTEM.md.

**Q: Should I update existing animations to match new scale?**  
A: Yes, but test visually first. Some animations might feel slightly different. If it looks worse, it's a signal the timing needs adjustment.

**Q: Do I need to use TypeScript to use design-tokens.ts?**  
A: No. You can `import` it in any `.js` or `.jsx` file too. TypeScript just gives you autocomplete.

**Q: What if a component needs a shadow not in SHADOW_SCALE?**  
A: Add it to the scale with a comment explaining why. Keep scale to 6–8 values max (more = loses meaning).

---

## Next Phase

Phase 2 will focus on:
- Spacing scale consistency (1.5x progression)
- Border radius hierarchy (xs, sm, lg, full)
- CSS custom property cleanup

See `DESIGN_SYSTEM.md` for full roadmap.

---

**Ready?** Start with `src/App.tsx` and replace the first 5 motion transitions. Commit. Test visually. Then tackle the rest.
