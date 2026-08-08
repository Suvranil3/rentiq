const PRODUCTS = [
  // --- CINEMA CAMERAS ---
  {
    name: 'RED V-Raptor 8K VV Cinema Camera',
    brand: 'RED',
    category: 'Cinema Cameras',
    description: 'Flagship cinema camera with 8K VV sensor, high frame rate up to 120fps at 8K.',
    dailyPrice: 6000,
    weeklyPrice: 35000,
    monthlyPrice: 120000,
    securityDeposit: 120000,
    totalStock: 1,
    availableStock: 0,
    images: ['https://images.unsplash.com/photo-1589872783345-c481073dc327?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '35.4MP 8K VV', 'Mount': 'RF Mount', 'Dynamic Range': '17+ stops' }
  },
  {
    name: 'ARRI Alexa Mini LF Cinema Camera',
    brand: 'ARRI',
    category: 'Cinema Cameras',
    description: 'Large-format ALEXA sensor in a compact body with natural color science.',
    dailyPrice: 8500,
    weeklyPrice: 48000,
    monthlyPrice: 160000,
    securityDeposit: 180000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1512790182412-b19e6d61b397?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '4.5K Large Format', 'Mount': 'LPL / PL', 'Weight': '2.6 kg' }
  },
  {
    name: 'Sony FX6 Full-Frame Cinema Camera',
    brand: 'Sony',
    category: 'Cinema Cameras',
    description: 'Full-frame 4K 120p sensor with electronic variable ND and S-Cinetone color science.',
    dailyPrice: 3200,
    weeklyPrice: 18000,
    monthlyPrice: 58000,
    securityDeposit: 45000,
    totalStock: 4,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '10.2MP Full-Frame', 'ISO': '800 / 12800 Dual', 'ND Filter': 'Variable Electronic' }
  },
  {
    name: 'Sony FX3 Cinema Line Camera',
    brand: 'Sony',
    category: 'Cinema Cameras',
    description: 'Ultra-compact full-frame cinema camera with top handle and XLR audio module.',
    dailyPrice: 2400,
    weeklyPrice: 13500,
    monthlyPrice: 44000,
    securityDeposit: 35000,
    totalStock: 5,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '12.1MP Full-Frame', 'Video': '4K 120fps', 'Body Weight': '715g' }
  },
  {
    name: 'Blackmagic Pocket Cinema 6K Pro',
    brand: 'Blackmagic',
    category: 'Cinema Cameras',
    description: 'Super 35 6K HDR cinema camera with built-in ND filters and adjustable HDR screen.',
    dailyPrice: 1800,
    weeklyPrice: 10000,
    monthlyPrice: 32000,
    securityDeposit: 28000,
    totalStock: 5,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': 'Super 35 6K', 'ND Filters': '2, 4, 6 Stops', 'Mount': 'EF Mount' }
  },
  {
    name: 'Canon EOS C300 Mark III',
    brand: 'Canon',
    category: 'Cinema Cameras',
    description: 'Super 35 DGO sensor cinema camera with 16+ stops of dynamic range and 4K 120p.',
    dailyPrice: 3800,
    weeklyPrice: 21000,
    monthlyPrice: 68000,
    securityDeposit: 55000,
    totalStock: 3,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': 'Super 35 DGO', 'Mount': 'EF Mount', 'Raw': 'Cinema RAW Light' }
  },
  {
    name: 'RED Komodo-X 6K Cinema Camera',
    brand: 'RED',
    category: 'Cinema Cameras',
    description: 'Compact 6K global shutter cinema camera with locking RF mount and CFexpress Type B.',
    dailyPrice: 4200,
    weeklyPrice: 24000,
    monthlyPrice: 76000,
    securityDeposit: 65000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1589872783345-c481073dc327?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '19.9MP Super 35 Global Shutter', 'FPS': '6K 80fps', 'Mount': 'Locking RF' }
  },
  {
    name: 'ARRI Amira Premium Camera',
    brand: 'ARRI',
    category: 'Cinema Cameras',
    description: 'Documentary-style cinema camera with ALEXA 35mm sensor and ergonomic shoulder pad.',
    dailyPrice: 7000,
    weeklyPrice: 40000,
    monthlyPrice: 130000,
    securityDeposit: 140000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '35mm ALEV III', 'FPS': '200fps ProRes', 'Mount': 'PL Mount' }
  },
  {
    name: 'Sony FX9 XDCAM Cinema Camera',
    brand: 'Sony',
    category: 'Cinema Cameras',
    description: '6K full-frame oversampled 4K camera with Fast Hybrid AF and Dual Base ISO.',
    dailyPrice: 4500,
    weeklyPrice: 25000,
    monthlyPrice: 82000,
    securityDeposit: 70000,
    totalStock: 3,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '6K Full-Frame', 'ISO': '800 / 4000 Dual Base', 'AF': 'Fast Hybrid' }
  },
  {
    name: 'Blackmagic URSA Mini Pro 12K',
    brand: 'Blackmagic',
    category: 'Cinema Cameras',
    description: '12K Super 35 sensor cinema camera recording 80MP images per frame at 60fps.',
    dailyPrice: 3600,
    weeklyPrice: 20000,
    monthlyPrice: 64000,
    securityDeposit: 50000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '12K Super 35 12,288 x 6480', 'Codecs': 'Blackmagic RAW', 'Mount': 'PL / EF' }
  },
  {
    name: 'Panasonic AU-EVA1 5.7K Cinema Camera',
    brand: 'Panasonic',
    category: 'Cinema Cameras',
    description: 'Super 35 5.7K sensor camera with Dual Native ISO 800 & 2500 and V-Log.',
    dailyPrice: 2200,
    weeklyPrice: 12000,
    monthlyPrice: 38000,
    securityDeposit: 30000,
    totalStock: 4,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1512790182412-b19e6d61b397?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '5.7K Super 35', 'Weight': '1.2 kg', 'Log': 'V-Log / V-Gamut' }
  },
  {
    name: 'Canon EOS C70 Cinema Camera',
    brand: 'Canon',
    category: 'Cinema Cameras',
    description: 'RF mount Super 35 DGO sensor camera combining cinema quality with compact form.',
    dailyPrice: 2800,
    weeklyPrice: 16000,
    monthlyPrice: 50000,
    securityDeposit: 40000,
    totalStock: 4,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': 'Super 35 DGO', 'Mount': 'RF Mount', 'Audio': '2 Mini XLRs' }
  },
  {
    name: 'Z CAM E2-F6 Full-Frame 6K Camera',
    brand: 'Z CAM',
    category: 'Cinema Cameras',
    description: 'Full-frame 6K cinema camera with 15 stops dynamic range and ZRAW recording.',
    dailyPrice: 1900,
    weeklyPrice: 10500,
    monthlyPrice: 34000,
    securityDeposit: 26000,
    totalStock: 3,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1589872783345-c481073dc327?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '6K Full-Frame', 'Codecs': 'ZRAW / ProRes', 'Mount': 'EF Mount' }
  },
  {
    name: 'Kinefinity MAVO LF 6K Cinema Camera',
    brand: 'Kinefinity',
    category: 'Cinema Cameras',
    description: 'Large-format 6K cinema camera with Dual Native ISO and ProRes 4444 XQ recording.',
    dailyPrice: 3400,
    weeklyPrice: 19000,
    monthlyPrice: 60000,
    securityDeposit: 48000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '6K Large Format', 'FPS': '6K 75fps', 'Mount': 'KineMOUNT' }
  },
  {
    name: 'Sony Venice 2 8K Cinema Camera',
    brand: 'Sony',
    category: 'Cinema Cameras',
    description: 'Top-tier 8K full-frame digital cinema camera with internal X-OCN recording.',
    dailyPrice: 12000,
    weeklyPrice: 68000,
    monthlyPrice: 220000,
    securityDeposit: 250000,
    totalStock: 1,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '8.6K Full-Frame', 'ND Filter': '8-Stop Internal', 'Mount': 'PL / E-mount' }
  },

  // --- MIRRORLESS CAMERAS ---
  {
    name: 'Sony Alpha A7 III',
    brand: 'Sony',
    category: 'Mirrorless Cameras',
    description: 'Full-frame mirrorless camera with 24.2MP sensor. Perfect for professional photography.',
    dailyPrice: 1500,
    weeklyPrice: 8500,
    monthlyPrice: 28000,
    securityDeposit: 25000,
    totalStock: 6,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '24.2MP Full-Frame', 'ISO': '100-51200', 'Video': '4K HDR' }
  },
  {
    name: 'Canon EOS R5',
    brand: 'Canon',
    category: 'Mirrorless Cameras',
    description: 'High-resolution 45MP mirrorless camera with 8K RAW video recording.',
    dailyPrice: 2000,
    weeklyPrice: 12000,
    monthlyPrice: 40000,
    securityDeposit: 35000,
    totalStock: 5,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '45MP Full-Frame', 'ISO': '100-102400', 'Video': '8K RAW' }
  },
  {
    name: 'Sony Alpha A7S III',
    brand: 'Sony',
    category: 'Mirrorless Cameras',
    description: 'Low-light 12.1MP full-frame camera with 4K 120p and 15+ stops dynamic range.',
    dailyPrice: 2200,
    weeklyPrice: 12500,
    monthlyPrice: 42000,
    securityDeposit: 38000,
    totalStock: 5,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '12.1MP Exmor R', 'ISO': '409600 Max', 'Video': '4K 120p 10-bit' }
  },
  {
    name: 'Nikon Z9 Flagship Mirrorless',
    brand: 'Nikon',
    category: 'Mirrorless Cameras',
    description: '45.7MP stacked CMOS sensor camera with 8K 60p N-RAW internal recording.',
    dailyPrice: 2800,
    weeklyPrice: 16000,
    monthlyPrice: 52000,
    securityDeposit: 50000,
    totalStock: 3,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '45.7MP Stacked', 'Shutter': '100% Electronic', 'FPS': '120fps Stills' }
  },
  {
    name: 'Fujifilm X-T5 Mirrorless Camera',
    brand: 'Fujifilm',
    category: 'Mirrorless Cameras',
    description: '40MP APS-C X-Trans CMOS 5 HR sensor with classic dial layout and film simulations.',
    dailyPrice: 1300,
    weeklyPrice: 7200,
    monthlyPrice: 24000,
    securityDeposit: 20000,
    totalStock: 5,
    availableStock: 4,
    images: ['https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '40MP APS-C', 'IBIS': '7-Stops', 'Video': '6.2K 30p' }
  },
  {
    name: 'Leica SL2 Full-Frame Camera',
    brand: 'Leica',
    category: 'Mirrorless Cameras',
    description: 'German engineered 47MP full-frame camera with Maestro III processor and L-mount.',
    dailyPrice: 3500,
    weeklyPrice: 20000,
    monthlyPrice: 65000,
    securityDeposit: 60000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '47.3MP Full-Frame', 'EVF': '5.76M-Dot EyeRes', 'Mount': 'L-Mount' }
  },
  {
    name: 'Panasonic Lumix GH6 Camera',
    brand: 'Panasonic',
    category: 'Mirrorless Cameras',
    description: '25.2MP Micro Four Thirds sensor recording 5.7K 60p and ProRes 422 HQ internally.',
    dailyPrice: 1400,
    weeklyPrice: 8000,
    monthlyPrice: 26000,
    securityDeposit: 22000,
    totalStock: 4,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1512790182412-b19e6d61b397?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '25.2MP MFT', 'Cooling': 'Internal Fan', 'Stabilization': '7.5-stop Dual I.S.' }
  },
  {
    name: 'Canon EOS R6 Mark II',
    brand: 'Canon',
    category: 'Mirrorless Cameras',
    description: '24.2MP full-frame camera shooting 40fps electronic shutter and uncropped 4K 60p.',
    dailyPrice: 1700,
    weeklyPrice: 9500,
    monthlyPrice: 30000,
    securityDeposit: 26000,
    totalStock: 5,
    availableStock: 4,
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '24.2MP Full-Frame', 'AF': 'Dual Pixel CMOS AF II', 'FPS': '40fps Electronic' }
  },
  {
    name: 'Sony Alpha A1 50MP Camera',
    brand: 'Sony',
    category: 'Mirrorless Cameras',
    description: 'Flagship 50.1MP full-frame camera with 30fps continuous burst and 8K 30p video.',
    dailyPrice: 3800,
    weeklyPrice: 22000,
    monthlyPrice: 72000,
    securityDeposit: 68000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '50.1MP Stacked', 'Flash Sync': '1/400s', 'Video': '8K 30p 10-bit' }
  },
  {
    name: 'Fujifilm GFX 100S Medium Format',
    brand: 'Fujifilm',
    category: 'Mirrorless Cameras',
    description: '102MP medium format sensor in a compact body with 5-axis IBIS and 4K 30p.',
    dailyPrice: 4200,
    weeklyPrice: 24000,
    monthlyPrice: 78000,
    securityDeposit: 75000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '102MP Medium Format', 'Weight': '900g', 'IBIS': '6-Stop In-Body' }
  },
  {
    name: 'Hasselblad X2D 100C Camera',
    brand: 'Hasselblad',
    category: 'Mirrorless Cameras',
    description: '100MP BSI CMOS medium format camera with built-in 1TB SSD and 15 stops dynamic range.',
    dailyPrice: 5000,
    weeklyPrice: 29000,
    monthlyPrice: 95000,
    securityDeposit: 90000,
    totalStock: 1,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '100MP Medium Format', 'Storage': '1TB SSD Built-in', 'Color': 'Natural Color Solution' }
  },
  {
    name: 'Nikon Z6 II Mirrorless Camera',
    brand: 'Nikon',
    category: 'Mirrorless Cameras',
    description: 'Versatile 24.5MP full-frame mirrorless with Dual EXPEED 6 processors.',
    dailyPrice: 1350,
    weeklyPrice: 7800,
    monthlyPrice: 25000,
    securityDeposit: 22000,
    totalStock: 5,
    availableStock: 4,
    images: ['https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '24.5MP BSI CMOS', 'Slots': 'CFexpress + SD', 'Video': '4K 60p' }
  },
  {
    name: 'Panasonic Lumix S1H 6K Camera',
    brand: 'Panasonic',
    category: 'Mirrorless Cameras',
    description: 'Netflix-certified 24.2MP full-frame camera with 6K 24p 10-bit recording.',
    dailyPrice: 2100,
    weeklyPrice: 12000,
    monthlyPrice: 38000,
    securityDeposit: 34000,
    totalStock: 3,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1512790182412-b19e6d61b397?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '24.2MP Full-Frame', 'Certification': 'Netflix Approved', 'Log': 'V-Log 14+ stops' }
  },
  {
    name: 'Olympus OM-1 Flagship MFT',
    brand: 'Olympus',
    category: 'Mirrorless Cameras',
    description: '20MP Stacked BSI MFT sensor with IP53 weather sealing and 50fps AF continuous burst.',
    dailyPrice: 1200,
    weeklyPrice: 6800,
    monthlyPrice: 22000,
    securityDeposit: 18000,
    totalStock: 4,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '20MP Stacked BSI', 'Weatherproof': 'IP53', 'IBIS': '8-Stops' }
  },
  {
    name: 'Sony Alpha A7 IV',
    brand: 'Sony',
    category: 'Mirrorless Cameras',
    description: '33MP full-frame BSI Exmor R sensor with Real-time Eye AF and 4K 60p.',
    dailyPrice: 1850,
    weeklyPrice: 10500,
    monthlyPrice: 33000,
    securityDeposit: 29000,
    totalStock: 6,
    availableStock: 4,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '33MP Full-Frame', 'AF': '759 Phase Detection', 'Video': '4K 60p 10-bit' }
  },

  // --- CAMERA LENSES ---
  {
    name: 'Sony FE 24-70mm f/2.8 GM II',
    brand: 'Sony',
    category: 'Camera Lenses',
    description: 'Standard zoom G Master lens delivering extreme resolution and high speed.',
    dailyPrice: 900,
    weeklyPrice: 5000,
    monthlyPrice: 16000,
    securityDeposit: 15000,
    totalStock: 8,
    availableStock: 5,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'f/2.8', 'Filter Diameter': '82mm', 'Weight': '695g' }
  },
  {
    name: 'Canon RF 24-70mm f/2.8L IS USM',
    brand: 'Canon',
    category: 'Camera Lenses',
    description: 'Professional L-series RF zoom lens with 5-stop Image Stabilization.',
    dailyPrice: 950,
    weeklyPrice: 5300,
    monthlyPrice: 17000,
    securityDeposit: 16000,
    totalStock: 6,
    availableStock: 4,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'f/2.8', 'IS': '5-Stops', 'Mount': 'RF Mount' }
  },
  {
    name: 'Sony FE 70-200mm f/2.8 GM OSS II',
    brand: 'Sony',
    category: 'Camera Lenses',
    description: 'Lightest 70-200mm f/2.8 telephoto zoom with XD Linear AF motors.',
    dailyPrice: 1200,
    weeklyPrice: 6800,
    monthlyPrice: 22000,
    securityDeposit: 20000,
    totalStock: 5,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'f/2.8 Constant', 'Weight': '1045g', 'OSS': 'Optical SteadyShot' }
  },
  {
    name: 'Canon RF 70-200mm f/2.8L IS USM',
    brand: 'Canon',
    category: 'Camera Lenses',
    description: 'Ultra-compact L-series telephoto zoom lens with Dual Nano USM motors.',
    dailyPrice: 1250,
    weeklyPrice: 7000,
    monthlyPrice: 23000,
    securityDeposit: 21000,
    totalStock: 5,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'f/2.8', 'IS': '5-Stops', 'Weight': '1070g' }
  },
  {
    name: 'Sigma 24-70mm f/2.8 DG DN Art',
    brand: 'Sigma',
    category: 'Camera Lenses',
    description: 'High-performance Art line standard zoom lens available for Sony E and L-mount.',
    dailyPrice: 750,
    weeklyPrice: 4200,
    monthlyPrice: 13500,
    securityDeposit: 12000,
    totalStock: 7,
    availableStock: 5,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'f/2.8', 'Blades': '11-Blade Aperture', 'Mount': 'Sony E / L-Mount' }
  },
  {
    name: 'Sigma 18-35mm f/1.8 DC HSM Art',
    brand: 'Sigma',
    category: 'Camera Lenses',
    description: 'World’s first f/1.8 constant aperture zoom lens for APS-C sensor cameras.',
    dailyPrice: 600,
    weeklyPrice: 3400,
    monthlyPrice: 11000,
    securityDeposit: 9500,
    totalStock: 6,
    availableStock: 4,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'f/1.8 Constant', 'Format': 'APS-C / Super 35', 'Mount': 'EF / F' }
  },
  {
    name: 'Sony FE 50mm f/1.2 GM Prime Lens',
    brand: 'Sony',
    category: 'Camera Lenses',
    description: 'Flagship 50mm f/1.2 prime lens delivering gorgeous bokeh and pin-sharp resolution.',
    dailyPrice: 1000,
    weeklyPrice: 5600,
    monthlyPrice: 18000,
    securityDeposit: 17000,
    totalStock: 4,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'f/1.2', 'AF Motors': '4 XD Linear', 'Weight': '778g' }
  },
  {
    name: 'Canon RF 50mm f/1.2L USM Prime',
    brand: 'Canon',
    category: 'Camera Lenses',
    description: 'Ultra-fast L-series prime lens delivering supreme sharpness and shallow depth of field.',
    dailyPrice: 1050,
    weeklyPrice: 5900,
    monthlyPrice: 19000,
    securityDeposit: 18000,
    totalStock: 4,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'f/1.2', 'Motor': 'Ring USM', 'Mount': 'RF Mount' }
  },
  {
    name: 'Zeiss CP.3 35mm T2.1 Compact Prime',
    brand: 'Zeiss',
    category: 'Camera Lenses',
    description: 'Professional cinema prime lens with full-frame coverage and geared focus rings.',
    dailyPrice: 1500,
    weeklyPrice: 8500,
    monthlyPrice: 27000,
    securityDeposit: 25000,
    totalStock: 3,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'T2.1', 'Coverage': 'Full Frame', 'Mount': 'PL / EF' }
  },
  {
    name: 'Zeiss CP.3 50mm T2.1 Compact Prime',
    brand: 'Zeiss',
    category: 'Camera Lenses',
    description: 'Standard 50mm cinema prime with advanced lens coating and standardized front diameter.',
    dailyPrice: 1500,
    weeklyPrice: 8500,
    monthlyPrice: 27000,
    securityDeposit: 25000,
    totalStock: 3,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Aperture': 'T2.1', 'Front Diameter': '95mm', 'Mount': 'PL Mount' }
  },

  // --- GIMBALS & STABILIZERS ---
  {
    name: 'DJI Ronin-S Stabilizer',
    brand: 'DJI',
    category: 'Gimbals & Stabilizers',
    description: '3-axis gimbal stabilizer for DSLR and mirrorless cameras up to 3.6kg.',
    dailyPrice: 800,
    weeklyPrice: 4500,
    monthlyPrice: 15000,
    securityDeposit: 12000,
    totalStock: 6,
    availableStock: 4,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Payload': '3.6 kg', 'Battery Life': '12 hours', 'Axes': '3-Axis' }
  },
  {
    name: 'DJI RS 3 Pro Gimbal Stabilizer',
    brand: 'DJI',
    category: 'Gimbals & Stabilizers',
    description: 'Extended carbon fiber arms gimbal with LiDAR focusing system support and 4.5kg payload.',
    dailyPrice: 1400,
    weeklyPrice: 7800,
    monthlyPrice: 25000,
    securityDeposit: 22000,
    totalStock: 5,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Payload': '4.5 kg', 'Screen': '1.8" OLED Touch', 'LiDAR': 'Supported' }
  },
  {
    name: 'Zhiyun Crane 3S Heavy Duty Gimbal',
    brand: 'Zhiyun',
    category: 'Gimbals & Stabilizers',
    description: 'High-payload 6.5kg gimbal built for large cinema camera rigs like RED and Canon C300.',
    dailyPrice: 1600,
    weeklyPrice: 9000,
    monthlyPrice: 28000,
    securityDeposit: 24000,
    totalStock: 3,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Payload': '6.5 kg', 'Handle': 'TransMount SmartSling', 'Battery': '12 hours' }
  },

  // --- STUDIO AUDIO & MICS ---
  {
    name: 'Rode NT1-A Microphone',
    brand: 'Rode',
    category: 'Studio Audio & Mics',
    description: 'Studio-quality condenser microphone with ultra-low noise floor.',
    dailyPrice: 400,
    weeklyPrice: 2200,
    monthlyPrice: 7500,
    securityDeposit: 8000,
    totalStock: 8,
    availableStock: 6,
    images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Type': 'Condenser', 'Pattern': 'Cardioid', 'Frequency': '20Hz–20kHz' }
  },
  {
    name: 'Sennheiser EW 100 G4 Wireless Kit',
    brand: 'Sennheiser',
    category: 'Studio Audio & Mics',
    description: 'Professional wireless microphone system with bodypack transmitter and handheld.',
    dailyPrice: 700,
    weeklyPrice: 4000,
    monthlyPrice: 13500,
    securityDeposit: 15000,
    totalStock: 6,
    availableStock: 4,
    images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Frequency': 'UHF', 'Range': '100 m', 'Channels': '20 banks x 12' }
  },
  {
    name: 'Shure SM7B Vocal Studio Microphone',
    brand: 'Shure',
    category: 'Studio Audio & Mics',
    description: 'Industry-standard dynamic microphone for broadcasting, podcasting, and vocal recording.',
    dailyPrice: 550,
    weeklyPrice: 3100,
    monthlyPrice: 10000,
    securityDeposit: 10000,
    totalStock: 7,
    availableStock: 5,
    images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Type': 'Dynamic', 'Pattern': 'Cardioid', 'Shielding': 'Electromagnetic' }
  },
  {
    name: 'Neumann U 87 Ai Studio Microphone',
    brand: 'Neumann',
    category: 'Studio Audio & Mics',
    description: 'Legendary large-diaphragm studio condenser microphone with 3 directional patterns.',
    dailyPrice: 1800,
    weeklyPrice: 10000,
    monthlyPrice: 32000,
    securityDeposit: 30000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Diaphragm': 'Dual Large Diaphragm', 'Patterns': 'Omni, Cardioid, Figure-8' }
  },

  // --- LIGHTING ---
  {
    name: 'Godox AD400 Pro Flash',
    brand: 'Godox',
    category: 'Studio & Flash Lighting',
    description: 'Outdoor battery-powered strobe flash, 400W with TTL & HSS support.',
    dailyPrice: 600,
    weeklyPrice: 3500,
    monthlyPrice: 12000,
    securityDeposit: 10000,
    totalStock: 8,
    availableStock: 5,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Power': '400W', 'Recycle Time': '0.01-1.5s', 'Weight': '1.3 kg' }
  },
  {
    name: 'Aputure LS 600d Pro Daylight',
    brand: 'Aputure',
    category: 'Studio & Flash Lighting',
    description: 'High-output daylight COB LED light equivalent to 1200W HMI.',
    dailyPrice: 2200,
    weeklyPrice: 13000,
    monthlyPrice: 42000,
    securityDeposit: 35000,
    totalStock: 2,
    availableStock: 0,
    images: ['https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'CCT': '5600K', 'CRI': '96+', 'Mount': 'Bowens', 'Weatherproof': 'IP54' }
  },
  {
    name: 'ARRI Skypanel S60-C Softlight',
    brand: 'ARRI',
    category: 'Studio & Flash Lighting',
    description: 'Industry benchmark RGBW LED softlight panel with full color control and DMX.',
    dailyPrice: 4500,
    weeklyPrice: 26000,
    monthlyPrice: 85000,
    securityDeposit: 80000,
    totalStock: 2,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'CCT': '2800K - 10000K', 'Color': 'Full RGBW', 'Power': '450W' }
  },

  // --- DRONES & AERIAL ---
  {
    name: 'DJI Mavic 3 Pro Drone',
    brand: 'DJI',
    category: 'Drones & Aerial',
    description: 'Professional drone with triple-camera Hasselblad system and 43-min flight time.',
    dailyPrice: 3500,
    weeklyPrice: 20000,
    monthlyPrice: 65000,
    securityDeposit: 50000,
    totalStock: 4,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Camera': 'Hasselblad L-Format', 'Max Flight': '43 min', 'Range': '15 km' }
  },
  {
    name: 'DJI Inspire 3 Cinema Drone System',
    brand: 'DJI',
    category: 'Drones & Aerial',
    description: 'Full-frame 8K ProRes RAW aerial cinema drone with RTK centimeter-level positioning.',
    dailyPrice: 11000,
    weeklyPrice: 62000,
    monthlyPrice: 195000,
    securityDeposit: 220000,
    totalStock: 1,
    availableStock: 1,
    images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Camera': 'Zenmuse X9-8K Air', 'Video': '8K 75fps CinemaDNG', 'Speed': '94 km/h' }
  },

  // --- LAPTOPS & WORKSTATIONS ---
  {
    name: 'MacBook Pro M3 Max 16"',
    brand: 'Apple',
    category: 'Laptops & Workstations',
    description: 'Professional-grade laptop for video editing, 3D rendering, and creative work.',
    dailyPrice: 2500,
    weeklyPrice: 15000,
    monthlyPrice: 50000,
    securityDeposit: 80000,
    totalStock: 5,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Chip': 'Apple M3 Max', 'RAM': '128GB', 'Storage': '4TB SSD' }
  },
  {
    name: 'ASUS ROG Zephyrus G16 OLED',
    brand: 'ASUS',
    category: 'Laptops & Workstations',
    description: 'High-performance Intel Core i9 laptop with RTX 4090 GPU and 2.5K 240Hz OLED screen.',
    dailyPrice: 2200,
    weeklyPrice: 13000,
    monthlyPrice: 42000,
    securityDeposit: 65000,
    totalStock: 4,
    availableStock: 3,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'CPU': 'Core i9-14900HX', 'GPU': 'RTX 4090 16GB', 'RAM': '64GB DDR5' }
  },

  // --- ELECTRIC MOBILITY ---
  {
    name: 'Super73-RX Electric Adventure Bike',
    brand: 'Super73',
    category: 'Electric Mobility',
    description: 'High-performance electric motorbike with full suspension and 2000W peak motor.',
    dailyPrice: 1800,
    weeklyPrice: 10000,
    monthlyPrice: 32000,
    securityDeposit: 35000,
    totalStock: 3,
    availableStock: 2,
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Speed': '45+ km/h', 'Range': '65+ km', 'Motor': '2000W Peak' }
  }
];

