import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <span className="eyebrow">The new way to shop online</span>
        <h1>Find something <em>great.</em> Every time.</h1>
        <p>
          Discover useful tech, everyday essentials and little upgrades that make life better — all in one carefully designed shopping experience.
        </p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/products">Explore products</Link>
          <Link className="button button-light" to="/products?sort=price-low">See today's deals</Link>
        </div>
        <div className="hero-proof">
          <span>✓ Secure checkout</span>
          <span>✓ Fast delivery</span>
          <span>✓ Easy returns</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-card hero-card-main">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85"
            alt="Smartwatch product"
          />
          <div className="hero-card-caption">
            <span>Featured today</span>
            <strong>Pulse X1</strong>
            <small>From ₹4,999</small>
          </div>
        </div>
        <div className="floating-stat"><strong>4.8/5</strong><span>average rating</span></div>
        <div className="floating-delivery"><span>⌁</span><div><strong>Fast delivery</strong><small>Across 120+ cities</small></div></div>
      </div>
    </section>
  );
}
