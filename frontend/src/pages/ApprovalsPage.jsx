import { useAuth } from '../hooks/useAuth';

export default function ApprovalsPage() {
  const { user } = useAuth();

  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">Approval workflow</h2>
        <p className="page__subtitle">
          Review procurement requests, approve or reject quotations, and track workflow state transitions.
        </p>
      </section>

      <section className="panel">
        <h3>{user?.role === 'manager' ? 'Manager approver tasks' : 'Procurement approvals'}</h3>
        <p style={{ color: 'var(--muted)' }}>
          {user?.role === 'manager'
            ? 'Approve or reject procurement requests and monitor request timelines.'
            : 'This page supports the approval lifecycle for procurement requests.'}
        </p>
        <ul style={{ paddingLeft: 20, color: 'var(--muted)' }}>
          <li>RFQ 1003: Awaiting manager approval.</li>
          <li>Quotation bundle 502: Pending approval review.</li>
          <li>Workflow state: review ⟶ approve ⟶ purchase order generation.</li>
        </ul>
      </section>

      <section className="panel" style={{ display: 'grid', gap: 10 }}>
        <button className="button" type="button">
          Approve selected request
        </button>
        <button className="button" type="button">
          Reject selected request
        </button>
      </section>
    </div>
  );
}
