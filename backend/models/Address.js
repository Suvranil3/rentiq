const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, default: 'India' },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

addressSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id ? ret._id.toString() : doc._id.toString();
    return ret;
  }
});

module.exports = mongoose.model('Address', addressSchema);
