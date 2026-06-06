import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/vendors', label: 'Vendors' },
  { to: '/rfqs', label: 'RFQs' },
  { to: '/quotations', label: 'Quotations' },
  { to: '/approvals', label: 'Approvals' },
  { to: '/purchase-orders', label: 'Purchase Orders' },
  { to: '/invoices', label: 'Invoices' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/notifications', label: 'Notifications' },
];

export default function Sidebar() {
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
