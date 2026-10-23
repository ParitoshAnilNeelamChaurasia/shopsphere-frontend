import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import EmptyState from '../components/UI/EmptyState';
import { useAppSelector } from '../store/hooks';

export default function WishlistPage() {
  const products = useAppSelector((state) => state.wishlist.items);
  return <div className="page-shell container"><div className="breadcrumb">Home / Wishlist</div><div className="page-title-row"><div><span className="eyebrow">Save for later</span><h1>Your wishlist</h1><p>{products.length} items saved.</p></div></div>{products.length ? <ProductGrid products={products} /> : <EmptyState icon="♡" title="Your wishlist is empty" message="Tap the heart on any product to save it here." action={<Link className="button button-dark" to="/products">Discover products</Link>} />}</div>;
}
