export default function Topbar() {
  return (
    <header className="topbar">
      <div>
        <h1 className="topbar__title">VendorBridge ERP</h1>
        <p className="topbar__subtitle">Procurement, approvals, purchasing, and invoice control</p>
      </div>
      <div className="topbar__actions">
        <button className="topbar__button" type="button">Search</button>
        <button className="topbar__button" type="button">Notifications</button>
        <div className="topbar__avatar">A</div>
      </div>
    </header>
  );
}
