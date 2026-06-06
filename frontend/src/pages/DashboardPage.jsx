import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { useAuth } from '../hooks/useAuth';

const roleConfig = {
  procurement_officer: {
    title: 'Procurement operator dashboard',
    subtitle: 'Create RFQs, compare quotations, generate purchase orders, and issue invoices.',
    cards: [
      { title: 'Open RFQs', value: '12', hint: '6 awaiting vendor response' },
      { title: 'Quotations ready', value: '8', hint: '3 ready for comparison' },
      { title: 'Draft POs', value: '5', hint: '2 pending approval' },
      { title: 'Invoices due', value: '4', hint: '2 pending issue' },
    ],
    actions: [
      { label: 'Create RFQ', path: '/rfqs' },
      { label: 'Compare quotations', path: '/quotations' },
      { label: 'Generate purchase orders', path: '/purchase-orders' },
      { label: 'Generate invoices', path: '/invoices' },
    ],
  },
  vendor: {
    title: 'Vendor workspace',
    subtitle: 'Track RFQs, submit quotations, and review purchase orders.',
    cards: [
      { title: 'Assigned RFQs', value: '7', hint: '3 due this week' },
      { title: 'Quotations submitted', value: '5', hint: '2 awaiting review' },
      { title: 'Purchase orders', value: '3', hint: '1 new order' },
      { title: 'Activity alerts', value: '2', hint: 'Responses required' },
    ],
    actions: [
      { label: 'Track RFQs', path: '/rfqs' },
      { label: 'Submit quotation', path: '/quotations' },
      { label: 'View purchase orders', path: '/purchase-orders' },
    ],
  },
  manager: {
    title: 'Approval command center',
    subtitle: 'Review procurement requests and monitor workflow progress.',
    cards: [
      { title: 'Pending approvals', value: '9', hint: '4 waiting for review' },
      { title: 'Open RFQ workflows', value: '11', hint: '5 in progress' },
      { title: 'PO approvals', value: '6', hint: '2 overdue' },
      { title: 'Audit alerts', value: '2', hint: 'Vendor updates available' },
    ],
    actions: [
      { label: 'Review approvals', path: '/approvals' },
      { label: 'Inspect RFQ status', path: '/rfqs' },
    ],
  },
  admin: {
    title: 'Admin control panel',
    subtitle: 'Manage users, vendors, and procurement analytics.',
    cards: [
      { title: 'Active users', value: '24', hint: '3 pending invitation' },
      { title: 'Vendor records', value: '56', hint: '4 inactive' },
      { title: 'Analytics reports', value: '13', hint: 'Updated today' },
      { title: 'Notifications', value: '5', hint: 'System updates' },
    ],
    actions: [
      { label: 'Manage users', path: '/users' },
      { label: 'Manage vendors', path: '/vendors' },
      { label: 'View analytics', path: '/analytics' },
    ],
  },
};

export default function DashboardPage({ dashboardRole }) {
  const { user } = useAuth();
  const role = dashboardRole || user?.role || 'procurement_officer';
  const config = roleConfig[role] || roleConfig.procurement_officer;

  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">{config.title}</h2>
        <p className="page__subtitle">{config.subtitle}</p>
      </section>

      <section className="stats-grid">
        {config.cards.map((card) => (
          <StatCard key={card.title} title={card.title} value={card.value} hint={card.hint} />
        ))}
      </section>

      <section className="panel">
        <h3>Quick actions</h3>
        <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
          {config.actions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className="button"
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
