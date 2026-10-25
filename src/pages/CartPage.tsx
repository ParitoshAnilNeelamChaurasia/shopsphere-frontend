import { Link, useNavigate } from 'react-router-dom';
import QuantitySelector from '../components/UI/QuantitySelector';
import EmptyState from '../components/UI/EmptyState';
import { useAppDispatch } from '../store/hooks';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../features/cart/cartSlice';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/format';
import { useToast } from '../contexts/ToastContext';

export default function CartPage() {
  const { items, subtotal, shipping, discount, total } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  if (items.length === 0) {
    return <div className="page-shell container"><EmptyState icon="🛒" title="Your cart is waiting" message="Add something you love and it will appear here." action={<Link className="button button-dark" to="/products">Start shopping</Link>} /></div>;
  }

  return (
    <div className="page-shell container">
      <div className="breadcrumb">Home / Cart</div>
      <div className="page-title-row"><div><span className="eyebrow">Ready when you are</span><h1>Your cart</h1><p>{items.length} product types in your basket.</p></div></div>
      <div className="cart-layout">
        <section className="cart-items">
          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="cart-item-main">
                <span className="product-brand">{product.brand}</span>
                <Link to={`/products/${product.id}`} className="cart-item-name">{product.name}</Link>
                <small>In stock · Ships soon</small>
                <button className="remove-button" onClick={() => { dispatch(removeFromCart(product.id)); showToast('Item removed from cart.', 'info'); }}>Remove</button>
              </div>
              <div className="cart-item-control"><QuantitySelector value={quantity} onChange={(value) => value > quantity ? dispatch(increaseQuantity(product.id)) : dispatch(decreaseQuantity(product.id))} max={product.stock} /><strong>{formatCurrency(product.price * quantity)}</strong></div>
            </article>
          ))}
          <div className="cart-note"><strong>Shopping note</strong><span>Free shipping is automatically applied on eligible orders. We'll preserve your cart in this browser.</span></div>
        </section>
        <aside className="summary-card">
          <h2>Order summary</h2>
          <div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
          <div className="summary-row"><span>Shipping</span><strong>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</strong></div>
          {discount > 0 && <div className="summary-row discount-row"><span>Member-style demo discount</span><strong>-{formatCurrency(discount)}</strong></div>}
          <div className="summary-total"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
          <button className="button button-dark full-width" onClick={() => navigate('/checkout')}>Proceed to checkout</button>
          <Link className="continue-shopping" to="/products">← Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
