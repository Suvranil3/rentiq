const mongoose = require('mongoose');

const timelineStepSchema = new mongoose.Schema({
  step: String,
  date: { type: String, default: null },
  completed: { type: Boolean, default: false }
}, { _id: false });

const inspectionSchema = new mongoose.Schema({
  condition: { type: String, default: 'Good' },
  damageNotes: { type: String, default: 'No damage reported' },
  missingAccessories: { type: [String], default: [] },
  lateFee: { type: Number, default: 0 },
  deductionAmount: { type: Number, default: 0 },
  refundAmount: { type: Number, default: 0 },
  inspectionDate: { type: String, default: null }
}, { _id: false });

const rentalSchema = new mongoose.Schema({
  rentalId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  customerName: { type: String, default: '' },
  customerEmail: { type: String, default: '' },
  customerPhone: { type: String, default: '' },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  dailyRate: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  deliveryMethod: { type: String, default: 'Store Pickup' },
  deliveryAddress: { type: String, default: '' },
  paymentMethod: { type: String, default: 'Online Payment' },
  status: {
    type: String,
    enum: ['Active', 'Returned', 'Overdue', 'Cancelled'],
    default: 'Active'
  },
  depositStatus: {
    type: String,
    enum: ['HELD', 'PENDING_COLLECTION', 'REFUNDED', 'FULLY_DEDUCTED', 'PARTIALLY_DEDUCTED'],
    default: 'HELD'
  },
  paymentStatus: {
    type: String,
    enum: ['PAID', 'PENDING', 'FAILED'],
    default: 'PAID'
  },
  timeline: { type: [timelineStepSchema], default: [] },
  inspectionReport: { type: inspectionSchema, default: null }
}, { timestamps: true });

// Auto-generate unique rentalId before save
rentalSchema.pre('save', function (next) {
  if (!this.rentalId) {
    const year = new Date().getFullYear();
    const rand = Math.floor(100000 + Math.random() * 900000);
    this.rentalId = `RNT-${year}-${rand}`;
  }
  next();
});

rentalSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = doc.rentalId || (ret._id ? ret._id.toString() : doc._id.toString());
    return ret;
  }
});

module.exports = mongoose.model('Rental', rentalSchema);
