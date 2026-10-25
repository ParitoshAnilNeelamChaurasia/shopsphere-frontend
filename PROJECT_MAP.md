# ShopSphere Frontend Project Map

## Beginner learning order

1. `src/main.tsx` — application entry point
2. `src/App.tsx` — providers and routing root
3. `src/routes/AppRoutes.tsx` — URL/page mapping and lazy loading
4. `src/layouts/StorefrontLayout.tsx` — shared storefront shell
5. `src/components/Header/Header.tsx` — reusable navigation component
6. `src/pages/HomePage.tsx` — first complete storefront page
7. `src/components/ProductCard/ProductCard.tsx` — reusable product UI + Redux action
8. `src/features/cart/cartSlice.ts` — Redux state
9. `src/services/productApi.ts` — RTK Query API boundary
10. `src/services/axiosBaseQuery.ts` — Axios integration boundary
11. `src/contexts/AuthContext.tsx` — Context API for authentication session
12. `src/contexts/ThemeContext.tsx` — Context API for theme
13. `src/hooks/` — custom hooks
14. `src/pages/CheckoutPage.tsx` — React Hook Form + validation
15. `src/pages/admin/` — protected role-based admin area
16. `src/services/websocket.ts` — STOMP/WebSocket integration boundary

## Backend integration principle

UI components do not call Spring Boot services directly. They use Redux/API/service boundaries. This means the backend can later change from mock data to the API Gateway without forcing every component to be rewritten.
