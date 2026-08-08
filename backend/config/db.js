const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000 // Fast fail after 3s if MongoDB server is offline
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`⚠️  MongoDB connection failed: ${err.message}`);
    console.warn('   Server running with in-memory fallback mode (No-DB mode).');
    mongoose.set('bufferCommands', false);
  }
};

module.exports = connectDB;
