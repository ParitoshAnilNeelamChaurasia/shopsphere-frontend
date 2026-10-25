import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand footer-brand-link">
            <span className="brand-mark">S</span>
            <span><strong>ShopSphere</strong><small>commerce, reimagined</small></span>
          </Link>
          <p>A realistic e-commerce frontend built as a portfolio-grade distributed systems project.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/products">All products</Link>
          <Link to="/products?category=Electronics">Electronics</Link>
          <Link to="/products?category=Fashion">Fashion</Link>
          <Link to="/products?category=Gaming">Gaming</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/profile">Profile</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div>
          <h4>Project</h4>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://spring.io" target="_blank" rel="noreferrer">Backend docs</a>
          <span>Built with React + TypeScript</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ShopSphere</span>
        <span>Designed for learning modern frontend engineering</span>
      </div>
    </footer>
  );
}
