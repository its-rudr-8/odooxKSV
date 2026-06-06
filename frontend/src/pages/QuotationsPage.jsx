import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function QuotationsPage() {
  const { user } = useAuth();
  const isOfficer = user.role === 'procurement_officer';
  const isVendor = user.role === 'vendor';
  const [quoteForm, setQuoteForm] = useState({ price: '', timeline: '', comments: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setQuoteForm((current) => ({ ...current, [name]: value }));
  }

  function submitQuotation(event) {
    event.preventDefault();
    alert('Quotation submitted. Procurement officer can now compare bids.');
    setQuoteForm({ price: '', timeline: '', comments: '' });
  }

  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">Quotation {isOfficer ? 'comparison' : 'submission'}</h2>
        <p className="page__subtitle">
          {isOfficer
            ? 'Compare vendor quotations side-by-side and select the best offer for approval.'
            : 'Provide pricing details, delivery timelines, and comments for an assigned RFQ.'}
        </p>
      </section>

      {isVendor ? (
        <section className="panel">
          <h3>Submit your quotation</h3>
          <form onSubmit={submitQuotation} style={{ display: 'grid', gap: 14 }}>
            <label>
              Proposed price
              <input name="price" value={quoteForm.price} onChange={handleChange} required type="text" />
            </label>
            <label>
              Delivery timeline
              <input name="timeline" value={quoteForm.timeline} onChange={handleChange} required type="text" />
            </label>
            <label>
              Notes / comments
              <textarea name="comments" value={quoteForm.comments} onChange={handleChange} rows={4} />
            </label>
            <button type="submit" className="button">
              Submit quotation
            </button>
          </form>
        </section>
      ) : null}

      {isOfficer ? (
        <section className="panel">
          <h3>Quotation comparison</h3>
          <p style={{ color: 'var(--muted)' }}>
            Review vendor offers, highlight the lowest price, and compare delivery timelines in one place.
          </p>
          <ul style={{ paddingLeft: 20, color: 'var(--muted)' }}>
            <li>Vendor A: ₹24,000 – 5 days – score 4.8</li>
            <li>Vendor B: ₹22,900 – 6 days – score 4.5</li>
            <li>Vendor C: ₹25,200 – 4 days – score 4.9</li>
          </ul>
        </section>
      ) : null}
    </div>
  );
}
