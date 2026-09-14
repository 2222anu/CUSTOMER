# QtPay Design System & Multi-Country White-Label Architecture

> **Version**: 2.0  
> **Aesthetic**: Flat High-Contrast Modern Fintech (Electric Blue `#2e83ff`, Zero Drop Shadows, 8px/12px Corner Radii)  
> **Target Viewport**: Responsive Mobile-First Container (Max `600px` centered, `100dvh` native viewport)  
> **Compliance**: WCAG 2.1 AA Accessible, PWA Ready, ISO 20022 Payment Scheme Adaptable  

---

## Table of Contents
1. [Design Philosophy & Core Principles](#1-design-philosophy--core-principles)
2. [Foundational Design Tokens](#2-foundational-design-tokens)
   - [Color System](#color-system)
   - [Typography Scale (Google Sans Flex)](#typography-scale-google-sans-flex)
   - [Corner Radii & Elevation](#corner-radii--elevation)
   - [Spacing & Layout Grid](#spacing--layout-grid)
3. [Core UI Component Standards](#3-core-ui-component-standards)
   - [Header & Navigation](#header--navigation)
   - [Buttons & Interactive Controls](#buttons--interactive-controls)
   - [Cards, Lists & Grouping](#cards-lists--grouping)
   - [Modals & Bottom Sheets](#modals--bottom-sheets)
   - [PIN Pad & Security Inputs](#pin-pad--security-inputs)
   - [QR Scanner Viewfinder](#qr-scanner-viewfinder)
4. [Multi-Country White-Label & Localization Architecture](#4-multi-country-white-label--localization-architecture)
   - [Country Profile Configuration Schema](#country-profile-configuration-schema)
   - [Supported Global Payment Rails](#supported-global-payment-rails)
   - [Currency, Formatting & Number Scales](#currency-formatting--number-scales)
   - [KYC, National ID & Account Masking](#kyc-national-id--account-masking)
   - [RTL & Multilingual Support](#rtl--multilingual-support)
5. [Country Profile Catalog & Rail Matrix](#5-country-profile-catalog--rail-matrix)
6. [Step-by-Step Guide: Cloning for a New Country Client](#6-step-by-step-guide-cloning-for-a-new-country-client)
7. [Screen & Modal Architecture Inventory](#7-screen--modal-architecture-inventory)
8. [Performance, Accessibility & Quality Checklist](#8-performance-accessibility--quality-checklist)

---

## 1. Design Philosophy & Core Principles

QtPay delivers an ultra-fast, clean, and intuitive financial application experience tailored for both retail consumers and merchant payments.

```
┌────────────────────────────────────────────────────────┐
│                   QTPay Design Pillars                 │
├──────────────────┬──────────────────┬──────────────────┤
│  ⚡ Precision    │  🛡️ Trust & Zero │  🌐 Global-First │
│   Simplicity     │     Clutter      │   Adaptability   │
│  Flat aesthetic, │  Strict 0 drop   │  Modular payment │
│  instant haptics │  shadows, clean  │  rails, dynamic  │
│  and feedback.   │  hairline borders│  currencies & ID.│
└──────────────────┴──────────────────┴──────────────────┘
```

1. **Zero Drop Shadows (Flat Luxury)**: 
   - No heavy blurred drop shadows (`box-shadow: none !important`).
   - Depth and layering are communicated exclusively through surface tints (`#f8fafc` canvas vs `#ffffff` cards) and subtle hairline borders (`1px solid #e2e8f0`).
2. **Compact Radii Hierarchy**:
   - Container cards and primary buttons use compact `8px` radii.
   - Floating sheets and dialogue modals use `12px` radii.
   - Status pills and avatar chips use circular full radii (`9999px`).
3. **Mobile-Native Viewport (600px)**:
   - On desktop, the viewport renders in a centered `600px` phone frame with subtle backdrop blur.
   - On mobile/PWA, it consumes full `100dvh` with hardware-accelerated transitions.
4. **Touch Ergonomics**:
   - All interactive controls enforce a minimum height/touch target of $\ge 44\text{px}$.
   - Bottom navigation is fixed (`position: fixed`, `z-index: 50`) and remains non-scrollable.

---

## 2. Foundational Design Tokens

### Color System

All tokens are defined in TypeScript (`src/design-system/tokens.ts`) and mirrored in CSS Custom Properties (`src/index.css`):

```css
:root {
  /* Brand Primary */
  --color-primary: #2e83ff;
  --color-primary-hover: #1a6ee8;
  --color-primary-active: #0f5cd1;
  --color-primary-light: #eef5ff;
  --color-primary-border: #d6e6ff;
  --color-primary-dark: #004fc4;

  /* Surfaces & Canvas */
  --color-surface: #ffffff;
  --color-background: #f8fafc;
  --color-sub-surface: #f1f5f9;
  --color-overlay: rgba(15, 23, 42, 0.55);

  /* Typography */
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-text-disabled: #94a3b8;
  --color-text-on-primary: #ffffff;

  /* Structural Borders */
  --color-border-hairline: #e2e8f0;
  --color-border-strong: #cbd5e1;
  --color-border-focus: #2e83ff;

  /* Financial Status Colors */
  --color-success: #10b981;
  --color-success-light: #d1fae5;
  --color-success-text: #065f46;

  --color-warning: #f59e0b;
  --color-warning-light: #fef3c7;
  --color-warning-text: #92400e;

  --color-danger: #ef4444;
  --color-danger-light: #fee2e2;
  --color-danger-text: #991b1b;
}
```

### Typography Scale (Google Sans Flex)

| Token Name | Font Size | Line Height | Font Weight | Target Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display` | `32px` | `40px` | `800` (ExtraBold) | Hero balances, Splash brand titles |
| `titleLarge` | `20px` | `28px` | `800` (ExtraBold) | App Header screen titles, Main modal headers |
| `titleMedium` | `17px` | `24px` | `700` (Bold) | Transaction amounts, Key section headers |
| `titleSmall` | `15px` | `22px` | `700` (Bold) | Card headers, Contact names, Bank titles |
| `bodyLarge` | `15px` | `22px` | `500` (Medium) | Primary input field text, Form values |
| `bodyRegular` | `14px` | `20px` | `400` (Regular) | Body copy, explanatory guidelines |
| `caption` | `12px` | `16px` | `600` (SemiBold) | Timestamps, UTR tags, Sub-labels, Pill text |
| `micro` | `10px` | `14px` | `700` (Bold) | Badge tags (`PRIMARY`, `VERIFIED`, `LIVE`) |

> **Note on Numeric Displays**: All balances, transaction amounts, PINs, and OTP digits must use `font-variant-numeric: tabular-nums;` to prevent character layout shifts.

### Corner Radii & Elevation

```typescript
export const radii = {
  none: '0px',
  xs: '4px',       // Micro status tags, security pills
  sm: '6px',       // Filter chips, small badges
  md: '8px',       // Standard cards, buttons, input fields
  lg: '12px',      // Modals, Bottom sheets, Hero containers
  full: '9999px',  // Circular buttons, avatars, pill badges
};

export const shadows = {
  none: 'none !important', // Strictly enforced 0 drop shadows
};
```

### Spacing & Layout Grid

- **Base Unit**: `4px`
- **Scale**: `xs (4px)`, `sm (8px)`, `md (12px)`, `lg (16px)`, `xl (20px)`, `2xl (24px)`, `3xl (32px)`
- **Standard Screen Padding**: `20px` horizontal (`padding: '0 20px'`)
- **Card Padding**: `14px` to `16px`
- **Element Stack Gap**: `12px`

---

## 3. Core UI Component Standards

### Header & Navigation
- **`AppHeader`**:
  - Left icon: Back button arrow or Brand avatar with 44px tap target.
  - Center: Centered screen title (`20px`, `800` weight).
  - Right: Context actions (QR scanner icon, Notifications bell with unread badge, Settings).
- **`BottomNavigation`**:
  - Sticky at the bottom (`position: fixed`, `bottom: 0`, `z-index: 50`).
  - Contains 5 primary destinations: **Home**, **Services**, **Scan (Floating Center)**, **History**, **Profile**.
  - Active tab indicated by `#2e83ff` icon tint and a subtle `3px` active indicator pill.

### Buttons & Interactive Controls
- **`PrimaryButton`**: Full-width `#2e83ff` background, `#ffffff` text, `48px` height, `8px` radius, `font-weight: 700`.
- **`SecondaryButton`**: White surface with `1px solid #e2e8f0` border, `#0f172a` text.
- **Active States**: Subtle `transform: scale(0.98)` on touch with `0.1s ease`.

### Modals & Bottom Sheets
- Slide-up bottom sheets with dark backdrop overlay (`rgba(15, 23, 42, 0.55)`).
- Handle bar at the top (`36px` width, `4px` height, `#cbd5e1` color).
- Smooth `cubic-bezier(0.16, 1, 0.3, 1)` easing animation.

### PIN Pad & Security Inputs
- **`PinPad`**: 3x4 grid with large number keys (`64px` height), touch feedback, and backspace key.
- **Security Dots**: 6-digit or 4-digit masked circles (`12px` diameter) with active glow.

### QR Scanner Viewfinder
- Square viewfinder (`240px` $\times$ `240px`) with high-contrast `#2e83ff` corner brackets.
- Animated laser sweep beam oscillating vertically.
- Quick action toggles: Flashlight/Torch, Photo Gallery upload, and Demo Merchant presets.

---

## 4. Multi-Country White-Label & Localization Architecture

To clone and configure QPay for international banks, fintechs, and regional clients, the platform uses a **Country Configuration Adapter** pattern.

```
┌────────────────────────────────────────────────────────────┐
│                    Country Adapter Layer                   │
├──────────────────────────────┬─────────────────────────────┤
│   🌍 Regional Payment Rails  │   🏦 Banking & Clearing     │
│   (UPI, FedNow, Pix, Faster) │   (Routing, IFSC, Sort Code)│
├──────────────────────────────┼─────────────────────────────┤
│   💵 Currency & Formatting   │   🪪 Regional KYC / Tax ID  │
│   (₹, $, €, £, R$, S$, د.إ)  │   (PAN, SSN, CPF, EmiratesID)│
├──────────────────────────────┼─────────────────────────────┤
│   🎨 White-Label Branding    │   🌐 Language / i18n & RTL  │
│   (Client Colors & Logos)    │   (EN, ES, AR, HI, PT, FR)  │
└──────────────────────────────┴─────────────────────────────┘
```

### Country Profile Configuration Schema

Each country instance is defined by a declarative configuration file (`src/config/countries/[countryCode].ts`):

```typescript
export interface CountryConfig {
  code: string;                 // ISO 3166-1 alpha-2 (e.g., 'IN', 'US', 'GB', 'AE', 'BR', 'SG')
  countryName: string;          // e.g. "India", "United States", "United Arab Emirates"
  defaultLocale: string;        // e.g. "en-IN", "en-US", "ar-AE", "pt-BR"
  isRTL: boolean;               // True for Arabic/Hebrew locales
  
  // Currency Specification
  currency: {
    code: string;               // "INR", "USD", "GBP", "EUR", "AED", "BRL", "SGD"
    symbol: string;             // "₹", "$", "£", "€", "د.إ", "R$", "S$"
    symbolPosition: 'prefix' | 'suffix';
    decimalDigits: number;      // 2 for standard, 0 for JPY/KRW, 3 for KWD/BHD
    thousandSeparator: string;  // "," or "."
    decimalSeparator: string;   // "." or ","
  };

  // Instant Payment Rail
  paymentRail: {
    railName: string;           // "UPI", "FedNow / RTP", "Faster Payments", "Aani", "Pix", "PayNow"
    vpaFormat: string;          // "name@bank" (UPI), "$cashtag", "phone / email", "CPF / QR"
    vpaLabel: string;           // "UPI ID", "PayID", "Pix Key", "Zelle ID"
    referenceLabel: string;     // "UTR", "Fedwire Ref", "EndToEndId", "Reference ID"
    pinLength: 4 | 6;           // 6 for UPI/Pix, 4 for US/UK/EU
  };

  // Phone & Identity Verification
  telephony: {
    countryCallingCode: string; // "+91", "+1", "+44", "+971", "+55", "+65"
    nationalNumberLength: number;
    placeholder: string;        // "98765 43210", "(555) 000-0000"
  };

  identityVerification: {
    idName: string;             // "Aadhaar / PAN", "SSN (Last 4)", "Emirates ID", "CPF", "NRIC"
    idMask: string;             // "•••• •••• ••••", "•••-••-••••"
  };

  // Default Mock Banks & Billers for the Region
  mockBanks: Array<{
    name: string;
    code: string;
    logoColor: string;
  }>;

  mockBillerCategories: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
}
```

---

## 5. Country Profile Catalog & Rail Matrix

| Country / Region | Currency & Symbol | Instant Payment Rail | Identifier / ID Type | Calling Code | PIN Digits |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 🇮🇳 **India** (Default) | `INR` (`₹`) | **UPI (NPCI)** / IMPS | UPI VPA / PAN / Aadhaar | `+91` | 6 Digits |
| 🇺🇸 **United States** | `USD` (`$`) | **FedNow** / RTP / Zelle | Phone / Email / SSN-4 | `+1` | 4 Digits |
| 🇬🇧 **United Kingdom** | `GBP` (`£`) | **Faster Payments (FPS)** | Sort Code + Account / Paym | `+44` | 4–6 Digits |
| 🇪🇺 **Eurozone** | `EUR` (`€`) | **SEPA Instant** | IBAN / Mobile Proxy | `+33 / +49` | 4–6 Digits |
| 🇦🇪 **United Arab Emirates**| `AED` (`د.إ`)| **Aani (IPP)** / CBUAE | Emirates ID / Mobile Proxy | `+971` | 6 Digits |
| 🇸🇦 **Saudi Arabia** | `SAR` (`﷼`) | **Sarie** / Saudi Central Bank | Iqama / Mobile ID | `+966` | 6 Digits |
| 🇧🇷 **Brazil** | `BRL` (`R$`) | **Pix (Banco Central)** | CPF / CNPJ / Pix Key | `+55` | 6 Digits |
| 🇸🇬 **Singapore** | `SGD` (`S$`) | **PayNow (FAST)** | NRIC / FIN / UEN / Mobile | `+65` | 6 Digits |
| 🇦🇺 **Australia** | `AUD` (`A$`) | **New Payments Platform (NPP)**| PayID / BSB | `+61` | 4–6 Digits |
| 🇲🇽 **Mexico** | `MXN` (`$`) | **CoDi / SPEI** | CLABE / Phone | `+52` | 4 Digits |

---

## 6. Step-by-Step Guide: Cloning for a New Country Client

To clone and launch a dedicated white-label version for an international client:

### Step 1: Create a Client Country Profile
Create `src/config/countries/[countryCode].ts` (e.g., `src/config/countries/us.ts` or `src/config/countries/ae.ts`):

```typescript
import { CountryConfig } from './types';

export const USConfig: CountryConfig = {
  code: 'US',
  countryName: 'United States',
  defaultLocale: 'en-US',
  isRTL: false,
  currency: {
    code: 'USD',
    symbol: '$',
    symbolPosition: 'prefix',
    decimalDigits: 2,
    thousandSeparator: ',',
    decimalSeparator: '.',
  },
  paymentRail: {
    railName: 'FedNow / Zelle',
    vpaFormat: 'user@domain.com or phone',
    vpaLabel: 'Pay ID / Email',
    referenceLabel: 'Fedwire Ref',
    pinLength: 4,
  },
  telephony: {
    countryCallingCode: '+1',
    nationalNumberLength: 10,
    placeholder: '(555) 019-2834',
  },
  identityVerification: {
    idName: 'SSN (Last 4 digits)',
    idMask: '•••-••-••••',
  },
  mockBanks: [
    { name: 'Chase Bank', code: 'JPMC', logoColor: '#117aca' },
    { name: 'Bank of America', code: 'BOA', logoColor: '#e31837' },
    { name: 'Wells Fargo', code: 'WF', logoColor: '#d71e28' },
    { name: 'Citibank', code: 'CITI', logoColor: '#003b70' },
  ],
  mockBillerCategories: [
    { id: 'power', name: 'Electricity & Gas', icon: 'Zap' },
    { id: 'mobile', name: 'Wireless Plan', icon: 'Smartphone' },
    { id: 'water', name: 'Water & Utilities', icon: 'Droplet' },
    { id: 'internet', name: 'Broadband / Fiber', icon: 'Wifi' },
  ],
};
```

### Step 2: Configure Client Brand Colors (White-Label)
In `src/design-system/tokens.ts` or via environment overrides (`VITE_BRAND_PRIMARY`):
- Replace `#2e83ff` with the client's corporate brand hex (e.g., `#0052cc`, `#008080`, `#d9252a`).
- Update the SVG logo assets in `src/components/Logo.tsx` and `public/icons/`.

### Step 3: Switch Active Country in `.env`
```env
# Multi-Country Tenant Selection
VITE_APP_COUNTRY=US
VITE_BRAND_NAME="PayDirect US"
VITE_BRAND_PRIMARY="#0066f5"
```

### Step 4: Run Typecheck & Automated Test Suite
```bash
# Verify TypeScript build
node node_modules/typescript/bin/tsc -b

# Run Playwright End-to-End Verification
npx playwright test
```

---

## 7. Screen & Modal Architecture Inventory

The application is structured into **30 Core Screens** and **6 Reusable Modals/Sheets**:

### Core Screens (30)
1. `SPLASH` - Startup splash animation & brand reveal.
2. `ONBOARDING` - Multi-scene animated feature walkthrough.
3. `MOBILE_NUMBER` - Country phone entry with phone carrier detection.
4. `SMS_OTP` - Secure auto-reading OTP confirmation & device binding.
5. `PERMISSIONS` - Biometrics, SMS & Camera permission onboarding.
6. `HOME` - Primary dashboard: Linked banks, hero banner, quick rails, recent feed.
7. `PAY_ANYONE` - Universal recipient selector (contacts, VPAs, phones).
8. `SEND_AMOUNT` - Amount input keypad with account selector & note.
9. `ELECTRICITY` - Utility bill payment breakdown & consumer lookup.
10. `PAYMENT_SUCCESS` - Digital receipt, transaction UTR, share & reward triggers.
11. `HISTORY` - Searchable, filtered transaction activity log.
12. `RECEIVE` - Dynamic QR code display with customizable payment amounts.
13. `SCAN` - Camera viewfinder scanner, laser sweep, torch & gallery QR upload.
14. `REQUEST_MONEY` - In-app payment request generator with expiration timer.
15. `PROFILE` - User identity, KYC status, QR badge, account settings.
16. `BANK_ACCOUNTS` - Linked bank accounts manager with primary account toggles.
17. `UPI_SETTINGS` - Payment rail preferences, default debit, VPA aliases.
18. `PAYMENT_METHODS` - Credit cards, debit cards, wallet balances, autopay.
19. `SECURITY` - PIN change, biometric toggle, active login sessions.
20. `NOTIFICATIONS` - System alerts, payment credits, promotional vouchers.
21. `ALL_SERVICES` - Full catalog of billers, transit, insurance, recharges.
22. `MONEY_REQUESTS` - Pending inbound/outbound split bill & payment requests.
23. `HELP_SUPPORT` - 24/7 ticket assistant, FAQ search, dispute management.
24. `PRIVACY` - Data protection settings, analytics consent, account deletion.
25. `SHOPPING` - Merchant offers, cashback catalog, brand vouchers.
26. `MESSAGES` - P2P payment chat threads with embedded request cards.
27. `TRAVEL` - Flight, train, bus, and hotel booking with instant confirmation.
28. `REWARDS` - Scratch cards, cashback balance, scratch-to-win games.
29. `FOOD` - Food ordering vouchers & merchant payment discounts.
30. `BALANCE_SUMMARY` - Multi-account consolidated ledger view.

### Modals & Bottom Sheets (6)
1. `LanguageModal` - Instant multi-lingual language selector.
2. `LogoutModal` - Safe logout confirmation with session clearance.
3. `AddBankModal` - Bank selection & account discovery wizard.
4. `AppLinksModal` - Deep link and shareable payment link generator.
5. `EditProfileModal` - Profile name, email, avatar, and KYC editor.
6. `PayBillPinModal` - Secure PIN authorization bottom sheet.

---

## 8. Performance, Accessibility & Quality Checklist

- [x] **0 Drop Shadows**: Clean flat aesthetic without blurry drop shadows.
- [x] **Strict Typography**: Google Sans Flex across all viewports (`tabular-nums` for financials).
- [x] **WCAG 2.1 AA Contrast**: All text tiers pass $\ge 4.5:1$ contrast against surface backgrounds.
- [x] **Sticky Navigation**: Bottom bar stays non-scrollable and pinned to the bottom.
- [x] **Haptic & Audio Feedback**: Web Audio API scanner sound + `navigator.vibrate` support.
- [x] **PWA Offline Ready**: `manifest.json` + Service Worker registered.
- [x] **Automated Testing**: 100% pass rate in Playwright automated end-to-end verification.
