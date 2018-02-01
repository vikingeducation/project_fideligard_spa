const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  ticker: { type: String, required: true },
  type: { type: String, required: true },
  shares: { type: Number, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true }
}, {
  timestamps: true
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
