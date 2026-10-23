import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/models';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { useToast } from '../../contexts/ToastContext';

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

export default memo(function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const liked = useAppSelector((state) => state.wishlist.items.some((item) => item.id === product.id));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    showToast(`${product.name} added to cart.`);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`wishlist-button ${liked ? 'wishlist-active' : ''}`}
          onClick={() => dispatch(toggleWishlist(product))}
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          {liked ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-rating"><span>★</span> {product.rating} <small>({product.reviews.toLocaleString('en-IN')})</small></div>
        <div className="product-price-row">
          <strong>{formatPrice(product.price)}</strong>
          <del>{formatPrice(product.originalPrice)}</del>
          <span>{Math.round((1 - product.price / product.originalPrice) * 100)}% off</span>
        </div>
        <button className="button button-primary add-cart-button" onClick={handleAddToCart} disabled={product.stock === 0}>
          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
});
