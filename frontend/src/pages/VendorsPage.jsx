import { useAuth } from '../hooks/useAuth';

export default function VendorsPage() {
  const { user } = useAuth();

  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">Vendor management</h2>
        <p className="page__subtitle">
          Manage vendor records, status tracking, and supplier onboarding from one secure admin panel.
        </p>
      </section>

      <section className="panel">
        <div style={{ display: 'grid', gap: 12 }}>
          <strong>Admin access only</strong>
          <p style={{ color: 'var(--muted)' }}>
            This screen is reserved for administrators to manage vendor registration, GST details, category assignments, and status updates.
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            <button type="button" className="button">Register new vendor</button>
            <button type="button" className="button">Review vendor categories</button>
            <button type="button" className="button">Update vendor status</button>
          </div>
        </div>
      </section>

      <section className="panel">
        <h3>Vendor details overview</h3>
        <ul style={{ color: 'var(--muted)', paddingLeft: 20 }}>
          <li>Track active vs inactive vendor registration.</li>
          <li>Review contact and GST details for audit compliance.</li>
          <li>Manage vendor categories and onboarding workflows.</li>
        </ul>
      </section>
    </div>
  );
}
