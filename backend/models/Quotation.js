const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  quotationId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, default: '' },
  productName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  rentalFee: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['DRAFT', 'CONFIRMED', 'CANCELLED'],
    default: 'DRAFT'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

quotationSchema.pre('save', function (next) {
  if (!this.quotationId) {
    const year = new Date().getFullYear();
    const rand = Math.floor(100000 + Math.random() * 900000);
    this.quotationId = `QTE-${year}-${rand}`;
  }
  next();
});

quotationSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = doc.quotationId || (ret._id ? ret._id.toString() : doc._id.toString());
    return ret;
  }
});

module.exports = mongoose.model('Quotation', quotationSchema);
