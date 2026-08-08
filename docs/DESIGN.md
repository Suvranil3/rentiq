# RentIQ Design System & Visual Specification

## 1. Visual Concept
RentIQ combines:
* **Warm Editorial Aesthetic**: Soft cream background (`#f5f1e4`), clean typography (Inter), rounded pill surfaces (`50px` radius).
* **Modern SaaS Operational Usability**: Dense tables, status badges, Recharts data visualization, KPI cards.
* **Premium Rental Marketplace**: High quality product photography, clear pricing models, date selector widgets.

---

## 2. Color Palette & CSS Variables

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `fresh-grass` | `#8ed462` | Primary brand accent, selected nav pills, primary CTAs, availability status |
| `cream-paper` | `#f5f1e4` | Primary page canvas background |
| `ink-black` | `#2c2e2a` | Primary text, headings, icons |
| `pure-white` | `#ffffff` | Cards, forms, tables, modals |
| `sandstone` | `#e0dbce` | Secondary surfaces, inset areas, filter backgrounds |
| `stone-gray` | `#80827f` | Muted metadata, helper text, timestamps |
| `hairline-mist` | `#d5d5d4` | Hairline borders and subtle dividers |
| `sky-pop` | `#2ba0ff` | Information accent, status indicators |
| `coral-pop` | `#ff705d` | Overdue, damage reports, destructive actions |
| `sunshine-pop` | `#f5e211` | Warning, due soon, pending hold |

---

## 3. Typography Scale (Inter)

- **Display Hero**: `clamp(48px, 6vw, 96px)`
- **Page Heading**: `clamp(28px, 4vw, 48px)`
- **Section Heading**: `28px–32px`, font-semibold
- **Card Heading**: `20px–24px`, font-medium / font-semibold
- **Body Text**: `15px–18px`, font-normal (`#2c2e2a`)
- **Metadata & Subtext**: `13px–15px`, (`#80827f`)
- **Small Labels**: `11px–13px`, font-medium, uppercase tracking-wide

---

## 4. Spacing & Border Radius Tokens

### Spacing Grid (4px base)
`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`, `120px`

### Border Radius
- **Pill Navigation & Primary Buttons**: `50px` (`rounded-full`)
- **Editorial Cards & Containers**: `32px` (`rounded-3xl`)
- **Standard Cards & Modals**: `24px` (`rounded-2xl`)
- **Inputs & Dropdowns**: `14px` (`rounded-xl`)
- **Status Badges & Tags**: `8px–10px` (`rounded-lg`)

---

## 5. Semantic Status System

- **Success (`AVAILABLE`, `ACTIVE`, `PAID`, `REFUNDED`, `RETURNED`)**: Soft green background (`#e8f7df`), text `#2a6809`, indicator `#8ed462`.
- **Warning (`DUE SOON`, `PENDING`, `HELD`)**: Soft amber background (`#fef9d7`), text `#786000`, indicator `#f5e211`.
- **Critical (`OVERDUE`, `DAMAGED`, `UNAVAILABLE`, `FAILED`)**: Soft coral background (`#ffe8e5`), text `#9e1d0d`, indicator `#ff705d`.
- **Info (`UPCOMING`, `PROCESSING`)**: Soft sky background (`#e6f4ff`), text `#00509d`, indicator `#2ba0ff`.
