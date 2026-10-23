import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addProduct, deleteProduct, updateProduct } from '../../features/productCatalog/productCatalogSlice';
import type { Product, ProductCategory } from '../../types/models';
import Modal from '../../components/UI/Modal';
import ImageDropzone from '../../components/ImageDropzone/ImageDropzone';
import { formatCurrency } from '../../utils/format';
import { useToast } from '../../contexts/ToastContext';

const categories: ProductCategory[] = ['Electronics', 'Fashion', 'Home', 'Gaming', 'Beauty', 'Books'];

type ProductFormState = Pick<Product, 'name' | 'brand' | 'category' | 'price' | 'originalPrice' | 'stock' | 'image' | 'description'>;

const emptyForm: ProductFormState = { name: '', brand: '', category: 'Electronics', price: 0, originalPrice: 0, stock: 10, image: '', description: '' };

export default function AdminProductsPage() {
  const products = useAppSelector((state) => state.productCatalog.products);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const filtered = useMemo(() => products.filter((product) => `${product.name} ${product.brand}`.toLowerCase().includes(query.toLowerCase())), [products, query]);

  const startCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const startEdit = (product: Product) => { setEditing(product); setForm({ name: product.name, brand: product.brand, category: product.category, price: product.price, originalPrice: product.originalPrice, stock: product.stock, image: product.image, description: product.description }); setOpen(true); };

  const save = () => {
    if (!form.name || !form.brand || !form.price || !form.image) { showToast('Name, brand, price and image are required.', 'error'); return; }
    const product: Product = { ...form, id: editing?.id ?? Date.now(), slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), rating: editing?.rating ?? 4.5, reviews: editing?.reviews ?? 0, images: [form.image], specifications: editing?.specifications ?? {}, badge: editing?.badge };
    dispatch(editing ? updateProduct(product) : addProduct(product));
    setOpen(false);
    showToast(editing ? 'Product updated.' : 'Product created.');
  };

  return <div><div className="admin-page-heading"><div><span className="eyebrow">Catalog management</span><h2>Products</h2><p>Create, edit and remove products in the local demo catalog.</p></div><button className="button button-dark" onClick={startCreate}>＋ Add product</button></div><div className="admin-card"><div className="admin-toolbar"><div className="input-with-icon"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" /></div><span>{filtered.length} products</span></div><div className="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr></thead><tbody>{filtered.map((product) => <tr key={product.id}><td><div className="table-product"><img src={product.image} alt="" /><div><strong>{product.name}</strong><small>{product.brand}</small></div></div></td><td>{product.category}</td><td>{formatCurrency(product.price)}</td><td><span className={product.stock < 15 ? 'stock-warning' : ''}>{product.stock}</span></td><td>★ {product.rating}</td><td><button className="table-action" onClick={() => startEdit(product)}>Edit</button><button className="table-action danger-text" onClick={() => { dispatch(deleteProduct(product.id)); showToast('Product deleted.', 'info'); }}>Delete</button></td></tr>)}</tbody></table></div></div><Modal open={open} title={editing ? 'Edit product' : 'Create product'} onClose={() => setOpen(false)}><div className="admin-form"><ImageDropzone initialUrl={form.image} onChange={(url) => setForm((current) => ({ ...current, image: url }))} /><div className="form-two"><label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Product name" /></label><label>Brand<input value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} placeholder="Brand" /></label></div><div className="form-three"><label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as ProductCategory })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Price<input type="number" value={form.price || ''} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} /></label><label>Original price<input type="number" value={form.originalPrice || ''} onChange={(event) => setForm({ ...form, originalPrice: Number(event.target.value) })} /></label></div><label>Stock<input type="number" value={form.stock} onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })} /></label><label>Description<textarea rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label><button className="button button-dark" onClick={save}>{editing ? 'Save changes' : 'Create product'}</button></div></Modal></div>;
}
