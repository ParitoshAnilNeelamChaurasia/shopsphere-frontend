import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useCart } from '../../hooks/useCart';
import { useAppSelector } from '../../store/hooks';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { itemCount } = useCart();
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useTheme();
  const navigate = useNavigate();

  const accountLabel = user ? user.name.split(' ')[0] : 'Account';

  return (
    <header className="site-header">
      <div className="announcement">Free shipping on orders over ₹4,999 · Easy 7-day returns</div>

      <div className="header-main container">
        <button
          className="mobile-menu-button icon-button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark">S</span>
          <span>
            <strong>ShopSphere</strong>
            <small>commerce, reimagined</small>
          </span>
        </Link>

        <div className="header-search">
          <SearchBar />
        </div>

        <div className="header-actions">
          <button className="header-action" onClick={toggleMode} title="Toggle theme">
            <span>{mode === 'light' ? '☾' : '☀'}</span>
            <small>{mode === 'light' ? 'Dark' : 'Light'}</small>
          </button>

          <Link to="/wishlist" className="header-action badge-button" title="Wishlist">
            <span>♡</span>
            {wishlistCount > 0 && <b>{wishlistCount}</b>}
            <small>Wish</small>
          </Link>

          <Link to="/cart" className="header-action badge-button" title="Cart">
            <span>🛒</span>
            {itemCount > 0 && <b>{itemCount}</b>}
            <small>Cart</small>
          </Link>

          <div className="account-wrap">
            <button className="header-action" onClick={() => setAccountOpen((open) => !open)}>
              <span>◉</span>
              <small>{accountLabel}</small>
            </button>
            {accountOpen && (
              <div className="account-menu">
                {user ? (
                  <>
                    <div className="account-summary">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                    <button onClick={() => { navigate('/profile'); setAccountOpen(false); }}>Profile</button>
                    <button onClick={() => { navigate('/orders'); setAccountOpen(false); }}>My Orders</button>
                    {user.role === 'ADMIN' && (
                      <button onClick={() => { navigate('/admin'); setAccountOpen(false); }}>Admin Console</button>
                    )}
                    <button className="danger-text" onClick={() => { logout(); setAccountOpen(false); navigate('/'); }}>Sign out</button>
                  </>
                ) : (
                  <>
                    <div className="account-summary">
                      <strong>Welcome to ShopSphere</strong>
                      <span>Sign in for a faster checkout</span>
                    </div>
                    <button onClick={() => { navigate('/login'); setAccountOpen(false); }}>Sign in</button>
                    <button onClick={() => { navigate('/register'); setAccountOpen(false); }}>Create account</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className={`category-nav ${mobileOpen ? 'category-nav-open' : ''}`}>
        <div className="container category-nav-inner">
          <NavLink to="/products" onClick={() => setMobileOpen(false)}>All Products</NavLink>
          <NavLink to="/products?category=Electronics" onClick={() => setMobileOpen(false)}>Electronics</NavLink>
          <NavLink to="/products?category=Fashion" onClick={() => setMobileOpen(false)}>Fashion</NavLink>
          <NavLink to="/products?category=Home" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/products?category=Gaming" onClick={() => setMobileOpen(false)}>Gaming</NavLink>
          <NavLink to="/products?category=Beauty" onClick={() => setMobileOpen(false)}>Beauty</NavLink>
          <NavLink to="/products?category=Books" onClick={() => setMobileOpen(false)}>Books</NavLink>
          <NavLink className="sale-link" to="/products?sort=price-low" onClick={() => setMobileOpen(false)}>Deals</NavLink>
        </div>
      </nav>
    </header>
  );
}
