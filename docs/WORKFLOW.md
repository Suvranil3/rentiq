# RentIQ Developer & Operational Workflow Guide

## 1. End-to-End Customer Rental Journey

```text
Customer Portal
       ↓
Browse Catalog (/products) -> Search & Filter by Brand/Price
       ↓
Select Product Details (/products/:id) -> Choose Start & Return Dates
       ↓
Real-Time Availability Validation (checkAvailability API)
       ↓
Add to Cart (/cart) -> Review Rental Fee + Security Deposit Hold
       ↓
Checkout (/checkout) -> Select "Ship to Address" OR "Collect from Store"
       ↓
Pay Rental Amount + Deposit Escrow (Sandbox Payment Simulator)
       ↓
Rental Confirmation (/rental-confirmation/:id) -> Download PDF Tax Invoice
       ↓
Track Active Rental (/my-rentals/:id) -> View Visual Timeline Tracker
       ↓
Return Product -> Admin Inspection -> Deposit Refund / Late Fee Settlement
```

---

## 2. Admin Operations Workflow

```text
Operations Admin Sign-In (/login demo switcher)
       ↓
Operations Dashboard (/admin/dashboard) -> Monitor 8 KPI Cards & Recharts Revenue
       ↓
Inventory Management (/admin/products) -> Create / Edit Rental Equipment & Tier Rates
       ↓
Rental Directory (/admin/rentals) -> Filter Active, Due Today, & Overdue Orders
       ↓
Return Inspection Wizard (/admin/returns)
  • Select Active Rental
  • Select Equipment Condition (Excellent, Good, Damaged, Severe)
  • Checklist Missing Accessories (Charger, Battery, Case, Cable)
  • Auto-Calculate Overdue Late Fee + Damage Deductions
  • Confirm Return & Disburse Refund -> Restores Inventory Stock Count
       ↓
Financial Ledger (/admin/payments) -> Audit Payments & Deposit Escrow
       ↓
AI Insights (/admin/ai-insights) -> Inspect Demand Surges & Fleet Maintenance Risks
```
