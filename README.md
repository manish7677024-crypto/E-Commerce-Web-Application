# ⚡ ShopWave — E-Commerce Web App

A full-stack-style online store demo built with **React**. ShopWave includes a product
catalog, shopping cart, multi-step checkout, order history, role-based admin tools,
a customer feedback system, and an animated lightning-storm background.

> This repo currently ships as a **single-file frontend prototype** (`src/App.jsx`)
> using mock in-memory data. It's designed as a learning project / UI reference that
> can be wired up to a real backend (Node/Express + MongoDB, PostgreSQL, etc.).

---

## ✨ Features

### 🛍️ Customer
- Product catalog (30 products) with search & category filters
- Add to cart, update quantities, remove items, clear cart
- 3-step checkout flow (Shipping → Payment → Review)
- Order history with live status badges
- Submit feedback / ratings

### 🛠️ Admin
- Dashboard with revenue, order, and stock stats
- Full product CRUD (add / edit / delete)
- Order management with status updates
- View all customer feedback + average rating

### 🔐 Auth
- Simple role-based login (Admin / User) — demo accounts below

### 🎨 UI
- Dark cyberpunk theme (cyan/purple accents)
- Animated night-sky background: drifting auroras, nebula clouds,
  twinkling stars, shooting stars, a glowing moon, and branching
  sky-blue lightning inside storm clouds
- Smooth micro-animations across cards, buttons, modals, and toasts

---

## 🔑 Demo Accounts

| Role  | Username | Password   |
|-------|----------|------------|
| Admin | `admin`  | `admin123` |
| User  | `user`   | `user123`  |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/shopwave.git
cd shopwave

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
shopwave/
├── index.html
├── package.json
├── vite.config.js
├── public/
└── src/
    ├── main.jsx      # React entry point
    └── App.jsx       # Entire application (components, styles, mock data)
```

---

## 🧱 Tech Stack

- **React 18** (functional components, hooks, reducer for cart state)
- **Vite** for dev/build tooling
- Inline CSS-in-JS (no external UI library)
- Mock data only — no backend required to run

---

## 🔌 Connecting a Real Backend

This frontend is structured so each data domain can be swapped for real API calls:

| Mock Data            | Suggested Endpoint                  |
|-----------------------|--------------------------------------|
| `INITIAL_PRODUCTS`     | `GET/POST/PUT/DELETE /api/products`  |
| `INITIAL_ORDERS`       | `GET/POST /api/orders`, `PATCH /api/orders/:id` |
| `USERS` (login)        | `POST /api/auth/login` (JWT)         |
| `feedbacks` state      | `GET/POST /api/feedback`             |

Recommended stack: **Node.js + Express**, **MongoDB / PostgreSQL**, **JWT auth**,
hosted on **Railway / Render / Supabase** with the frontend on **Vercel / Netlify**.

---

## 📜 License

MIT — free to use for learning and personal projects.
