# RentIQ Database Specification & Schema Roadmap

## 1. Overview
This document specifies the MongoDB database collections, Mongoose data models, indexes, and relationships for the future Node.js + Express backend integration.

---

## 2. Collections & Schema Definitions

### 2.1 `users` Collection
Stores customer and admin account details.

```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "email": "String (unique, required)",
  "passwordHash": "String (required)",
  "phone": "String",
  "role": "Enum ['customer', 'admin']",
  "status": "Enum ['Active', 'Disabled']",
  "addresses": [
    {
      "street": "String",
      "city": "String",
      "state": "String",
      "zip": "String",
      "isDefault": "Boolean"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### 2.2 `products` Collection
Stores rental inventory equipment, specs, and tiered pricing.

```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "category": "Enum ['Cameras', 'Drones', 'Audio', 'Lighting', 'Mobility']",
  "brand": "String (required)",
  "manufacturer": "String",
  "color": "String",
  "size": "String",
  "shortDescription": "String",
  "fullDescription": "String",
  "images": ["String"],
  "pricing": {
    "hourly": "Number",
    "daily": "Number (required)",
    "weekly": "Number",
    "monthly": "Number"
  },
  "securityDeposit": "Number (required)",
  "inventory": {
    "totalStock": "Number (required)",
    "availableStock": "Number (required)"
  },
  "status": "Enum ['Available', 'Unavailable', 'Maintenance']",
  "createdAt": "Date"
}
```

### 2.3 `rentals` Collection
Tracks customer rental orders, active status, return deadlines, and deposit escrow.

```json
{
  "_id": "ObjectId",
  "rentalId": "String (unique, indexed)",
  "userId": "ObjectId (ref: User)",
  "productId": "ObjectId (ref: Product)",
  "startDate": "Date (required)",
  "endDate": "Date (required)",
  "deliveryMethod": "Enum ['Ship to Address', 'Store Pickup']",
  "shippingAddress": {
    "street": "String",
    "city": "String",
    "state": "String",
    "zip": "String"
  },
  "quantity": "Number",
  "financials": {
    "rentalFee": "Number",
    "securityDeposit": "Number",
    "totalAmount": "Number",
    "accruedLateFee": "Number"
  },
  "status": "Enum ['Booked', 'Confirmed', 'Active', 'Due Soon', 'Overdue', 'Returned', 'Cancelled']",
  "depositStatus": "Enum ['HELD', 'REFUNDED', 'PARTIALLY_DEDUCTED', 'FULLY_DEDUCTED']",
  "paymentStatus": "Enum ['PENDING', 'PAID', 'REFUNDED']",
  "createdAt": "Date"
}
```

### 2.4 `returns` Collection
Records return inspection findings, damage notes, missing accessories, and deposit settlement output.

```json
{
  "_id": "ObjectId",
  "rentalId": "ObjectId (ref: Rental)",
  "inspectionDate": "Date",
  "inspectorUserId": "ObjectId (ref: User)",
  "condition": "Enum ['Excellent', 'Good', 'Damaged', 'Severe Damage']",
  "damageNotes": "String",
  "missingAccessories": ["String"],
  "lateFee": "Number",
  "damageDeduction": "Number",
  "totalDeduction": "Number",
  "refundAmount": "Number"
}
```
