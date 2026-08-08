require('dotenv').config();
const mongoose = require('mongoose');

async function clean() {
  await mongoose.connect(process.env.MONGO_URI);
  const Rental = require('../models/Rental');
  const Payment = require('../models/Payment');

  const deletedRentals = await Rental.deleteMany({ $or: [{ rentalId: null }, { rentalId: { $exists: false } }] });
  const deletedPayments = await Payment.deleteMany({ $or: [{ transactionId: null }, { transactionId: { $exists: false } }] });

  console.log('Cleaned null rentalId count:', deletedRentals.deletedCount);
  console.log('Cleaned null transactionId count:', deletedPayments.deletedCount);
  process.exit(0);
}

clean();
