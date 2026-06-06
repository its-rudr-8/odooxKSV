const PURCHASE_ORDER_STATUS = Object.freeze({
  CREATED: 'created',
  SENT: 'sent',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
});

const PURCHASE_ORDER_STATUS_VALUES = Object.freeze(Object.values(PURCHASE_ORDER_STATUS));

module.exports = { PURCHASE_ORDER_STATUS, PURCHASE_ORDER_STATUS_VALUES };
