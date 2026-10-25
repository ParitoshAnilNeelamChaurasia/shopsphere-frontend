# ShopSphere Frontend

This is the frontend for the ShopSphere project.

## 1. Use the existing Vite React TypeScript project

You do NOT need to create a second React project. Copy the `src` folder from this package into your existing `shopsphere-frontend` folder, replacing its current demo `src` folder.

## 2. Install frontend packages

Run from the project root:

```powershell
npm install react-router-dom @reduxjs/toolkit react-redux axios react-hook-form recharts @stomp/stompjs
```

## 3. Environment file

Copy `.env.example` to `.env`.

For now keep:

```env
VITE_API_BASE_URL=http://localhost:9191/api
VITE_USE_MOCK_API=true
VITE_WS_URL=ws://localhost:8080/ws
```

The app uses mock data, so the backend is NOT required yet.

## 4. Start the app

```powershell
npm run dev
```

## 5. Demo login

Customer:
- Email: demo@shopsphere.com
- Password: any value

Admin:
- Email: admin@shopsphere.com
- Password: any value

## 6. Backend integration later

When the Spring Boot API Gateway and services are ready:

```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:9191/api
```

The frontend service layer and RTK Query API are intentionally structured around these API boundaries so we can connect the backend without rewriting the UI architecture.
