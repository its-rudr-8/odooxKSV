import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getDashboardPath } from '../utils';

export default function ForbiddenPage() {
  const { user } = useAuth();

  return (
    <div className="page">
      <section className="panel">
        <h2>Access denied</h2>
        <p>You do not have permission to view this page.</p>
        <Link to={getDashboardPath(user?.role)} className="button">Go to dashboard</Link>
      </section>
    </div>
  );
}
