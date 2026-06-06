import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const pagesByRole = {
  admin: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/users', label: 'Users' },
    { to: '/vendors', label: 'Vendors' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/notifications', label: 'Notifications' },
  ],
  procurement_officer: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/rfqs', label: 'RFQs' },
    { to: '/quotations', label: 'Quotations' },
    { to: '/purchase-orders', label: 'Purchase Orders' },
    { to: '/invoices', label: 'Invoices' },
    { to: '/notifications', label: 'Notifications' },
  ],
  vendor: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/rfqs', label: 'RFQs' },
    { to: '/quotations', label: 'Quotations' },
    { to: '/purchase-orders', label: 'Purchase Orders' },
    { to: '/notifications', label: 'Notifications' },
  ],
  manager: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/approvals', label: 'Approvals' },
    { to: '/rfqs', label: 'RFQs' },
    { to: '/notifications', label: 'Notifications' },
  ],
};

export default function Sidebar() {
  const { user } = useAuth();
  const items = user ? pagesByRole[user.role] || [] : [];

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">VB</div>
        <div>
          <div className="sidebar__title">VendorBridge</div>
          <div className="sidebar__subtitle">Procurement ERP</div>
        </div>
      </div>
      <nav className="sidebar__nav">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
