# RentIQ Requirements & Business Specification

## 1. Problem Statement & Scope
RentIQ is an operations platform and rental marketplace serving two distinct personas:
1. **Customer**: Searches inventory, selects rental periods, checks real-time availability, places orders with security deposit, selects delivery mode (Shipping vs Store Pickup), tracks active rentals, views invoices, and initiates returns.
2. **Operations Admin**: Manages catalog inventory, tracks active/overdue rentals, conducts return inspections (condition, damage, missing accessories), handles security deposit holds & refunds, collects late fees, manages user accounts, and reviews operational reports & maintenance records.

---

## 2. Complete Rental Lifecycle Business Rules

```text
Customer Login / Register
       ↓
Browse Catalog & Apply Filters
       ↓
Select Start Date & Return Date
       ↓
Real-Time Date Range Availability Check
       ↓
Add Product to Cart
       ↓
Checkout: Select Delivery Mode (Ship to Address OR Store Pickup)
       ↓
Pay Rental Cost + Security Deposit (Test Gateway)
       ↓
Rental Confirmation & Download Invoice PDF
       ↓
Active Rental Timeline (Booked -> Confirmed -> Picked Up / Shipped -> Active)
       ↓
Return Product
       ↓
Admin Return Inspection (Condition, Damage Notes, Missing Accessories Checklist)
       ↓
On-Time vs Overdue Late Fee Calculation
       ↓
Deposit Settlement (Refunded vs Deducted)
       ↓
Rental Complete & Inventory Stock Restored
```

---

## 3. Financial Rules

### Security Deposit
- Every rental product requires a defined security deposit.
- Security deposit is held upon checkout (`HELD` state).
- Upon return inspection, if product is undamaged and on-time, deposit is fully refunded (`REFUNDED`).
- If damaged or returned with missing accessories, deposit is partially or fully deducted (`PARTIALLY_DEDUCTED` / `FULLY_DEDUCTED`).

### Late Fees
- Late fee accrues when return date exceeds agreed return timestamp.
- Default late fee rate: standard daily rental rate + penalty (e.g. ₹500/day).
- Late fees are automatically calculated in the Return Inspection wizard and deducted from the held deposit.

---

## 4. Operational Requirements

### Admin Dashboard KPIs
- Active Rentals count
- Rentals Due Today
- Upcoming Pickups & Returns
- Overdue Rentals alert count
- Total Revenue (rental fees + late fees)
- Total Deposits currently held
- Late Fees collected

