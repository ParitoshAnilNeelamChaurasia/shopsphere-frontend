import { Link } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../features/orders/ordersApi';
import { formatCurrency, formatDate } from '../utils/format';
import { getStatusLabel } from '../utils/order';

export default function OrdersPage() {
  // Fetch the logged-in customer's orders from the Spring Boot backend.
  const {
    data: orders,
    isLoading,
    isError,
  } = useGetMyOrdersQuery();

  return (
    <div className="page-shell container">
      <div className="breadcrumb">Home / Orders</div>

      <div className="page-title-row">
        <div>
          <span className="eyebrow">Your purchase history</span>
          <h1>My orders</h1>
          <p>Track current deliveries and review past purchases.</p>
        </div>
      </div>

      {/* Show a loading message while the backend request is running. */}
      {isLoading && (
        <div className="orders-list">
          <p>Loading your orders...</p>
        </div>
      )}

      {/* Display an error instead of silently showing local Redux orders. */}
      {isError && (
        <div className="orders-list">
          <h2>Unable to load your orders</h2>
          <p>
            Please check your login and ensure the backend is running.
          </p>
          <p>
            The request to fetch your orders failed. Check the Network
            tab for its HTTP status.
          </p>
        </div>
      )}

      {/* Render only the orders returned by the backend. */}
      {!isLoading && !isError && orders && (
        <div className="orders-list">
          {orders.length === 0 ? (
            <div>
              <h2>No orders yet</h2>
              <p>Your orders will appear here after you place an order.</p>
              <Link className="text-link" to="/products">
                Continue shopping →
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <Link
                className="order-card"
                to={`/orders/${order.id}`}
                key={order.id}
              >
                <div className="order-card-top">
                  <div>
                    <span className="order-id">{order.id}</span>
                    <span>Placed {formatDate(order.createdAt)}</span>
                  </div>

                  <span
                    className={`status-pill status-${order.status.toLowerCase()}`}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                <div className="order-card-items">
                  {order.items.slice(0, 3).map((item, index) => (
                    <img
                      key={`${order.id}-${item.product.id}-${index}`}
                      src={item.product.image}
                      alt={item.product.name}
                    />
                  ))}

                  <div className="order-card-more">
                    {order.items.length} item
                    {order.items.length !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="order-card-bottom">
                  <div>
                    <span>Total</span>
                    <strong>{formatCurrency(order.total)}</strong>
                  </div>

                  <span className="text-link">View details →</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
