/**
 * ROLE-BASED ACCESS CONTROL USAGE GUIDE
 * 
 * This guide shows how to implement role-based feature visibility in your components.
 * The system provides 3 ways to control access:
 */

// ============================================================================
// METHOD 1: Using the RoleBasedFeature Component (Recommended for UI elements)
// ============================================================================

/*
import { RoleBasedFeature } from '@/components';

export default function ExamplePage() {
  return (
    <>
      {/* Only Admin can see this button */}
      <RoleBasedFeature roles={['admin']}>
        <button>Delete User</button>
      </RoleBasedFeature>

      {/* Only Procurement Officer and Manager can see this */}
      <RoleBasedFeature roles={['procurement_officer', 'manager']}>
        <button>Approve RFQ</button>
      </RoleBasedFeature>

      {/* Using feature names */}
      <RoleBasedFeature feature="canViewUsers">
        <div>User List</div>
      </RoleBasedFeature>

      {/* Multiple features - all must be true */}
      <RoleBasedFeature features={['viewInvoices', 'editInvoices']}>
        <button>Edit Invoice</button>
      </RoleBasedFeature>

      {/* Show something else if no access */}
      <RoleBasedFeature 
        feature="viewAnalytics" 
        fallback={<p>You don't have access to analytics</p>}
      >
        <AnalyticsChart />
      </RoleBasedFeature>
    </>
  );
}
*/

// ============================================================================
// METHOD 2: Using the usePermissions Hook (Best for conditional logic)
// ============================================================================

/*
import { usePermissions } from '@/hooks';

export default function RfqsPage() {
  const { isAdmin, isProcurementOfficer, canCreateRfqs, canEditRfqs, userRole } = usePermissions();

  return (
    <>
      {canCreateRfqs && (
        <button onClick={handleCreateRfq}>Create New RFQ</button>
      )}

      {canEditRfqs && (
        <button onClick={handleEditRfq}>Edit RFQ</button>
      )}

      {isAdmin && (
        <div>Admin-only actions</div>
      )}

      <p>Current role: {userRole}</p>
    </>
  );
}
*/

// ============================================================================
// METHOD 3: Route Protection (Already implemented in App.jsx)
// ============================================================================

/*
import { RequireAuth } from '@/components';

// In your routes:
<Route 
  path="/users" 
  element={
    <RequireAuth allowedRoles={['admin']}>
      <UsersPage />
    </RequireAuth>
  } 
/>
*/

// ============================================================================
// AVAILABLE ROLES
// ============================================================================

const ROLES = {
  ADMIN: 'admin',                           // Full system access
  MANAGER: 'manager',                       // Approval and oversight
  PROCUREMENT_OFFICER: 'procurement_officer', // RFQ, quotation, PO, invoice management
  VENDOR: 'vendor',                         // Can submit quotations
};

// ============================================================================
// AVAILABLE PERMISSION CHECKS IN usePermissions HOOK
// ============================================================================

/*
const {
  // Role checks
  isAdmin, isProcurementOfficer, isVendor, isManager, userRole,

  // User Management
  canViewUsers, canCreateUsers, canEditUsers, canDeleteUsers,

  // Vendor Management
  canViewVendors, canCreateVendors, canEditVendors, canDeleteVendors,

  // RFQ Management
  canViewRfqs, canCreateRfqs, canEditRfqs, canDeleteRfqs, canAssignVendors,

  // Quotation Management
  canViewQuotations, canCreateQuotations, canEditQuotations, canSelectQuotation,

  // Purchase Order Management
  canViewPurchaseOrders, canCreatePurchaseOrders, canEditPurchaseOrders,

  // Invoice Management
  canViewInvoices, canCreateInvoices, canEditInvoices, canMarkAsPaid,

  // Approval Management
  canViewApprovals, canApproveItems, canRejectItems,

  // Analytics
  canViewAnalytics, canExportReports,

  // Generic checks
  hasFeatureAccess(featureName),           // Check any single feature
  hasAllFeatures(featureArray),             // All features must be true
  hasAnyFeature(featureArray),              // At least one feature must be true
} = usePermissions();
*/

// ============================================================================
// PRACTICAL EXAMPLES
// ============================================================================

/*
// Example 1: Vendor Dashboard - only show their own data
export function VendorDashboard() {
  const { isVendor } = usePermissions();

  if (!isVendor) return <div>Access Denied</div>;

  return (
    <>
      <h1>My RFQs</h1>
      <RfqList myOnly={true} />
    </>
  );
}

// Example 2: Admin User Management
export function UsersPage() {
  const { canCreateUsers, canEditUsers, canDeleteUsers } = usePermissions();

  return (
    <>
      <RoleBasedFeature roles={['admin']}>
        <h1>User Management</h1>
      </RoleBasedFeature>

      {canCreateUsers && <CreateUserButton />}
      {canEditUsers && <UserEditForm />}
      {canDeleteUsers && <DeleteUserButton />}
    </>
  );
}

// Example 3: RFQ Page with role-specific actions
export function RfqsPage() {
  const { canCreateRfqs, canAssignVendors, canViewRfqs } = usePermissions();

  if (!canViewRfqs) {
    return <div>You don't have permission to view RFQs</div>;
  }

  return (
    <>
      <h1>Request for Quotations</h1>

      <RoleBasedFeature features={['createRfqs', 'assignVendors']}>
        <button>Create RFQ</button>
        <button>Assign Vendors</button>
      </RoleBasedFeature>

      <RfqList />
    </>
  );
}

// Example 4: Generic feature check
export function AnalyticsPage() {
  const permissions = usePermissions();

  const reportTypes = [
    { name: 'Vendor Performance', feature: 'viewAnalytics' },
    { name: 'Invoice Status', feature: 'viewInvoices' },
    { name: 'RFQ Metrics', feature: 'viewRfqs' },
  ];

  return (
    <>
      <h1>Analytics Dashboard</h1>
      {reportTypes.map(report => (
        <div key={report.name}>
          {permissions.hasFeatureAccess(report.feature) && (
            <ReportCard name={report.name} />
          )}
        </div>
      ))}
    </>
  );
}
*/

export default {
  ROLES,
};
