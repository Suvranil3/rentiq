require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');

const defaultImg = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80';

const categoriesData = [
  {
    category: 'Cameras',
    brands: ['Sony', 'Canon', 'ARRI', 'RED', 'Blackmagic', 'Nikon', 'Panasonic', 'Fujifilm', 'Hasselblad', 'Leica'],
    items: [
      { name: 'Sony Alpha A7 IV', price: 1800, deposit: 25000, spec: { Sensor: '33MP Full-Frame', Video: '4K 60p 10-bit', Mount: 'Sony E' } },
      { name: 'Sony FX3 Cinema Line', price: 2500, deposit: 35000, spec: { Sensor: '12.1MP Full-Frame', Video: '4K 120p', ISO: '409600' } },
      { name: 'Sony FX6 Cinema Camera', price: 4000, deposit: 55000, spec: { Sensor: '4K Full-Frame CMOS', ND: 'Electronic Variable ND', Mount: 'Sony E' } },
      { name: 'Canon EOS R5 C Cinema', price: 2800, deposit: 40000, spec: { Sensor: '45MP Full-Frame', Video: '8K 60p RAW', Cooling: 'Internal Fan' } },
      { name: 'Canon EOS R6 Mark II', price: 1700, deposit: 22000, spec: { Sensor: '24.2MP Full-Frame', FPS: '40 fps Electronic', Video: '4K 60p' } },
      { name: 'Canon EOS C300 Mark III', price: 4500, deposit: 60000, spec: { Sensor: 'Super 35 DGO', DynamicRange: '16+ Stops', Mount: 'EF/PL' } },
      { name: 'RED V-RAPTOR 8K VV', price: 9500, deposit: 140000, spec: { Sensor: '35.4MP Full-Frame', Video: '8K 120fps RAW', Mount: 'RF Mount' } },
      { name: 'RED Komodo 6K Cinema', price: 4800, deposit: 65000, spec: { Sensor: '6K Super 35 Global Shutter', Video: '6K 40fps', Mount: 'RF Mount' } },
      { name: 'ARRI Alexa Mini LF Kit', price: 18500, deposit: 250000, spec: { Sensor: 'Large Format 4.5K', Recording: 'ARRIRAW / ProRes', Mount: 'PL Mount' } },
      { name: 'ARRI Alexa 35 Camera System', price: 22000, deposit: 300000, spec: { Sensor: 'Super 35 4.6K', DynamicRange: '17 Stops', Colors: 'REVEAL Color' } },
      { name: 'Blackmagic Pocket 6K Pro', price: 1500, deposit: 18000, spec: { Sensor: 'Super 35 HDR', ND: 'Built-in ND Filters', Screen: 'Tiltable HDR' } },
      { name: 'Blackmagic URSA Mini Pro 12K', price: 5000, deposit: 70000, spec: { Sensor: '12K Super 35', Video: '12K 60fps Blackmagic RAW', Mount: 'PL Mount' } },
      { name: 'Nikon Z9 Flagship Mirrorless', price: 3200, deposit: 45000, spec: { Sensor: '45.7MP Stacked CMOS', Video: '8K 60p N-RAW', FPS: '20 fps RAW' } },
      { name: 'Nikon Z8 Mirrorless Camera', price: 2400, deposit: 32000, spec: { Sensor: '45.7MP FX-Format', Video: '8K 30p', Weight: '910g' } },
      { name: 'Panasonic Lumix GH6', price: 1200, deposit: 15000, spec: { Sensor: '25.2MP Micro Four Thirds', Video: '5.7K 60p ProRes', Cooling: 'Active Fan' } },
      { name: 'Panasonic Lumix S1H 6K', price: 2100, deposit: 28000, spec: { Sensor: '24.2MP Full-Frame', Video: '6K 24p 10-bit', DualISO: 'Native Dual ISO' } },
      { name: 'Fujifilm X-H2S Flagship', price: 1600, deposit: 20000, spec: { Sensor: '26.1MP Stacked X-Trans', Video: '6.2K 30p ProRes', FPS: '40 fps' } },
      { name: 'Fujifilm GFX 100 II Medium Format', price: 6500, deposit: 90000, spec: { Sensor: '102MP Medium Format', Video: '8K 30p', IBIS: '8-Stops' } },
      { name: 'Hasselblad X2D 100C', price: 7800, deposit: 110000, spec: { Sensor: '100MP BSI Medium Format', SSD: '1TB Built-in SSD', Colors: 'HNCS 16-bit' } },
      { name: 'Leica SL2 Full-Frame', price: 3800, deposit: 50000, spec: { Sensor: '47.3MP CMOS', EVF: '5.76m-Dot OLED', Construction: 'IP54 Weatherproof' } }
    ]
  },
  {
    category: 'Lenses',
    brands: ['Canon', 'Sony', 'Sigma', 'Zeiss', 'Cooke', 'Angenieux', 'Leica', 'Tokina', 'Samyang', 'Fujinon'],
    items: [
      { name: 'Canon RF 24-70mm f/2.8L IS USM', price: 1200, deposit: 16000, spec: { FocalLength: '24-70mm', Aperture: 'f/2.8', Mount: 'Canon RF' } },
      { name: 'Canon RF 70-200mm f/2.8L IS USM', price: 1500, deposit: 20000, spec: { FocalLength: '70-200mm', Aperture: 'f/2.8', Stabilization: '5 Stops' } },
      { name: 'Canon RF 50mm f/1.2L USM Prime', price: 1100, deposit: 15000, spec: { FocalLength: '50mm', Aperture: 'f/1.2', Elements: '15 Elements in 9 Groups' } },
      { name: 'Sony FE 24-70mm f/2.8 GM II', price: 1300, deposit: 18000, spec: { FocalLength: '24-70mm', Aperture: 'f/2.8', Motors: '4 XD Linear Motors' } },
      { name: 'Sony FE 70-200mm f/2.8 GM OSS II', price: 1600, deposit: 22000, spec: { FocalLength: '70-200mm', Weight: '1045g (29% Lighter)', Aperture: 'f/2.8' } },
      { name: 'Sony FE 50mm f/1.2 GM Prime', price: 1250, deposit: 16500, spec: { FocalLength: '50mm', Aperture: 'f/1.2', Blades: '11 Circular Blades' } },
      { name: 'Sigma 35mm f/1.4 DG DN Art', price: 600, deposit: 8000, spec: { FocalLength: '35mm', Aperture: 'f/1.4', Mount: 'Sony E / L-Mount' } },
      { name: 'Sigma 24-70mm f/2.8 DG DN Art', price: 800, deposit: 10000, spec: { FocalLength: '24-70mm', Aperture: 'f/2.8', Coating: 'Super Multi-Layer' } },
      { name: 'Zeiss CP.3 35mm T2.1 Cine Prime', price: 2500, deposit: 35000, spec: { FocalLength: '35mm', Aperture: 'T2.1', Coverage: 'Full Frame', Mount: 'PL/EF' } },
      { name: 'Zeiss CP.3 50mm T2.1 Cine Prime', price: 2500, deposit: 35000, spec: { FocalLength: '50mm', Aperture: 'T2.1', Coating: 'eXtended Data' } },
      { name: 'Cooke Speed Panchro 50mm T2.3', price: 4500, deposit: 60000, spec: { FocalLength: '50mm', Look: 'Vintage Vintage Panchro', Mount: 'PL Mount' } },
      { name: 'Angenieux EZ-1 30-90mm T2.0 Cinema', price: 6000, deposit: 85000, spec: { FocalLength: '30-90mm', Aperture: 'T2.0', Format: 'S35 & Full Frame' } },
      { name: 'Leica Summilux-C 35mm T1.4 Cine', price: 7500, deposit: 110000, spec: { FocalLength: '35mm', Aperture: 'T1.4', Telecentric: 'Telecentric Optical Design' } },
      { name: 'Tokina Vista 50mm T1.5 Cinema', price: 3200, deposit: 45000, spec: { FocalLength: '50mm', Aperture: 'T1.5', Circle: '46.7mm Image Circle' } },
      { name: 'Fujinon Premista 28-100mm T2.9 Large Format', price: 9000, deposit: 130000, spec: { FocalLength: '28-100mm', Aperture: 'T2.9', Mount: 'PL Mount' } }
    ]
  },
  {
    category: 'Drones',
    brands: ['DJI', 'Autel', 'Freefly', 'Skydio', 'Yuneec'],
    items: [
      { name: 'DJI Inspire 3 8K Cinema Drone', price: 12000, deposit: 180000, spec: { Camera: 'Zenmuse X9-8K Air', Video: '8K 75fps ProRes RAW', Flight: '28 Min' } },
      { name: 'DJI Mavic 3 Cine Combo', price: 3800, deposit: 50000, spec: { Camera: 'Dual Hasselblad 4/3', Codec: 'Apple ProRes 422 HQ', SSD: '1TB Built-in' } },
      { name: 'DJI Mavic 3 Enterprise Thermal (M3T)', price: 4500, deposit: 60000, spec: { Thermal: '640x512 Radiometric', Zoom: '56x Hybrid Zoom', Flight: '38 Min' } },
      { name: 'DJI Air 3 Fly More Combo', price: 1800, deposit: 22000, spec: { Camera: 'Dual Main Cameras', Video: '4K 60p HDR', Flight: '46 Min' } },
      { name: 'DJI Mini 4 Pro Drone Kit', price: 1100, deposit: 12000, spec: { Weight: '<249g', Video: '4K 60fps HDR', Sensing: 'Omnidirectional Obstacle' } },
      { name: 'DJI Avata 2 FPV Explorer Combo', price: 1600, deposit: 18000, spec: { FieldOfView: '155° Ultra Wide', Video: '4K 60fps', MotionController: 'RC Motion 3' } },
      { name: 'Autel EVO II Dual 640T V3', price: 4200, deposit: 55000, spec: { Thermal: '640x512@30Hz', Optical: '50MP 1/1.2" CMOS', Range: '15 km' } },
      { name: 'Freefly Alta X Heavy Lift Drone', price: 25000, deposit: 350000, spec: { Payload: '15.9 kg (35 lbs)', Speed: '60 mph', Propellers: '33" Carbon Blades' } },
      { name: 'Skydio 2+ Enterprise Kit', price: 2900, deposit: 35000, spec: { Autonomy: '360° Computer Vision', Tracking: 'Autonomous Subject Track' } },
      { name: 'DJI Matrice 350 RTK Industrial', price: 14000, deposit: 200000, spec: { Ingress: 'IP55 Protection', Payload: '2.7 kg Max', Transmission: 'O3 Enterprise' } }
    ]
  },
  {
    category: 'Audio',
    brands: ['Sennheiser', 'Rode', 'Sound Devices', 'Shure', 'Neumann', 'DPA', 'Lectrosonics', 'Wisycom', 'Zoom', 'Deity'],
    items: [
      { name: 'Sennheiser MKH 416 Shotgun Microphone', price: 650, deposit: 8000, spec: { Pattern: 'Supercardioid/Lobar', Impedance: '25 Ohms', Frequency: '40Hz-20kHz' } },
      { name: 'Sound Devices 833 8-Channel Field Recorder', price: 3500, deposit: 48000, spec: { Preamps: '6 Ultra-Low Noise Preamps', Channels: '12 Tracks', Storage: '256GB SSD' } },
      { name: 'Wisycom MTP40S Dual Receiver Kit', price: 4200, deposit: 55000, spec: { Bandwidth: 'Up to 232 MHz', Transmitters: '2x Bodypack', Audio: 'Linear Digital Processing' } },
      { name: 'Lectrosonics SRC Dual Receiver System', price: 3800, deposit: 50000, spec: { Architecture: 'Digital Hybrid Wireless', Channels: '2 Channels', Tuning: '75 MHz Range' } },
      { name: 'Shure SM7B Vocal Dynamic Microphone', price: 350, deposit: 4000, spec: { Type: 'Dynamic', Pattern: 'Cardioid', Shielding: 'Electromagnetic Humbucking' } },
      { name: 'Neumann U87 Ai Studio Condenser Mic', price: 2800, deposit: 38000, spec: { Pattern: 'Omni / Cardioid / Figure-8', Transducer: 'Large Dual-Diaphragm' } },
      { name: 'DPA 4017B Shotgun Mic System', price: 1100, deposit: 14000, spec: { Weight: '68g Ultra Lightweight', DynamicRange: '130 dB', Clarity: 'Uncolored Sound' } },
      { name: 'Zoom F8n Pro 32-Bit Float Field Recorder', price: 1200, deposit: 15000, spec: { Resolution: '32-Bit Float 192kHz', Preamps: '8 High Gain Preamps', Channels: '10 Tracks' } },
      { name: 'Rode Wireless PRO Dual Microphone Kit', price: 500, deposit: 6000, spec: { Recording: '32-bit Float On-Board', Range: '260m Transmission', Timecode: 'Built-in Sync' } },
      { name: 'Deity TC-1 Timecode Generator 3-Pack', price: 450, deposit: 5500, spec: { Sync: 'Bluetooth Sidus Audio', Accuracy: '<1 Frame per 24 hours' } }
    ]
  },
  {
    category: 'Lighting',
    brands: ['Aputure', 'ARRI', 'Nanlite', 'Astera', 'Profoto', 'Godox', 'Litepanels', 'Creamsource', 'Fiilex', 'Chauvet'],
    items: [
      { name: 'Aputure Light Storm 600d Pro Daylight', price: 1800, deposit: 24000, spec: { Output: '98500 lux @ 1m', Mount: 'Bowens Mount', IP: 'IP54 Weatherproof' } },
      { name: 'Aputure LS 1200d Pro Daylight Monster', price: 3500, deposit: 48000, spec: { Output: '1200W COB LED', Lux: '83100 lux @ 3m', Controls: 'Sidus Link & DMX' } },
      { name: 'Aputure Electro Storm CS15 RGBWW', price: 5500, deposit: 75000, spec: { Power: '1500W RGBWW COB', CCT: '2000K-10000K', Mount: 'Electronic A-Mount' } },
      { name: 'ARRI SkyPanel S60-C LED Softlight', price: 5000, deposit: 70000, spec: { Aperture: '645 x 300 mm', CCT: '2800K-10000K', Power: '450W Continuous' } },
      { name: 'ARRI Orbiter LED Spot Light', price: 4200, deposit: 58000, spec: { Engine: 'Six-Color Spectra Engine', Optics: 'Changeable Quick Mount' } },
      { name: 'Astera Titan Tube 8-Light Kit with Case', price: 3200, deposit: 42000, spec: { Tubes: '8x 72W RGBMAX Tubes', Battery: '20 Hours Runtime', IP: 'IP65 Water Resistant' } },
      { name: 'Nanlite Forza 720B Bi-Color LED Spotlight', price: 1900, deposit: 25000, spec: { Power: '800W Bi-Color', CCT: '2700K-6500K', CRI: '96 / TLCI 97' } },
      { name: 'Nanlite Pavotube II 30C 4-Light Kit', price: 900, deposit: 11000, spec: { Tubes: '4x 4ft RGBWW Tubes', Effects: '15 Built-in FX', Battery: 'Internal Li-ion' } },
      { name: 'Creamsource Vortex8 800W RGBW High Power', price: 4800, deposit: 65000, spec: { Power: '800W High Output', Beam: '20° Narrow Spot', Protection: 'IP65 Waterproof' } },
      { name: 'Profoto B10X Plus OCF Flash Duo Kit', price: 2200, deposit: 30000, spec: { Power: '500Ws Flash Output', Continuous: '3250 Lumens LED Video Light' } }
    ]
  },
  {
    category: 'Stabilizers',
    brands: ['DJI', 'Easyrig', 'Steadicam', 'Tilta', 'Teradek', 'SmallHD', 'Sachtler', 'Cartoni', 'Dana Dolly'],
    items: [
      { name: 'DJI RS 3 Pro Gimbal Combo', price: 1100, deposit: 14000, spec: { Payload: '4.5 kg (10 lbs)', Arms: 'Extended Carbon Fiber', LiDAR: 'LiDAR Autofocus' } },
      { name: 'DJI Ronin 2 Professional Combo', price: 4500, deposit: 65000, spec: { Payload: '13.6 kg (30 lbs)', Motors: 'High-Torque Motors', Power: 'Dual Battery Hot-Swap' } },
      { name: 'Easyrig Vario 5 with Serene Arm', price: 2200, deposit: 30000, spec: { WeightRange: '5-17 kg (11-38 lbs)', Arm: 'Serene 2-Axis Damping Arm' } },
      { name: 'Steadicam M-2 Volt Camera Stabilizer', price: 8500, deposit: 120000, spec: { Horizon: 'Volt Active Horizon Control', Post: 'Modular 1.75" Carbon Post' } },
      { name: 'Tilta Nucleus-M Wireless Follow Focus Kit', price: 900, deposit: 12000, spec: { Motors: '2x High Torque Motors', Distance: '1000 ft Range', Handsets: 'FIZ Unit + Handles' } },
      { name: 'Teradek Bolt 4K LT 750 Wireless Video', price: 1600, deposit: 22000, spec: { Resolution: '4K HDR 10-bit 4:2:2', Range: '750 ft Zero Delay', Latency: '<1 ms' } },
      { name: 'SmallHD Cine 7 Touchscreen Monitor', price: 1200, deposit: 16000, spec: { Brightness: '1800 nits Daylight Viewable', Control: 'RED / ARRI Camera Control' } },
      { name: 'Sachtler Flowtech 75 Carbon Tripod', price: 1100, deposit: 14000, spec: { Payload: '12 kg (26.5 lbs)', Legs: 'Quick Release Carbon Brakes' } },
      { name: 'Cartoni Focus 12 Fluid Head System', price: 1500, deposit: 20000, spec: { Payload: '12 kg (26 lbs)', Counterbalance: 'Continuous Fluid Counterbalance' } },
      { name: 'Dana Dolly Portable Universal Track Kit', price: 700, deposit: 9000, spec: { Capacity: '45 kg (100 lbs)', Track: '6ft Interlocking Aluminum Rails' } }
    ]
  },
  {
    category: 'Production',
    brands: ['Apple', 'Inovativ', 'EcoFlow', 'Honda', 'Blackmagic', 'Roland', 'Atomos', 'REDCINEMA', 'Super73', 'GoPro'],
    items: [
      { name: 'Apple MacBook Pro 16" M3 Max (128GB RAM)', price: 3000, deposit: 85000, spec: { CPU: '16-Core M3 Max', RAM: '128GB Unified', Storage: '4TB High Speed SSD' } },
      { name: 'Apple Studio Display 27" 5K Retina', price: 1200, deposit: 16000, spec: { Resolution: '5K 5120x2880', Brightness: '600 nits', Glass: 'Nano-Texture Glass' } },
      { name: 'Mac Studio M2 Ultra (192GB RAM)', price: 3800, deposit: 100000, spec: { CPU: '24-Core M2 Ultra', GPU: '76-Core GPU', Storage: '8TB SSD' } },
      { name: 'Inovativ Deploy Executive Production Cart', price: 1500, deposit: 20000, spec: { Capacity: '272 kg (600 lbs)', Wheels: '10" EVO Wheel System', Rack: '16U Integrated Rack' } },
      { name: 'EcoFlow Delta Pro 3600Wh Power Station', price: 1800, deposit: 24000, spec: { Capacity: '3600Wh (Expandable)', ACOutput: '3600W Continuous (7200W Surge)' } },
      { name: 'Honda EU2200i Super Quiet Inverter Generator', price: 750, deposit: 10000, spec: { Power: '2200W Surge / 1800W Rated', Noise: '48 to 57 dBA Ultra Quiet' } },
      { name: 'Blackmagic ATEM Mini Extreme ISO Switcher', price: 1100, deposit: 15000, spec: { Inputs: '8x HDMI Inputs', ISO: 'Record 9 Separate Video Streams' } },
      { name: 'Atomos Ninja Ultra 5.2" 8K HDR Monitor', price: 800, deposit: 10000, spec: { Screen: '1000 nits HDR', Recording: '8K 30p ProRes RAW', OS: 'AtomOS 11' } },
      { name: 'Super73 RX Electric Adventure Bike', price: 2200, deposit: 30000, spec: { Speed: '28+ mph (Class-3)', Range: '40-75 miles', Suspension: 'Fully Adjustable' } },
      { name: 'GoPro HERO12 Black Creator Edition Kit', price: 450, deposit: 5000, spec: { Video: '5.3K 60fps / 4K 120fps', Stabilization: 'HyperSmooth 6.0', Audio: 'Media Mod' } }
    ]
  }
];

