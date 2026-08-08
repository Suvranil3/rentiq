import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../api/api';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Check, 
  ArrowLeft, 
  Info, 
  ShoppingBag, 
  Truck, 
  Store
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Date Selection State (Default 3 day rental period)
  const todayStr = new Date().toISOString().split('T')[0];
  const inThreeDays = new Date(Date.now() + 3 * 84600000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(inThreeDays);
  const [quantity, setQuantity] = useState(1);

  // Availability state
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await api.products.getById(id);
        setProduct(data);
        // Initial availability check
        checkDatesAvailability(id, todayStr, inThreeDays);
      } catch (err) {
        addToast('Failed to load product details.', 'error');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const checkDatesAvailability = async (prodId, start, end) => {
    setIsCheckingAvailability(true);
    const res = await api.rentals.checkAvailability(prodId, start, end);
    setAvailabilityResult(res);
    setIsCheckingAvailability(false);
  };

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
      if (new Date(value) > new Date(endDate)) {
        const nextDay = new Date(new Date(value).getTime() + 84600000).toISOString().split('T')[0];
        setEndDate(nextDay);
        checkDatesAvailability(id, value, nextDay);
      } else {
        checkDatesAvailability(id, value, endDate);
      }
    } else {
      setEndDate(value);
      checkDatesAvailability(id, startDate, value);
    }
  };

  // Duration & Price Calculations
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(0, end - start);
  const durationDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const totalRentalFee = product ? durationDays * product.dailyPrice * quantity : 0;
  const totalSecurityDeposit = product ? product.securityDeposit * quantity : 0;
  const grandTotal = totalRentalFee + totalSecurityDeposit;

  const handleAddToCart = () => {
    if (!product) return;
    if (availabilityResult && !availabilityResult.available) {
      addToast('Item is unavailable for selected dates.', 'error');
      return;
    }

    addToCart(product, startDate, endDate, quantity);
    addToast(`${product.name} added to cart!`, 'success');
    navigate('/cart');
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-cream-paper flex flex-col">
        <FloatingNavbar />
        <div className="grow flex items-center justify-center p-12">
          <div className="w-10 h-10 border-4 border-fresh-grass border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-paper">
      <FloatingNavbar />

      <main className="grow max-w-7xl mx-auto w-full px-6 md:px-12 py-8 space-y-8">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs font-bold text-stone-gray hover:text-ink-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Gallery Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-pure-white border border-hairline-mist card-shadow">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === idx ? 'border-fresh-grass ring-2 ring-fresh-grass/30' : 'border-hairline-mist opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info & Config Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge status={product.availableStock > 0 ? 'Available' : 'Unavailable'}>
                  {product.availableStock > 0 ? 'Available Now' : 'Out of Stock'}
                </Badge>
                <span className="text-xs font-bold text-stone-gray uppercase tracking-widest bg-sandstone/30 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-ink-black tracking-tight">
                {product.name}
              </h1>

              <p className="text-sm text-stone-gray font-medium leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Specifications Card */}
            <Card padding="sm" className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-black">Technical Attributes</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 bg-sandstone/30 rounded-xl">
                  <span className="text-stone-gray block">Brand</span>
                  <span className="font-bold text-ink-black">{product.brand}</span>
                </div>
                <div className="p-2.5 bg-sandstone/30 rounded-xl">
                  <span className="text-stone-gray block">Manufacturer</span>
                  <span className="font-bold text-ink-black">{product.manufacturer}</span>
                </div>
                <div className="p-2.5 bg-sandstone/30 rounded-xl">
                  <span className="text-stone-gray block">Color</span>
                  <span className="font-bold text-ink-black">{product.color}</span>
                </div>
                <div className="p-2.5 bg-sandstone/30 rounded-xl">
                  <span className="text-stone-gray block">Dimensions</span>
                  <span className="font-bold text-ink-black truncate block">{product.size}</span>
                </div>
              </div>
            </Card>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-4 gap-2 bg-sandstone/30 p-2 rounded-2xl border border-hairline-mist text-center">
              <div className="p-2 bg-pure-white rounded-xl card-shadow">
                <span className="text-[10px] font-bold text-stone-gray uppercase block">Hourly</span>
                <span className="text-sm font-bold text-ink-black">₹{product.hourlyPrice}</span>
              </div>
              <div className="p-2 bg-fresh-grass text-ink-black rounded-xl font-bold">
                <span className="text-[10px] font-bold uppercase block opacity-80">Daily Rate</span>
                <span className="text-sm">₹{product.dailyPrice}</span>
              </div>
              <div className="p-2 bg-pure-white rounded-xl card-shadow">
                <span className="text-[10px] font-bold text-stone-gray uppercase block">Weekly</span>
                <span className="text-sm font-bold text-ink-black">₹{product.weeklyPrice}</span>
              </div>
              <div className="p-2 bg-pure-white rounded-xl card-shadow">
                <span className="text-[10px] font-bold text-stone-gray uppercase block">Monthly</span>
                <span className="text-sm font-bold text-ink-black">₹{product.monthlyPrice}</span>
              </div>
            </div>

            {/* Rental Configuration Box */}
            <Card className="space-y-6 border-2 border-hairline-mist">
              <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
                <Calendar className="w-5 h-5 text-fresh-grass" />
                <span>Configure Rental Dates & Duration</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  min={todayStr}
                  value={startDate}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                />
                <Input
                  label="Return Date"
                  type="date"
                  min={startDate}
                  value={endDate}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                />
                <Input
                  label="Quantity"
                  type="select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  options={[
                    { label: '1 Unit', value: 1 },
                    { label: '2 Units', value: 2 },
                    { label: '3 Units', value: 3 }
                  ]}
                />
              </div>

              {/* Real-Time Availability Indicator */}
              <div className="p-4 rounded-2xl bg-sandstone/30 border border-hairline-mist flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isCheckingAvailability ? (
                    <div className="w-4 h-4 border-2 border-fresh-grass border-t-transparent rounded-full animate-spin" />
                  ) : availabilityResult?.available ? (
                    <Check className="w-5 h-5 text-[#2a6809]" />
                  ) : (
                    <Info className="w-5 h-5 text-coral-pop" />
                  )}
                  <span className="text-xs font-bold text-ink-black">
                    {isCheckingAvailability
                      ? 'Checking fleet availability...'
                      : availabilityResult?.available
                      ? `✓ In Stock & Available for ${durationDays} Days (${availabilityResult.remainingStock} available)`
                      : '✖ Unavailable for selected dates'}
                  </span>
                </div>
                <span className="text-xs font-bold text-stone-gray">{durationDays} Days Duration</span>
              </div>

              {/* Price Calculation Summary */}
              <div className="pt-4 border-t border-hairline-mist space-y-2 text-sm">
                <div className="flex justify-between text-stone-gray font-medium">
                  <span>Rental Fee ({durationDays} days × ₹{product.dailyPrice}):</span>
                  <span className="font-bold text-ink-black">₹{totalRentalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-gray font-medium">
                  <span>Refundable Security Deposit (Held):</span>
                  <span className="font-bold text-ink-black">₹{totalSecurityDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-hairline-mist/60 text-lg font-black text-ink-black">
                  <span>Total Payable:</span>
                  <span className="text-fresh-grass text-2xl">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                icon={ShoppingBag}
                onClick={handleAddToCart}
                disabled={availabilityResult && !availabilityResult.available}
              >
                Rent Now & Reserve
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
