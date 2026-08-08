const mongoose = require('mongoose');

const pricelistSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  hourlyRate: { type: Number, required: true },
  dailyRate: { type: Number, required: true },
  weeklyRate: { type: Number, required: true },
  monthlyRate: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

pricelistSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id ? ret._id.toString() : doc._id.toString();
    return ret;
  }
});

module.exports = mongoose.model('Pricelist', pricelistSchema);
