import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function PurchaseOrdersPage() {
  const { user } = useAuth();
  const isOfficer = user.role === 'procurement_officer';
  const isVendor = user.role === 'vendor';
  const [poName, setPoName] = useState('');

  function createPo(event) {
    event.preventDefault();
    alert('Purchase order generated successfully.');
    setPoName('');
  }

  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">Purchase orders</h2>
        <p className="page__subtitle">
          {isOfficer
            ? 'Generate purchase orders from approved quotations and manage PO lifecycle.'
            : 'View purchase orders issued to your company and track order status.'}
        </p>
      </section>

      {isOfficer ? (
        <section className="panel">
          <h3>Generate purchase order</h3>
          <form onSubmit={createPo} style={{ display: 'grid', gap: 14 }}>
            <label>
              Purchase order title
              <input value={poName} onChange={(event) => setPoName(event.target.value)} required type="text" />
            </label>
            <button type="submit" className="button">
              Create purchase order
            </button>
          </form>
        </section>
      ) : null}

      {isVendor ? (
        <section className="panel">
          <h3>Your purchase orders</h3>
          <p style={{ color: 'var(--muted)' }}>
            Vendors can review purchase orders, delivery timelines, and order statuses assigned by procurement.
          </p>
          <ul style={{ paddingLeft: 20, color: 'var(--muted)' }}>
            <li>PO 9002: Office supplies, pending shipment.</li>
            <li>PO 9007: Maintenance services, confirmed.</li>
          </ul>
        </section>
      ) : null}
    </div>
  );
}
