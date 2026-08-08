// Isolated Mock Database Engine for RentIQ Frontend Demonstration

export const INITIAL_PRODUCTS = [
  {
    id: "prod-101",
    name: "Canon EOS R6 Mark II Mirrorless Camera",
    category: "Cameras",
    brand: "Canon",
    manufacturer: "Canon Inc.",
    color: "Black",
    size: "138.4 x 98.4 x 88.4 mm",
    shortDescription: "Full-frame 24.2MP mirrorless camera with 4K 60p video and advanced autofocus.",
    fullDescription: "The Canon EOS R6 Mark II sets new performance standards with a 24.2 megapixel full-frame CMOS sensor, burst shooting up to 40 fps with electronic shutter, 4K 60p raw video output, and Dual Pixel CMOS AF II.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
    ],
    hourlyPrice: 250,
    dailyPrice: 1500,
    weeklyPrice: 7500,
    monthlyPrice: 24000,
    securityDeposit: 5000,
    totalStock: 8,
    availableStock: 5,
    status: "Available",
    featured: true,
    specs: {
      Sensor: "24.2MP Full-Frame CMOS",
      "Video Resolution": "4K 60p 10-bit",
      "ISO Range": "100-102400",
      "Mount": "Canon RF",
      "Weight": "670g"
    }
  },
  {
    id: "prod-102",
    name: "Sony FX3 Cinema Line Camera",
    category: "Cameras",
    brand: "Sony",
    manufacturer: "Sony Corporation",
    color: "Dark Gray",
    size: "129.7 x 77.8 x 84.5 mm",
    shortDescription: "Compact cinema camera with full-frame sensor, active cooling, and S-Cinetone.",
    fullDescription: "Designed for solo creators and indie filmmakers, the Sony FX3 features a 12.1MP full-frame back-illuminated Exmor R CMOS sensor, 4K 120p recording, 15+ stops of dynamic range, and top handle audio recorder.",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80"
    ],
    hourlyPrice: 350,
    dailyPrice: 2200,
    weeklyPrice: 11000,
    monthlyPrice: 35000,
    securityDeposit: 8000,
    totalStock: 6,
    availableStock: 2,
    status: "Available",
    featured: true,
    specs: {
      Sensor: "12.1MP Full-Frame Exmor R",
      "Video Resolution": "4K 120p / FHD 240p",
      "Cooling": "Active Internal Fan",
      "Audio": "XLR Top Handle Included",
      "Weight": "715g"
    }
  },
  {
    id: "prod-103",
    name: "DJI Mavic 3 Pro Drone Combo",
    category: "Drones",
    brand: "DJI",
    manufacturer: "DJI Innovations",
    color: "Light Slate",
    size: "231 x 98 x 95 mm (Folded)",
    shortDescription: "Triple-camera flagship drone with 4/3 CMOS Hasselblad camera and 43-min flight time.",
    fullDescription: "Elevate your aerial footage with the DJI Mavic 3 Pro. Features a triple-camera system including a 4/3 CMOS Hasselblad 20MP lens, 70mm tele, and 166mm tele, omnidirectional obstacle sensing, and 15km HD video transmission.",
    images: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80"
    ],
    hourlyPrice: 300,
    dailyPrice: 1800,
    weeklyPrice: 9000,
    monthlyPrice: 28000,
    securityDeposit: 6000,
    totalStock: 5,
    availableStock: 4,
    status: "Available",
    featured: true,
    specs: {
      Camera: "Hasselblad 4/3 CMOS + Dual Tele",
      "Flight Time": "43 Minutes max",
      "Transmission": "DJI O3+ 15km",
      "Video": "5.1K 50fps / 4K 120fps",
      "Weight": "958g"
    }
  },
  {
    id: "prod-104",
    name: "Sennheiser EW-DP Wireless Mic System",
    category: "Audio",
    brand: "Sennheiser",
    manufacturer: "Sennheiser Electronic",
    color: "Black",
    size: "Compact Receiver",
    shortDescription: "Digital UHF wireless microphone system with ME 2 omnidirectional lavalier.",
    fullDescription: "Professional fully digital UHF wireless microphone system delivering crystal-clear pristine audio capture, automated frequency management, magnetic stacking receiver, and low 1.9ms latency.",
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"
    ],
    hourlyPrice: 120,
    dailyPrice: 700,
    weeklyPrice: 3200,
    monthlyPrice: 9500,
    securityDeposit: 2500,
    totalStock: 10,
    availableStock: 7,
    status: "Available",
    featured: false,
    specs: {
      Frequency: "Digital UHF (470 - 526 MHz)",
      "Dynamic Range": "134 dB",
      "Latency": "1.9 ms",
      "Battery Life": "7 Hours"
    }
  },
  {
    id: "prod-105",
    name: "Aputure 600d Pro Daylight LED Monolight",
    category: "Lighting",
    brand: "Aputure",
    manufacturer: "Aputure Tech",
    color: "Black / Silver",
    size: "302 x 150 x 150 mm",
    shortDescription: "Ultra-bright 600W daylight point-source LED light with Bowens mount.",
    fullDescription: "The Aputure 600d Pro delivers output comparable to a 1200W HMI, drawing only 720W. IP54 weather-resistant, wireless DMX control, hyper reflector included, perfect for high-end video shoots.",
    images: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
    ],
    hourlyPrice: 200,
    dailyPrice: 1200,
    weeklyPrice: 5800,
    monthlyPrice: 18000,
    securityDeposit: 4000,
    totalStock: 4,
    availableStock: 3,
    status: "Available",
    featured: true,
    specs: {
      CCT: "5600K Daylight",
      CRI: "96+",
      Output: "98,500 lux @ 1m (Hyper Reflector)",
      Rating: "IP54 Weather Resistant"
    }
  },
  {
    id: "prod-106",
    name: "Super73 RX Electric Adventure Bike",
    category: "Mobility",
    brand: "Super73",
    manufacturer: "Super73 Inc.",
    color: "Obsidian Black",
    size: "Full Frame Electric",
    shortDescription: "High-performance urban electric motor-bike with dual suspension.",
    fullDescription: "Experience urban exploration with the Super73 RX. Features a 2000W peak motor, up to 40mph top speed, adjustable front and rear suspension, quad-piston hydraulic disc brakes, and multi-class ride modes.",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
    ],
    hourlyPrice: 180,
    dailyPrice: 1100,
    weeklyPrice: 5000,
    monthlyPrice: 16000,
    securityDeposit: 4500,
    totalStock: 5,
    availableStock: 2,
    status: "Available",
    featured: false,
    specs: {
      "Motor Power": "2000W Peak",
      "Battery Range": "40-75 Miles",
      Brakes: "Magura Quad-Piston",
      Suspension: "Full Adjustable Air Coil"
    }
  }
];

