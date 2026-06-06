export const ROLE_DASHBOARD_PATHS = {
  admin: '/dashboard/admin',
  manager: '/dashboard/manager',
  procurement_officer: '/dashboard/procurement',
  vendor: '/dashboard/vendor',
};

export function getDashboardPath(role) {
  return ROLE_DASHBOARD_PATHS[role] || ROLE_DASHBOARD_PATHS.procurement_officer;
}
