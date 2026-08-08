import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { api } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { CalendarClock, ArrowRight, ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export const MyRentals = () => {
  const { user } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchRentals = async () => {
      setLoading(true);
      const data = await api.rentals.getAll({ userId: user?.id });
      setRentals(data);
      setLoading(false);
    };
    fetchRentals();
  }, [user]);

  const tabs = ['All', 'Active', 'Due Soon', 'Overdue', 'Returned'];

  const filteredRentals = rentals.filter(r => {
    if (activeTab === 'All') return true;
    return r.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream-paper">
      <FloatingNavbar />

      <main className="grow max-w-7xl mx-auto w-full px-6 md:px-12 py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-hairline-mist">
          <div>
            <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Customer Portal</span>
            <h1 className="text-3xl md:text-4xl font-black text-ink-black tracking-tight">
              My Rental Orders
            </h1>
            <p className="text-sm text-stone-gray font-medium mt-1">
              Track active equipment rentals, return deadlines, and deposit settlement history.
            </p>
          </div>

          <Link to="/products">
            <Button variant="primary" size="sm">
              + Rent New Equipment
            </Button>
          </Link>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-hairline-mist/60">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                activeTab === tab
                  ? 'bg-fresh-grass text-ink-black shadow-xs'
                  : 'bg-sandstone/30 text-stone-gray hover:text-ink-black hover:bg-sandstone/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Rentals List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(n => (
              <div key={n} className="h-40 rounded-3xl bg-pure-white border border-hairline-mist animate-pulse p-6" />
            ))}
          </div>
        ) : filteredRentals.length === 0 ? (
          <div className="bg-pure-white p-12 rounded-3xl border border-hairline-mist text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-sandstone/30 flex items-center justify-center text-stone-gray mx-auto">
              <CalendarClock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-ink-black">No {activeTab} Rentals Found</h3>
            <p className="text-xs text-stone-gray">You have no equipment rentals matching this status filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRentals.map(rental => (
              <Card key={rental.id} hover className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={rental.productImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
                      alt=""
                      className="w-20 h-20 rounded-2xl object-cover bg-sandstone/30 border border-hairline-mist shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge status={rental.status} />
                        <span className="text-xs font-bold text-stone-gray">{rental.id}</span>
                      </div>
                      <h3 className="text-lg font-bold text-ink-black">{rental.productName}</h3>
                      <p className="text-xs text-stone-gray">
                        Rental Period: <strong className="text-ink-black">{rental.startDate}</strong> to <strong className="text-ink-black">{rental.endDate}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Financial & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-hairline-mist">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-stone-gray block">Total Paid</span>
                      <span className="text-lg font-black text-ink-black">₹{(rental.totalAmount || 0).toLocaleString()}</span>
                      <span className="text-[11px] text-fresh-grass font-bold block">
                        Deposit: {rental.depositStatus}
                      </span>
                    </div>

                    <Link to={`/my-rentals/${rental.id}`}>
                      <Button variant="outline" size="sm" icon={ArrowRight}>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
