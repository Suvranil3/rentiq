import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Calendar } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItemDates, 
    totalRentalFee, 
    totalSecurityDeposit, 
    totalPayable 
  } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-cream-paper">
      <FloatingNavbar />

      <main className="grow max-w-7xl mx-auto w-full px-6 md:px-12 py-10 space-y-8">
        <div className="pb-4 border-b border-hairline-mist">
          <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Your Reservation</span>
          <h1 className="text-3xl md:text-4xl font-black text-ink-black tracking-tight">
            Rental Cart ({cartItems.length} items)
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-pure-white p-12 rounded-3xl border border-hairline-mist text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-sandstone/30 flex items-center justify-center text-stone-gray mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-ink-black">Your Rental Cart is Empty</h2>
            <p className="text-sm text-stone-gray">Explore our equipment catalog and select rental dates to get started.</p>
            <Link to="/products">
              <Button variant="primary">Browse Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="flex flex-col sm:flex-row gap-6 p-6">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-2xl bg-sandstone/30 border border-hairline-mist shrink-0"
                  />

                  {/* Details */}
                  <div className="grow space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-bold text-stone-gray uppercase tracking-wider">
                          {item.product.brand}
                        </span>
                        <h3 className="text-lg font-bold text-ink-black">{item.product.name}</h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-gray hover:text-coral-pop p-1.5 rounded-full hover:bg-sandstone/30"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Date Selector for this item */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-sandstone/20 rounded-2xl border border-hairline-mist/60 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-stone-gray uppercase block mb-1">Start Date</label>
                        <input
                          type="date"
                          value={item.startDate}
                          onChange={(e) => updateCartItemDates(item.id, e.target.value, item.endDate)}
                          className="bg-pure-white px-2 py-1 rounded-lg border border-hairline-mist w-full text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-gray uppercase block mb-1">Return Date</label>
                        <input
                          type="date"
                          value={item.endDate}
                          onChange={(e) => updateCartItemDates(item.id, item.startDate, e.target.value)}
                          className="bg-pure-white px-2 py-1 rounded-lg border border-hairline-mist w-full text-xs font-semibold"
                        />
                      </div>
                    </div>

                    {/* Pricing Breakdown for item */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-stone-gray font-medium">
                        Duration: <strong className="text-ink-black">{item.days} Days</strong> (Qty: {item.quantity})
                      </span>
                      <div className="text-right">
                        <span className="text-base font-bold text-ink-black block">₹{item.rentalFee.toLocaleString()}</span>
                        <span className="text-[11px] text-stone-gray">Deposit ₹{item.securityDeposit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary Box (4 cols) */}
            <div className="lg:col-span-4">
              <Card className="space-y-6 sticky top-24 border-2 border-hairline-mist">
                <h3 className="text-lg font-bold text-ink-black border-b border-hairline-mist pb-3">
                  Rental Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-stone-gray font-medium">
                    <span>Rental Fees Subtotal:</span>
                    <span className="font-bold text-ink-black">₹{totalRentalFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-gray font-medium">
                    <span>Security Deposit (Escrow Held):</span>
                    <span className="font-bold text-ink-black">₹{totalSecurityDeposit.toLocaleString()}</span>
                  </div>

                  <div className="p-3 bg-[#e8f7df] rounded-2xl border border-[#c4ebae] flex items-center gap-2 text-xs text-[#2a6809]">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Security deposits are fully refunded upon undamaged return.</span>
                  </div>

                  <div className="pt-3 border-t border-hairline-mist flex justify-between items-baseline text-lg font-black text-ink-black">
                    <span>Total Due Now:</span>
                    <span className="text-2xl text-fresh-grass">₹{totalPayable.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-between"
                  icon={ArrowRight}
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <Link to="/products" className="text-xs font-bold text-stone-gray hover:text-ink-black">
                    ← Add More Items
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