function generate200Products() {
  const products = [];
  let idCounter = 1;

  categoriesData.forEach(cat => {
    // Generate base items
    cat.items.forEach(baseItem => {
      const brand = cat.brands[idCounter % cat.brands.length];
      products.push({
        name: baseItem.name,
        brand: brand,
        category: cat.category,
        description: `Professional-grade ${baseItem.name} designed for broadcast, cinema, and high-end commercial production. Thoroughly inspected and calibrated before dispatch.`,
        dailyPrice: baseItem.price,
        weeklyPrice: Math.round(baseItem.price * 5.2),
        monthlyPrice: Math.round(baseItem.price * 18),
        securityDeposit: baseItem.deposit,
        totalStock: 3 + (idCounter % 5),
        availableStock: 3 + (idCounter % 5),
        status: 'Available',
        images: [defaultImg],
        specifications: baseItem.spec
      });
      idCounter++;
    });

    // Expand items with model variants to reach 200 total products
    const variants = ['Mark II', 'Pro Kit', 'V2 System', 'Studio Edition', 'Extreme', 'Ultra', 'Compact', 'Master Set'];
    for (let i = 1; i <= 25; i++) {
      const baseName = cat.items[i % cat.items.length].name;
      const variant = variants[i % variants.length];
      const brand = cat.brands[(idCounter + i) % cat.brands.length];
      const basePrice = cat.items[i % cat.items.length].price + (i * 50);
      const baseDeposit = cat.items[i % cat.items.length].deposit + (i * 500);

      products.push({
        name: `${baseName} ${variant} #${i}`,
        brand: brand,
        category: cat.category,
        description: `High performance ${baseName} ${variant} equipment package. Features enhanced durability, expanded battery life, and complete accessory mounting hardware.`,
        dailyPrice: basePrice,
        weeklyPrice: Math.round(basePrice * 5.2),
        monthlyPrice: Math.round(basePrice * 18),
        securityDeposit: baseDeposit,
        totalStock: 2 + (i % 4),
        availableStock: 2 + (i % 4),
        status: 'Available',
        images: [defaultImg],
        specifications: {
          Format: 'Professional Grade',
          Variant: variant,
          Revision: `Rev-${i}.0`,
          Warranty: 'RentIQ Escrow Protected'
        }
      });
      idCounter++;
    }
  });

  return products.slice(0, 200);
}

async function seed200() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const productsToInsert = generate200Products();
    console.log(`📦 Generated ${productsToInsert.length} distinct product records.`);

    // Clear existing products and re-insert 200 products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing product catalog in MongoDB Atlas');

    const created = await Product.insertMany(productsToInsert);
    console.log(`🎉 Successfully seeded ${created.length} products into MongoDB Atlas!`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed200();
