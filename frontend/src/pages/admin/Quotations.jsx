import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { api } from '../../api/api';
import { useToast } from '../../context/ToastContext';
import { RupeeIcon } from '../../components/ui/RupeeIcon';
import { FileText, Plus, CheckCircle2, XCircle, Calendar } from 'lucide-react';

export const AdminQuotations = () => {
  const { addToast } = useToast();
  const [quotations, setQuotations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const inThreeDays = new Date(Date.now() + 3 * 84600000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    userId: '',
    productId: '',
    startDate: todayStr,
    endDate: inThreeDays,
    rentalFee: '',
    securityDeposit: '',
    discount: '0'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [qData, uData, pData] = await Promise.all([
        api.quotations.getAll(),
        api.users.getAll(),
        api.products.getAll()
      ]);
      setQuotations(qData);
      setCustomers(uData.filter(u => u.role === 'customer'));
      setProducts(pData);
      if (uData.length > 0) setFormData(prev => ({ ...prev, userId: uData[0].id || uData[0]._id }));
      if (pData.length > 0) {
        setFormData(prev => ({
          ...prev,
          productId: pData[0].id || pData[0]._id,
          rentalFee: pData[0].dailyPrice * 3,
          securityDeposit: pData[0].securityDeposit
        }));
      }
    } catch (err) {
      console.error('Failed to load quotation datasets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (prodId) => {
    const p = products.find(prod => (prod.id || prod._id) === prodId);
    setFormData(prev => ({
      ...prev,
      productId: prodId,
      rentalFee: p ? p.dailyPrice * 3 : prev.rentalFee,
      securityDeposit: p ? p.securityDeposit : prev.securityDeposit
    }));
  };

  const handleCreateQuotation = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.quotations.create(formData);
      addToast('Quotation created successfully as DRAFT!', 'success');
      setShowCreateModal(false);
      loadData();
    } catch (err) {
      addToast(err.message || 'Failed to create quotation', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmQuotation = async (id) => {
    if (!window.confirm('Confirm this quotation? This will issue a Tax Invoice and activate the Rental order immediately.')) return;
    try {
      await api.quotations.confirm(id);
      addToast('Quotation Confirmed! Invoice issued and rental activated.', 'success');
      loadData();
    } catch (err) {
      addToast(err.message || 'Failed to confirm quotation', 'error');
    }
  };

  const handleCancelQuotation = async (id) => {
    try {
      await api.quotations.cancel(id);
      addToast('Quotation status updated to CANCELLED.', 'info');
      loadData();
    } catch (err) {
      addToast(err.message || 'Failed to cancel quotation', 'error');
    }
  };

  const columns = [
    {
      header: 'Quotation Ref',
      cell: (row) => (
        <div>
          <span className="font-bold text-ink-black text-sm block">{row.quotationId}</span>
          <span className="text-stone-gray text-[11px]">{new Date(row.createdAt).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      header: 'Customer',
      cell: (row) => (
        <div>
          <span className="font-bold text-ink-black text-xs block">{row.customerName}</span>
          <span className="text-stone-gray text-[11px]">{row.customerEmail}</span>
        </div>
      )
    },
    {
      header: 'Equipment',
      cell: (row) => <span className="font-semibold text-ink-black text-xs">{row.productName}</span>
    },
    {
      header: 'Period',
      cell: (row) => (
        <span className="text-xs text-stone-gray font-medium">
          {row.startDate} to {row.endDate}
        </span>
      )
    },
    {
      header: 'Total Amount',
      cell: (row) => <span className="font-bold text-ink-black text-sm">₹{(row.totalAmount || 0).toLocaleString()}</span>
    },
    {
      header: 'Status',
      cell: (row) => <Badge status={row.status} size="sm" />
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.status === 'DRAFT' && (
            <>
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle2}
                onClick={() => handleConfirmQuotation(row.id || row.quotationId)}
              >
                Confirm & Issue Invoice
              </Button>
              <button
                onClick={() => handleCancelQuotation(row.id || row.quotationId)}
                className="p-1.5 text-coral-pop hover:bg-sandstone/40 rounded-lg"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline-mist">
          <div>
            <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Sales & Estimates</span>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">Rental Quotations & Estimates</h1>
            <p className="text-xs text-stone-gray font-medium mt-1">
              Create in-store quotes, confirm customer proposals, issue invoices, and trigger immediate rental dispatch.
            </p>
          </div>

          <Button variant="primary" icon={Plus} onClick={() => setShowCreateModal(true)}>
            Create New Quotation
          </Button>
        </div>

        {/* Create Quotation Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs">
            <Card className="max-w-lg w-full p-6 space-y-6 relative border-2 border-hairline-mist">
              <div className="flex items-center justify-between border-b border-hairline-mist pb-3">
                <h3 className="text-lg font-bold text-ink-black flex items-center gap-2">
                  <FileText className="w-5 h-5 text-fresh-grass" />
                  <span>Create In-Store Rental Quote</span>
                </h3>
                <button onClick={() => setShowCreateModal(false)} className="text-stone-gray font-bold">✕</button>
              </div>

              <form onSubmit={handleCreateQuotation} className="space-y-4">
                <Input
                  label="Select Customer"
                  type="select"
                  value={formData.userId}
                  onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
                  options={customers.map(c => ({ label: `${c.name} (${c.email})`, value: c.id || c._id }))}
                  required
                />

                <Input
                  label="Select Equipment"
                  type="select"
                  value={formData.productId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  options={products.map(p => ({ label: `${p.name} — ₹${p.dailyPrice}/day`, value: p.id || p._id }))}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Input
                    label="Rental Fee (₹)"
                    type="number"
                    value={formData.rentalFee}
                    onChange={(e) => setFormData(prev => ({ ...prev, rentalFee: e.target.value }))}
                    required
                  />
                  <Input
                    label="Deposit (₹)"
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData(prev => ({ ...prev, securityDeposit: e.target.value }))}
                    required
                  />
                  <Input
                    label="Discount (₹)"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                  />
                </div>

                <div className="pt-4 border-t border-hairline-mist flex justify-end gap-3">
                  <Button variant="outline" type="button" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" isLoading={submitting}>
                    Generate Quote (DRAFT)
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        <Table columns={columns} data={quotations} isLoading={loading} />
      </main>
    </div>
  );
};
