const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, unique: true },
  quotationId: { type: String, default: null },
  rentalId: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  rentalFee: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['UNPAID', 'PAID', 'CANCELLED'],
    default: 'PAID'
  },
  issueDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

invoiceSchema.pre('save', function (next) {
  if (!this.invoiceId) {
    const year = new Date().getFullYear();
    const rand = Math.floor(100000 + Math.random() * 900000);
    this.invoiceId = `INV-${year}-${rand}`;
  }
  next();
});

invoiceSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = doc.invoiceId || (ret._id ? ret._id.toString() : doc._id.toString());
    return ret;
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
