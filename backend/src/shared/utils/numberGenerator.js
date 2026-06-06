const Counter = require("../../modules/counters/schema/counter.schema");

async function nextDocumentNumber({ key, prefix, year = new Date().getFullYear() }) {
  const counter = await Counter.findOneAndUpdate(
    { key, year },
    { $inc: { sequence: 1 }, $setOnInsert: { prefix, year } },
    { new: true, upsert: true },
  );

  return `${counter.prefix || prefix}-${year}-${String(counter.sequence).padStart(6, "0")}`;
}

module.exports = { nextDocumentNumber };