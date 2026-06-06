import StatCard from '../components/StatCard';

export default function AnalyticsPage() {
  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">Procurement analytics</h2>
        <p className="page__subtitle">Admin analytics dashboard for vendor performance, spending, and procurement trends.</p>
      </section>

      <section className="stats-grid">
        <StatCard title="Vendor score" value="4.7/5" hint="Based on delivery and quality metrics" />
        <StatCard title="Total spend" value="$1.2M" hint="Last 30 days" />
        <StatCard title="Active RFQs" value="18" hint="Vendor responses in progress" />
        <StatCard title="Approval rate" value="89%" hint="On-track procurement workflows" />
      </section>

      <section className="panel">
        <h3>Reports & export</h3>
        <p style={{ color: 'var(--muted)' }}>
          Download vendor performance summaries, monthly procurement trends, and spending reports to analyze procurement health.
        </p>
      </section>
    </div>
  );
}
