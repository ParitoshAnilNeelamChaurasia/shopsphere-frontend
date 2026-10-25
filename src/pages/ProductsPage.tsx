import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { useGetProductsQuery } from '../services/productApi';
import { useDebounce } from '../hooks/useDebounce';

const categoryOptions = ['All', 'Electronics', 'Fashion', 'Home', 'Gaming', 'Beauty', 'Books'];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [category, setCategory] = useState(searchParams.get('category') ?? 'All');
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'featured');
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 1));
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setSearch(searchParams.get('search') ?? '');
    setCategory(searchParams.get('category') ?? 'All');
    setSort(searchParams.get('sort') ?? 'featured');
    setPage(Number(searchParams.get('page') ?? 1));
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, sort]);

  const query = useMemo(() => ({
    search: debouncedSearch,
    category: category === 'All' ? undefined : category,
    sort,
    page,
    pageSize: 8,
  }), [debouncedSearch, category, sort, page]);

  const { data, isLoading, isFetching } = useGetProductsQuery(query);

  const updateQuery = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'All' && value !== 'featured') next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setSearchParams(next);
  };

  return (
    <div className="page-shell container">
      <div className="breadcrumb">Home / Products</div>
      <div className="page-title-row">
        <div><span className="eyebrow">Curated catalog</span><h1>All products</h1><p>{data?.totalElements ?? 0} items ready to explore.</p></div>
        <div className="toolbar-sort">
          <label>Sort by <select value={sort} onChange={(event) => { setSort(event.target.value); updateQuery('sort', event.target.value); }}>
            <option value="featured">Featured</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select></label>
        </div>
      </div>

      <div className="catalog-layout">
        <aside className="filter-panel">
          <div className="filter-group">
            <h3>Search</h3>
            <div className="input-with-icon"><span>⌕</span><input value={search} onChange={(event) => { setSearch(event.target.value); updateQuery('search', event.target.value); }} placeholder="Search catalog" /></div>
          </div>
          <div className="filter-group">
            <h3>Category</h3>
            <div className="filter-options">
              {categoryOptions.map((option) => (
                <button key={option} className={category === option ? 'filter-option active' : 'filter-option'} onClick={() => { setCategory(option); updateQuery('category', option); }}>{option}</button>
              ))}
            </div>
          </div>
          <div className="filter-note"><strong>Mock API mode</strong><span>Products, search, filters and sorting are powered by the ShopSphere backend.</span></div>
        </aside>

        <section className="catalog-results">
          <div className="catalog-meta"><span>{isFetching ? 'Updating results…' : `Showing page ${data?.page ?? page} of ${data?.totalPages ?? 1}`}</span><span className="catalog-meta-dot" /> <span>Secure shopping</span></div>
          {!isLoading && data?.content.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">⌕</div><h2>No products found</h2><p>Try another search term or reset your filters.</p><button className="button button-dark" onClick={() => setSearchParams({})}>Reset filters</button></div>
          ) : <ProductGrid products={data?.content ?? []} loading={isLoading} />}

          <div className="pagination">
            <button className="page-button" disabled={(data?.page ?? page) <= 1} onClick={() => { const next = Math.max(1, (data?.page ?? page) - 1); setPage(next); updateQuery('page', String(next)); }}>←</button>
            {Array.from({ length: Math.min(data?.totalPages ?? 1, 5) }, (_, index) => index + 1).map((pageNumber) => (
              <button key={pageNumber} className={`page-button ${(data?.page ?? page) === pageNumber ? 'active' : ''}`} onClick={() => { setPage(pageNumber); updateQuery('page', String(pageNumber)); }}>{pageNumber}</button>
            ))}
            <button className="page-button" disabled={(data?.page ?? page) >= (data?.totalPages ?? 1)} onClick={() => { const next = Math.min(data?.totalPages ?? 1, (data?.page ?? page) + 1); setPage(next); updateQuery('page', String(next)); }}>→</button>
          </div>
        </section>
      </div>
    </div>
  );
}
