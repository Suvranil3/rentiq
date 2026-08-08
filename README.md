# RentIQ — Rental Management & Operations Platform

RentIQ is a complete operations platform and rental marketplace featuring a warm visual design, modern SaaS dashboard capabilities, real-time date availability checking, security deposit escrow tracking, return inspection workflows, and a vast equipment catalog.

---

## ✨ Features & Capabilities

* **Vast Equipment Catalog (220+ Unique Items)**: Curated products across 14 distinct categories (Cinema Cameras, Mirrorless, Lenses, Gimbals, Studio Audio, Recorders, Lighting, Drones, Workstations, Monitors, VR/Action Cams, Support, Power Stations, Electric Mobility).
* **Inventory Stock Retention & Zero-Stock Management**: Products are never removed from the database or site when inventory depletes; fully rented items dynamically show `All Distributed (0 Available)` across Customer and Admin views while preventing overbooking.
* **30 Seeded Customer Profiles & Operational Data**: 41 active/returned/overdue rental orders, 91 payment records (fees, escrow holds, deposit refunds), and return inspection reports.
* **Admin Operations Portal**: Complete dashboard for equipment inventory management, order tracking, returns processing, user account directory, and financial reporting.
* **Real-time Availability & Escrow Lock**: Automated date range collision checks, daily/weekly/monthly rate calculations, and deposit hold/refund lifecycle tracking.

---

## 📁 Repository Structure

```text
rentiq/
├── docs/                      # System Architecture & API Specifications
│   ├── DESIGN.md              # Tailwind v4 Design Tokens & Typography Scale
│   ├── REQUIREMENTS.md        # Core Problem Statement & Business Rules
│   ├── ARCHITECTURE.md        # System Architecture & Component Hierarchy
│   ├── API.md                 # REST API Specifications
│   ├── DATABASE.md            # MongoDB Collections & Mongoose Schemas
│   └── WORKFLOW.md            # Operational & Customer Journey Flows
│
├── frontend/                  # React + Vite + Tailwind CSS v4 Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI, Table, Badge, & Layout Components
│   │   ├── context/           # Auth, Cart, & Toast Context Providers
│   │   ├── pages/             # Public, Auth, Customer, & Admin Views
│   │   └── services/          # API Services communicating with Backend
│   ├── package.json
│   └── vite.config.js
│
└── backend/                   # Node.js + Express API Backend
    ├── config/                # Database connection configuration
    ├── models/                # Mongoose Schema Definitions (User, Product, Rental, Payment)
    ├── routes/                # REST endpoints
    ├── scripts/               # Seed & Admin scripts (seed.js, productData.js, createAdmin.js)
    └── utils/                 # Shared store fallbacks & helper utilities
```

---

## ⚡ Tech Stack

* **Frontend**: React 18, Vite, Tailwind CSS v4, React Router DOM v6, Recharts, Lucide Icons, Axios.
* **Backend**: Node.js, Express, Mongoose (MongoDB ORM), JWT (Authentication), bcryptjs (Password Hashing).
* **Database**: MongoDB Atlas (Cloud Database).

---

## 🚀 Quick Start

### 1. Database & Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```text
   PORT=3001
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Seed the database with 220+ products, 30 customer users, and rental orders:
   ```bash
   npm run seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Configuration
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite local server:
   ```bash
   npm run dev
   ```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 🔑 Seeded Demo Credentials

| User Role | Email | Password |
| :--- | :--- | :--- |
| **Operations Admin** | `admin@rentiq.com` | `admin123` |
| **Demo Customer 1** | `alex@example.com` | `customer123` |
| **Demo Customer 2** | `priya@example.com` | `customer123` |
| **Demo Customer 3** | `rohan@example.com` | `customer123` |
| *(30 Customers Total)* | `user@example.com` | `customer123` |

---

## 🛡️ Creating & Assigning Admin Accounts

RentIQ provides three flexible methods to create and assign Admin role access:

### Method 1: Terminal / CLI Command (Command Line)
Execute the `create-admin` command inside the `backend/` directory:

```bash
cd backend
npm run create-admin -- --name "Operations Lead" --email "admin@example.com" --password "adminpass123"
```

*Note: If an account with the provided email already exists as a customer, this CLI command automatically **promotes** the existing user to `admin` role in MongoDB Atlas.*

---

### Method 2: Web Admin Portal UI
1. Log in to the application as an existing Admin (`admin@rentiq.com` / `admin123`).
2. Navigate to **Admin Navigation → User Administration** (`/admin/users`).
3. Click the **`+ Add Admin Account`** button at the top right.
4. Fill in the Name, Email, and Password in the modal form and click **Create Admin Account**.
5. Alternatively, click the **Make Admin** button next to any registered customer in the user table to instantly elevate their role to Admin.

---

### Method 3: Automated Database Seeding
Running `npm run seed` inside `backend/` automatically seeds the default administrator account:
- **Email**: `admin@rentiq.com`
- **Password**: `admin123`
- **Role**: `admin`
