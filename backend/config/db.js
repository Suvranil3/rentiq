const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`⚠️  MongoDB not available: ${err.message}`);
    console.warn('   Server running in no-DB mode — frontend mock data will be used.');
  }
};

module.exports = connectDB;
