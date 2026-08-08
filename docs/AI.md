# RentIQ AI & Machine Learning Architecture Roadmap

## 1. Overview
RentIQ incorporates two primary operational AI capabilities:
1. **Demand Forecasting**: Predicts product demand surges (e.g. weekend film shoot peaks) and alerts operations managers to stock deficits before they happen.
2. **Predictive Maintenance & Fleet Health**: Monitors equipment usage hours, rental counts, and past damage history to score unit maintenance risk (0–100%) and flag units for inspection before re-renting.

---

## 2. Future Microservice Architecture

```text
┌────────────────────────┐
│  React Admin Suite     │
└───────────┬────────────┘
            │ REST API
┌───────────▼────────────┐
│  Node.js + Express     │
└───────────┬────────────┘
            │ HTTP / gRPC
┌───────────▼────────────┐
│  FastAPI (Python ML)   │
│  - Demand Forecasting  │
│  - Predictive Health   │
└────────────────────────┘
```

---

## 3. Data Inputs & Predictive Models

### 3.1 Demand Forecasting Model
- **Features**: Historical rental bookings, day of week, seasonal event tags, regional category popularity.
- **Output**: `predictedDemand` (integer count), `riskLevel` (`OPTIMAL` | `HIGH` | `CRITICAL`), `recommendation` string.

### 3.2 Predictive Maintenance Model
- **Features**: Unit operating hours, rental cycle count, historic damage logs, days since last overhaul.
- **Output**: `maintenanceRisk` (percentage 0–100), `inspectionRequired` (boolean), `recommendation` string.

---

## 4. Mock Integration Guarantee
During the current frontend stage, all AI analytics rendered in `/admin/ai-insights` use clearly structured demo data provided by `frontend/src/services/mock/mockData.js`. The UI architecture guarantees that when the FastAPI microservice is deployed, `adminService.getAIInsights()` can be pointed to the live endpoint without modifying React page components.
