import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { InvoiceModal } from '../../components/ui/InvoiceModal';
import { api } from '../../api/api';
import { CheckCircle2, FileText, ArrowRight, Calendar, ShieldCheck, Truck } from 'lucide-react';

export const RentalConfirmation = () => {
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const data = await api.rentals.getById(id);
        setRental(data);
      } catch (err) {
        // Fallback demo object
        setRental({
          id: id || 'RNT-2026-8801',
          productName: 'Canon EOS R6 Mark II Mirrorless Camera',
          startDate: '2026-08-10',
          endDate: '2026-08-13',
          deliveryMethod: 'Ship to Address',
          rentalFee: 4500,
          securityDeposit: 5000,
          totalAmount: 9500,
          status: 'Active',
          depositStatus: 'HELD',
          paymentStatus: 'PAID'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRental();
  }, [id]);

  if (loading) {
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

      <main className="grow max-w-3xl mx-auto w-full px-6 py-12 space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#e8f7df] text-[#2a6809] border-2 border-[#c4ebae] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold text-fresh-grass uppercase tracking-widest block">Payment Verified</span>
          <h1 className="text-3xl md:text-4xl font-black text-ink-black tracking-tight">
            Rental Order Confirmed!
          </h1>
          <p className="text-sm text-stone-gray font-medium max-w-md mx-auto">
            Your rental order has been created. A confirmation email and tax invoice are ready for download.
          </p>
        </div>

        {/* Rental Brief Card */}
        <Card className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-hairline-mist">
            <div>
              <span className="text-xs font-bold text-stone-gray uppercase tracking-wider block">Rental Reference ID</span>
              <span className="text-xl font-bold text-ink-black">{rental.id}</span>
            </div>
            <Badge status={rental.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-sandstone/30 rounded-2xl border border-hairline-mist space-y-1">
              <span className="text-stone-gray font-semibold block uppercase">Equipment</span>
              <span className="font-bold text-ink-black text-sm block">{rental.productName}</span>
            </div>

            <div className="p-4 bg-sandstone/30 rounded-2xl border border-hairline-mist space-y-1">
              <span className="text-stone-gray font-semibold block uppercase">Rental Period</span>
              <span className="font-bold text-ink-black text-sm block">
                {rental.startDate} to {rental.endDate}
              </span>
            </div>

            <div className="p-4 bg-sandstone/30 rounded-2xl border border-hairline-mist space-y-1">
              <span className="text-stone-gray font-semibold block uppercase">Fulfillment</span>
              <span className="font-bold text-ink-black text-sm block">{rental.deliveryMethod}</span>
            </div>

            <div className="p-4 bg-sandstone/30 rounded-2xl border border-hairline-mist space-y-1">
              <span className="text-stone-gray font-semibold block uppercase">Security Deposit</span>
              <span className="font-bold text-fresh-grass text-sm block">₹{(rental.securityDeposit || 0).toLocaleString()} (Held)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-hairline-mist flex flex-col sm:flex-row items-center gap-4 justify-between">
            <Button
              variant="outline"
              icon={FileText}
              onClick={() => setShowInvoice(true)}
              className="w-full sm:w-auto"
            >
              View Tax Invoice (PDF)
            </Button>

            <Link to="/my-rentals" className="w-full sm:w-auto">
              <Button variant="primary" icon={ArrowRight} className="w-full sm:w-auto">
                Go to My Rentals
              </Button>
            </Link>
          </div>
        </Card>

        {/* Invoice Modal Trigger */}
        <InvoiceModal
          isOpen={showInvoice}
          onClose={() => setShowInvoice(false)}
          rental={rental}
        />
      </main>

      <Footer />
    </div>
  );
};
