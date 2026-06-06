import { useAuth } from '../hooks/useAuth';
import { hasFeatureAccess, FEATURE_ACCESS } from '../utils/rolePermissions';

/**
 * RoleBasedFeature Component
 * Conditionally renders content based on user role and required features
 * 
 * Usage:
 * <RoleBasedFeature feature="viewUsers">
 *   <button>View Users</button>
 * </RoleBasedFeature>
 * 
 * Or with multiple features (all must match):
 * <RoleBasedFeature features={["viewUsers", "editUsers"]}>
 *   <button>Manage Users</button>
 * </RoleBasedFeature>
 * 
 * Or with allowed roles:
 * <RoleBasedFeature roles={["admin", "manager"]}>
 *   <button>Admin Action</button>
 * </RoleBasedFeature>
 */
export default function RoleBasedFeature({ feature, features = [], roles = [], children, fallback = null }) {
  const { user } = useAuth();

  if (!user) {
    return fallback;
  }

  // If specific roles are provided, check role membership
  if (roles.length > 0) {
    const hasRole = roles.includes(user.role);
    return hasRole ? children : fallback;
  }

  // If single feature is provided
  if (feature) {
    const hasAccess = hasFeatureAccess(user.role, feature);
    return hasAccess ? children : fallback;
  }

  // If multiple features are provided (user must have access to all)
  if (features.length > 0) {
    const hasAllAccess = features.every(f => hasFeatureAccess(user.role, f));
    return hasAllAccess ? children : fallback;
  }

  // No restrictions provided, render children
  return children;
}
