# QtPay Design System Specification

## Overview
QtPay follows a modern, high-contrast, flat fintech design system inspired by top Indian digital wallets and payment interfaces (e.g. MobiKwik). It relies on confident electric blue brand accents, pure white surface containers, dark slate typography, zero drop shadows, and strict WCAG 2.1 AA accessibility guidelines.

---

## 1. Color Palette

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `primary` | `#2e83ff` | Primary action buttons, active tab indicators, key badges, focus rings |
| `primaryHover` | `#1a6ee8` | Hover state for primary buttons |
| `primaryLight` | `#eef5ff` | Background tint for active items, icon containers, quick actions |
| `primaryBorder` | `#d6e6ff` | Border highlight for active state cards |
| `surface` | `#ffffff` | Primary container cards, modals, sheets, headers |
| `background` | `#f8fafc` | Page background canvas |
| `subSurface` | `#f1f5f9` | Inputs, avatar placeholders, icon keypads |
| `textPrimary` | `#0f172a` | High-contrast body text, section headers, amount labels |
| `textSecondary` | `#475569` | Secondary descriptors, subtitles, timestamps |
| `textMuted` | `#64748b` | Caption text, transaction metadata |
| `borderHairline` | `#e2e8f0` | Standard hairline border for cards and dividers |
| `borderStrong` | `#cbd5e1` | Input borders and button outlines |
| `success` | `#10b981` | Credit transaction badges, success states |
| `warning` | `#f59e0b` | Pending states, alerts |
| `danger` | `#ef4444` | Debit alerts, error states, delete actions |

---

## 2. Typography Scale (Google Sans Flex)

QtPay uses **Google Sans Flex** across all viewports for consistent readability.

- **Display**: `32px` / Weight `800` / Line-height `40px`
- **Title Large**: `20px` / Weight `800` / Line-height `28px`
- **Title Medium**: `17px` / Weight `700` / Line-height `24px`
- **Title Small**: `15px` / Weight `700` / Line-height `22px`
- **Body Large**: `15px` / Weight `500` / Line-height `22px`
- **Body Regular**: `14px` / Weight `400` / Line-height `20px`
- **Caption**: `12px` / Weight `600` / Line-height `16px`
- **Micro Tag**: `10px` / Weight `700` / Line-height `14px`

---

## 3. Corner Radius System (50% Reduced)

- `radius.none`: `0px`
- `radius.xs`: `4px` (Tags, micro badges)
- `radius.sm`: `6px` (Secondary chips, small inputs)
- `radius.md`: `8px` (Standard container cards, primary/secondary buttons)
- `radius.lg`: `12px` (Modals, bottom sheets)
- `radius.full`: `9999px` (User avatars, status pills)

---

## 4. Elevation & Shadows

- **Strict 0 Drop Shadows**: `box-shadow: none !important;` is enforced globally across all containers, headers, modals, and navigation bars.
- Depth is communicated through 1px border lines (`#e2e8f0`) and subtle surface contrast (`#ffffff` card on `#f8fafc` background canvas).

---

## 5. Spacing Scale

- `xs`: `4px`
- `sm`: `8px`
- `md`: `12px`
- `lg`: `16px`
- `xl`: `20px`
- `2xl`: `24px`
- `3xl`: `32px`

---

## 6. Accessibility & WCAG 2.1 AA Compliance

1. **Color Contrast**: All primary text (`#0f172a`), secondary text (`#475569`), and link text (`#2e83ff`) maintain $\ge 4.5:1$ contrast against white/light surfaces.
2. **Keyboard Focus**: Focus ring rendered as `2.5px solid #2e83ff` with `2px` offset on `:focus-visible`.
3. **Screen Readers**: Modals use `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `Escape` key listeners. Navigation bars use `role="navigation"` and `role="tab"`.
4. **Physical Keypad**: `PinPad.tsx` supports physical keyboard numbers (`0`-`9`) and `Backspace`.

---

## 7. Component Usage Guide

```tsx
import { designSystem } from '../design-system';

// Card Example
<div style={{
  backgroundColor: designSystem.colors.surface,
  border: `1px solid ${designSystem.colors.borderHairline}`,
  borderRadius: designSystem.radii.md,
  padding: designSystem.spacing.lg,
  boxShadow: designSystem.shadows.none,
}}>
  <h3 style={{ fontSize: '16px', fontWeight: designSystem.typography.weights.extrabold, color: designSystem.colors.textPrimary }}>
    Card Header
  </h3>
</div>
```