export const INITIAL_RENTALS = [
  {
    id: "RNT-2026-8801",
    userId: "u-101",
    customerName: "Alex Johnson",
    customerEmail: "customer@rentiq.com",
    customerPhone: "+91 98765 43210",
    productId: "prod-101",
    productName: "Canon EOS R6 Mark II Mirrorless Camera",
    productImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-08-04",
    endDate: "2026-08-07",
    deliveryMethod: "Ship to Address",
    shippingAddress: {
      street: "42 MG Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      zip: "560038"
    },
    quantity: 1,
    rentalFee: 4500,
    securityDeposit: 5000,
    totalAmount: 9500,
    status: "Active",
    depositStatus: "HELD",
    paymentStatus: "PAID",
    createdDate: "2026-08-03",
    timeline: [
      { step: "Booked", date: "2026-08-03 10:15 AM", completed: true },
      { step: "Confirmed", date: "2026-08-03 10:30 AM", completed: true },
      { step: "Picked Up / Shipped", date: "2026-08-04 09:00 AM", completed: true },
      { step: "Active Rental", date: "2026-08-04 11:00 AM", completed: true },
      { step: "Returned", date: null, completed: false },
      { step: "Deposit Settled", date: null, completed: false }
    ],
    inspectionReport: null
  },
  {
    id: "RNT-2026-8802",
    userId: "u-102",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    customerPhone: "+91 91234 56789",
    productId: "prod-102",
    productName: "Sony FX3 Cinema Line Camera",
    productImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-07-28",
    endDate: "2026-08-02",
    deliveryMethod: "Store Pickup",
    shippingAddress: null,
    quantity: 1,
    rentalFee: 11000,
    securityDeposit: 8000,
    totalAmount: 19000,
    status: "Overdue",
    depositStatus: "HELD",
    paymentStatus: "PAID",
    createdDate: "2026-07-27",
    accruedLateFee: 3000,
    timeline: [
      { step: "Booked", date: "2026-07-27 02:20 PM", completed: true },
      { step: "Confirmed", date: "2026-07-27 02:45 PM", completed: true },
      { step: "Picked Up", date: "2026-07-28 10:00 AM", completed: true },
      { step: "Active Rental", date: "2026-07-28 10:00 AM", completed: true },
      { step: "Returned", date: null, completed: false },
      { step: "Deposit Settled", date: null, completed: false }
    ],
    inspectionReport: null
  },
  {
    id: "RNT-2026-8803",
    userId: "u-103",
    customerName: "Rohan Verma",
    customerEmail: "rohan.v@example.com",
    customerPhone: "+91 99887 76655",
    productId: "prod-103",
    productName: "DJI Mavic 3 Pro Drone Combo",
    productImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    startDate: "2026-08-01",
    endDate: "2026-08-05",
    deliveryMethod: "Store Pickup",
    shippingAddress: null,
    quantity: 1,
    rentalFee: 7200,
    securityDeposit: 6000,
    totalAmount: 13200,
    status: "Returned",
    depositStatus: "REFUNDED",
    paymentStatus: "PAID",
    createdDate: "2026-07-31",
    timeline: [
      { step: "Booked", date: "2026-07-31 11:00 AM", completed: true },
      { step: "Confirmed", date: "2026-07-31 11:15 AM", completed: true },
      { step: "Picked Up", date: "2026-08-01 09:30 AM", completed: true },
      { step: "Active Rental", date: "2026-08-01 09:30 AM", completed: true },
      { step: "Returned", date: "2026-08-05 04:00 PM", completed: true },
      { step: "Deposit Settled", date: "2026-08-05 04:15 PM", completed: true }
    ],
    inspectionReport: {
      condition: "Excellent",
      damageNotes: "Returned in perfect condition. All blades intact.",
      missingAccessories: [],
      lateFee: 0,
      deductionAmount: 0,
      refundAmount: 6000
    }
  }
];

