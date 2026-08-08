# RentIQ REST API Specification

Base URL: `http://localhost:5000/api` (configurable via `VITE_API_URL`)

---

## 1. Authentication Endpoints

### `POST /api/auth/login`
**Request Body**:
```json
{
  "email": "customer@rentiq.com",
  "password": "password123"
}
```
**Response (200 OK)**:
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": "u1",
    "name": "Alex Johnson",
    "email": "customer@rentiq.com",
    "role": "customer"
  }
}
```

---

## 2. Product Endpoints

### `GET /api/products`
Query parameters: `category`, `brand`, `search`, `minPrice`, `maxPrice`, `available`

### `GET /api/products/:id`
Retrieves product details including specs (brand, manufacturer, color, size), rates, deposit, and stock count.

### `POST /api/products` (Admin Only)
Creates a new rental inventory item.

### `PUT /api/products/:id` (Admin Only)
Updates product details or availability status.

---

## 3. Rental Endpoints

### `POST /api/rentals/check-availability`
**Request**:
```json
{
  "productId": "p1",
  "startDate": "2026-08-10",
  "endDate": "2026-08-15"
}
```
**Response**:
```json
{
  "available": true,
  "remainingStock": 4
}
```

### `POST /api/rentals`
Creates a rental order, records payment and security deposit hold.

### `GET /api/rentals/my-rentals`
Retrieves authenticated customer's rental history.

---

## 4. Return Inspection & Financial Endpoints

### `POST /api/returns/process` (Admin Only)
Processes return inspection, calculates late fee, updates deposit status (`REFUNDED` vs `PARTIALLY_DEDUCTED`), and restores inventory.

### `GET /api/admin/dashboard` (Admin Only)
Returns operational KPIs, revenue charts, rental breakdown, deposit ledger, and late fee totals.
