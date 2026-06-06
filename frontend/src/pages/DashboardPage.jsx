import StatCard from '../components/StatCard';

export default function DashboardPage() {
  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">Procurement control center</h2>
        <p className="page__subtitle">
          Track RFQs, quotations, approvals, purchase orders, and invoices in one operational cockpit.
        </p>
      </section>
      <section className="stats-grid">
        <StatCard title="Open RFQs" value="18" hint="4 awaiting vendor assignment" />
        <StatCard title="Pending Approvals" value="7" hint="2 urgent escalations" />
        <StatCard title="Active Vendors" value="142" hint="Top vendor score 4.9" />
        <StatCard title="This Month Spend" value="$284K" hint="11.2% below budget" />
      </section>
      <section className="panel">
        <strong>Today</strong>
        <p style={{ color: 'var(--muted)' }}>
          Placeholder operational feed for RFQ lifecycle, approval actions, invoice queues, and alerts.
        </p>
      </section>
    </div>
  );
}
