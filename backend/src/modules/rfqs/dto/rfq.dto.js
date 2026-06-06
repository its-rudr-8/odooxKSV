function mapReference(entity) {
  if (!entity) {
    return null;
  }

  if (!entity._id) {
    return entity;
  }

  return {
    id: entity._id,
    vendorCode: entity.vendorCode,
    companyName: entity.companyName,
    email: entity.email,
    role: entity.role,
    status: entity.status,
  };
}

function mapItem(item) {
  return {
    itemName: item.itemName,
    description: item.description,
    quantity: item.quantity,
    unit: item.unit,
    estimatedPrice: item.estimatedPrice,
  };
}

function mapAttachment(attachment) {
  return {
    fileName: attachment.fileName,
    fileUrl: attachment.fileUrl,
    fileType: attachment.fileType,
    size: attachment.size,
  };
}

function toRfqDto(rfq) {
  return {
    id: rfq._id,
    rfqNumber: rfq.rfqNumber,
    title: rfq.title,
    description: rfq.description,
    category: rfq.category,
    priority: rfq.priority,
    budget: rfq.budget,
    requiredDeliveryDate: rfq.requiredDeliveryDate,
    quotationDeadline: rfq.quotationDeadline,
    status: rfq.status,
    items: Array.isArray(rfq.items) ? rfq.items.map(mapItem) : [],
    assignedVendors: Array.isArray(rfq.assignedVendors) ? rfq.assignedVendors.map(mapReference) : [],
    attachments: Array.isArray(rfq.attachments) ? rfq.attachments.map(mapAttachment) : [],
    remarks: rfq.remarks,
    createdBy: mapReference(rfq.createdBy),
    updatedBy: mapReference(rfq.updatedBy),
    openAt: rfq.openAt,
    closedAt: rfq.closedAt,
    cancelledAt: rfq.cancelledAt,
    createdAt: rfq.createdAt,
    updatedAt: rfq.updatedAt,
  };
}

module.exports = { toRfqDto };