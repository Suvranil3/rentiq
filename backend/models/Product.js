const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  dailyPrice: { type: Number, required: true },
  weeklyPrice: { type: Number, default: 0 },
  monthlyPrice: { type: Number, default: 0 },
  securityDeposit: { type: Number, required: true },
  totalStock: { type: Number, required: true, default: 1 },
  availableStock: { type: Number, required: true, default: 1 },
  status: {
    type: String,
    enum: ['Available', 'Unavailable', 'Maintenance'],
    default: 'Available'
  },
  images: { type: [String], default: [] },
  specifications: { type: Map, of: String, default: {} }
}, { timestamps: true });

// Virtual: auto-set status from availableStock
productSchema.pre('save', function (next) {
  if (this.availableStock <= 0) this.status = 'Unavailable';
  else this.status = 'Available';
  next();
});

module.exports = mongoose.model('Product', productSchema);
