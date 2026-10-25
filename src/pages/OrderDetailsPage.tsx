import { Link, useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../features/orders/ordersApi';
import OrderTimeline from '../components/OrderTimeline/OrderTimeline';
import { useOrderTracking } from '../hooks/useOrderTracking';
import { formatCurrency, formatDate } from '../utils/format';
import { getStatusLabel } from '../utils/order';

export default function OrderDetailsPage() {
  const { orderId } = useParams();

  // Fetch the selected order from the backend using its ID.
  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId ?? '', {
    skip: !orderId,
  });

  // Preserve the existing order-tracking functionality.
  const liveStatus = useOrderTracking(
    order?.id ?? '',
    order?.status ?? 'CREATED'
  );

  if (isLoading) {
    return (
      <div className="page-shell container">
        <div className="loading-card">Loading order details...</div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="page-shell container centered-page">
        <div className="empty-state">
          <div className="empty-icon">?</div>
          <h2>Unable to load this order</h2>
          <p>
            The order could not be found or the request failed.
            Please check your login and try again.
          </p>
          <Link className="button button-dark" to="/orders">
            Back to orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell container">
      <div className="breadcrumb">Home / Orders / {order.id}</div>

      <div className="detail-order-header">
        <div>
          <span className="eyebrow">
            Order placed {formatDate(order.createdAt)}
          </span>
          <h1>{order.id}</h1>
          <p>{getStatusLabel(liveStatus)}</p>
        </div>

        <Link className="button button-light" to="/orders">
          ← All orders
        </Link>
      </div>

      <section className="tracking-card">
        <div className="tracking-card-header">
          <div>
            <span className="eyebrow">Order tracking</span>
            <h2>Your package status</h2>
          </div>

          <span className="live-dot">
            <i /> LIVE
          </span>
        </div>

        <OrderTimeline status={liveStatus} />
      </section>

      <div className="order-details-grid">
        <section className="checkout-card">
          <div className="checkout-card-heading">
            <span>01</span>
            <div>
              <h2>Items</h2>
              <p>
                {order.items.length} product
                {order.items.length !== 1 ? ' types' : ' type'}
              </p>
            </div>
          </div>

          {order.items.map((item, index) => (
            <div
              className="detail-order-item"
              key={`${order.id}-${item.product.id}-${index}`}
            >
              <img src={item.product.image} alt={item.product.name} />

              <div>
                <strong>{item.product.name}</strong>
                <span>
                  {item.product.brand} · Qty {item.quantity}
                </span>
              </div>

              <b>{formatCurrency(item.price)}</b>
            </div>
          ))}
        </section>

        <div>
          <section className="checkout-card">
            <div className="checkout-card-heading">
              <span>02</span>
              <div>
                <h2>Delivery</h2>
                <p>{order.address.fullName}</p>
              </div>
            </div>

            <div className="address-block">
              <strong>{order.address.fullName}</strong>
              <span>{order.address.line1}</span>
              <span>
                {order.address.city}, {order.address.state}{' '}
                {order.address.postalCode}
              </span>
              <span>Phone: {order.address.phone}</span>
            </div>
          </section>

          <section className="summary-card compact-summary">
            <h2>Payment summary</h2>

            <div className="summary-row">
              <span>Payment method</span>
              <strong>{order.paymentMethod}</strong>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatCurrency(order.subtotal)}</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <strong>
                {order.shipping === 0
                  ? 'FREE'
                  : formatCurrency(order.shipping)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Discount</span>
              <strong className="discount-value">
                {order.discount > 0
                  ? `−${formatCurrency(order.discount)}`
                  : formatCurrency(0)}
              </strong>
            </div>

            <div className="summary-total">
              <span>Order total</span>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
