const QUOTATION_STATUS = Object.freeze({
  SUBMITTED: 'submitted',
  SELECTED: 'selected',
  REJECTED: 'rejected',
});

const QUOTATION_STATUS_VALUES = Object.freeze(Object.values(QUOTATION_STATUS));

module.exports = { QUOTATION_STATUS, QUOTATION_STATUS_VALUES };
