import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../components/AdminHeader/AdminHeader';

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content"><Outlet /></main>
      </div>
    </div>
  );
}
