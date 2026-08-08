require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
};

const name = getArg('--name') || process.env.ADMIN_NAME || 'Operations Admin';
const email = getArg('--email') || process.env.ADMIN_EMAIL || 'admin2@rentiq.com';
const password = getArg('--password') || process.env.ADMIN_PASSWORD || 'admin123';
const phone = getArg('--phone') || '+91 98765 00002';

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const cleanEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail });

    if (existing) {
      if (existing.role === 'admin') {
        console.log(`⚠️ User account ${cleanEmail} is already registered as an Admin.`);
      } else {
        existing.role = 'admin';
        await existing.save();
        console.log(`🎉 Promoted existing customer account ${cleanEmail} to Admin!`);
      }
      process.exit(0);
    }

    const admin = await User.create({
      name,
      email: cleanEmail,
      password,
      phone,
      role: 'admin',
      status: 'Active'
    });

    console.log('\n🎉 Admin account created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Name     : ${admin.name}`);
    console.log(`Email    : ${admin.email}`);
    console.log(`Password : ${password}`);
    console.log(`Role     : ${admin.role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
