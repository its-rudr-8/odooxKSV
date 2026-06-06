const INVOICE_STATUS = Object.freeze({
  DRAFT: 'draft',
  GENERATED: 'generated',
  PAID: 'paid',
});

const INVOICE_STATUS_VALUES = Object.freeze(Object.values(INVOICE_STATUS));

module.exports = { INVOICE_STATUS, INVOICE_STATUS_VALUES };
