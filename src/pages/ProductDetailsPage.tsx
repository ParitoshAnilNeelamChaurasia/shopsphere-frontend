import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../services/productApi';
import { useAppDispatch } from '../store/hooks';
import { addQuantity } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import QuantitySelector from '../components/UI/QuantitySelector';
import RatingStars from '../components/UI/RatingStars';
import { useToast } from '../contexts/ToastContext';
import { formatCurrency } from '../utils/format';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, isLoading } = useGetProductQuery(productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const discount = useMemo(() => product ? Math.round((1 - product.price / product.originalPrice) * 100) : 0, [product]);

  if (isLoading) return <div className="page-shell container"><div className="loading-card">Loading product…</div></div>;
  if (!product) return <div className="page-shell container centered-page"><div className="empty-state"><div className="empty-icon">?</div><h2>Product not found</h2><p>The product may have been removed from the catalog.</p><Link className="button button-dark" to="/products">Back to products</Link></div></div>;

  const add = () => { dispatch(addQuantity({ product, quantity })); showToast(`${quantity} × ${product.name} added to cart.`); };

  return (
    <div className="page-shell container">
      <div className="breadcrumb">Home / {product.category} / {product.name}</div>
      <section className="product-detail">
        <div className="product-gallery">
          <div className="thumbnail-column">{product.images.map((image, index) => <button key={image} className={selectedImage === index ? 'thumbnail active' : 'thumbnail'} onClick={() => setSelectedImage(index)}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div>
          <div className="main-product-image"><img src={product.images[selectedImage] ?? product.image} alt={product.name} /></div>
        </div>
        <div className="product-detail-copy">
          <span className="eyebrow">{product.brand} · {product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating"><RatingStars rating={product.rating} /> <strong>{product.rating}</strong> <span>{product.reviews.toLocaleString('en-IN')} reviews</span></div>
          <div className="detail-price"><strong>{formatCurrency(product.price)}</strong><del>{formatCurrency(product.originalPrice)}</del><span>{discount}% OFF</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="delivery-card"><span>⌁</span><div><strong>Fast delivery</strong><small>Enter your address at checkout to confirm the exact delivery date.</small></div></div>
          <div className="stock-line"><span className="stock-dot" /> {product.stock} units available</div>
          <div className="purchase-row"><QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} /><button className="button button-dark" onClick={() => { add(); }}>Add to cart</button><button className="button button-light" onClick={() => { add(); navigate('/cart'); }}>Buy now</button></div>
          <button className="wishlist-text" onClick={() => { dispatch(toggleWishlist(product)); showToast('Wishlist updated.', 'info'); }}>♡ Add to wishlist</button>
        </div>
      </section>

      <section className="detail-lower">
        <div className="detail-description-card"><span className="eyebrow">Product story</span><h2>Made to fit your everyday</h2><p>{product.description} ShopSphere product pages are intentionally detailed so a future Product Service can provide the same clean contract to the React frontend.</p></div>
        <div className="spec-card"><span className="eyebrow">Specifications</span>{Object.entries(product.specifications).map(([key, value]) => <div className="spec-row" key={key}><span>{key}</span><strong>{value}</strong></div>)}</div>
      </section>
    </div>
  );
}
