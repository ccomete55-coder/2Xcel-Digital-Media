# Storybook Setup Guide

> **Status:** Configuration scaffolded. Ready for installation.  
> **Time to Complete:** ~15 minutes

---

## What is Storybook?

Storybook is a tool that lets you:
- 📚 **Catalog all components** in one place
- 🎨 **Test design consistency** visually
- 📖 **Auto-generate documentation** from components
- ♿ **Audit accessibility** (a11y) across components
- 🔄 **Test responsive behavior** (mobile, tablet, desktop)
- 🎯 **Isolate components** for faster development

**For 2XceL:** Every button, card, form element, and section variant lives in one searchable, filterable UI library.

---

## Installation (One-Time Setup)

### 1. Install Storybook Dependencies

```bash
npm install --save-dev @storybook/react @storybook/react-vite @storybook/addon-links @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-designs @storybook/addon-a11y @storybook/test
```

### 2. Add to package.json

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### 3. Start Storybook

```bash
npm run storybook
```

Storybook will open at `http://localhost:6006`

---

## Folder Structure

```
src/
├── components/
│   ├── Button.tsx
│   ├── Button.stories.tsx          ← Story file (NEW)
│   ├── Card.tsx
│   ├── Card.stories.tsx            ← Story file (NEW)
│   └── ...
├── index.css
└── ...

.storybook/
├── main.ts                         ← Config (created)
├── preview.ts                      ← Preview settings (created)
└── ...
```

**Rule:** Every reusable component gets a `.stories.tsx` file.

---

## How to Write Stories

### Example: Button Component

```tsx
// src/components/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
  title: "Components/Button",           // Sidebar category
  component: Button,
  tags: ["autodocs"],                   // Auto-generate docs
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Click Me",
  },
};

// Variant stories
export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled",
  },
};

// Responsive story
export const ResponsiveSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

### What You Get:
- ✅ Interactive controls (change variant, size, disabled state)
- ✅ Auto-generated docs
- ✅ Accessibility audit (a11y tab)
- ✅ Responsive preview (mobile, tablet, desktop)
- ✅ Dark/light mode toggle

---

## Priority Components to Document

| Component | Variants | Effort |
|---|---|---|
| **Button** | primary, secondary, tertiary (+ 3 sizes, hover, disabled) | 30 min |
| **Card** | elevated, glass, raised (+ padding variants) | 20 min |
| **Input** | text, email, search, focus, error states | 20 min |
| **Badge** | orange, blue, gray (+ sizes) | 15 min |
| **Pricing Card** | starter, growth, pro (+ highlight state) | 25 min |
| **Section** | full-width, centered, asymmetric | 15 min |
| **Testimonial** | rotate states, active indicator | 20 min |
| **Form Group** | label, input, error, helper text | 20 min |

**Total Time:** ~2 hours to document core components.

---

## Best Practices

### 1. One Story Per Component Variation
```tsx
// ✅ Good
export const PrimarySmall: Story = { args: { variant: "primary", size: "sm" } };
export const PrimaryMedium: Story = { args: { variant: "primary", size: "md" } };

// ❌ Avoid
export const AllVariants: Story = { /* 50 lines of render() */ };
```

### 2. Group Stories in Sidebar
```tsx
// ✅ Good: Creates "Components/Button" section
const meta = {
  title: "Components/Button",
};

// ✅ Also good: Creates "Form/Input" section
const meta = {
  title: "Form/Input",
};
```

### 3. Document the Why
```tsx
const meta = {
  parameters: {
    docs: {
      description: {
        component:
          "Primary call-to-action button. Use for high-priority actions. Reserve orange for main conversions.",
      },
    },
  },
};
```

### 4. Test Responsive Behavior
```tsx
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
  args: { /* args */ },
};
```

### 5. Link to Design System
```tsx
const meta = {
  parameters: {
    docs: {
      description: {
        component:
          "See [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md#buttons) for full button documentation.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/...",
    },
  },
};
```

---

## Testing in Storybook

### Accessibility (a11y) Audit
Every story gets an "Accessibility" tab automatically:
- ✅ Contrast ratios
- ✅ Focus indicators
- ✅ ARIA attributes
- ✅ Semantic HTML

### Interactions Testing
```tsx
import { expect, within, userEvent } from "@storybook/test";

export const ClickBehavior: Story = {
  args: { /* */ },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    expect(button).toHaveClass("active");
  },
};
```

---

## Collaboration Workflow

### For Designers:
1. Open Storybook
2. Filter by component (e.g., "Button")
3. Check all variants render correctly
4. Use the design tool link to see Figma mockups
5. Request new variants if needed

### For Developers:
1. Before shipping a component, add a story
2. Test all props/variants/states
3. Run accessibility audit (should have 0 violations)
4. Verify responsive behavior (mobile/tablet/desktop)
5. Link to DESIGN_SYSTEM.md for reference

---

## CI/CD Integration (Future)

Once Storybook is stable, you can:

1. **Visual Regression Testing:**
   ```bash
   npm install --save-dev chromatic
   ```
   Catches unintended design changes in PRs.

2. **Accessibility Testing:**
   ```bash
   npm install --save-dev @storybook/addon-a11y
   ```
   Runs a11y audit on every story.

3. **Deploy to Chromatic:**
   ```bash
   chromatic --project-token=XXXXX
   ```
   Share component library with clients.

---

## Quick Reference: Story File Template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import MyComponent from "./MyComponent";

const meta = {
  title: "Category/ComponentName",
  component: MyComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "What does this component do and why would you use it?",
      },
    },
  },
  argTypes: {
    prop1: {
      control: "select",
      options: ["option1", "option2"],
    },
    prop2: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prop1: "option1",
    prop2: false,
  },
};

export const Variant2: Story = {
  args: {
    prop1: "option2",
    prop2: true,
  },
};
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Storybook won't start | Clear `.storybook` cache: `rm -rf node_modules/.cache` |
| Styles not loading | Ensure `src/index.css` is imported in `.storybook/preview.ts` |
| Dark mode not working | Add decorator in `preview.ts`: `<div className="dark">` |
| Components not found | Check `title: "..."` matches sidebar structure |
| Build fails | Run `npm install` to ensure all deps are present |

---

## Next Steps

1. ✅ Configuration files created (main.ts, preview.ts)
2. ✅ Sample Button story created
3. ⬜ Run `npm run storybook` to start the server
4. ⬜ Create stories for remaining core components
5. ⬜ Link to Figma designs in component metadata
6. ⬜ Share Storybook URL with team (`http://localhost:6006`)
7. ⬜ Add to CI/CD pipeline for automated testing

---

## Resources

- **Storybook Docs:** https://storybook.js.org/docs/
- **Accessibility Testing:** https://storybook.js.org/docs/react/writing-stories/accessibility-testing
- **Visual Testing:** https://storybook.js.org/docs/react/writing-stories/interaction-testing
- **Design System:** See `DESIGN_SYSTEM.md`

---

Ready to start? Run:

```bash
npm install
npm run storybook
```

Questions? Check the Storybook docs or ask the team.