export const INITIAL_USERS = [
  {
    id: "u-101",
    name: "Alex Johnson",
    email: "customer@rentiq.com",
    phone: "+91 98765 43210",
    role: "customer",
    joinedDate: "2025-11-12",
    totalRentals: 4,
    activeRentals: 1,
    status: "Active"
  },
  {
    id: "admin-1",
    name: "Operations Manager",
    email: "admin@rentiq.com",
    phone: "+91 90000 11111",
    role: "admin",
    joinedDate: "2025-01-01",
    totalRentals: 0,
    activeRentals: 0,
    status: "Active"
  },
  {
    id: "u-102",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 91234 56789",
    role: "customer",
    joinedDate: "2026-02-14",
    totalRentals: 2,
    activeRentals: 1,
    status: "Active"
  }
];

export const INITIAL_AI_INSIGHTS = {
  demandForecasts: [
    {
      productId: "prod-101",
      productName: "Canon EOS R6 Mark II Mirrorless Camera",
      currentStock: 5,
      predictedDemand: 12,
      riskLevel: "HIGH",
      recommendation: "Weekend wedding season peak approaching. Increase fleet stock by 4 units."
    },
    {
      productId: "prod-102",
      productName: "Sony FX3 Cinema Line Camera",
      currentStock: 2,
      predictedDemand: 8,
      riskLevel: "CRITICAL",
      recommendation: "High demand from commercial film crews. Stock deficit predicted for next 14 days."
    },
    {
      productId: "prod-103",
      productName: "DJI Mavic 3 Pro Drone Combo",
      currentStock: 4,
      predictedDemand: 4,
      riskLevel: "OPTIMAL",
      recommendation: "Inventory levels aligned with expected outdoor event bookings."
    }
  ],
  predictiveMaintenance: [
    {
      productId: "prod-102",
      unitSerial: "FX3-SN-88402",
      productName: "Sony FX3 Camera (Unit #02)",
      rentalCount: 18,
      hoursUsed: 240,
      damageHistoryCount: 2,
      maintenanceRisk: 84,
      recommendation: "High sensor cleaning & cooling fan inspection required before releasing for next rental."
    },
    {
      productId: "prod-103",
      unitSerial: "M3P-SN-1104",
      productName: "DJI Mavic 3 Pro (Unit #04)",
      rentalCount: 14,
      hoursUsed: 110,
      damageHistoryCount: 0,
      maintenanceRisk: 35,
      recommendation: "Routine rotor blade alignment check suggested."
    }
  ]
};

// Storage helper functions
export const getLocalData = (key, initial) => {
  const stored = localStorage.getItem(`rentiq_${key}`);
  if (!stored) {
    localStorage.setItem(`rentiq_${key}`, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initial;
  }
};

export const setLocalData = (key, data) => {
  localStorage.setItem(`rentiq_${key}`, JSON.stringify(data));
};
