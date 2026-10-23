# ShopSphere frontend ↔ backend contract (planned)

The frontend currently uses mock data. When the Spring Boot services are ready, keep these endpoint shapes so the UI does not need a major rewrite.

## Gateway

Base URL:

```text
http://localhost:9191/api
```

## Auth Service

```text
POST /auth/register
POST /auth/login
POST /auth/refresh
GET  /users/me
PUT  /users/me
```

Expected login response:

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "customer-1",
    "name": "Demo Customer",
    "email": "demo@example.com",
    "role": "CUSTOMER"
  }
}
```

## Product Service

```text
GET    /products
GET    /products/{id}
POST   /products
PUT    /products/{id}
DELETE /products/{id}
```

Query parameters used by the frontend:

```text
search
category
sort
page
pageSize
```

Recommended paginated response:

```json
{
  "content": [],
  "totalElements": 120,
  "totalPages": 15,
  "page": 1,
  "pageSize": 8
}
```

## Order Service

```text
POST /orders
GET  /orders
GET  /orders/{id}
POST /orders/{id}/cancel
```

## Inventory Service

```text
GET  /inventory
POST /inventory/{productId}/reserve
POST /inventory/{productId}/release
```

## Payment Service

```text
POST /payments
GET  /payments/{id}
POST /payments/{id}/refund
```

## WebSocket

Planned STOMP topic:

```text
/topic/orders/{orderId}
```

Message example:

```json
{
  "orderId": "SS-1001",
  "status": "SHIPPED",
  "timestamp": "2026-09-19T12:00:00Z"
}
```

This is the reason the frontend keeps the API, state management and WebSocket code separate from UI components.
