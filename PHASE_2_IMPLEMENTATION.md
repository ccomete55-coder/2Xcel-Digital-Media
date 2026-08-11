# Phase 2: Spacing System & Border Radius Hierarchy

**Status:** ✅ Configuration complete, ready for implementation  
**Date:** August 3, 2026  
**Time to Complete:** 3–4 hours for full implementation

---

## What's New in Phase 2

### 1. ✅ Spacing System (1.5x Progression)

**File:** `src/design-tokens.ts` → `SPACING_SCALE`

```typescript
SPACING_SCALE = {
  1:  "0.25rem",   // 4px
  2:  "0.5rem",    // 8px
  3:  "0.75rem",   // 12px
  4:  "1rem",      // 16px (base unit)
  6:  "1.5rem",    // 24px
  8:  "2rem",      // 32px
  12: "3rem",      // 48px
  16: "4rem",      // 64px
  20: "5rem",      // 80px
  24: "6rem",      // 96px
}
```

**Key Feature:** Every step is exactly 1.5x the previous value. No random jumps.

---

### 2. ✅ Border Radius Hierarchy (3-Tier)

**File:** `src/design-tokens.ts` → `BORDER_RADIUS_SCALE`

```typescript
BORDER_RADIUS_SCALE = {
  xs:   "0.25rem",  // 4px   - Small controls
  sm:   "0.5rem",   // 8px   - Cards, panels
  lg:   "1rem",     // 16px  - Large surfaces, hero
  full: "9999px"    // Fully rounded - Pills, badges
}
```

**Before:** Inconsistent radius (0.75rem, 0.5rem, 1rem, 1.5rem, 9999px)  
**After:** Standardized to 4 values with clear intent

---

### 3. ✅ Responsive Spacing Strategy

**File:** `src/design-tokens.ts` → `RESPONSIVE_SPACING`

Pattern: **Mobile → Tablet → Desktop = Base → +1 Step → +2 Steps**

```typescript
// Example: Section padding
Mobile:  SPACING_SCALE[4]   // 16px
Tablet:  SPACING_SCALE[8]   // 32px  (+1 step)
Desktop: SPACING_SCALE[16]  // 64px  (+2 steps)

// In JSX:
<section className="px-4 md:px-8 lg:px-16">
```

---

## How to Implement

### Option A: Import TypeScript Tokens

```typescript
import { SPACING_SCALE, BORDER_RADIUS_SCALE, RESPONSIVE_SPACING } from '@/design-tokens';

<div
  style={{
    padding: SPACING_SCALE[6],        // 24px
    borderRadius: BORDER_RADIUS_SCALE.sm,  // 8px
  }}
>
  Card with consistent spacing & radius
</div>
```

### Option B: Use CSS Classes (Immediate)

```html
<!-- Padding -->
<div class="p-token-6">
  Padding: 24px
</div>

<!-- Margin -->
<div class="mb-token-8">
  Margin-bottom: 32px
</div>

<!-- Gap -->
<div class="gap-token-12">
  Gap between flex children: 48px
</div>

<!-- Border Radius -->
<div class="radius-sm">
  Card with 8px radius
</div>

<button class="radius-full">
  Fully rounded pill button
</button>
```

### Option C: Tailwind with Custom Config

Add to `tailwind.config.ts` (optional, for better DX):

```javascript
module.exports = {
  theme: {
    spacing: {
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '6': '1.5rem',
      '8': '2rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
    },
    borderRadius: {
      'xs': '0.25rem',
      'sm': '0.5rem',
      'lg': '1rem',
      'full': '9999px',
    },
  },
};
```

Then use standard Tailwind:
```jsx
<div className="p-6 rounded-sm">
  Card with consistent spacing
</div>
```

---

## Before & After Examples

### Example 1: Section Padding

**Before:**
```jsx
<section className="px-4 md:px-8 lg:px-16">
  {/* Works, but not clearly documented */}
</section>
```

**After:**
```jsx
import { RESPONSIVE_SPACING } from '@/design-tokens';

{/* Explicitly documented */}
<section
  style={{
    paddingLeft: RESPONSIVE_SPACING.section.mobile,  // 16px
  }}
  className="px-4 md:px-8 lg:px-16"
>
  {/* Comment: Uses RESPONSIVE_SPACING.section = 4 → 8 → 16 */}
</section>
```

