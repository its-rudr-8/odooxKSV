import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function RfqsPage() {
  const { user } = useAuth();
  const isOfficer = user.role === 'procurement_officer';
  const isVendor = user.role === 'vendor';
  const [rfqForm, setRfqForm] = useState({ title: '', details: '', quantity: 1, deadline: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setRfqForm((current) => ({ ...current, [name]: value }));
  }

  function createRfq(event) {
    event.preventDefault();
    alert('RFQ request created. Procurement officer can now assign vendors and invite quotations.');
    setRfqForm({ title: '', details: '', quantity: 1, deadline: '' });
  }

  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">RFQ {isOfficer ? 'creation' : 'status'}</h2>
        <p className="page__subtitle">
          {isOfficer
            ? 'Create and manage RFQs, assign vendors, and open new procurement requests.'
            : 'Track RFQ progress and respond to requests from procurement teams.'}
        </p>
      </section>

      {isOfficer ? (
        <section className="panel">
          <h3>Create a new RFQ</h3>
          <form onSubmit={createRfq} style={{ display: 'grid', gap: 14 }}>
            <label>
              RFQ title
              <input name="title" value={rfqForm.title} onChange={handleChange} required type="text" />
            </label>
            <label>
              Product / service details
              <textarea name="details" value={rfqForm.details} onChange={handleChange} required rows={4} />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label>
                Quantity
                <input name="quantity" value={rfqForm.quantity} onChange={handleChange} required type="number" min={1} />
              </label>
              <label>
                Deadline
                <input name="deadline" value={rfqForm.deadline} onChange={handleChange} required type="date" />
              </label>
            </div>
            <button type="submit" className="button">
              Create RFQ
            </button>
          </form>
        </section>
      ) : null}

      {isVendor ? (
        <section className="panel">
          <h3>Your assigned RFQs</h3>
          <p style={{ color: 'var(--muted)' }}>
            Vendors can review active RFQs, track deadlines, and submit quotations for invited requests.
          </p>
          <ul style={{ paddingLeft: 20, color: 'var(--muted)' }}>
            <li>RFQ 1001: Office supplies – due in 3 days.</li>
            <li>RFQ 1002: Network hardware – due in 5 days.</li>
            <li>RFQ 1007: Maintenance services – awaiting your quotation.</li>
          </ul>
        </section>
      ) : null}
    </div>
  );
}
