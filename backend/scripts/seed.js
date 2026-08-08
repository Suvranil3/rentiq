require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Rental = require('../models/Rental');
const Payment = require('../models/Payment');
const Address = require('../models/Address');
const Quotation = require('../models/Quotation');
const Invoice = require('../models/Invoice');
const Pricelist = require('../models/Pricelist');
const { FULL_PRODUCTS } = require('./productData');

const CUSTOMERS_RAW = [
  { name: 'Alex Johnson', email: 'alex@example.com', phone: '+91 98765 43210', street: '42 Studio Heights, Indiranagar', city: 'Bengaluru', state: 'Karnataka', zip: '560038' },
  { name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 11111', street: '12 MG Road, Ashok Nagar', city: 'Bengaluru', state: 'Karnataka', zip: '560001' },
  { name: 'Rohan Verma', email: 'rohan@example.com', phone: '+91 98765 22222', street: '88 Bandra Reclamation', city: 'Mumbai', state: 'Maharashtra', zip: '400050' },
  { name: 'Aanya Kapoor', email: 'aanya@example.com', phone: '+91 98765 33333', street: '15 Connaught Place', city: 'New Delhi', state: 'Delhi', zip: '110001' },
  { name: 'Kabir Mehta', email: 'kabir@example.com', phone: '+91 98765 44444', street: '74 Juhu Tara Road', city: 'Mumbai', state: 'Maharashtra', zip: '400049' },
  { name: 'Neha Gupta', email: 'neha@example.com', phone: '+91 98765 55555', street: '29 Jubilee Hills, Road No. 36', city: 'Hyderabad', state: 'Telangana', zip: '500033' },
  { name: 'Vikram Malhotra', email: 'vikram@example.com', phone: '+91 98765 66666', street: '102 Nungambakkam High Rd', city: 'Chennai', state: 'Tamil Nadu', zip: '600034' },
  { name: 'Diya Sen', email: 'diya@example.com', phone: '+91 98765 77777', street: '5 Park Street', city: 'Kolkata', state: 'West Bengal', zip: '700016' },
  { name: 'Arjun Nair', email: 'arjun@example.com', phone: '+91 98765 88888', street: '63 MG Road, Fort Kochi', city: 'Kochi', state: 'Kerala', zip: '682001' },
  { name: 'Sanya Patel', email: 'sanya@example.com', phone: '+91 98765 99999', street: '14 CG Road, Navrangpura', city: 'Ahmedabad', state: 'Gujarat', zip: '380009' },
  { name: 'Aditya Joshi', email: 'aditya@example.com', phone: '+91 98765 12345', street: '51 FC Road, Shivajinagar', city: 'Pune', state: 'Maharashtra', zip: '411004' },
  { name: 'Meera Rao', email: 'meera@example.com', phone: '+91 98765 23456', street: '89 Koramangala 5th Block', city: 'Bengaluru', state: 'Karnataka', zip: '560095' },
  { name: 'Dev Bhatia', email: 'dev@example.com', phone: '+91 98765 34567', street: '22 Sector 17-C', city: 'Chandigarh', state: 'Chandigarh', zip: '160017' },
  { name: 'Ishita Roy', email: 'ishita@example.com', phone: '+91 98765 45678', street: '45 Salt Lake Sector V', city: 'Kolkata', state: 'West Bengal', zip: '700091' },
  { name: 'Karan Saxena', email: 'karan@example.com', phone: '+91 98765 56789', street: '78 C-Scheme, Ashok Nagar', city: 'Jaipur', state: 'Rajasthan', zip: '302001' },
  { name: 'Anushka Reddy', email: 'anushka@example.com', phone: '+91 98765 67890', street: '33 Gachibowli Main Rd', city: 'Hyderabad', state: 'Telangana', zip: '500032' },
  { name: 'Rahul Deshmukh', email: 'rahul@example.com', phone: '+91 98765 78901', street: '11 Powai Plaza, Hiranandani', city: 'Mumbai', state: 'Maharashtra', zip: '400076' },
  { name: 'Pooja Banerjee', email: 'pooja@example.com', phone: '+91 98765 89012', street: '92 Ballygunge Circular Rd', city: 'Kolkata', state: 'West Bengal', zip: '700019' },
  { name: 'Siddharth Gill', email: 'siddharth@example.com', phone: '+91 98765 90123', street: '5 Sector 35-B', city: 'Chandigarh', state: 'Chandigarh', zip: '160035' },
  { name: 'Tanvi Kulkarni', email: 'tanvi@example.com', phone: '+91 98765 01234', street: '67 Viman Nagar, Datta Mandir', city: 'Pune', state: 'Maharashtra', zip: '411014' },
  { name: 'Yash Singhania', email: 'yash@example.com', phone: '+91 98765 11223', street: '104 Greater Kailash 1', city: 'New Delhi', state: 'Delhi', zip: '110048' },
  { name: 'Ritika Agarwal', email: 'ritika@example.com', phone: '+91 98765 22334', street: '19 Sector 62, Electronic City', city: 'Noida', state: 'Uttar Pradesh', zip: '201301' },
  { name: 'Manish Chopra', email: 'manish@example.com', phone: '+91 98765 33445', street: '85 DLF Phase 5', city: 'Gurugram', state: 'Haryana', zip: '122002' },
  { name: 'Shreya Iyer', email: 'shreya@example.com', phone: '+91 98765 44556', street: '41 Adyar East', city: 'Chennai', state: 'Tamil Nadu', zip: '600020' },
  { name: 'Tarun Dave', email: 'tarun@example.com', phone: '+91 98765 55667', street: '12 Ghod Dod Road', city: 'Surat', state: 'Gujarat', zip: '395007' },
  { name: 'Nisha Pandey', email: 'nisha@example.com', phone: '+91 98765 66778', street: '30 Hazratganj Main Market', city: 'Lucknow', state: 'Uttar Pradesh', zip: '226001' },
  { name: 'Varun Khurana', email: 'varun@example.com', phone: '+91 98765 77889', street: '53 Vasant Vihar Block B', city: 'New Delhi', state: 'Delhi', zip: '110057' },
  { name: 'Kavya Menon', email: 'kavya@example.com', phone: '+91 98765 88990', street: '84 Kowdiar Palace Rd', city: 'Thiruvananthapuram', state: 'Kerala', zip: '695003' },
  { name: 'Sameer Jain', email: 'sameer@example.com', phone: '+91 98765 99001', street: '26 Vijay Nagar, AB Road', city: 'Indore', state: 'Madhya Pradesh', zip: '452010' },
  { name: 'Deepika Sethi', email: 'deepika@example.com', phone: '+91 98765 00112', street: '99 HSR Layout Sector 1', city: 'Bengaluru', state: 'Karnataka', zip: '560102' }
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

    // 1. Create Admin & Customer Users
    const usersToCreate = [
      {
        name: 'Admin User',
        email: 'admin@rentiq.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91 98765 00001',
        status: 'Active',
        joinedDate: '2026-07-01'
      },
      ...CUSTOMERS_RAW.map((c, index) => ({
        name: c.name,
        email: c.email,
        password: 'customer123',
        role: 'customer',
        phone: c.phone,
        status: index % 15 === 14 ? 'Suspended' : 'Active',
        joinedDate: `2026-07-${String((index % 25) + 1).padStart(2, '0')}`,
        totalRentals: 0,
        activeRentals: 0
      }))
    ];

    const createdUsers = await User.create(usersToCreate);
    const adminUser = createdUsers.find(u => u.role === 'admin');
    const customerUsers = createdUsers.filter(u => u.role === 'customer');
    console.log(`👥 Created ${createdUsers.length} users (1 Admin + 30 Customers)`);

    // 2. Create Products from 215+ Unique Product Catalog
    const createdProducts = await Product.insertMany(FULL_PRODUCTS);
    console.log(`📦 Created ${createdProducts.length} unique equipment products`);

    // 3. Create Pricelists
    const pricelists = await Pricelist.insertMany([
      { category: 'Cinema Cameras', hourlyRate: 500, dailyRate: 3500, weeklyRate: 19000, monthlyRate: 60000, securityDeposit: 50000 },
      { category: 'Mirrorless Cameras', hourlyRate: 300, dailyRate: 1800, weeklyRate: 10000, monthlyRate: 32000, securityDeposit: 25000 },
      { category: 'Camera Lenses', hourlyRate: 180, dailyRate: 900, weeklyRate: 5000, monthlyRate: 16000, securityDeposit: 15000 },
      { category: 'Gimbals & Stabilizers', hourlyRate: 150, dailyRate: 800, weeklyRate: 4500, monthlyRate: 15000, securityDeposit: 12000 },
      { category: 'Studio Audio & Mics', hourlyRate: 80, dailyRate: 400, weeklyRate: 2200, monthlyRate: 7500, securityDeposit: 8000 },
      { category: 'Field Recorders', hourlyRate: 120, dailyRate: 600, weeklyRate: 3500, monthlyRate: 12000, securityDeposit: 10000 },
      { category: 'Studio & Flash Lighting', hourlyRate: 200, dailyRate: 1200, weeklyRate: 7000, monthlyRate: 22000, securityDeposit: 20000 },
      { category: 'Drones & Aerial', hourlyRate: 700, dailyRate: 3500, weeklyRate: 20000, monthlyRate: 65000, securityDeposit: 50000 },
      { category: 'Laptops & Workstations', hourlyRate: 500, dailyRate: 2500, weeklyRate: 15000, monthlyRate: 50000, securityDeposit: 80000 },
      { category: 'Monitors & Wireless Video', hourlyRate: 250, dailyRate: 1400, weeklyRate: 7800, monthlyRate: 25000, securityDeposit: 22000 },
      { category: 'VR & Action Cameras', hourlyRate: 200, dailyRate: 1100, weeklyRate: 6000, monthlyRate: 20000, securityDeposit: 18000 },
      { category: 'Tripods & Camera Support', hourlyRate: 100, dailyRate: 550, weeklyRate: 3000, monthlyRate: 10000, securityDeposit: 8000 },
      { category: 'Power & Battery Stations', hourlyRate: 150, dailyRate: 800, weeklyRate: 4500, monthlyRate: 14000, securityDeposit: 12000 },
      { category: 'Electric Mobility', hourlyRate: 350, dailyRate: 1800, weeklyRate: 10000, monthlyRate: 32000, securityDeposit: 35000 }
    ]);
    console.log(`🏷️  Created ${pricelists.length} pricelist tiers`);

    // 4. Create Addresses for Customers
    const addressDocs = customerUsers.map((cust, idx) => {
      const raw = CUSTOMERS_RAW[idx];
      return {
        userId: cust._id,
        fullName: cust.name,
        phone: cust.phone,
        street: raw.street,
        city: raw.city,
        state: raw.state,
        zip: raw.zip,
        country: 'India',
        isDefault: true
      };
    });
    await Address.insertMany(addressDocs);
    console.log(`📍 Created customer delivery addresses`);

    // 5. Generate Rental Orders & Payments for Customers across 215+ Products
    const rentalsToCreate = [];
    const paymentsToCreate = [];
    const quotationsToCreate = [];
    const invoicesToCreate = [];

    const customerStatsMap = {};
    customerUsers.forEach(u => {
      customerStatsMap[u._id.toString()] = { total: 0, active: 0 };
    });

    const statusOptions = ['Active', 'Returned', 'Overdue', 'Active', 'Returned', 'Returned', 'Overdue', 'Cancelled'];
    const deliveryMethods = ['Store Pickup', 'Ship to Address'];
    const paymentMethods = ['Online Payment', 'Credit Card', 'UPI', 'Cash on Delivery', 'Net Banking'];

    let rentalCounter = 8801;

    customerUsers.forEach((customer, custIdx) => {
      const numRentals = (custIdx === 0) ? 3 : (custIdx % 3 === 0) ? 2 : 1;

      for (let r = 0; r < numRentals; r++) {
        const pIndex = (custIdx * 7 + r * 13) % createdProducts.length;
        const product = createdProducts[pIndex];
        const rentalStatus = statusOptions[(custIdx * 2 + r) % statusOptions.length];

        const days = 3 + ((custIdx + r) % 5);
        const startDay = 1 + ((custIdx * 2 + r) % 20);
        const startDateStr = `2026-08-${String(startDay).padStart(2, '0')}`;
        const endDay = startDay + days;
        const endDateStr = `2026-08-${String(Math.min(endDay, 30)).padStart(2, '0')}`;

        const totalAmount = product.dailyPrice * days;
        const securityDeposit = product.securityDeposit;
        const deliveryMethod = deliveryMethods[(custIdx + r) % 2];
        const rawAddr = CUSTOMERS_RAW[custIdx];
        const deliveryAddress = deliveryMethod === 'Ship to Address'
          ? `${rawAddr.street}, ${rawAddr.city}, ${rawAddr.state} ${rawAddr.zip}`
          : '';
        const payMethod = paymentMethods[(custIdx + r) % paymentMethods.length];

        let depositStatus = 'HELD';
        if (rentalStatus === 'Returned' || rentalStatus === 'Cancelled') depositStatus = 'REFUNDED';

        const paymentStatus = rentalStatus === 'Cancelled' ? 'PENDING' : 'PAID';
        const rentalId = `RNT-2026-${rentalCounter++}`;

        const isCompleted = rentalStatus === 'Returned';
        const timeline = [
          { step: 'Booked', date: `${startDateStr} 09:30 AM`, completed: true },
          { step: 'Confirmed', date: `${startDateStr} 09:35 AM`, completed: true },
          { step: 'Picked Up / Shipped', date: `${startDateStr} 11:00 AM`, completed: true },
          { step: 'Active Rental', date: startDateStr, completed: true },
          { step: 'Returned', date: isCompleted ? `${endDateStr} 02:00 PM` : null, completed: isCompleted },
          { step: 'Deposit Settled', date: isCompleted ? `${endDateStr} 02:30 PM` : null, completed: isCompleted }
        ];

        let inspectionReport = null;
        if (rentalStatus === 'Returned') {
          inspectionReport = {
            condition: custIdx % 4 === 0 ? 'Good' : 'Excellent',
            damageNotes: custIdx % 4 === 0 ? 'Minor cosmetic wear' : 'No damage reported',
            missingAccessories: [],
            lateFee: 0,
            deductionAmount: 0,
            refundAmount: securityDeposit,
            inspectionDate: `${endDateStr} 02:15 PM`
          };
        }

        rentalsToCreate.push({
          rentalId,
          userId: customer._id,
          productId: product._id,
          productName: product.name,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          startDate: startDateStr,
          endDate: endDateStr,
          dailyRate: product.dailyPrice,
          totalAmount,
          securityDeposit,
          deliveryMethod,
          deliveryAddress,
          paymentMethod: payMethod,
          status: rentalStatus,
          depositStatus,
          paymentStatus,
          timeline,
          inspectionReport
        });

        customerStatsMap[customer._id.toString()].total += 1;
        if (rentalStatus === 'Active' || rentalStatus === 'Overdue') {
          customerStatsMap[customer._id.toString()].active += 1;
        }

        // Payments
        const txnFeeId = `TXN-9${rentalCounter}1`;
        const txnHoldId = `TXN-9${rentalCounter}2`;

        paymentsToCreate.push({
          transactionId: txnFeeId,
          customer: customer.name,
          rentalId,
          type: 'Rental Fee',
          amount: totalAmount,
          method: payMethod,
          status: paymentStatus,
          date: `${startDateStr} 09:35 AM`
        });

        if (paymentStatus === 'PAID') {
          paymentsToCreate.push({
            transactionId: txnHoldId,
            customer: customer.name,
            rentalId,
            type: 'Deposit Hold',
            amount: securityDeposit,
            method: 'Escrow Lock',
            status: depositStatus,
            date: `${startDateStr} 09:35 AM`
          });
        }

        if (rentalStatus === 'Returned') {
          paymentsToCreate.push({
            transactionId: `TXN-9${rentalCounter}3`,
            customer: customer.name,
            rentalId,
            type: 'Deposit Refund',
            amount: securityDeposit,
            method: 'Direct Disburse',
            status: 'REFUNDED',
            date: `${endDateStr} 02:30 PM`
          });
        }

        if (custIdx < 10 && r === 0) {
          const qteId = `QTE-2026-10${custIdx + 1}`;
          const invId = `INV-2026-10${custIdx + 1}`;

          quotationsToCreate.push({
            quotationId: qteId,
            userId: customer._id,
            productId: product._id,
            customerName: customer.name,
            customerEmail: customer.email,
            customerPhone: customer.phone,
            productName: product.name,
            startDate: startDateStr,
            endDate: endDateStr,
            rentalFee: totalAmount,
            securityDeposit,
            discount: 0,
            totalAmount: totalAmount + securityDeposit,
            status: 'CONFIRMED',
            createdBy: adminUser._id
          });

          invoicesToCreate.push({
            invoiceId: invId,
            quotationId: qteId,
            rentalId,
            userId: customer._id,
            customerName: customer.name,
            customerEmail: customer.email,
            rentalFee: totalAmount,
            securityDeposit,
            totalAmount: totalAmount + securityDeposit,
            paymentStatus: 'PAID',
            issueDate: startDateStr
          });
        }
      }
    });

    const createdRentals = await Rental.insertMany(rentalsToCreate);
    console.log(`📋 Created ${createdRentals.length} rental orders across 30 users`);

    await Payment.insertMany(paymentsToCreate);
    console.log(`💳 Created ${paymentsToCreate.length} payment records`);

    await Quotation.insertMany(quotationsToCreate);
    await Invoice.insertMany(invoicesToCreate);
    console.log(`📄 Created sample quotations and invoices`);

    // 5b. Update availableStock for each product based on active rentals
    let zeroStockCount = 0;
    for (const prod of createdProducts) {
      const activeCount = rentalsToCreate.filter(r =>
        r.productId.toString() === prod._id.toString() &&
        (r.status === 'Active' || r.status === 'Overdue')
      ).length;

      const newAvailable = Math.max(0, prod.totalStock - activeCount);
      if (newAvailable === 0) zeroStockCount++;
      await Product.findByIdAndUpdate(prod._id, { availableStock: newAvailable });
    }
    console.log(`📦 Calculated fleet inventory: ${zeroStockCount} products fully distributed (availableStock = 0)`);

    // 6. Update totalRentals and activeRentals on User documents
    for (const cust of customerUsers) {
      const stats = customerStatsMap[cust._id.toString()];
      await User.findByIdAndUpdate(cust._id, {
        totalRentals: stats.total,
        activeRentals: stats.active
      });
    }
    console.log(`🔄 Updated rental counters for all customer accounts`);

    console.log('\n🎉 Seed complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin Account    → admin@rentiq.com / admin123');
    console.log('Customer Accounts → alex@example.com, priya@example.com, ... (password: customer123)');
    console.log(`Total Users      → ${createdUsers.length} (${customerUsers.length} Customers)`);
    console.log(`Total Products   → ${createdProducts.length} Unique Gear Items`);
    console.log(`Total Rentals    → ${createdRentals.length}`);
    console.log(`Total Payments   → ${paymentsToCreate.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    console.error(err.stack);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
