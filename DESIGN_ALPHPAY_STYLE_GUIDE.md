# 🎨 alph pay — Brand Style Guide & Mobile App Design System

> **Brand**: **alph pay** (custom lowercase "alph pay")  
> **Primary Color**: Vibrant Lime Green (`#7FE87F`)  
> **Secondary Color**: Pure Black (`#000000`) & Pure White (`#FFFFFF`)  
> **Accent Dark UI**: Deep Navy Charcoal (`#1A1A2E`)  
> **Typography**: Inter / SF Pro / Google Sans Flex  
> **Aesthetic**: High-Contrast Luxury Fintech with Dynamic Diamond/Rhombus Geometry  

---

## 🟢 1. Primary Color — Vibrant Lime Green (`#7FE87F`)

| Role | Hex Code | RGB | Usage |
|:---|:---|:---|:---|
| **Base** | `#7FE87F` | 127, 232, 127 | Main brand color, CTAs, icons, highlights |

### 🌿 Tints (Base + White)
| Tint | Hex Code | Description / Usage |
|:---|:---|:---|
| 25% Tint | `#9FEE9F` | Light mint green, active borders |
| 50% Tint | `#BFF4BF` | Soft pastel green, focus states |
| 75% Tint | `#DFFADF` | Very pale green, light badges |
| 90% Tint | `#EFFDEF` | Near-white green, card tints |

### 🌲 Shades (Base + Black)
| Shade | Hex Code | Description / Usage |
|:---|:---|:---|
| 25% Shade | `#5FBF5F` | Medium green, CTA hover states |
| 50% Shade | `#3F963F` | Forest green, active press states |
| 75% Shade | `#1F6D1F` | Deep green, dark backgrounds |
| 90% Shade | `#0C440C` | Dark forest green, text on green |

---

## ⚫ 2. Secondary Color — Pure Black (`#000000`)

| Role | Hex Code | Usage |
|:---|:---|:---|
| **Base** | `#000000` | High-contrast CTA text on lime green, headlines, bold icons |

### Gray Tints (Black + White)
| Tint | Hex Code | Usage |
|:---|:---|:---|
| 25% Tint | `#404040` | Body text (Light Mode) |
| 50% Tint | `#808080` | Subtitles, secondary text, captions |
| 75% Tint | `#BFBFBF` | Borders, dividers (Light Mode) |
| 90% Tint | `#E6E6E6` | Light backgrounds, card containers |

---

## 🌑 3. Accent Dark — Deep Navy Charcoal (`#1A1A2E`)

| Role | Hex Code | Usage |
|:---|:---|:---|
| **Base** | `#1A1A2E` | App UI Background, dark mode canvas |
| **Card Surface** | `#2A2A3E` | Card backgrounds, list item surfaces |
| **Elevated Surface** | `#3A3A52` | Modals, bottom sheets, popovers |
| **Sub Surface** | `#33334D` | Inputs, avatar placeholders |
| **Dark Borders** | `#4D4D6B` | Dividers, card borders, input borders |
| **Text Secondary** | `#B3B3C2` | Body descriptions (Dark Mode) |
| **Text Muted** | `#808099` | Captions, placeholders, disabled states |

---

## ⚪ 4. Neutral — Pure White (`#FFFFFF`)

| Role | Hex Code | Usage |
|:---|:---|:---|
| **Base** | `#FFFFFF` | Primary headlines on dark surfaces, light mode page backgrounds |

---

## 🔤 5. Typography Scale

**Font Family:** `Inter`, `SF Pro Display`, `Google Sans Flex`, system-ui, -apple-system, sans-serif

| Style | Size | Weight | Line Height | Letter Spacing |
|:---|:---|:---|:---|:---|
| **H1 — Display** | 32px | Bold (700) | 40px | -0.5px |
| **H2 — Title** | 24px | SemiBold (600) | 32px | -0.3px |
| **H3 — Heading** | 20px | SemiBold (600) | 28px | 0px |
| **H4 — Subheading** | 16px | Medium (500) | 24px | 0px |
| **Body — Large** | 16px | Regular (400) | 24px | 0px |
| **Body — Default** | 14px | Regular (400) | 20px | 0px |
| **Caption** | 12px | Regular (400) | 16px | 0.2px |
| **Overline / Micro** | 10px | Medium (500) | 14px | 0.5px |

---

## 🔲 6. Border Radii Scale

- `--radius-sm`: `8px` (Buttons, inputs, small chips)
- `--radius-md`: `12px` (Cards, list items, quick action tiles)
- `--radius-lg`: `16px` (Balance cards, bottom sheets, modals)
- `--radius-xl`: `24px` (Hero banners, promotional surfaces)
- `--radius-full`: `999px` (Avatars, pills, floating action buttons)

---

## 🌫️ 7. Elevation & Shadows

### Dark Mode (Primary Signature Experience)
- `--shadow-sm`: `0 1px 2px rgba(0, 0, 0, 0.3)`
- `--shadow-md`: `0 4px 12px rgba(0, 0, 0, 0.4)`
- `--shadow-lg`: `0 8px 24px rgba(0, 0, 0, 0.5)`
- `--shadow-xl`: `0 16px 48px rgba(0, 0, 0, 0.6)`

### Light Mode
- `--shadow-sm`: `0 1px 2px rgba(0, 0, 0, 0.05)`
- `--shadow-md`: `0 4px 12px rgba(0, 0, 0, 0.08)`
- `--shadow-lg`: `0 8px 24px rgba(0, 0, 0, 0.12)`
- `--shadow-xl`: `0 16px 48px rgba(0, 0, 0, 0.16)`

---

## 🧩 8. Component Specifications

### Primary Filled Button
- **Background**: `#7FE87F` (Vibrant Lime Green)
- **Text Color**: `#000000` (Bold Black for $\ge 12:1$ contrast)
- **Height**: `48px` (Mobile touch target $\ge 44\text{px}$)
- **Radius**: `8px`
- **Hover**: `#5FBF5F` / `#9FEE9F`
- **Glow**: `0 4px 12px rgba(127, 232, 127, 0.25)`

### Secondary Outlined Button
- **Background**: `transparent`
- **Border**: `1.5px solid #7FE87F`
- **Text Color**: `#7FE87F`
- **Height**: `48px`
- **Radius**: `8px`

### App Cards & Balance Cards
- **Dark Background**: `#2A2A3E`
- **Border**: `1px solid #4D4D6B`
- **Radius**: `12px` (Standard) / `16px` (Hero Balance)
- **Amount Color**: `#7FE87F`

---

## ✅ 9. Usage Rules

1. **Primary green (`#7FE87F`)** dominates primary CTAs, active bottom navigation states, and brand marks.
2. **Pure Black (`#000000`)** is used on primary button text for maximum readability and contrast.
3. **Deep Navy Charcoal (`#1A1A2E`)** is the app's signature background canvas.
4. **Diamond / Rhombus Shape** is used as the signature brand geometry.
5. All text and interactive elements strictly meet **WCAG 2.1 AA** accessibility standards.
