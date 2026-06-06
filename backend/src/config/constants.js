const { ROLES, ROLE_LABELS, ROLE_VALUES } = require('./roles.constants');
const { PERMISSIONS, ROLE_PERMISSION_MAP } = require('./permissions.constants');
const { RFQ_STATUS, RFQ_STATUS_VALUES } = require('./rfqStatus.constants');
const { QUOTATION_STATUS, QUOTATION_STATUS_VALUES } = require('./quotationStatus.constants');
const { APPROVAL_STATUS, APPROVAL_STATUS_VALUES } = require('./approvalStatus.constants');
const { PURCHASE_ORDER_STATUS, PURCHASE_ORDER_STATUS_VALUES } = require('./purchaseOrderStatus.constants');
const { INVOICE_STATUS, INVOICE_STATUS_VALUES } = require('./invoiceStatus.constants');

const ENTITY_STATUS = {
  rfq: RFQ_STATUS_VALUES,
  quotation: QUOTATION_STATUS_VALUES,
  approval: APPROVAL_STATUS_VALUES,
  purchaseOrder: PURCHASE_ORDER_STATUS_VALUES,
  invoice: INVOICE_STATUS_VALUES,
  vendor: ['active', 'inactive', 'suspended', 'blacklisted'],
};

const DOCUMENT_PREFIX = Object.freeze({
  rfq: 'RFQ',
  quotation: 'QUO',
  purchaseOrder: 'PO',
  invoice: 'INV',
});

module.exports = {
  ROLES,
  ROLE_LABELS,
  ROLE_VALUES,
  PERMISSIONS,
  ROLE_PERMISSION_MAP,
  RFQ_STATUS,
  RFQ_STATUS_VALUES,
  QUOTATION_STATUS,
  QUOTATION_STATUS_VALUES,
  APPROVAL_STATUS,
  APPROVAL_STATUS_VALUES,
  PURCHASE_ORDER_STATUS,
  PURCHASE_ORDER_STATUS_VALUES,
  INVOICE_STATUS,
  INVOICE_STATUS_VALUES,
  ENTITY_STATUS,
  DOCUMENT_PREFIX,
};