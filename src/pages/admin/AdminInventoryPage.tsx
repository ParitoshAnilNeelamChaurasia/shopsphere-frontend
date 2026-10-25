import { useAppSelector } from '../../store/hooks';

export default function AdminInventoryPage() {
  const products = useAppSelector((state) => state.productCatalog.products);
  const sorted = [...products].sort((a, b) => a.stock - b.stock);
  return <div><div className="admin-page-heading"><div><span className="eyebrow">Stock control</span><h2>Inventory</h2><p>Watch stock levels before the Inventory Service is connected.</p></div></div><div className="inventory-grid">{sorted.map((product) => <div className="inventory-card" key={product.id}><img src={product.image} alt={product.name} /><div><span>{product.category}</span><h3>{product.name}</h3><div className="inventory-bar"><i style={{ width: `${Math.min(100, product.stock)}%` }} /></div><div className="inventory-meta"><strong>{product.stock} units</strong><span>{product.stock < 15 ? 'Low stock' : 'Healthy'}</span></div></div></div>)}</div></div>;
}
