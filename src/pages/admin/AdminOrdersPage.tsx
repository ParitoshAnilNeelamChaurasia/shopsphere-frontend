import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateOrderStatus } from '../../features/orders/ordersSlice';
import type { OrderStatus } from '../../types/models';
import { formatCurrency } from '../../utils/format';
import { useToast } from '../../contexts/ToastContext';

const statuses: OrderStatus[] = ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

export default function AdminOrdersPage() {
  const orders = useAppSelector((state) => state.orders.orders);
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  return <div><div className="admin-page-heading"><div><span className="eyebrow">Fulfilment queue</span><h2>Orders</h2><p>Move orders through their lifecycle and prepare for the Order Service.</p></div></div><div className="admin-card"><div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td>{order.address.fullName}<small>{order.address.city}</small></td><td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td><td>{formatCurrency(order.total)}</td><td><select value={order.status} onChange={(event) => { dispatch(updateOrderStatus({ id: order.id, status: event.target.value as OrderStatus })); showToast('Order status updated.'); }}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table></div></div></div>;
}
