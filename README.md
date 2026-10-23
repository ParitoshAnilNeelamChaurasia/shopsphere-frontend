# ShopSphere — React Frontend

A portfolio-grade e-commerce frontend designed for the larger ShopSphere distributed e-commerce project.

## Current features

- Responsive storefront and mobile navigation
- Hero, categories, product catalog and product details
- Search, category filtering, sorting and pagination
- Wishlist and cart with local persistence
- Checkout form with validation using React Hook Form
- Mock authentication with customer/admin roles
- Protected customer and admin routes
- Admin dashboard, products, orders, inventory, users and analytics
- Recharts dashboards
- Dark mode using Context API
- Redux Toolkit state management
- RTK Query API layer
- Axios base query and HTTP client
- Debounced search hook
- Memoized ProductCard
- Error Boundary
- Suspense + lazy-loaded routes
- Image upload/preview dropzone
- Toast notifications
- Mock real-time order tracking
- STOMP/WebSocket-ready service for backend integration

## Main source structure

```text
src/
├── assets/
├── components/
│   ├── AdminHeader/
│   ├── AdminSidebar/
│   ├── CategoryStrip/
│   ├── Footer/
│   ├── Header/
│   ├── HeroSection/
│   ├── ImageDropzone/
│   ├── OrderTimeline/
│   ├── ProductCard/
│   ├── ProductGrid/
│   ├── ProtectedRoute/
│   ├── SearchBar/
│   └── UI/
├── contexts/
├── data/
├── features/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── productCatalog/
│   └── wishlist/
├── hooks/
├── layouts/
├── pages/
│   └── admin/
├── routes/
├── services/
├── store/
├── styles/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

## Installation

From the existing Vite project root:

```powershell
npm install react-router-dom @reduxjs/toolkit react-redux axios react-hook-form recharts @stomp/stompjs
```

## Environment

Create `.env` from `.env.example`.

Development:

```env
VITE_API_BASE_URL=http://localhost:9191/api
VITE_USE_MOCK_API=true
VITE_WS_URL=ws://localhost:8080/ws
```

Backend integration:

```env
VITE_API_BASE_URL=http://localhost:9191/api
VITE_USE_MOCK_API=false
VITE_WS_URL=ws://localhost:8080/ws
```

## Run

```powershell
npm run dev
```

## Build

```powershell
npm run build
```

## Demo accounts

Customer: `demo@shopsphere.com`

Admin: `admin@shopsphere.com`

Any password with at least 4 characters works in this frontend-only demo.
