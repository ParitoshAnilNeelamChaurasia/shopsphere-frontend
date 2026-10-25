import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection/HeroSection';
import CategoryStrip from '../components/CategoryStrip/CategoryStrip';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import SectionHeader from '../components/UI/SectionHeader';
import { useGetProductsQuery } from '../services/productApi';

export default function HomePage() {
  const { data, isLoading } = useGetProductsQuery({ page: 1, pageSize: 8, sort: 'rating' });

  return (
    <>
      <HeroSection />
      <CategoryStrip />

      <section className="section container">
        <SectionHeader
          eyebrow="People are loving these"
          title="Trending right now"
          action={<Link className="text-link" to="/products?sort=rating">View all →</Link>}
        />
        <ProductGrid products={data?.content ?? []} loading={isLoading} />
      </section>

      <section className="feature-banner container">
        <div>
          <span className="eyebrow">ShopSphere promise</span>
          <h2>Everything you need. Nothing you don't.</h2>
          <p>Transparent pricing, thoughtful product discovery and a checkout flow designed to stay out of your way.</p>
        </div>
        <div className="feature-stats">
          <div><strong>120+</strong><span>Cities served</span></div>
          <div><strong>4.7/5</strong><span>Store rating</span></div>
          <div><strong>7 day</strong><span>Easy returns</span></div>
        </div>
      </section>

      <section className="section container newsletter">
        <div>
          <span className="eyebrow">The weekly edit</span>
          <h2>Get useful deals, not noisy emails.</h2>
          <p>One calm weekly roundup of new launches, practical buying guides and member-only offers.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()} className="newsletter-form">
          <input type="email" placeholder="you@example.com" aria-label="Email address" />
          <button className="button button-dark" type="submit">Join free</button>
        </form>
      </section>
    </>
  );
}
