import { Link } from 'react-router-dom';

export default function ForbiddenPage() {
  return (
    <div className="page">
      <section className="panel">
        <h2>Access denied</h2>
        <p>You do not have permission to view this page.</p>
        <Link to="/dashboard" className="button">Go to dashboard</Link>
      </section>
    </div>
  );
}
