import { NavLink } from 'react-router-dom';

const links = [
  ['Dashboard', '/admin'],
  ['Products', '/admin/products'],
  ['Orders', '/admin/orders'],
  ['Inventory', '/admin/inventory'],
  ['Users', '/admin/users'],
  ['Analytics', '/admin/analytics'],
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand"><span className="brand-mark">S</span><div><strong>ShopSphere</strong><small>Admin Console</small></div></div>
      <nav>
        {links.map(([label, href]) => (
          <NavLink key={href} end={href === '/admin'} to={href}>
            <span>{label === 'Dashboard' ? '⌂' : label === 'Products' ? '▦' : label === 'Orders' ? '◫' : label === 'Inventory' ? '◈' : label === 'Users' ? '◉' : '◒'}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="admin-sidebar-tip"><strong>Demo environment</strong><span>Changes are stored locally until the backend is connected.</span></div>
    </aside>
  );
}
