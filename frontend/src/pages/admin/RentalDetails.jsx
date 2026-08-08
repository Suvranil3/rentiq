import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { RentalTimeline } from '../../components/rentals/RentalTimeline';
import { api } from '../../api/api';
import { ArrowLeft, RotateCcw, ShieldCheck, User, Calendar } from 'lucide-react';

export const AdminRentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const data = await api.rentals.getById(id);
        setRental(data);
      } catch (err) {
        navigate('/admin/rentals');
      } finally {
        setLoading(false);
      }
    };
    fetchRental();
  }, [id]);

  if (loading || !rental) {
    return (
      <div className="flex min-h-screen bg-cream-paper">
        <AdminSidebar />
        <main className="grow p-12 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-fresh-grass border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/admin/rentals')}
          className="inline-flex items-center gap-1 text-xs font-bold text-stone-gray hover:text-ink-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Rentals</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline-mist">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge status={rental.status} />
              <span className="text-xs font-bold text-stone-gray">Ref ID: {rental.id}</span>
            </div>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">{rental.productName}</h1>
          </div>

          <Link to={`/admin/returns?rentalId=${rental.id}`}>
            <Button variant="primary" icon={RotateCcw}>
              Process Return Inspection
            </Button>
          </Link>
        </div>

        {/* Timeline */}
        <Card className="space-y-4">
          <h3 className="text-xs font-bold text-stone-gray uppercase tracking-wider">Rental Operational Timeline</h3>
          <RentalTimeline timeline={rental.timeline} />
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
              <User className="w-5 h-5 text-fresh-grass" />
              <span>Customer Information</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray">Name:</span>
                <span className="font-bold text-ink-black">{rental.customerName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray">Email:</span>
                <span className="font-bold text-ink-black">{rental.customerEmail}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray">Phone:</span>
                <span className="font-bold text-ink-black">{rental.customerPhone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray">Fulfillment:</span>
                <span className="font-bold text-ink-black">{rental.deliveryMethod}</span>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-fresh-grass" />
              <span>Deposit Ledger & Fees</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray">Rental Fee:</span>
                <span className="font-bold text-ink-black">₹{(rental.rentalFee || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray">Security Deposit (Escrow):</span>
                <span className="font-bold text-ink-black">₹{(rental.securityDeposit || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray">Deposit Status:</span>
                <Badge status={rental.depositStatus} size="sm" />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
