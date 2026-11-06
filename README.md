# TripMate — Urban Travel-Tech Application MVP

> **Tagline:** Plan smarter. Travel better. Spend wisely.

TripMate is a bold, sophisticated urban travel-tech platform designed for college students and budget-conscious travelers in India. Inspired by intercity transit challenges between university towns and hometowns (e.g., Mangaluru, Bengaluru, Mysuru, Mumbai, Pune), TripMate provides route search, side-by-side spec comparison, packing checklists, expense tracking, user authentication, and personalized student dashboards.

---

## 🎨 Official Brand Identity & Color Palette

TripMate features a complete urban brand redesign inspired by premium transport brands and automotive interfaces:

- **Charcoal Grey (`#2A2A2A`):** Navigation, footer, hero section, primary headings, dark surfaces.
- **Moonlit Silver (`#C0C0C0`):** Borders, secondary text, subtle dividers, neutral elements.
- **Signal Red (`#E10600`):** Primary CTA buttons, active route indicators, price highlights, key badges.
- **Soft White (`#F5F5F5`):** Main page background, card surfaces, content areas.

---

## 🌟 Application Features

1. **Brand Hero & Search Corridors (`/`):** Charcoal dark hero section, bold white typography, Signal Red CTAs, quick preset routes (*Mangaluru ➔ Bengaluru*, *Bengaluru ➔ Mysuru*, *Pune ➔ Mumbai*).
2. **Demo Authentication (`/login`, `/register`, `/forgot-password`):** Charcoal split-screen design, 1-click **"Demo Credentials"** button, Google sign-in simulation, password visibility toggle.
3. **Personal Student Dashboard (`/dashboard`) [Protected]:** Personal welcome greeting, saved route counts, scheduled itineraries, packing progress, and travel balance overview.
4. **Explore & Route Comparison (`/explore`):** 12 sample intercity journeys, multi-criteria filters (price slider, transport mode, amenities), and a side-by-side comparison matrix highlighting the **Cheapest** (Signal Red badge) and **Fastest** options.
5. **Journey Details (`/journey/[id]`):** Boarding & dropping timestamps, included amenities, student discount coupons (`STUDENT50`, `CAMPUS10`), and 1-click itinerary integration.
6. **My Trips & Checklist (`/my-trips`) [Protected]:** Saved journeys, scheduled trips, and a categorised packing list (*Documents, Electronics, Clothing, Essentials*) with a Signal Red completion progress bar.
7. **Travel Budget Planner (`/budget-planner`) [Protected]:** Set budget limits in INR (₹), log travel costs, view remaining balance, and inspect category expense distribution.
8. **User Profile (`/profile`) [Protected]:** Student avatar with initials, editable personal details, transport preferences, and local session logout.
9. **About (`/about`) & Help (`/help`) Pages:** Product mission, problem/solution breakdown, technical stack, expandable FAQ accordions, and student guides.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite (TypeScript)
- **Routing:** Client-Side `react-router-dom` with `ProtectedRoute` wrappers
- **Styling:** Tailwind CSS v4 with Charcoal (`#2A2A2A`), Signal Red (`#E10600`), Moonlit Silver (`#C0C0C0`), and Soft White (`#F5F5F5`)
- **Icons:** Lucide React
- **State Management:** React Context API (`AuthContext`, `TripsContext`, `BudgetContext`, `ToastContext`)
- **Data Persistence:** 100% Browser `LocalStorage`

---

## 🔒 Demo Authentication & Security Limitations

Authentication is managed client-side using React Context and LocalStorage (`tripmate_auth_user`, `tripmate_registered_users`). 
- Default Demo Account: `rahul.sharma@college.edu` / `student123`
- Unauthenticated access to protected routes redirects to `/login`.

---

## ⚡ Setup & Run Instructions

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```
