import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SearchBarProps {
  compact?: boolean;
}

export default function SearchBar({ compact = false }: SearchBarProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') ?? '');

  useEffect(() => {
    setValue(searchParams.get('search') ?? '');
  }, [searchParams]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    navigate(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : '/products');
  };

  return (
    <form className={`search-bar ${compact ? 'search-bar-compact' : ''}`} onSubmit={submit}>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search products, brands and categories..."
        aria-label="Search products"
      />
      <button type="submit">Search</button>
    </form>
  );
}
