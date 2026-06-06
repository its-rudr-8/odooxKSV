/**
 * Role and permission definitions for the application
 * Defines what features each role can access
 */

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  PROCUREMENT_OFFICER: 'procurement_officer',
  VENDOR: 'vendor',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.MANAGER]: 'Manager',
  [ROLES.PROCUREMENT_OFFICER]: 'Procurement Officer',
  [ROLES.VENDOR]: 'Vendor',
};

/**
 * Feature access matrix: which roles can access which features
 */
export const FEATURE_ACCESS = {
  // User Management
  viewUsers: [ROLES.ADMIN],
  createUsers: [ROLES.ADMIN],
  editUsers: [ROLES.ADMIN],
  deleteUsers: [ROLES.ADMIN],

  // Vendor Management
  viewVendors: [ROLES.ADMIN, ROLES.PROCUREMENT_OFFICER],
  createVendors: [ROLES.ADMIN],
  editVendors: [ROLES.ADMIN],
  deleteVendors: [ROLES.ADMIN],
  viewVendorProfile: [ROLES.VENDOR, ROLES.ADMIN, ROLES.PROCUREMENT_OFFICER],

  // RFQ Management
  viewRfqs: [ROLES.PROCUREMENT_OFFICER, ROLES.VENDOR, ROLES.MANAGER],
  createRfqs: [ROLES.PROCUREMENT_OFFICER],
  editRfqs: [ROLES.PROCUREMENT_OFFICER],
  deleteRfqs: [ROLES.PROCUREMENT_OFFICER],
  assignVendors: [ROLES.PROCUREMENT_OFFICER],
  submitRfq: [ROLES.PROCUREMENT_OFFICER],

  // Quotation Management
  viewQuotations: [ROLES.PROCUREMENT_OFFICER, ROLES.VENDOR, ROLES.MANAGER],
  createQuotations: [ROLES.VENDOR],
  editQuotations: [ROLES.VENDOR],
  deleteQuotations: [ROLES.VENDOR],
  selectQuotation: [ROLES.PROCUREMENT_OFFICER, ROLES.MANAGER],

  // Purchase Order Management
  viewPurchaseOrders: [ROLES.PROCUREMENT_OFFICER, ROLES.VENDOR, ROLES.MANAGER],
  createPurchaseOrders: [ROLES.PROCUREMENT_OFFICER],
  editPurchaseOrders: [ROLES.PROCUREMENT_OFFICER],
  deletePurchaseOrders: [ROLES.PROCUREMENT_OFFICER],

  // Invoice Management
  viewInvoices: [ROLES.PROCUREMENT_OFFICER, ROLES.MANAGER],
  createInvoices: [ROLES.PROCUREMENT_OFFICER],
  editInvoices: [ROLES.PROCUREMENT_OFFICER],
  deleteInvoices: [ROLES.PROCUREMENT_OFFICER],
  markAsPaid: [ROLES.PROCUREMENT_OFFICER, ROLES.MANAGER],

  // Approval Management
  viewApprovals: [ROLES.MANAGER, ROLES.ADMIN],
  approveItems: [ROLES.MANAGER],
  rejectItems: [ROLES.MANAGER],

  // Analytics
  viewAnalytics: [ROLES.ADMIN, ROLES.MANAGER],
  exportReports: [ROLES.ADMIN],

  // Notifications
  viewNotifications: [ROLES.ADMIN, ROLES.MANAGER, ROLES.PROCUREMENT_OFFICER, ROLES.VENDOR],
};

/**
 * Check if a role has access to a feature
 * @param {string} userRole - The user's role
 * @param {string} featureName - The feature to check
 * @returns {boolean} - True if role can access the feature
 */
export function hasFeatureAccess(userRole, featureName) {
  if (!userRole || !featureName) return false;
  const allowedRoles = FEATURE_ACCESS[featureName] || [];
  return allowedRoles.includes(userRole);
}

/**
 * Check if a role is one of the admin roles
 */
export function isAdmin(userRole) {
  return userRole === ROLES.ADMIN;
}

/**
 * Check if a role is procurement officer
 */
export function isProcurementOfficer(userRole) {
  return userRole === ROLES.PROCUREMENT_OFFICER;
}

/**
 * Check if a role is vendor
 */
export function isVendor(userRole) {
  return userRole === ROLES.VENDOR;
}

/**
 * Check if a role is manager
 */
export function isManager(userRole) {
  return userRole === ROLES.MANAGER;
}
