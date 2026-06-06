import { useMemo, useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import logoUrl from '../assets/Logo.jpeg';

const roleLabels = {
  admin: 'Admin',
  manager: 'Manager',
  procurement_officer: 'Procurement Officer',
  vendor: 'Vendor',
};

export default function Topbar() {
  const { user, logout } = useAuth();
  const displayRole = useMemo(() => roleLabels[user?.role] || 'Team member', [user]);
  const [showNotif, setShowNotif] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowNotif(false);
        setShowSettings(false);
      }
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const notifications = [
    { id: 1, text: 'New quotation received for RFQ-003', time: '2h' },
    { id: 2, text: 'Invoice INV-002 is overdue', time: '5h' },
    { id: 3, text: 'PO-004 approved', time: '1d' },
  ];

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={logoUrl} alt="VendorBridge" style={{ height: 44 }} />
        <div>
          <h1 className="topbar__title">VendorBridge ERP</h1>
          <p className="topbar__subtitle">Procurement, approvals, purchasing, and invoice control</p>
        </div>
      </div>

      <div className="topbar__actions" ref={ref}>
        <button className="topbar__button" type="button">Search</button>
        <div style={{ position: 'relative' }}>
          <button className="topbar__button" type="button" onClick={(e) => { e.stopPropagation(); setShowNotif(s => !s); setShowSettings(false); }}>
            Notifications
          </button>
          {showNotif && (
            <div style={{ position: 'absolute', right: 0, top: 40, width: 300, background: '#fff', color: '#111', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', borderRadius: 8, zIndex: 200 }}>
              <div style={{ padding: 12, borderBottom: '1px solid #eee', fontWeight: 700 }}>Notifications</div>
              <div style={{ maxHeight: 220, overflow: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: 10, borderBottom: '1px solid #f5f5f5' }}>
                    <div style={{ fontSize: 13 }}>{n.text}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>{n.time} ago</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 8, textAlign: 'center' }}><button style={{ background: 'none', border: 'none', color: '#2a9d6f', cursor: 'pointer' }}>View all</button></div>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button className="topbar__button" type="button" onClick={(e) => { e.stopPropagation(); setShowSettings(s => !s); setShowNotif(false); }}>
            Settings
          </button>
          {showSettings && (
            <div style={{ position: 'absolute', right: 0, top: 40, width: 220, background: '#fff', color: '#111', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', borderRadius: 8, zIndex: 200 }}>
              <div style={{ padding: 10 }}>
                <div style={{ padding: 8, cursor: 'pointer' }}>Profile Settings</div>
                <div style={{ padding: 8, cursor: 'pointer' }}>Notification Settings</div>
                <div style={{ padding: 8, cursor: 'pointer' }}>System Settings</div>
              </div>
            </div>
          )}
        </div>

        {user ? (
          <>
            <button className="topbar__button" type="button" onClick={logout} style={{ marginLeft: 8 }}>Sign out</button>
            <div className="topbar__profile" style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8 }}>
              <div className="topbar__avatar">{user.firstName?.charAt(0) || 'U'}</div>
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
                <small style={{ color: '#666' }}>{displayRole}</small>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
}
