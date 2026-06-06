const ROLES = Object.freeze({
  ADMIN: 'admin',
  MANAGER: 'manager',
  PROCUREMENT_OFFICER: 'procurement_officer',
  VENDOR: 'vendor',
});

const ROLE_LABELS = Object.freeze({
  [ROLES.ADMIN]: 'Admin',
  [ROLES.MANAGER]: 'Manager',
  [ROLES.PROCUREMENT_OFFICER]: 'Procurement Officer',
  [ROLES.VENDOR]: 'Vendor',
});

const ROLE_VALUES = Object.freeze(Object.values(ROLES));

module.exports = { ROLES, ROLE_LABELS, ROLE_VALUES };
