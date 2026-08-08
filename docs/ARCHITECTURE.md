# RentIQ Technical Architecture Specification

## 1. System Overview

```text
┌──────────────────────────────────────────────────────────┐
│                   React Single Page App                  │
├────────────────────────────┬─────────────────────────────┤
│ Floating Navbar & Footer   │ Admin Operations Sidebar    │
│ Customer Portal Routes     │ Admin Suite Routes          │
├────────────────────────────┴─────────────────────────────┤
│ React Contexts (AuthContext, CartContext, ToastContext)  │
├──────────────────────────────────────────────────────────┤
│ Axios API Client Layer (`src/api/api.js`)                 │
├──────────────────────────────────────────────────────────┤
│ Mock Data Fallback Engine (`src/api/mockData.js`)        │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack & Dependencies

- **Framework**: React 18 / Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@theme`)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Analytics Charts**: Recharts
- **Icons**: Lucide React

---

## 3. Directory Structure

```text
src/
├── api/
│   ├── api.js                # Axios client with base URL & mock fallback
│   └── mockData.js           # Comprehensive seed & local storage state engine
├── components/
│   ├── ui/                   # Reusable atomic UI (Button, Card, Input, Badge, Modal, Table, InvoiceModal)
│   ├── layout/               # App scaffolding (FloatingNavbar, Footer, AdminSidebar, ProtectedRoute)
│   ├── products/             # Catalog widgets (ProductCard, ProductFilters)
│   ├── rentals/              # Rental widgets (RentalTimeline)
│   └── dashboard/            # Admin widgets (StatCard)
├── context/
│   ├── AuthContext.jsx       # User auth state, role checks, demo quick login
│   ├── CartContext.jsx       # Rental cart state, date calculations, deposits
│   └── ToastContext.jsx      # Global toast notifications manager
├── pages/
│   ├── public/               # Home, Products, ProductDetails
│   ├── auth/                 # Login, Register
│   ├── customer/             # Cart, Checkout, Confirmation, MyRentals, RentalDetails, Profile
│   └── admin/                # Dashboard, Products, ProductForm, Rentals, RentalDetails, Returns, Payments, Users, Pricelists, AIInsights
├── App.jsx                   # Router configuration & context providers
└── index.css                 # Tailwind v4 design system tokens
```

---

## 4. State & Authentication Architecture

- **AuthContext**: Holds `user` object (`role`: `'customer'` | `'admin'`), JWT token string, and `login`, `logout`, `register` methods.
- **ProtectedRoute**: Checks user role before granting access to `/admin/*` or `/my-rentals/*`.
- **CartContext**: Persists items, selected rental start & end dates, calculates rental subtotal, security deposit total, and final order total.
