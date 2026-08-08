# RentIQ — Rental Management & Operations Platform

RentIQ is a complete operations platform and rental marketplace featuring a warm visual design, modern SaaS dashboard capabilities, real-time date availability checking, security deposit escrow tracking, and return inspection workflows.

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
│   │   ├── components/        # Reusable UI & Layout Components
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
    └── scripts/               # Seed script for MongoDB Atlas
```

---

## ⚡ Tech Stack

*   **Frontend**: React 18, Vite, Tailwind CSS v4, React Router DOM v6, Recharts, Lucide Icons, Axios.
*   **Backend**: Node.js, Express, Mongoose (MongoDB ORM), JWT (Authentication), bcryptjs (Password Hashing).
*   **Database**: MongoDB Atlas (Cloud Database).

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
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Seed the database with sample inventory and user records:
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
| **Demo Customer** | `alex@example.com` | `customer123` |