### Example 2: Card Radius Consistency

**Before:**
```jsx
<div className="rounded-3xl">Card 1</div>
<div className="rounded-2xl">Card 2</div>
<div className="rounded-lg">Card 3</div>
{/* Different radii — no consistency */}
```

**After:**
```jsx
import { BORDER_RADIUS_SCALE } from '@/design-tokens';

<div style={{ borderRadius: BORDER_RADIUS_SCALE.sm }}>Card 1</div>
<div style={{ borderRadius: BORDER_RADIUS_SCALE.sm }}>Card 2</div>
<div style={{ borderRadius: BORDER_RADIUS_SCALE.sm }}>Card 3</div>
{/* All cards identical */}
```

### Example 3: Button Padding

**Before:**
```jsx
<button className="px-6 py-3">Button 1</button>
<button className="px-8 py-4">Button 2</button>
<button className="px-4 py-2">Button 3</button>
{/* Random padding values */}
```

**After:**
```jsx
import { SPACING_RULES, BORDER_RADIUS_SCALE } from '@/design-tokens';

<button style={{ padding: SPACING_RULES.buttonPadding.small, borderRadius: BORDER_RADIUS_SCALE.xs }}>
  Small Button
</button>
<button style={{ padding: SPACING_RULES.buttonPadding.medium, borderRadius: BORDER_RADIUS_SCALE.xs }}>
  Medium Button
</button>
<button style={{ padding: SPACING_RULES.buttonPadding.large, borderRadius: BORDER_RADIUS_SCALE.xs }}>
  Large Button
</button>
```

---

## Refactoring Checklist

### Spacing Scale

- [ ] Section padding: Use `RESPONSIVE_SPACING.section`
  - Mobile: `p-token-4` (16px)
  - Tablet: `p-token-8` (32px)
  - Desktop: `p-token-16` (64px)

- [ ] Section gap: Use `RESPONSIVE_SPACING.sectionGap`
  - Mobile: `gap-token-8` (32px)
  - Tablet: `gap-token-12` (48px)
  - Desktop: `gap-token-16` (64px)

- [ ] Card padding: Use `RESPONSIVE_SPACING.cardPadding`
  - Mobile: `p-token-6` (24px)
  - Tablet: `p-token-8` (32px)

- [ ] Card gap: Use `RESPONSIVE_SPACING.cardGap`
  - Mobile: `gap-token-4` (16px)
  - Tablet: `gap-token-6` (24px)

- [ ] Input padding: Use `SPACING_RULES.inputPadding`
  - `px-token-4 py-token-3`

- [ ] Button padding: Use `SPACING_RULES.buttonPadding`
  - Small: `px-token-4 py-token-2`
  - Medium: `px-token-6 py-token-3`
  - Large: `px-token-8 py-token-4`

- [ ] List/item spacing: Use `SPACING_RULES.listGap`
  - `gap-token-4`

- [ ] Badge padding: Use `SPACING_RULES.badgePadding`
  - `px-token-3 py-token-1`

### Border Radius Hierarchy

- [ ] Input fields: `.radius-xs`
- [ ] Buttons: `.radius-xs`
- [ ] Cards/panels: `.radius-sm`
- [ ] Large surfaces/hero: `.radius-lg`
- [ ] Pills/badges: `.radius-full`

---

## Search & Replace Commands

### Spacing
```bash
# Find inconsistent padding
grep -r "px-\|py-\|p-" src/ | grep -v "p-token\|px-token\|py-token"

# Find gap inconsistencies
grep -r "gap-\[" src/

# Find margin inconsistencies
grep -r "mt-\|mb-\|m-" src/
```

### Border Radius
```bash
# Find radius inconsistencies
grep -r "rounded-" src/ | grep -v "radius-"

# Find inline borderRadius
grep -r "borderRadius" src/
```

---

## Common Spacing Mistakes to Fix

### ❌ Don't
```jsx
<div className="gap-6 md:gap-14">    {/* +8 jump = 133% increase */}
<div className="p-4 md:p-14">        {/* Random values */}
<div className="rounded-xl">         {/* Undefined radius */}
<div className="rounded-2xl">        {/* Different from rounded-xl */}
<button className="px-6 py-3">      {/* Not in scale */}
```

