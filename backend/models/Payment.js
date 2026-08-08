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
    enum: ['PAID', 'HELD', 'PENDING', 'REFUNDED', 'FAILED'],
    default: 'PAID'
  },
  date: { type: String, default: () => new Date().toLocaleString() }
}, { timestamps: true });

// Auto-generate unique transactionId before save
paymentSchema.pre('save', function (next) {
  if (!this.transactionId) {
    const rand = Math.floor(100000 + Math.random() * 900000);
    this.transactionId = `TXN-${Date.now()}-${rand}`;
  }
  next();
});

paymentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = doc.transactionId || (ret._id ? ret._id.toString() : doc._id.toString());
    return ret;
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
