import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { RentalTimeline } from '../../components/rentals/RentalTimeline';
import { InvoiceModal } from '../../components/ui/InvoiceModal';
import { api } from '../../api/api';
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

export const RentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const data = await api.rentals.getById(id);
        setRental(data);
      } catch (err) {
        navigate('/my-rentals');
      } finally {
        setLoading(false);
      }
    };
    fetchRental();
  }, [id]);

  if (loading || !rental) {
    return (
      <div className="min-h-screen bg-cream-paper flex flex-col">
        <FloatingNavbar />
        <div className="grow flex items-center justify-center p-12">
          <div className="w-10 h-10 border-4 border-fresh-grass border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const isOverdue = rental.status === 'Overdue';

  return (
    <div className="min-h-screen flex flex-col bg-cream-paper">
      <FloatingNavbar />

      <main className="grow max-w-5xl mx-auto w-full px-6 md:px-12 py-10 space-y-8">
        <button
          onClick={() => navigate('/my-rentals')}
          className="inline-flex items-center gap-1 text-xs font-bold text-stone-gray hover:text-ink-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Rentals</span>
        </button>

        {/* Overdue Warning Alert Banner */}
        {isOverdue && (
          <div className="p-4 bg-[#ffe8e5] rounded-3xl border border-[#ffc2bb] flex items-start gap-3 text-xs text-[#9e1d0d]">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">OVERDUE RENTAL ALERT</h4>
              <p className="mt-0.5">
                This item was due for return on <strong>{rental.endDate}</strong>. Accrued late fee penalty is being deducted from security deposit.
              </p>
              {rental.accruedLateFee && (
                <span className="inline-block mt-2 font-black text-sm bg-pure-white px-3 py-1 rounded-full border border-[#ffc2bb]">
                  Current Accrued Late Fee: ₹{rental.accruedLateFee.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Main Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-hairline-mist">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge status={rental.status} />
              <span className="text-xs font-bold text-stone-gray">Ref: {rental.id}</span>
            </div>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">{rental.productName}</h1>
          </div>

          <Button
            variant="outline"
            icon={FileText}
            onClick={() => setShowInvoice(true)}
          >
            Download Tax Invoice
          </Button>
        </div>

        {/* Timeline Component */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-stone-gray uppercase tracking-wider">Rental Lifecycle Status</h3>
          <RentalTimeline timeline={rental.timeline} />
        </Card>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dates & Logistics */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
              <Clock className="w-5 h-5 text-fresh-grass" />
              <span>Logistics & Timestamps</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray font-medium">Rental Start Date:</span>
                <span className="font-bold text-ink-black">{rental.startDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray font-medium">Agreed Return Date:</span>
                <span className="font-bold text-ink-black">{rental.endDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray font-medium">Fulfillment Method:</span>
                <span className="font-bold text-ink-black">{rental.deliveryMethod}</span>
              </div>
              {rental.shippingAddress && (
                <div className="py-2 border-b border-hairline-mist/50">
                  <span className="text-stone-gray font-medium block mb-1">Destination Address:</span>
                  <span className="font-semibold text-ink-black">
                    {rental.shippingAddress.street}, {rental.shippingAddress.city}, {rental.shippingAddress.state} - {rental.shippingAddress.zip}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Deposit & Financial Ledger */}
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-fresh-grass" />
              <span>Financial Escrow & Deposit Ledger</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray font-medium">Rental Fee Paid:</span>
                <span className="font-bold text-ink-black">₹{(rental.rentalFee || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray font-medium">Security Deposit Amount:</span>
                <span className="font-bold text-ink-black">₹{(rental.securityDeposit || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-hairline-mist/50">
                <span className="text-stone-gray font-medium">Deposit Escrow Status:</span>
                <Badge status={rental.depositStatus} size="sm" />
              </div>
              {rental.inspectionReport && (
                <div className="p-3 bg-sandstone/30 rounded-2xl border border-hairline-mist space-y-1">
                  <span className="font-bold text-stone-gray block">Return Inspection Report:</span>
                  <p className="text-ink-black">Condition: <strong>{rental.inspectionReport.condition}</strong></p>
                  <p className="text-stone-gray">{rental.inspectionReport.damageNotes}</p>
                  <p className="text-[#2a6809] font-bold">Refunded: ₹{rental.inspectionReport.refundAmount}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

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
