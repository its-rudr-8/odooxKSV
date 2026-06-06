import { useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';

const roleLabels = {
  admin: 'Admin',
  manager: 'Manager',
  procurement_officer: 'Procurement Officer',
  vendor: 'Vendor',
};

export default function Topbar() {
  const { user, logout } = useAuth();
  const displayRole = useMemo(() => roleLabels[user?.role] || 'Team member', [user]);

  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">VendorBridge ERP</h1>
        <p className="topbar__subtitle">Procurement, approvals, purchasing, and invoice control</p>
      </div>
      <div className="topbar__actions">
        <button className="topbar__button" type="button">
          Search
        </button>
        <button className="topbar__button" type="button">
          Notifications
        </button>
        {user ? (
          <div className="topbar__profile">
            <div className="topbar__avatar">{user.firstName?.charAt(0) || 'U'}</div>
            <div>
              <div>{user.firstName} {user.lastName}</div>
              <small>{displayRole}</small>
            </div>
            <button className="topbar__button" type="button" onClick={logout}>
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
