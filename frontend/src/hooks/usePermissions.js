import { useAuth } from './useAuth';
import { hasFeatureAccess, isAdmin, isProcurementOfficer, isVendor, isManager } from '../utils/rolePermissions';

/**
 * Hook for checking user permissions and roles
 * 
 * Usage in components:
 * const { canViewUsers, canEditInvoices, userRole, isUserAdmin } = usePermissions();
 * 
 * if (canViewUsers) {
 *   // render something
 * }
 */
export function usePermissions() {
  const { user } = useAuth();
  const userRole = user?.role;

  return {
    userRole,
    
    // Role checks
    isAdmin: isAdmin(userRole),
    isProcurementOfficer: isProcurementOfficer(userRole),
    isVendor: isVendor(userRole),
    isManager: isManager(userRole),
    
    // User Management
    canViewUsers: hasFeatureAccess(userRole, 'viewUsers'),
    canCreateUsers: hasFeatureAccess(userRole, 'createUsers'),
    canEditUsers: hasFeatureAccess(userRole, 'editUsers'),
    canDeleteUsers: hasFeatureAccess(userRole, 'deleteUsers'),
    
    // Vendor Management
    canViewVendors: hasFeatureAccess(userRole, 'viewVendors'),
    canCreateVendors: hasFeatureAccess(userRole, 'createVendors'),
    canEditVendors: hasFeatureAccess(userRole, 'editVendors'),
    canDeleteVendors: hasFeatureAccess(userRole, 'deleteVendors'),
    
    // RFQ Management
    canViewRfqs: hasFeatureAccess(userRole, 'viewRfqs'),
    canCreateRfqs: hasFeatureAccess(userRole, 'createRfqs'),
    canEditRfqs: hasFeatureAccess(userRole, 'editRfqs'),
    canDeleteRfqs: hasFeatureAccess(userRole, 'deleteRfqs'),
    canAssignVendors: hasFeatureAccess(userRole, 'assignVendors'),
    
    // Quotation Management
    canViewQuotations: hasFeatureAccess(userRole, 'viewQuotations'),
    canCreateQuotations: hasFeatureAccess(userRole, 'createQuotations'),
    canEditQuotations: hasFeatureAccess(userRole, 'editQuotations'),
    canSelectQuotation: hasFeatureAccess(userRole, 'selectQuotation'),
    
    // Purchase Order Management
    canViewPurchaseOrders: hasFeatureAccess(userRole, 'viewPurchaseOrders'),
    canCreatePurchaseOrders: hasFeatureAccess(userRole, 'createPurchaseOrders'),
    canEditPurchaseOrders: hasFeatureAccess(userRole, 'editPurchaseOrders'),
    
    // Invoice Management
    canViewInvoices: hasFeatureAccess(userRole, 'viewInvoices'),
    canCreateInvoices: hasFeatureAccess(userRole, 'createInvoices'),
    canEditInvoices: hasFeatureAccess(userRole, 'editInvoices'),
    canMarkAsPaid: hasFeatureAccess(userRole, 'markAsPaid'),
    
    // Approval Management
    canViewApprovals: hasFeatureAccess(userRole, 'viewApprovals'),
    canApproveItems: hasFeatureAccess(userRole, 'approveItems'),
    canRejectItems: hasFeatureAccess(userRole, 'rejectItems'),
    
    // Analytics
    canViewAnalytics: hasFeatureAccess(userRole, 'viewAnalytics'),
    canExportReports: hasFeatureAccess(userRole, 'exportReports'),
    
    // Notifications
    canViewNotifications: hasFeatureAccess(userRole, 'viewNotifications'),
    
    // Generic feature check
    hasFeatureAccess: (feature) => hasFeatureAccess(userRole, feature),
    hasAllFeatures: (features) => Array.isArray(features) && features.every(f => hasFeatureAccess(userRole, f)),
    hasAnyFeature: (features) => Array.isArray(features) && features.some(f => hasFeatureAccess(userRole, f)),
  };
}
