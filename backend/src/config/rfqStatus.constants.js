const RFQ_STATUS = Object.freeze({
  DRAFT: 'Draft',
  OPEN: 'Open',
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled',
});

const RFQ_STATUS_VALUES = Object.freeze(Object.values(RFQ_STATUS));

module.exports = { RFQ_STATUS, RFQ_STATUS_VALUES };