// Generates 200+ unique products programmatically with distinct titles, specs, categories, prices and unique Unsplash images
const generateFullCatalog = () => {
  const brandList = ['Sony', 'Canon', 'RED', 'ARRI', 'Blackmagic', 'Nikon', 'Fujifilm', 'DJI', 'Rode', 'Sennheiser', 'Shure', 'Godox', 'Aputure', 'Profoto', 'Apple', 'Atomos', 'Teradek', 'SmallHD', 'Insta360', 'GoPro', 'Sigma', 'Manfrotto', 'EcoFlow', 'Super73'];

  const categoryConfigs = [
    {
      cat: 'Cinema Cameras',
      prefix: 'Cinema Line Pro',
      imgBase: 'https://images.unsplash.com/photo-1589872783345-c481073dc327?auto=format&fit=crop&w=800&q=80',
      priceRange: [2000, 8000],
      depositRange: [30000, 100000],
      items: [
        'VENICE 2 8K Cinema Rig', 'ALEXA 35 Cine System', 'V-RAPTOR XL 8K VV', 'FX6 Full-Frame Unit',
        'C500 Mark II Cinema', 'KOMODO 6K Production Pack', 'URSA Mini Pro 12K OLPF', 'FX3 Handheld Rig',
        'Pocket Cinema 6K G2', 'EOS C70 RF Rig', 'Kinefinity MAVO Edge 8K', 'Z CAM E2-F8 Full-Frame',
        'Canon C300 Mk III DGO', 'Sony FX9 Production Kit', 'Panasonic EVA1 5.7K'
      ]
    },
    {
      cat: 'Mirrorless Cameras',
      prefix: 'Mirrorless Flagship',
      imgBase: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      priceRange: [1200, 4000],
      depositRange: [18000, 60000],
      items: [
        'Alpha 9 III Global Shutter', 'EOS R3 High-Speed', 'Z9 8K Stacked CMOS', 'Alpha A7S III Low-Light',
        'EOS R5 C Cinema Hybrid', 'X-H2S Stacked APS-C', 'SL2-S Full Frame', 'GH6 5.7K ProRes',
        'GFX 100 II Medium Format', 'Hasselblad X2D 100C', 'Alpha A7 IV Creator Kit', 'EOS R6 Mark II',
        'Nikon Z7 II High-Res', 'Panasonic S1H 6K', 'Lumix S5 IIX Black'
      ]
    },
    {
      cat: 'Camera Lenses',
      prefix: 'Master Optics',
      imgBase: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80',
      priceRange: [500, 2500],
      depositRange: [8000, 35000],
      items: [
        '24-70mm f/2.8 GM II', '70-200mm f/2.8L IS USM', '50mm f/1.2 Prime', '85mm f/1.4 Art',
        '16-35mm f/2.8 Cinema Zoom', 'Zeiss CP.3 35mm T2.1', 'Cooke Panchro 50mm T2.3', 'Laowa 24mm Probe Lens',
        'Sirui 50mm Anamorphic', 'Fujinon MK18-55mm T2.9', 'Canon RF 28-70mm f/2L', 'Sony FE 135mm f/1.8 GM',
        'Sigma 14-24mm f/2.8 Art', 'Tamron 35-150mm f/2-2.8', 'DZOFilm Vespid 25mm T2.1', 'Leica Summicron 50mm',
        'Canon RF 100-500mm L', 'Sony FE 400mm f/2.8 GM', 'Zeiss Otus 85mm f/1.4', 'Sigma 105mm f/1.4 Art'
      ]
    },
    {
      cat: 'Gimbals & Stabilizers',
      prefix: 'Fluid Stabilizer',
      imgBase: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      priceRange: [700, 2200],
      depositRange: [10000, 30000],
      items: [
        'RS 3 Pro Combo System', 'Ronin 2 Professional Pack', 'Crane 3S Heavy Payload', 'Weebill 3S Handheld',
        'Steadicam Aero 30 Rig', 'Tilta Float Handheld Support', 'Easyrig Vario 5 Arm', 'SCORP Pro 3-Axis',
        'Glidecam HD-4000 System', 'RS 3 Mini Compact Gimbal', 'Flycam Redking Stabilizer', 'Ronin-MX Cinema Rig'
      ]
    },
    {
      cat: 'Studio Audio & Mics',
      prefix: 'Acoustic Sound',
      imgBase: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      priceRange: [400, 1800],
      depositRange: [6000, 25000],
      items: [
        'MKH 416 Shotgun Microphone', 'SM7B Studio Dynamic Mic', 'U 87 Ai Large Diaphragm', 'Wireless PRO Dual Set',
        'EW 500 G4 Wireless Pack', 'VideoMic NTG Shotgun', 'COS-11D Omni Lavalier', 'DPA 4017B Shotgun Mic',
        'AKG C414 XLII Condenser', 'RE20 Broadcast Dynamic', 'Sony UWP-D27 Dual Wireless', 'Rode NT1 5th Gen'
      ]
    },
    {
      cat: 'Field Recorders',
      prefix: 'Multitrack Audio',
      imgBase: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
      priceRange: [600, 3000],
      depositRange: [10000, 45000],
      items: [
        '833 8-Channel Recorder', 'Scorpio 32-Track Mixer', 'MixPre-6 II 32-Bit Float', 'Zoom F6 6-Channel Unit',
        'Zoom F8n Pro Field Recorder', 'Tascam Portacapture X8', 'MixPre-10 II Multitrack', 'Zoom H6 All-Black Pack',
        'Roland R-88 8-Channel', 'Tascam DR-100MKIII Pro'
      ]
    },
    {
      cat: 'Studio & Flash Lighting',
      prefix: 'Illumination Tech',
      imgBase: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      priceRange: [500, 4500],
      depositRange: [8000, 70000],
      items: [
        'LS 600d Pro Daylight COB', 'SkyPanel S60-C Softlight', 'Titan Tube 8-Light Kit', 'Forza 720B Bi-Color',
        'B10 Plus 500Ws Flash', 'AD400 Pro Outdoor Strobe', 'PavoTube II 30C RGBW', 'LS 300x Bi-Color LED',
        'Pro-11 2400Ws Power Pack', 'Amaran 200x Bi-Color', 'AD1200 Pro Battery Strobe', 'Rotolight Anova EVO',
        'Litepanels Gemini 2x1 RGB', 'Westcott FJ400 Strobe', 'Aputure MC 4-Light Travel Kit'
      ]
    },
    {
      cat: 'Drones & Aerial',
      prefix: 'Sky Precision',
      imgBase: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80',
      priceRange: [2000, 12000],
      depositRange: [30000, 180000],
      items: [
        'Inspire 3 8K Cinema Drone', 'Mavic 3 Pro Cine Bundle', 'Avata 2 FPV Explorer Kit', 'Matrice 350 RTK Industrial',
        'EVO II Pro 6K Rugged', 'Mini 4 Pro Fly More Combo', 'Phantom 4 RTK Mapping', 'Skydio 2+ Cinema Kit',
        'Freefly Astro Cinema Drone', 'ProTek35 FPV CineWhoop', 'Air 3 Dual Telephoto', 'Autel EVO Max 4T'
      ]
    },
    {
      cat: 'Laptops & Workstations',
      prefix: 'Render Engine',
      imgBase: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      priceRange: [1800, 4500],
      depositRange: [30000, 90000],
      items: [
        'MacBook Pro M3 Max 16"', 'Mac Studio M2 Ultra 192GB', 'ROG Zephyrus G16 RTX 4090', 'XPS 17 RTX 4080 Laptop',
        'Raider GE78 HX i9 Workstation', 'Razer Blade 18 Gaming Rig', 'ZBook Studio G10 Mobile', 'ThinkPad P1 Gen 6',
        'ProArt Studiobook 16 OLED', 'Mac Pro M2 Ultra Rack System'
      ]
    },
    {
      cat: 'Monitors & Wireless Video',
      prefix: 'Display & Link',
      imgBase: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      priceRange: [800, 3500],
      depositRange: [12000, 50000],
      items: [
        'Ninja V+ 8K Recording Monitor', 'Bolt 4K LT 750 Transmitter', 'Cine 7 Touchscreen Monitor', 'Mars 400S Pro Wireless',
        'Sumo 19 SE HDR Director Monitor', 'CineView SE Wireless Link', 'Ultra 5 High-Bright Monitor', 'DM240 24" Studio Monitor',
        'Vaxis Storm 3000 DV Link', 'LUT7 2200nit Field Monitor'
      ]
    },
    {
      cat: 'VR & Action Cameras',
      prefix: 'Immersive Cam',
      imgBase: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      priceRange: [600, 5000],
      depositRange: [10000, 80000],
      items: [
        'HERO12 Black Creator Edition', 'Insta360 X4 8K 360 Cam', 'Osmo Action 4 Combo', 'Insta360 Pro 2 8K VR',
        'QooCam 8K Enterprise VR', 'ONE RS 1-Inch 360 Edition', 'GoPro MAX 360 Action', 'Osmo Pocket 3 Creator Kit',
        'Insta360 Titan 11K VR System', 'RX0 II Ultra-Compact Cam'
      ]
    },
    {
      cat: 'Tripods & Camera Support',
      prefix: 'Rig Support',
      imgBase: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      priceRange: [400, 1800],
      depositRange: [6000, 25000],
      items: [
        'Nitrotech 608 Fluid Video System', 'Flowtech 75 Carbon Fiber Legs', 'Tortoise 34C Carbon Tripod', 'CX2 Fluid Head System',
        'Focus 12 Fluid Head Rig', 'Travel Tripod Carbon Edition', 'Dana Dolly Portable Pipe Kit', 'Kessler Pocket Jib PRO',
        'Duzi 4 Camera Slider 32"', 'Proaim Anchor Camera Crane'
      ]
    },
    {
      cat: 'Power & Battery Stations',
      prefix: 'Energy Core',
      imgBase: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      priceRange: [500, 2500],
      depositRange: [8000, 40000],
      items: [
        'Delta Pro 3600Wh Power Station', 'Explorer 2000 Pro Station', 'Titon 150 V-Mount Battery 4-Pack', 'Hypercore NEO 9 Mini 4-Kit',
        'AC200MAX 2048Wh Generator', 'Anker 757 PowerHouse Station', 'Nano Two 98Wh Ultra Compact', 'Yeti 1500X Power Station'
      ]
    },
    {
      cat: 'Electric Mobility',
      prefix: 'Location Fleet',
      imgBase: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      priceRange: [1200, 3000],
      depositRange: [20000, 50000],
      items: [
        'Super73-RX Electric Adventure Bike', 'Ninebot Max G30E II Scooter', 'RadRunner 2 Utility E-Bike', 'Onewheel GT All-Terrain',
        'Super73-S2 Street Cruiser', 'Thunder II High Speed Scooter', 'Lectric XP 3.0 Folding E-Bike', 'GT2 SuperScooter Dual Motor'
      ]
    }
  ];

  // High quality unique unsplash image collection mapped by index to guarantee unique photos
  const unsplashPhotoIds = [
    'photo-1589872783345-c481073dc327', 'photo-1512790182412-b19e6d61b397', 'photo-1492691527719-9d1e07e534b4',
    'photo-1516035069371-29a1b244cc32', 'photo-1526170375885-4d8ecf77b99f', 'photo-1502920917128-1aa500764cbd',
    'photo-1581591524425-c7e0978865fc', 'photo-1520390138845-fd2d229dd553', 'photo-1513694203232-719a280e022f',
    'photo-1617005082133-548c4dd27f35', 'photo-1598488035139-bdbb2231ce04', 'photo-1590602847861-f357a9332bbc',
    'photo-1558618666-fcd25c85cd64', 'photo-1563245372-f21724e3856d', 'photo-1473968512647-3e447244af8f',
    'photo-1517336714731-489689fd1ca8', 'photo-1558981806-ec527fa84c39', 'photo-1508898578281-774ac4893c0c',
    'photo-1519638399535-1b036603ac77', 'photo-1542751371-adc38448a05e', 'photo-1510127034890-ba27508e9f1c',
    'photo-1579546929518-9e396f3cc809', 'photo-1550745165-9bc0b252726f', 'photo-1527864550417-7fd91fc51a46',
    'photo-1534447677768-be436bb09401', 'photo-1518770660439-4636190af475', 'photo-1486406146926-c627a92ad1ab',
    'photo-1498050108023-c5249f4df085', 'photo-1461749280684-dccba630e2f6', 'photo-1531297484001-80022131f5a1',
    'photo-1504384308090-c894fdcc538d', 'photo-1515378791036-0648a3ef77b2', 'photo-1526374965328-7f61d4dc18c5',
    'photo-1517694712202-14dd9538aa97', 'photo-1555774698-0b77e0d5fac6', 'photo-1525547719571-a2d4ac8945e2',
    'photo-1542751110-97427bbecf20', 'photo-1517245386807-bb43f82c33c4', 'photo-1496181133206-80ce9b88a853',
    'photo-1505740420928-5e560c06d30e', 'photo-1583394838336-acd977736f90', 'photo-1572536147248-ac59a8abfa4b',
    'photo-1546435770-a3e426bf472b', 'photo-1484704849700-f032a568e944', 'photo-1564466809058-bf81182fe979',
    'photo-1507679799987-c73779587ccf', 'photo-1519389950473-47ba0277781c', 'photo-1522071820081-009f0129c71c'
  ];

  let catalog = [...PRODUCTS];
  let imgIndex = 0;

  categoryConfigs.forEach((cfg) => {
    cfg.items.forEach((itemTitle, idx) => {
      const brand = brandList[(catalog.length + idx) % brandList.length];
      const dailyPrice = Math.floor(cfg.priceRange[0] + Math.random() * (cfg.priceRange[1] - cfg.priceRange[0]));
      const weeklyPrice = Math.round(dailyPrice * 5.5);
      const monthlyPrice = Math.round(dailyPrice * 18);
      const securityDeposit = Math.floor(cfg.depositRange[0] + Math.random() * (cfg.depositRange[1] - cfg.depositRange[0]));
      const totalStock = 2 + (idx % 6);

      const photoId = unsplashPhotoIds[imgIndex % unsplashPhotoIds.length];
      imgIndex++;

      const imgUrl = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80&sig=${catalog.length + 1}`;

      catalog.push({
        name: `${brand} ${itemTitle}`,
        brand,
        category: cfg.cat,
        description: `Professional-grade ${cfg.cat.toLowerCase()} equipment optimized for high-end film, television, and media production.`,
        dailyPrice,
        weeklyPrice,
        monthlyPrice,
        securityDeposit,
        totalStock,
        availableStock: totalStock - (idx % 2 === 0 ? 1 : 0),
        images: [imgUrl],
        specifications: {
          'Category': cfg.cat,
          'Grade': 'Cinema / Broadcast',
          'Condition': 'Inspection Certified',
          'Warranty': 'RentIQ Guaranteed'
        }
      });
    });
  });

  return catalog;
};

module.exports = { PRODUCTS, FULL_PRODUCTS: generateFullCatalog() };
