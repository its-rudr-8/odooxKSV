const APPROVAL_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
});

const APPROVAL_STATUS_VALUES = Object.freeze(Object.values(APPROVAL_STATUS));

module.exports = { APPROVAL_STATUS, APPROVAL_STATUS_VALUES };
