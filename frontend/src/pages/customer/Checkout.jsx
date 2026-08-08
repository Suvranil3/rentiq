import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../api/api';
import { Truck, Store, CreditCard, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalRentalFee, totalSecurityDeposit, totalPayable, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [deliveryMethod, setDeliveryMethod] = useState('Ship to Address'); // Ship to Address vs Store Pickup
  const [isProcessing, setIsProcessing] = useState(false);

  // Address State
  const [shippingAddress, setShippingAddress] = useState({
    street: '42 MG Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    zip: '560038'
  });

  // Test Payment Form State
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleCompleteCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create first rental item order
      const mainItem = cartItems[0];
      const rentalPayload = {
        userId: user?.id || 'u-guest',
        customerName: user?.name || 'Alex Johnson',
        customerEmail: user?.email || 'customer@rentiq.com',
        customerPhone: user?.phone || '+91 98765 43210',
        productId: mainItem.product.id,
        productName: mainItem.product.name,
        productImage: mainItem.product.images[0],
        startDate: mainItem.startDate,
        endDate: mainItem.endDate,
        deliveryMethod,
        shippingAddress: deliveryMethod === 'Ship to Address' ? shippingAddress : null,
        quantity: mainItem.quantity,
        rentalFee: totalRentalFee,
        securityDeposit: totalSecurityDeposit,
        totalAmount: totalPayable
      };

      const created = await api.rentals.create(rentalPayload);
      clearCart();
      addToast('Payment Successful! Rental Confirmed.', 'success');
      navigate(`/rental-confirmation/${created.id}`);
    } catch (err) {
      addToast('Checkout processing failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-paper">
      <FloatingNavbar />

      <main className="grow max-w-7xl mx-auto w-full px-6 md:px-12 py-10 space-y-8">
        <div className="pb-4 border-b border-hairline-mist">
          <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Final Step</span>
          <h1 className="text-3xl md:text-4xl font-black text-ink-black tracking-tight">
            Checkout & Security Deposit Payment
          </h1>
        </div>

        <form onSubmit={handleCompleteCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Delivery Method Selector */}
            <Card className="space-y-4">
              <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
                <Truck className="w-5 h-5 text-fresh-grass" />
                <span>1. Select Fulfillment Method</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setDeliveryMethod('Ship to Address')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'Ship to Address'
                      ? 'border-fresh-grass bg-[#e8f7df]/40 shadow-xs'
                      : 'border-hairline-mist bg-pure-white hover:bg-sandstone/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Truck className="w-6 h-6 text-ink-black" />
                    {deliveryMethod === 'Ship to Address' && <CheckCircle2 className="w-5 h-5 text-[#2a6809]" />}
                  </div>
                  <h4 className="font-bold text-ink-black mt-3 text-sm">Ship to Address</h4>
                  <p className="text-xs text-stone-gray mt-1">Insured courier dispatch direct to your door.</p>
                </div>

                <div
                  onClick={() => setDeliveryMethod('Collect from Store')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'Collect from Store'
                      ? 'border-fresh-grass bg-[#e8f7df]/40 shadow-xs'
                      : 'border-hairline-mist bg-pure-white hover:bg-sandstone/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Store className="w-6 h-6 text-ink-black" />
                    {deliveryMethod === 'Collect from Store' && <CheckCircle2 className="w-5 h-5 text-[#2a6809]" />}
                  </div>
                  <h4 className="font-bold text-ink-black mt-3 text-sm">Collect from Store</h4>
                  <p className="text-xs text-stone-gray mt-1">Instant pickup at Central Warehouse Hub.</p>
                </div>
              </div>

              {/* Shipping Address Inputs */}
              {deliveryMethod === 'Ship to Address' && (
                <div className="pt-4 border-t border-hairline-mist space-y-4">
                  <h4 className="text-xs font-bold text-stone-gray uppercase tracking-wider">Shipping Address</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Street Address"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      required
                    />
                    <Input
                      label="City"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      required
                    />
                    <Input
                      label="State"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      required
                    />
                    <Input
                      label="Postal Code"
                      value={shippingAddress.zip}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Test Payment Gateway Simulator */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-fresh-grass" />
                  <span>2. Payment & Security Deposit Escrow</span>
                </h3>
                <div className="flex items-center gap-1 text-xs text-stone-gray font-semibold bg-sandstone/30 px-3 py-1 rounded-full border border-hairline-mist">
                  <Lock className="w-3.5 h-3.5 text-[#2a6809]" />
                  <span>Sandbox Demo Payment</span>
                </div>
              </div>

              <div className="p-4 bg-sandstone/20 rounded-2xl border border-hairline-mist space-y-4">
                <Input
                  label="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    required
                  />
                  <Input
                    label="CVC / CVV"
                    type="password"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    required
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Checkout Breakdown Box (4 cols) */}
          <div className="lg:col-span-4">
            <Card className="space-y-6 sticky top-24 border-2 border-hairline-mist">
              <h3 className="text-lg font-bold text-ink-black border-b border-hairline-mist pb-3">
                Order Review
              </h3>

              <div className="space-y-3 text-xs">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-2 border-b border-hairline-mist/50">
                    <div>
                      <span className="font-bold text-ink-black block">{item.product.name}</span>
                      <span className="text-stone-gray">{item.startDate} to {item.endDate} ({item.days} days)</span>
                    </div>
                    <span className="font-bold text-ink-black text-sm">₹{item.rentalFee.toLocaleString()}</span>
                  </div>
                ))}

                <div className="pt-2 space-y-2 text-sm">
                  <div className="flex justify-between text-stone-gray font-medium">
                    <span>Rental Amount:</span>
                    <span className="font-bold text-ink-black">₹{totalRentalFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-gray font-medium">
                    <span>Security Deposit (Held):</span>
                    <span className="font-bold text-ink-black">₹{totalSecurityDeposit.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t border-hairline-mist flex justify-between items-baseline text-lg font-black text-ink-black">
                    <span>Total Payable:</span>
                    <span className="text-fresh-grass text-2xl">₹{totalPayable.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isProcessing}
              >
                Pay ₹{totalPayable.toLocaleString()} & Complete Order
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-stone-gray">
                <ShieldCheck className="w-4 h-4 text-fresh-grass" />
                <span>Escrow Refund Guarantee</span>
              </div>
            </Card>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};
