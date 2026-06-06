export default function NotificationsPage() {
  return (
    <div className="page">
      <section className="page__hero">
        <h2 className="page__title">Notifications</h2>
        <p className="page__subtitle">Stay informed on RFQs, approvals, purchase orders, and invoice updates.</p>
      </section>

      <section className="panel">
        <ul style={{ paddingLeft: 20, color: 'var(--muted)' }}>
          <li>RFQ 1004 assigned: Vendor A invited to quote.</li>
          <li>Approval required: Quotations for RFQ 1001.</li>
          <li>Purchase order issued: PO 9002 is now active.</li>
          <li>Invoice generated: Invoice 501 ready for review.</li>
        </ul>
      </section>
    </div>
  );
}
