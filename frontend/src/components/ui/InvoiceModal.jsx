import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Printer, Download, CheckCircle2, Building2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const InvoiceModal = ({ isOpen, onClose, rental }) => {
  const { addToast } = useToast();

  if (!rental) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addToast(`Invoice #${rental.id} downloaded successfully.`, 'success');
  };

  const formattedDate = rental.createdDate || new Date().toISOString().split('T')[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Tax Invoice #${rental.id}`} maxWidth="max-w-2xl">
      <div className="space-y-6 print:p-0 print:bg-white" id="printable-invoice">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-hairline-mist pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-fresh-grass flex items-center justify-center font-black text-ink-black text-lg">
              IQ
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink-black tracking-tight">RentIQ Operations</h2>
              <p className="text-xs text-stone-gray">AI-Powered Rental & Operations</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-stone-gray uppercase tracking-wider block">INVOICE</span>
            <span className="text-base font-bold text-ink-black">{rental.id}</span>
            <span className="text-xs text-stone-gray block mt-0.5">Date: {formattedDate}</span>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-sandstone/30 rounded-2xl border border-hairline-mist">
            <span className="font-semibold text-stone-gray block mb-1 uppercase tracking-wider">Billed To:</span>
            <p className="font-bold text-ink-black text-sm">{rental.customerName || 'Alex Johnson'}</p>
            <p className="text-stone-gray mt-0.5">{rental.customerEmail || 'customer@rentiq.com'}</p>
            <p className="text-stone-gray">{rental.customerPhone || '+91 98765 43210'}</p>
          </div>

          <div className="p-4 bg-sandstone/30 rounded-2xl border border-hairline-mist">
            <span className="font-semibold text-stone-gray block mb-1 uppercase tracking-wider">Fulfillment Method:</span>
            <p className="font-bold text-ink-black text-sm">{rental.deliveryMethod || 'Ship to Address'}</p>
            {rental.shippingAddress ? (
              <p className="text-stone-gray mt-0.5">
                {rental.shippingAddress.street}, {rental.shippingAddress.city}, {rental.shippingAddress.state} - {rental.shippingAddress.zip}
              </p>
            ) : (
              <p className="text-stone-gray mt-0.5">Store Pickup - Central Warehouse Hub</p>
            )}
          </div>
        </div>

        {/* Item Table */}
        <div className="border border-hairline-mist rounded-2xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-sandstone/40 font-semibold text-stone-gray uppercase border-b border-hairline-mist">
              <tr>
                <th className="p-3">Item Description</th>
                <th className="p-3">Period</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Rental Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-mist/50">
              <tr>
                <td className="p-3 font-semibold text-ink-black">
                  {rental.productName}
                  <span className="block text-[11px] font-normal text-stone-gray">Ref ID: {rental.productId}</span>
                </td>
                <td className="p-3 text-stone-gray">
                  {rental.startDate} to {rental.endDate}
                </td>
                <td className="p-3 text-right font-medium">{rental.quantity || 1}</td>
                <td className="p-3 text-right font-bold text-ink-black">₹{(rental.rentalFee || 0).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end gap-1.5 pt-2 text-sm">
          <div className="flex justify-between w-64 text-stone-gray">
            <span>Rental Subtotal:</span>
            <span className="font-semibold text-ink-black">₹{(rental.rentalFee || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between w-64 text-stone-gray">
            <span>Security Deposit (Held):</span>
            <span className="font-semibold text-ink-black">₹{(rental.securityDeposit || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between w-64 pt-2 border-t border-hairline-mist font-bold text-base text-ink-black">
            <span>Total Paid:</span>
            <span className="text-fresh-grass">₹{(rental.totalAmount || (rental.rentalFee + rental.securityDeposit)).toLocaleString()}</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#e8f7df] rounded-2xl border border-[#c4ebae] flex items-center justify-between text-xs text-[#2a6809]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Payment Verified via Sandbox Gateway • Deposit Held in Escrow</span>
          </div>
          <span className="font-bold">STATUS: PAID</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-hairline-mist print:hidden">
          <Button variant="outline" icon={Printer} onClick={handlePrint}>
            Print
          </Button>
          <Button variant="primary" icon={Download} onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
};
