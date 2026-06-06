const VENDOR_STATUS = Object.freeze({
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  BLACKLISTED: 'Blacklisted',
  PENDING_VERIFICATION: 'Pending Verification',
});

const VENDOR_STATUS_VALUES = Object.freeze(Object.values(VENDOR_STATUS));

module.exports = { VENDOR_STATUS, VENDOR_STATUS_VALUES };
