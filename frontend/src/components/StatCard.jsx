export default function StatCard({ title, value, hint }) {
  return (
    <section className="stat-card">
      <div className="stat-card__title">{title}</div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__hint">{hint}</div>
    </section>
  );
}
