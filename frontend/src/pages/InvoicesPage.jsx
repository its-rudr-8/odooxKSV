import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function InvoicesPage() {
  const { user } = useAuth();
  const [invoiceName, setInvoiceName] = useState('');

  function createInvoice(event) {
    event.preventDefault();
    alert('Invoice generated and ready for printing or emailing.');
    setInvoiceName('');
  }

  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">Invoice generation</h2>
        <p className="page__subtitle">
          Create invoices from purchase orders, calculate taxes, and prepare documents for print or email.
        </p>
      </section>

      <section className="panel">
        <h3>{user.role === 'procurement_officer' ? 'Generate new invoice' : 'Invoice access'}</h3>
        <p style={{ color: 'var(--muted)' }}>
          {user.role === 'procurement_officer'
            ? 'Use this workspace to issue invoices linked to approved purchase orders.'
            : 'Invoice generation is available to procurement officers.'}
        </p>

        {user.role === 'procurement_officer' ? (
          <form onSubmit={createInvoice} style={{ display: 'grid', gap: 14 }}>
            <label>
              Invoice title
              <input value={invoiceName} onChange={(event) => setInvoiceName(event.target.value)} required type="text" />
            </label>
            <button type="submit" className="button">
              Generate invoice
            </button>
          </form>
        ) : null}
      </section>
    </div>
  );
}
