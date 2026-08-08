require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const Rental = require('../models/Rental');
const Payment = require('../models/Payment');
const Address = require('../models/Address');
const Quotation = require('../models/Quotation');
const Invoice = require('../models/Invoice');
const Pricelist = require('../models/Pricelist');

const PRODUCTS = [
  {
    name: 'Sony Alpha A7 III',
    brand: 'Sony',
    category: 'Camera',
    description: 'Full-frame mirrorless camera with 24.2MP sensor. Perfect for professional photography.',
    dailyPrice: 1500,
    weeklyPrice: 8500,
    monthlyPrice: 28000,
    securityDeposit: 25000,
    totalStock: 3,
    availableStock: 3,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: { 'Sensor': '24.2MP Full-Frame', 'ISO': '100-51200', 'Video': '4K HDR', 'Weight': '565g' }
  },
  {
    name: 'Canon EOS R5',
    brand: 'Canon',
    category: 'Camera',
    description: 'High-resolution 45MP mirrorless camera with 8K RAW video recording.',
    dailyPrice: 2000,
    weeklyPrice: 12000,
    monthlyPrice: 40000,
    securityDeposit: 35000,
    totalStock: 2,
    availableStock: 2,
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: { 'Sensor': '45MP Full-Frame', 'ISO': '100-102400', 'Video': '8K RAW', 'Weight': '738g' }
  },
  {
    name: 'DJI Ronin-S',
    brand: 'DJI',
    category: 'Stabilizer',
    description: '3-axis gimbal stabilizer for DSLR and mirrorless cameras up to 3.6kg.',
    dailyPrice: 800,
    weeklyPrice: 4500,
    monthlyPrice: 15000,
    securityDeposit: 12000,
    totalStock: 4,
    availableStock: 4,
    images: [
      'https://images.unsplash.com/photo-1571945147346-4b7fd5df5c41?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: { 'Payload': '3.6 kg', 'Battery Life': '12 hours', 'Axes': '3-Axis', 'Weight': '1.8 kg' }
  },
  {
    name: 'Rode NT1-A Microphone',
    brand: 'Rode',
    category: 'Audio',
    description: 'Studio-quality condenser microphone with ultra-low noise floor.',
    dailyPrice: 400,
    weeklyPrice: 2200,
    monthlyPrice: 7500,
    securityDeposit: 8000,
    totalStock: 5,
    availableStock: 5,
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: { 'Type': 'Condenser', 'Pattern': 'Cardioid', 'Frequency': '20Hz–20kHz', 'S/N Ratio': '88dB' }
  },
  {
    name: 'Godox AD400 Pro Flash',
    brand: 'Godox',
    category: 'Lighting',
    description: 'Outdoor battery-powered strobe flash, 400W with TTL & HSS support.',
    dailyPrice: 600,
    weeklyPrice: 3500,
    monthlyPrice: 12000,
    securityDeposit: 10000,
    totalStock: 6,
    availableStock: 6,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: { 'Power': '400W', 'Recycle Time': '0.01-1.5s', 'Battery Life': '390 full-power flashes', 'Weight': '1.3 kg' }
  },
  {
    name: 'DJI Mavic 3 Pro Drone',
    brand: 'DJI',
    category: 'Drone',
    description: 'Professional drone with triple-camera Hasselblad system and 43-min flight time.',
    dailyPrice: 3500,
    weeklyPrice: 20000,
    monthlyPrice: 65000,
    securityDeposit: 50000,
    totalStock: 2,
    availableStock: 2,
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: { 'Camera': 'Hasselblad L-Format', 'Max Flight': '43 min', 'Range': '15 km', 'Video': '5.1K/50fps' }
  },
  {
    name: 'MacBook Pro M3 Max 16"',
    brand: 'Apple',
    category: 'Laptop',
    description: 'Professional-grade laptop for video editing, 3D rendering, and creative work.',
    dailyPrice: 2500,
    weeklyPrice: 15000,
    monthlyPrice: 50000,
    securityDeposit: 80000,
    totalStock: 3,
    availableStock: 3,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: { 'Chip': 'Apple M3 Max', 'RAM': '128GB', 'Storage': '4TB SSD', 'Display': '16.2" Liquid Retina XDR' }
  },
  {
    name: 'Sennheiser EW 100 G4 Wireless Kit',
    brand: 'Sennheiser',
    category: 'Audio',
    description: 'Professional wireless microphone system with bodypack transmitter and handheld.',
    dailyPrice: 700,
    weeklyPrice: 4000,
    monthlyPrice: 13500,
    securityDeposit: 15000,
    totalStock: 4,
    availableStock: 4,
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: { 'Frequency': 'UHF', 'Range': '100 m', 'Battery': 'AA x2', 'Channels': '20 banks x 12' }
  }
];

const USERS = [
  {
    name: 'Admin User',
    email: 'admin@rentiq.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 98765 00001',
    status: 'Active'
  },
  {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'customer123',
    role: 'customer',
    phone: '+91 98765 43210',
    status: 'Active',
    totalRentals: 3,
    activeRentals: 1
  },
  {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'customer123',
    role: 'customer',
    phone: '+91 98765 11111',
    status: 'Active',
    totalRentals: 2,
    activeRentals: 1
  },
  {
    name: 'Rohan Verma',
    email: 'rohan@example.com',
    password: 'customer123',
    role: 'customer',
    phone: '+91 98765 22222',
    status: 'Active',
    totalRentals: 1,
    activeRentals: 0
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Rental.deleteMany({});
    await Payment.deleteMany({});
    await Address.deleteMany({});
    await Quotation.deleteMany({});
    await Invoice.deleteMany({});
    await Pricelist.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed users
    const createdUsers = await User.create(USERS);
    console.log(`👥 Created ${createdUsers.length} users`);

    // Seed products
    const createdProducts = await Product.insertMany(PRODUCTS);
    console.log(`📦 Created ${createdProducts.length} products`);

    // Seed pricelists
    const pricelists = await Pricelist.insertMany([
      { category: 'Camera', hourlyRate: 300, dailyRate: 1500, weeklyRate: 8500, monthlyRate: 28000, securityDeposit: 25000 },
      { category: 'Stabilizer', hourlyRate: 150, dailyRate: 800, weeklyRate: 4500, monthlyRate: 15000, securityDeposit: 12000 },
      { category: 'Audio', hourlyRate: 80, dailyRate: 400, weeklyRate: 2200, monthlyRate: 7500, securityDeposit: 8000 },
      { category: 'Lighting', hourlyRate: 120, dailyRate: 600, weeklyRate: 3500, monthlyRate: 12000, securityDeposit: 10000 },
      { category: 'Drone', hourlyRate: 700, dailyRate: 3500, weeklyRate: 20000, monthlyRate: 65000, securityDeposit: 50000 },
      { category: 'Laptop', hourlyRate: 500, dailyRate: 2500, weeklyRate: 15000, monthlyRate: 50000, securityDeposit: 80000 }
    ]);
    console.log(`🏷️  Created ${pricelists.length} pricelist tiers`);

    const customer1 = createdUsers.find(u => u.email === 'alex@example.com');
    const customer2 = createdUsers.find(u => u.email === 'priya@example.com');
    const customer3 = createdUsers.find(u => u.email === 'rohan@example.com');
    const admin = createdUsers.find(u => u.email === 'admin@rentiq.com');
    const camera1 = createdProducts[0];
    const camera2 = createdProducts[1];
    const drone = createdProducts[5];
    const now = new Date().toLocaleString();

    // Seed customer addresses
    await Address.create([
      {
        userId: customer1._id,
        fullName: customer1.name,
        phone: customer1.phone,
        street: '42 Studio Heights, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        zip: '560038',
        country: 'India',
        isDefault: true
      },
      {
        userId: customer2._id,
        fullName: customer2.name,
        phone: customer2.phone,
        street: '12, MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        zip: '560001',
        country: 'India',
        isDefault: true
      }
    ]);
    console.log('📍 Created customer addresses');

    // Seed sample quotations & invoices
    const quote1 = await Quotation.create({
      quotationId: 'QTE-2026-1001',
      userId: customer1._id,
      productId: camera1._id,
      customerName: customer1.name,
      customerEmail: customer1.email,
      customerPhone: customer1.phone,
      productName: camera1.name,
      startDate: '2026-08-10',
      endDate: '2026-08-13',
      rentalFee: 4500,
      securityDeposit: 25000,
      discount: 500,
      totalAmount: 29000,
      status: 'CONFIRMED',
      createdBy: admin._id
    });

    await Invoice.create({
      invoiceId: 'INV-2026-1001',
      quotationId: quote1.quotationId,
      userId: customer1._id,
      customerName: customer1.name,
      customerEmail: customer1.email,
      rentalFee: 4500,
      securityDeposit: 25000,
      totalAmount: 29000,
      paymentStatus: 'PAID'
    });
    console.log('📄 Created sample quotations and invoices');

    const rentals = await Rental.create([
      {
        rentalId: 'RNT-2026-8801',
        userId: customer1._id,
        productId: camera1._id,
        productName: camera1.name,
        customerName: customer1.name,
        customerEmail: customer1.email,
        startDate: '2026-08-03',
        endDate: '2026-08-10',
        dailyRate: 1500,
        totalAmount: 10500,
        securityDeposit: 25000,
        deliveryMethod: 'Store Pickup',
        status: 'Active',
        depositStatus: 'HELD',
        paymentStatus: 'PAID',
        timeline: [
          { step: 'Booked', date: '2026-08-03 10:00 AM', completed: true },
          { step: 'Confirmed', date: '2026-08-03 10:05 AM', completed: true },
          { step: 'Picked Up / Shipped', date: 'Ready for Store Pickup', completed: true },
          { step: 'Active Rental', date: '2026-08-03', completed: true },
          { step: 'Returned', date: null, completed: false },
          { step: 'Deposit Settled', date: null, completed: false }
        ]
      },
      {
        rentalId: 'RNT-2026-8802',
        userId: customer2._id,
        productId: camera2._id,
        productName: camera2.name,
        customerName: customer2.name,
        customerEmail: customer2.email,
        startDate: '2026-07-28',
        endDate: '2026-08-04',
        dailyRate: 2000,
        totalAmount: 14000,
        securityDeposit: 35000,
        deliveryMethod: 'Ship to Address',
        deliveryAddress: '12, MG Road, Bengaluru',
        status: 'Overdue',
        depositStatus: 'HELD',
        paymentStatus: 'PAID',
        timeline: [
          { step: 'Booked', date: '2026-07-28 09:00 AM', completed: true },
          { step: 'Confirmed', date: '2026-07-28 09:10 AM', completed: true },
          { step: 'Picked Up / Shipped', date: 'Processing Dispatch', completed: true },
          { step: 'Active Rental', date: '2026-07-28', completed: true },
          { step: 'Returned', date: null, completed: false },
          { step: 'Deposit Settled', date: null, completed: false }
        ]
      },
      {
        rentalId: 'RNT-2026-8803',
        userId: customer3._id,
        productId: drone._id,
        productName: drone.name,
        customerName: customer3.name,
        customerEmail: customer3.email,
        startDate: '2026-07-25',
        endDate: '2026-08-01',
        dailyRate: 3500,
        totalAmount: 24500,
        securityDeposit: 50000,
        deliveryMethod: 'Store Pickup',
        status: 'Returned',
        depositStatus: 'REFUNDED',
        paymentStatus: 'PAID',
        timeline: [
          { step: 'Booked', date: '2026-07-25 11:00 AM', completed: true },
          { step: 'Confirmed', date: '2026-07-25 11:05 AM', completed: true },
          { step: 'Picked Up / Shipped', date: 'Ready for Store Pickup', completed: true },
          { step: 'Active Rental', date: '2026-07-25', completed: true },
          { step: 'Returned', date: '2026-08-01 02:00 PM', completed: true },
          { step: 'Deposit Settled', date: '2026-08-01 02:30 PM', completed: true }
        ],
        inspectionReport: {
          condition: 'Excellent',
          damageNotes: 'No damage reported',
          missingAccessories: [],
          lateFee: 0,
          deductionAmount: 0,
          refundAmount: 50000,
          inspectionDate: '2026-08-01 02:15 PM'
        }
      }
    ]);
    console.log(`📋 Created ${rentals.length} rentals`);

    // Seed payments
    await Payment.create([
      { transactionId: 'TXN-9011', customer: 'Alex Johnson', rentalId: 'RNT-2026-8801', type: 'Rental Fee', amount: 10500, method: 'Online Payment', status: 'PAID', date: '2026-08-03 10:15 AM' },
      { transactionId: 'TXN-9012', customer: 'Alex Johnson', rentalId: 'RNT-2026-8801', type: 'Deposit Hold', amount: 25000, method: 'Escrow Lock', status: 'HELD', date: '2026-08-03 10:15 AM' },
      { transactionId: 'TXN-9013', customer: 'Priya Sharma', rentalId: 'RNT-2026-8802', type: 'Rental Fee', amount: 14000, method: 'Online Payment', status: 'PAID', date: '2026-07-28 09:15 AM' },
      { transactionId: 'TXN-9014', customer: 'Priya Sharma', rentalId: 'RNT-2026-8802', type: 'Deposit Hold', amount: 35000, method: 'Escrow Lock', status: 'HELD', date: '2026-07-28 09:15 AM' },
      { transactionId: 'TXN-9015', customer: 'Rohan Verma', rentalId: 'RNT-2026-8803', type: 'Rental Fee', amount: 24500, method: 'Online Payment', status: 'PAID', date: '2026-07-25 11:10 AM' },
      { transactionId: 'TXN-9016', customer: 'Rohan Verma', rentalId: 'RNT-2026-8803', type: 'Deposit Refund', amount: 50000, method: 'Direct Disburse', status: 'REFUNDED', date: '2026-08-01 02:30 PM' }
    ]);
    console.log('💳 Created payment records');

    console.log('\n🎉 Seed complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin   → admin@rentiq.com / admin123');
    console.log('Customer → alex@example.com / customer123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
