const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true },
  customer: { type: String, required: true },
  rentalId: { type: String, required: true },
  type: {
    type: String,
    enum: ['Rental Fee', 'Deposit Hold', 'Deposit Refund', 'Late Fee Penalty', 'Damage Deduction'],
    required: true
  },
  amount: { type: Number, required: true },
  method: { type: String, default: 'Online Payment' },
  status: {
    type: String,
    enum: ['PAID', 'HELD', 'REFUNDED', 'FAILED'],
    default: 'PAID'
  },
  date: { type: String, default: () => new Date().toLocaleString() }
}, { timestamps: true });

// Auto-generate transactionId
paymentSchema.pre('save', function (next) {
  if (!this.transactionId) {
    this.transactionId = `TXN-${Date.now()}`;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
