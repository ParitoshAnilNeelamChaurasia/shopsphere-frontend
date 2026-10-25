import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useTheme();

  return (
    <header className="admin-header">
      <div>
        <span className="eyebrow">Operations</span>
        <h1>Admin Console</h1>
      </div>
      <div className="admin-header-actions">
        <button className="icon-button" onClick={toggleMode}>{mode === 'light' ? '☾' : '☀'}</button>
        <Link className="button button-light small-button" to="/">View storefront</Link>
        <div className="admin-user"><span className="avatar">{user?.name.charAt(0) ?? 'A'}</span><div><strong>{user?.name}</strong><small>Administrator</small></div></div>
        <button className="text-button" onClick={logout}>Sign out</button>
      </div>
    </header>
  );
}
