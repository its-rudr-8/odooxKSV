import { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const PALETTE = {
  indigo: "#27187e",
  blue: "#758bfd",
  lavender: "#aeb8fe",
  cloud: "#f1f2f6",
  orange: "#ff8600",
  textDark: "#20264b",
};

const spendingData = [
  { month: "Jan", spend: 180000 },
  { month: "Feb", spend: 220000 },
  { month: "Mar", spend: 195000 },
  { month: "Apr", spend: 260000 },
  { month: "May", spend: 230000 },
  { month: "Jun", spend: 310000 },
];

const pieData = [
  { name: "IT", value: 40 },
  { name: "Office", value: 25 },
  { name: "Services", value: 20 },
  { name: "Other", value: 15 },
];

const PIE_COLORS = [PALETTE.indigo, PALETTE.blue, PALETTE.orange, PALETTE.lavender];

const vendors = [
  { id: "V001", name: "Infra Corp", category: "IT", contact: "raj@infra.com", status: "Active", rating: 4.5 },
  { id: "V002", name: "Tech Core", category: "Software", contact: "sales@techcore.com", status: "Active", rating: 4.2 },
  { id: "V003", name: "OfficeNeed Co", category: "Supplies", contact: "info@officeneed.com", status: "Inactive", rating: 3.8 },
  { id: "V004", name: "CloudNet Ltd", category: "IT", contact: "support@cloudnet.com", status: "Active", rating: 4.7 },
  { id: "V005", name: "ProServ Inc", category: "Services", contact: "hr@proserv.com", status: "Pending", rating: 4.0 },
];

const rfqs = [
  { id: "RFQ-001", title: "Server Upgrade 2024", vendors: 4, deadline: "2024-07-15", status: "Open", budget: "₹5,00,000" },
  { id: "RFQ-002", title: "Office Supplies Q3", vendors: 6, deadline: "2024-06-30", status: "Closed", budget: "₹80,000" },
  { id: "RFQ-003", title: "Cloud Storage Plan", vendors: 3, deadline: "2024-08-01", status: "Open", budget: "₹2,20,000" },
  { id: "RFQ-004", title: "Networking Equipment", vendors: 5, deadline: "2024-07-20", status: "Draft", budget: "₹3,50,000" },
];

const quotations = [
  { id: "Q-001", rfq: "RFQ-001", vendor: "Infra Corp", amount: "₹4,87,000", submitted: "2024-06-10", status: "Shortlisted" },
  { id: "Q-002", rfq: "RFQ-001", vendor: "CloudNet Ltd", amount: "₹5,10,000", submitted: "2024-06-11", status: "Under Review" },
  { id: "Q-003", rfq: "RFQ-002", vendor: "OfficeNeed Co", amount: "₹75,000", submitted: "2024-06-05", status: "Accepted" },
  { id: "Q-004", rfq: "RFQ-003", vendor: "Tech Core", amount: "₹2,15,000", submitted: "2024-06-12", status: "Pending" },
];

const approvals = [
  { id: "APP-001", type: "PO", ref: "PO-001", requestedBy: "Amit Shah", amount: "₹87,000", date: "2024-06-13", status: "Pending" },
  { id: "APP-002", type: "PO", ref: "PO-002", requestedBy: "Neha Roy", amount: "₹1,40,000", date: "2024-06-12", status: "Pending" },
  { id: "APP-003", type: "Invoice", ref: "INV-005", requestedBy: "System", amount: "₹34,900", date: "2024-06-11", status: "Pending" },
  { id: "APP-004", type: "RFQ", ref: "RFQ-004", requestedBy: "Priya K", amount: "₹3,50,000", date: "2024-06-10", status: "Approved" },
];

const purchaseOrders = [
  { id: "PO-001", vendor: "Infra Corp", amount: 87000, date: "2024-06-10", status: "Approved", items: 3 },
  { id: "PO-002", vendor: "Tech Core", amount: 140000, date: "2024-06-09", status: "Pending", items: 5 },
  { id: "PO-003", vendor: "OfficeNeed Co", amount: 34900, date: "2024-06-08", status: "Draft", items: 12 },
  { id: "PO-004", vendor: "CloudNet Ltd", amount: 220000, date: "2024-06-07", status: "Approved", items: 2 },
  { id: "PO-005", vendor: "ProServ Inc", amount: 65000, date: "2024-06-06", status: "Cancelled", items: 1 },
];

const invoices = [
  { id: "INV-001", vendor: "Infra Corp", po: "PO-001", amount: 87000, due: "2024-07-10", status: "Paid" },
  { id: "INV-002", vendor: "CloudNet Ltd", po: "PO-004", amount: 220000, due: "2024-07-07", status: "Overdue" },
  { id: "INV-003", vendor: "Tech Core", po: "PO-002", amount: 140000, due: "2024-07-20", status: "Pending" },
  { id: "INV-004", vendor: "OfficeNeed Co", po: "PO-003", amount: 34900, due: "2024-06-25", status: "Overdue" },
  { id: "INV-005", vendor: "ProServ Inc", po: "—", amount: 18000, due: "2024-07-01", status: "Pending" },
];

const activities = [
  { id: 1, icon: "📄", text: "PO-004 approved by Finance Head", time: "2 hrs ago", type: "success" },
  { id: 2, icon: "🔔", text: "Invoice INV-002 is overdue", time: "5 hrs ago", type: "danger" },
  { id: 3, icon: "📨", text: "New quotation received for RFQ-003", time: "Yesterday", type: "info" },
  { id: 4, icon: "✅", text: "Vendor OfficeNeed Co deactivated", time: "Yesterday", type: "warning" },
  { id: 5, icon: "📦", text: "PO-001 marked as delivered", time: "2 days ago", type: "success" },
  { id: 6, icon: "🧾", text: "RFQ-002 closed successfully", time: "3 days ago", type: "info" },
];

const NAV = [
  { key: "dashboard", label: "Dashboard" },
  { key: "vendors", label: "Vendors" },
  { key: "rfqs", label: "RFQ's" },
  { key: "quotations", label: "Quotations" },
  { key: "approvals", label: "Approvals" },
  { key: "purchase-orders", label: "Purchase Orders" },
  { key: "invoices", label: "Invoices" },
  { key: "reports", label: "Reports" },
  { key: "activity", label: "Activity" },
];

const StatusBadge = ({ status }) => {
  const map = {
    Approved: { bg: "#d9defe", color: PALETTE.indigo },
    Active: { bg: "#d9defe", color: PALETTE.indigo },
    Paid: { bg: "#d9defe", color: PALETTE.indigo },
    Accepted: { bg: "#d9defe", color: PALETTE.indigo },
    Shortlisted: { bg: "#d9defe", color: PALETTE.indigo },
    Pending: { bg: "#fff1df", color: "#b15e00" },
    "Under Review": { bg: "#fff1df", color: "#b15e00" },
    Open: { bg: "#e8ecff", color: "#3249cf" },
    Draft: { bg: "#edf0ff", color: "#4f5fb4" },
    Closed: { bg: "#edf0ff", color: "#4f5fb4" },
    Inactive: { bg: "#edf0ff", color: "#4f5fb4" },
    Cancelled: { bg: "#ffe8cc", color: "#9a5000" },
    Overdue: { bg: "#ffe8cc", color: "#9a5000" },
  };
  const s = map[status] || { bg: PALETTE.cloud, color: PALETTE.textDark };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
};

const Stars = ({ rating }) => (
  <span style={{ color: PALETTE.orange, fontSize: 13 }}>
    {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    <span style={{ color: "#888", marginLeft: 4 }}>{rating}</span>
  </span>
);

export default function VendorBridge() {
  const [active, setActive] = useState("dashboard");
  const [showNewRFQ, setShowNewRFQ] = useState(false);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [vendorList, setVendorList] = useState(vendors);
  const [rfqList, setRfqList] = useState(rfqs);
  const [newVendor, setNewVendor] = useState({ name: "", category: "", contact: "", status: "Active" });
  const [newRFQ, setNewRFQ] = useState({ title: "", budget: "", deadline: "", vendors: 0 });
  const [approvalList, setApprovalList] = useState(approvals);

  const totalPOs = purchaseOrders.reduce((s, p) => s + p.amount, 0);
  const overdueInvoices = invoices.filter(i => i.status === "Overdue").length;
  const activeRFQs = rfqList.filter(r => r.status === "Open").length;
  const pendingApprovals = approvalList.filter(a => a.status === "Pending").length;

  const handleApprove = (id) => setApprovalList(list => list.map(a => a.id === id ? { ...a, status: "Approved" } : a));
  const handleReject = (id) => setApprovalList(list => list.map(a => a.id === id ? { ...a, status: "Rejected" } : a));

  const sidebarStyle = {
    width: 180,
    minWidth: 180,
    background: `linear-gradient(180deg, ${PALETTE.cloud} 0%, ${PALETTE.blue} 100%)`,
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
    borderRight: "1px solid rgba(174,184,254,0.25)",
  };

  const navItemStyle = (key) => ({
    padding: "10px 24px",
    cursor: "pointer",
    color: active === key ? PALETTE.indigo : "#334155",
    background: active === key ? `rgba(117,139,253,0.12)` : "transparent",
    borderLeft: active === key ? `3px solid ${PALETTE.orange}` : "3px solid transparent",
    fontSize: 14,
    fontWeight: active === key ? 600 : 400,
    transition: "all 0.15s",
    userSelect: "none",
  });

  const mainStyle = {
    flex: 1,
    background: `linear-gradient(170deg, ${PALETTE.cloud} 0%, #e8ebff 100%)`,
    overflowY: "auto",
    padding: "28px 32px",
    fontFamily: "Segoe UI, system-ui, sans-serif",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: 10,
    boxShadow: "0 10px 24px rgba(39, 24, 126, 0.08)",
    border: "1px solid rgba(117, 139, 253, 0.22)",
    padding: "16px 20px",
  };

  const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: 13 };
  const thStyle = { padding: "10px 12px", background: "#f4f6ff", textAlign: "left", fontWeight: 600, color: PALETTE.indigo, borderBottom: "1px solid #dbe1ff" };
  const tdStyle = { padding: "10px 12px", borderBottom: "1px solid #eef1ff", color: PALETTE.textDark };

  const inputStyle = {
    width: "100%", padding: "8px 12px", border: "1px solid #d5dbff", borderRadius: 6, fontSize: 13,
    boxSizing: "border-box", outline: "none", marginBottom: 10,
  };

  const btnGreen = {
    background: PALETTE.orange, color: "#fff", border: "none", borderRadius: 6,
    padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600,
  };
  const btnOutline = {
    background: "#fff", color: PALETTE.indigo, border: "1px solid #b9c3ff", borderRadius: 6,
    padding: "8px 18px", cursor: "pointer", fontSize: 13,
  };

  const Modal = ({ title, onClose, children }) => (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 28, width: 420, maxWidth: "90vw", boxShadow: "0 8px 32px rgba(39,24,126,0.22)", border: "1px solid #ced6ff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontSize: 16, color: PALETTE.indigo }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div>
      <h2 style={{ margin: "0 0 4px", color: PALETTE.indigo, fontSize: 22, fontWeight: 700 }}>Dashboard</h2>
      <p style={{ margin: "0 0 24px", color: "#666", fontSize: 14 }}>Welcome back, Procurement Officer — Today's Overview</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Active RFQ's", value: activeRFQs, color: "#e8ecff", tcolor: PALETTE.indigo },
          { label: "Pending Approvals", value: pendingApprovals, color: "#fff1df", tcolor: "#b15e00" },
          { label: `₹ ${(totalPOs / 100000).toFixed(1)}L`, label2: "POs this month", color: "#dce2ff", tcolor: "#384bc5" },
          { label: overdueInvoices, label2: "Overdue Invoices", color: "#ffe8cc", tcolor: "#9a5000" },
        ].map((s, i) => (
          <div key={i} style={{ ...cardStyle, background: s.color, padding: "18px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.tcolor }}>{s.label}</div>
            <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{s.label2 || ["Active RFQ's", "Pending Approvals", "POs this month", "Overdue Invoices"][i]}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={cardStyle}>
          <h4 style={{ margin: "0 0 14px", fontSize: 14, color: PALETTE.indigo }}>Recent Purchase Orders</h4>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>PO#</th>
                <th style={thStyle}>Vendor</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.slice(0, 3).map(po => (
                <tr key={po.id}>
                  <td style={tdStyle}>{po.id}</td>
                  <td style={tdStyle}>{po.vendor}</td>
                  <td style={tdStyle}>₹{po.amount.toLocaleString("en-IN")}</td>
                  <td style={tdStyle}><StatusBadge status={po.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={cardStyle}>
          <h4 style={{ margin: "0 0 14px", fontSize: 14, color: PALETTE.indigo }}>Spending Trends — Last 6 Months</h4>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dde2ff" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={v => `₹${v.toLocaleString("en-IN")}`} />
              <Line type="monotone" dataKey="spend" stroke={PALETTE.blue} strokeWidth={3} dot={{ r: 4, fill: PALETTE.orange }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button style={btnGreen} onClick={() => { setActive("rfqs"); setShowNewRFQ(true); }}>+ New RFQ</button>
        <button style={btnOutline} onClick={() => { setActive("vendors"); setShowAddVendor(true); }}>Add Vendor</button>
        <button style={btnOutline} onClick={() => setActive("invoices")}>View Invoices</button>
      </div>
    </div>
  );

  const renderVendors = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, color: PALETTE.indigo }}>Vendors</h2>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13 }}>{vendorList.length} vendors registered</p>
        </div>
        <button style={btnGreen} onClick={() => setShowAddVendor(true)}>+ Add Vendor</button>
      </div>
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {vendorList.map(v => (
              <tr key={v.id}>
                <td style={tdStyle}>{v.id}</td>
                <td style={tdStyle}><strong>{v.name}</strong></td>
                <td style={tdStyle}>{v.category}</td>
                <td style={tdStyle}>{v.contact}</td>
                <td style={tdStyle}><StatusBadge status={v.status} /></td>
                <td style={tdStyle}><Stars rating={v.rating} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddVendor && (
        <Modal title="Add New Vendor" onClose={() => setShowAddVendor(false)}>
          <input style={inputStyle} placeholder="Vendor Name" value={newVendor.name} onChange={e => setNewVendor({ ...newVendor, name: e.target.value })} />
          <input style={inputStyle} placeholder="Category" value={newVendor.category} onChange={e => setNewVendor({ ...newVendor, category: e.target.value })} />
          <input style={inputStyle} placeholder="Contact Email" value={newVendor.contact} onChange={e => setNewVendor({ ...newVendor, contact: e.target.value })} />
          <select style={{ ...inputStyle, marginBottom: 16 }} value={newVendor.status} onChange={e => setNewVendor({ ...newVendor, status: e.target.value })}>
            <option>Active</option><option>Inactive</option><option>Pending</option>
          </select>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={btnGreen} onClick={() => {
              if (newVendor.name) {
                setVendorList([...vendorList, { ...newVendor, id: `V00${vendorList.length + 1}`, rating: 4.0 }]);
                setNewVendor({ name: "", category: "", contact: "", status: "Active" });
                setShowAddVendor(false);
              }
            }}>Save Vendor</button>
            <button style={btnOutline} onClick={() => setShowAddVendor(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );

  const renderRFQs = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, color: PALETTE.indigo }}>Request for Quotations</h2>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13 }}>{rfqList.filter(r => r.status === "Open").length} open RFQs</p>
        </div>
        <button style={btnGreen} onClick={() => setShowNewRFQ(true)}>+ New RFQ</button>
      </div>
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Budget</th>
              <th style={thStyle}>Vendors</th>
              <th style={thStyle}>Deadline</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rfqList.map(r => (
              <tr key={r.id}>
                <td style={tdStyle}>{r.id}</td>
                <td style={tdStyle}><strong>{r.title}</strong></td>
                <td style={tdStyle}>{r.budget}</td>
                <td style={tdStyle}>{r.vendors} invited</td>
                <td style={tdStyle}>{r.deadline}</td>
                <td style={tdStyle}><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showNewRFQ && (
        <Modal title="New RFQ" onClose={() => setShowNewRFQ(false)}>
          <input style={inputStyle} placeholder="RFQ Title" value={newRFQ.title} onChange={e => setNewRFQ({ ...newRFQ, title: e.target.value })} />
          <input style={inputStyle} placeholder="Budget (e.g. ₹5,00,000)" value={newRFQ.budget} onChange={e => setNewRFQ({ ...newRFQ, budget: e.target.value })} />
          <input style={{ ...inputStyle, marginBottom: 16 }} type="date" value={newRFQ.deadline} onChange={e => setNewRFQ({ ...newRFQ, deadline: e.target.value })} />
          <div style={{ display: "flex", gap: 10 }}>
            <button style={btnGreen} onClick={() => {
              if (newRFQ.title) {
                setRfqList([...rfqList, { ...newRFQ, id: `RFQ-00${rfqList.length + 1}`, status: "Open", vendors: 0 }]);
                setNewRFQ({ title: "", budget: "", deadline: "", vendors: 0 });
                setShowNewRFQ(false);
              }
            }}>Create RFQ</button>
            <button style={btnOutline} onClick={() => setShowNewRFQ(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );

  const renderQuotations = () => (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, color: PALETTE.indigo }}>Quotations</h2>
      <p style={{ margin: "0 0 20px", color: "#888", fontSize: 13 }}>{quotations.length} quotations received</p>
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>RFQ</th>
              <th style={thStyle}>Vendor</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Submitted</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map(q => (
              <tr key={q.id}>
                <td style={tdStyle}>{q.id}</td>
                <td style={tdStyle}>{q.rfq}</td>
                <td style={tdStyle}>{q.vendor}</td>
                <td style={tdStyle}>{q.amount}</td>
                <td style={tdStyle}>{q.submitted}</td>
                <td style={tdStyle}><StatusBadge status={q.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderApprovals = () => (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, color: PALETTE.indigo }}>Approvals</h2>
      <p style={{ margin: "0 0 20px", color: "#888", fontSize: 13 }}>{approvalList.filter(a => a.status === "Pending").length} pending approvals</p>
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Reference</th>
              <th style={thStyle}>Requested By</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {approvalList.map(a => (
              <tr key={a.id}>
                <td style={tdStyle}>{a.id}</td>
                <td style={tdStyle}>{a.type}</td>
                <td style={tdStyle}>{a.ref}</td>
                <td style={tdStyle}>{a.requestedBy}</td>
                <td style={tdStyle}>{a.amount}</td>
                <td style={tdStyle}>{a.date}</td>
                <td style={tdStyle}><StatusBadge status={a.status} /></td>
                <td style={tdStyle}>
                  {a.status === "Pending" && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ ...btnGreen, padding: "4px 10px", fontSize: 12 }} onClick={() => handleApprove(a.id)}>✓ Approve</button>
                      <button style={{ background: "#ffe8cc", color: "#9a5000", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" }} onClick={() => handleReject(a.id)}>✕ Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPurchaseOrders = () => (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, color: PALETTE.indigo }}>Purchase Orders</h2>
      <p style={{ margin: "0 0 20px", color: "#888", fontSize: 13 }}>{purchaseOrders.length} total POs this month</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total Value", value: `₹${(totalPOs / 100000).toFixed(1)}L`, bg: "#dce2ff", color: "#384bc5" },
          { label: "Approved", value: purchaseOrders.filter(p => p.status === "Approved").length, bg: "#e8ecff", color: PALETTE.indigo },
          { label: "Pending", value: purchaseOrders.filter(p => p.status === "Pending").length, bg: "#fff1df", color: "#b15e00" },
        ].map((s, i) => (
          <div key={i} style={{ ...cardStyle, background: s.bg, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#555" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>PO#</th>
              <th style={thStyle}>Vendor</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Items</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map(po => (
              <tr key={po.id}>
                <td style={tdStyle}><strong>{po.id}</strong></td>
                <td style={tdStyle}>{po.vendor}</td>
                <td style={tdStyle}>₹{po.amount.toLocaleString("en-IN")}</td>
                <td style={tdStyle}>{po.date}</td>
                <td style={tdStyle}>{po.items}</td>
                <td style={tdStyle}><StatusBadge status={po.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, color: PALETTE.indigo }}>Invoices</h2>
      <p style={{ margin: "0 0 20px", color: "#888", fontSize: 13 }}>{invoices.filter(i => i.status === "Overdue").length} overdue invoices need attention</p>
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Invoice#</th>
              <th style={thStyle}>Vendor</th>
              <th style={thStyle}>PO Ref</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Due Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} style={{ background: inv.status === "Overdue" ? "#fff4e8" : "transparent" }}>
                <td style={tdStyle}><strong>{inv.id}</strong></td>
                <td style={tdStyle}>{inv.vendor}</td>
                <td style={tdStyle}>{inv.po}</td>
                <td style={tdStyle}>₹{inv.amount.toLocaleString("en-IN")}</td>
                <td style={tdStyle}>{inv.due}</td>
                <td style={tdStyle}><StatusBadge status={inv.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div>
      <h2 style={{ margin: "0 0 20px", fontSize: 20, color: PALETTE.indigo }}>Reports</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={cardStyle}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14 }}>Monthly Spend (₹)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dde2ff" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={v => `₹${v.toLocaleString("en-IN")}`} />
              <Bar dataKey="spend" fill={PALETTE.blue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={cardStyle}>
          <h4 style={{ margin: "0 0 16px", fontSize: 14 }}>Spend by Category</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false} fontSize={11}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={v => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ ...cardStyle, gridColumn: "span 2" }}>
          <h4 style={{ margin: "0 0 12px", fontSize: 14 }}>Summary Statistics</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { label: "Total Vendors", value: vendorList.length },
              { label: "Open RFQs", value: rfqList.filter(r => r.status === "Open").length },
              { label: "Total PO Value", value: `₹${(totalPOs / 100000).toFixed(1)}L` },
              { label: "Overdue Invoices", value: overdueInvoices },
            ].map((s, i) => (
              <div key={i} style={{ background: "#f4f6ff", borderRadius: 8, padding: "12px 16px", textAlign: "center", border: "1px solid #dbe1ff" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: PALETTE.indigo }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#777", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, color: PALETTE.indigo }}>Activity Log</h2>
      <p style={{ margin: "0 0 20px", color: "#888", fontSize: 13 }}>Recent system and user actions</p>
      <div style={cardStyle}>
        {activities.map((a, i) => (
          <div key={a.id} style={{
            display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0",
            borderBottom: i < activities.length - 1 ? "1px solid #f0f0f0" : "none"
          }}>
            <div style={{ fontSize: 22, lineHeight: 1 }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: PALETTE.textDark }}>{a.text}</div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 3 }}>{a.time}</div>
            </div>
            <StatusBadge status={a.type === "success" ? "Approved" : a.type === "danger" ? "Overdue" : a.type === "warning" ? "Pending" : "Open"} />
          </div>
        ))}
      </div>
    </div>
  );

  const pages = {
    dashboard: renderDashboard,
    vendors: renderVendors,
    rfqs: renderRFQs,
    quotations: renderQuotations,
    approvals: renderApprovals,
    "purchase-orders": renderPurchaseOrders,
    invoices: renderInvoices,
    reports: renderReports,
    activity: renderActivity,
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Segoe UI, system-ui, sans-serif", background: PALETTE.cloud }}>
      <div style={sidebarStyle}>
        <div style={{ padding: "0 24px 20px", borderBottom: "1px solid rgba(174,184,254,0.2)", marginBottom: 12 }}>
          <span style={{ color: PALETTE.indigo, fontWeight: 700, fontSize: 16, letterSpacing: 0.5 }}>VendorBridge</span>
        </div>
        {NAV.map(n => (
          <div key={n.key} style={navItemStyle(n.key)} onClick={() => setActive(n.key)}>
            — {n.label}
          </div>
        ))}
      </div>
      <div style={mainStyle}>
        {(pages[active] || renderDashboard)()}
      </div>
    </div>
  );
}
