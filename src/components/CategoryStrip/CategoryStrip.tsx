import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export default function CategoryStrip() {
  return (
    <section className="section container">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Browse by interest</span>
          <h2>Shop by category</h2>
        </div>
        <Link className="text-link" to="/products">Explore all →</Link>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="category-card"
            key={category.name}
          >
            <img src={category.image} alt={category.name} loading="lazy" />
            <div className="category-overlay" />
            <div className="category-content">
              <span className="category-icon">{category.icon}</span>
              <strong>{category.name}</strong>
              <span>{category.subtitle}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