### ✅ Do
```jsx
<div className="gap-token-8 md:gap-token-12">  {/* +1 step = 50% increase */}
<div className="p-token-4 md:p-token-8">      {/* Consistent scale */}
<div className="radius-sm">                   {/* Semantic, named */}
<div className="radius-sm">                   {/* Same radius */}
<button className="px-token-6 py-token-3">   {/* From SPACING_RULES */}
```

---

## Files to Update (Priority Order)

### Tier 1: High Priority (Used Everywhere)
1. [ ] `src/App.tsx` — Section padding/gap
2. [ ] `src/components/ui/scroll-expansion-hero.tsx` — Hero spacing
3. [ ] All card components — Card padding/gap
4. [ ] All button components — Button padding/radius

### Tier 2: Medium Priority
5. [ ] `src/components/PricingSection.tsx` — Card consistency
6. [ ] `src/components/PricingCalculator.tsx` — Button/input spacing
7. [ ] Form components — Input/label/helper spacing
8. [ ] `src/components/ui/motion-footer.tsx` — Section spacing

### Tier 3: Lower Priority
9. [ ] All other components — Gradually update
10. [ ] Storybook stories — Reference new tokens

---

## Testing Checklist

After refactoring:

- [ ] **Spacing consistency:** All cards have same padding
- [ ] **Radius consistency:** All cards have same radius
- [ ] **Responsive consistency:** Mobile → Tablet → Desktop follows +1 step pattern
- [ ] **Button consistency:** All buttons same padding by size
- [ ] **No hardcoded values:** Search for `px-5`, `p-14`, `rounded-3xl` — find none
- [ ] **Visual regression:** Site looks identical before/after
- [ ] **Mobile:** Spacing feels right on mobile
- [ ] **Tablet:** Gaps increase by 1 step vs mobile
- [ ] **Desktop:** Gaps increase by 1 step vs tablet

---

## Quick Reference Table

| Element | xs (4px) | sm (8px) | lg (16px) | full |
|---|---|---|---|---|
| Input fields | ✅ | ❌ | ❌ | ❌ |
| Buttons | ✅ | ❌ | ❌ | ❌ |
| Cards | ❌ | ✅ | ❌ | ❌ |
| Hero sections | ❌ | ❌ | ✅ | ❌ |
| Pills/badges | ❌ | ❌ | ❌ | ✅ |

---

## Responsive Strategy at a Glance

```
Mobile              Tablet              Desktop
─────────────────────────────────────────────
SPACING[4]   →      SPACING[8]   →      SPACING[16]
  16px               32px                 64px
                     +1 step              +1 step
                     (50% increase)       (50% increase)
```

Every breakpoint advances by exactly one scale step.

---

## Common Pitfalls

❌ **Pitfall 1:** Jumping multiple steps
```jsx
<div className="gap-4 md:gap-12">  {/* +8 = 200% jump! */}
```
✅ **Fix:**
```jsx
<div className="gap-token-4 md:gap-token-6 lg:gap-token-8">  {/* +1 step each time */}
```

❌ **Pitfall 2:** Mixing radius values
```jsx
<div className="rounded-xl">Card 1</div>
<div className="rounded-2xl">Card 2</div>
```
✅ **Fix:**
```jsx
<div className="radius-sm">Card 1</div>
<div className="radius-sm">Card 2</div>
```

❌ **Pitfall 3:** Custom padding without reference
```jsx
<button className="px-7 py-2.5">  {/* Where does 7 come from? */}
```
✅ **Fix:**
```jsx
<button className="px-token-6 py-token-3">  {/* From SPACING_RULES.buttonPadding.medium */}
```

---

## Import Template for New Files

```typescript
import { 
  SPACING_SCALE,
  RESPONSIVE_SPACING,
  SPACING_RULES,
  BORDER_RADIUS_SCALE 
} from '@/design-tokens';
```

---

## Success Metrics

✅ **Week 1**
- All cards have consistent padding
- All buttons have consistent padding by size
- All radius values from the scale

✅ **Month 1**
- Mobile → Tablet → Desktop follows +1 step pattern
- No hardcoded spacing/radius values in code
- New components automatically use the scale

✅ **Quarter 1**
- Spacing feels intentional and consistent
- Responsive behavior predictable
- Design reviews: "Check design-tokens.ts"

---

**Ready to start?** Begin with `src/App.tsx` section padding. Then tackle cards. Commit frequently.
