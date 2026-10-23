const users = [
  ['Ananya Rao', 'ananya@example.com', 'CUSTOMER', '24 orders'],
  ['Rohan Mehta', 'rohan@example.com', 'CUSTOMER', '8 orders'],
  ['Demo Customer', 'demo@shopsphere.com', 'CUSTOMER', '4 orders'],
  ['ShopSphere Admin', 'admin@shopsphere.com', 'ADMIN', 'Operations'],
  ['Ishita Gupta', 'ishita@example.com', 'CUSTOMER', '17 orders'],
];

export default function AdminUsersPage() {
  return <div><div className="admin-page-heading"><div><span className="eyebrow">Customer directory</span><h2>Users</h2><p>A frontend placeholder for the future Auth/User Service.</p></div></div><div className="admin-card"><div className="table-wrap"><table><thead><tr><th>User</th><th>Role</th><th>Activity</th><th>Access</th></tr></thead><tbody>{users.map(([name, email, role, activity]) => <tr key={email}><td><div className="table-user"><span className="avatar">{name.charAt(0)}</span><div><strong>{name}</strong><small>{email}</small></div></div></td><td><span className="status-pill">{role}</span></td><td>{activity}</td><td><button className="table-action">Manage</button></td></tr>)}</tbody></table></div></div></div>;
}
