import { useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../types/models';
import LoadingSkeleton from '../UI/LoadingSkeleton';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  const visibleProducts = useMemo(() => products, [products]);

  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 8 }).map((_, index) => <LoadingSkeleton key={index} />)}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
