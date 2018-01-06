const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvestmentSchema = new Schema({
  ticker: { type: String, required: true },
  shares: { type: Number, required: true }
}, {
  timestamps: true
});

const Investment = mongoose.models.Investment || mongoose.model('Investment', InvestmentSchema);

module.exports = Investment;
