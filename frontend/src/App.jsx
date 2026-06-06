import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import VendorsPage from './pages/VendorsPage';
import RfqsPage from './pages/RfqsPage';
import QuotationsPage from './pages/QuotationsPage';
import ApprovalsPage from './pages/ApprovalsPage';
import PurchaseOrdersPage from './pages/PurchaseOrdersPage';
import InvoicesPage from './pages/InvoicesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotificationsPage from './pages/NotificationsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForbiddenPage from './pages/ForbiddenPage';
import NotFoundPage from './pages/NotFoundPage';
import DebugPage from './pages/DebugPage';
import RequireAuth from './components/RequireAuth';

export default function App() {
  return (
    <Routes>
      <Route path="/debug" element={<DebugPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<RequireAuth allowedRoles={[ 'admin' ]}><UsersPage /></RequireAuth>} />
          <Route path="/vendors" element={<RequireAuth allowedRoles={[ 'admin' ]}><VendorsPage /></RequireAuth>} />
          <Route path="/rfqs" element={<RequireAuth allowedRoles={[ 'procurement_officer', 'vendor' ]}><RfqsPage /></RequireAuth>} />
          <Route path="/quotations" element={<RequireAuth allowedRoles={[ 'procurement_officer', 'vendor' ]}><QuotationsPage /></RequireAuth>} />
          <Route path="/approvals" element={<RequireAuth allowedRoles={[ 'manager' ]}><ApprovalsPage /></RequireAuth>} />
          <Route path="/purchase-orders" element={<RequireAuth allowedRoles={[ 'procurement_officer', 'vendor' ]}><PurchaseOrdersPage /></RequireAuth>} />
          <Route path="/invoices" element={<RequireAuth allowedRoles={[ 'procurement_officer' ]}><InvoicesPage /></RequireAuth>} />
          <Route path="/analytics" element={<RequireAuth allowedRoles={[ 'admin' ]}><AnalyticsPage /></RequireAuth>} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
