import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { api } from '../../api/api';
import { useToast } from '../../context/ToastContext';
import { RotateCcw, AlertTriangle, CheckCircle2, ShieldCheck, Wrench } from 'lucide-react';

export const AdminReturns = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [activeRentals, setActiveRentals] = useState([]);
  const [selectedRentalId, setSelectedRentalId] = useState(searchParams.get('rentalId') || '');
  const [selectedRental, setSelectedRental] = useState(null);

  // Inspection Form State
  const [condition, setCondition] = useState('Good'); // Excellent | Good | Damaged | Severe Damage
  const [damageNotes, setDamageNotes] = useState('');
  const [missingAccessories, setMissingAccessories] = useState([]);
  const [lateFeeOverride, setLateFeeOverride] = useState('');
  const [damageDeduction, setDamageDeduction] = useState('0');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    const data = await api.rentals.getAll();
    const returnable = data.filter(r => r.status === 'Active' || r.status === 'Overdue');
    setActiveRentals(returnable);

    if (selectedRentalId) {
      const found = data.find(r => r.id === selectedRentalId);
      if (found) setSelectedRental(found);
    } else if (returnable.length > 0) {
      setSelectedRentalId(returnable[0].id);
      setSelectedRental(returnable[0]);
    }
  };

  const handleSelectRental = (id) => {
    setSelectedRentalId(id);
    const found = activeRentals.find(r => r.id === id);
    setSelectedRental(found);
  };

  const toggleAccessory = (acc) => {
    setMissingAccessories(prev =>
      prev.includes(acc) ? prev.filter(a => a !== acc) : [...prev, acc]
    );
  };

  // Calculations
  const isLate = selectedRental ? new Date() > new Date(selectedRental.endDate) : false;
  const calculatedLateFee = lateFeeOverride ? Number(lateFeeOverride) : (isLate ? 1500 : 0);
  const calculatedDamageDeduction = Number(damageDeduction) + (missingAccessories.length * 500);
  const totalDeduction = calculatedLateFee + calculatedDamageDeduction;

  const depositHeld = selectedRental ? selectedRental.securityDeposit : 0;
  const netRefund = Math.max(0, depositHeld - totalDeduction);

  const handleConfirmReturn = async (e) => {
    e.preventDefault();
    if (!selectedRental) return;
    setIsSubmitting(true);

    try {
      await api.returns.process(selectedRental.id, {
        condition,
        damageNotes: damageNotes || 'Normal wear & tear.',
        missingAccessories,
        lateFee: calculatedLateFee,
        damageDeduction: calculatedDamageDeduction
      });

      addToast(`Return Processed for Order #${selectedRental.id}. Deposit Settled!`, 'success');
      navigate('/admin/dashboard');
    } catch (err) {
      addToast('Failed to process return inspection.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accessoriesList = ['Charger / Power Cable', 'Battery Pack', 'Carrying Case', 'HDMI / Audio Cable', 'Lens Cap'];

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-5xl mx-auto">
        <div className="pb-4 border-b border-hairline-mist">
          <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Fleet Operations</span>
          <h1 className="text-3xl font-black text-ink-black tracking-tight">Return Inspection & Deposit Settlement</h1>
          <p className="text-xs text-stone-gray font-medium mt-1">
            Inspect returned equipment condition, record damages or missing items, calculate late penalties, and execute deposit refund.
          </p>
        </div>

        <form onSubmit={handleConfirmReturn} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Inspection Form (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Select Active/Overdue Rental */}
            <Card className="space-y-4">
              <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-fresh-grass" />
                <span>1. Select Rental Order to Inspect</span>
              </h3>

              {activeRentals.length === 0 ? (
                <div className="p-4 bg-sandstone/30 rounded-2xl text-xs text-stone-gray font-medium text-center">
                  No active or overdue rentals requiring return inspection right now.
                </div>
              ) : (
                <div className="space-y-2">
                  <Input
                    label="Select Active Rental"
                    type="select"
                    value={selectedRentalId}
                    onChange={(e) => handleSelectRental(e.target.value)}
                    options={activeRentals.map(r => ({
                      label: `${r.id} • ${r.productName} (${r.customerName})`,
                      value: r.id
                    }))}
                  />
                </div>
              )}
            </Card>

            {selectedRental && (
              <>
                {/* Step 2: Equipment Condition */}
                <Card className="space-y-4">
                  <h3 className="text-base font-bold text-ink-black">2. Product Physical Condition</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Excellent', 'Good', 'Damaged', 'Severe Damage'].map(cond => (
                      <button
                        type="button"
                        key={cond}
                        onClick={() => setCondition(cond)}
                        className={`p-3 rounded-2xl border-2 text-xs font-bold transition-all text-center ${
                          condition === cond
                            ? 'border-fresh-grass bg-[#e8f7df] text-ink-black shadow-xs'
                            : 'border-hairline-mist bg-pure-white text-stone-gray hover:bg-sandstone/20'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>

                  <Input
                    label="Damage Report Notes"
                    type="textarea"
                    placeholder="Describe any scratch, cosmetic defect, sensor dust, or mechanical issue..."
                    value={damageNotes}
                    onChange={(e) => setDamageNotes(e.target.value)}
                  />
                </Card>

                {/* Step 3: Missing Accessories Checklist */}
                <Card className="space-y-4">
                  <h3 className="text-base font-bold text-ink-black">3. Missing Accessories Checklist</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {accessoriesList.map(acc => {
                      const isChecked = missingAccessories.includes(acc);
                      return (
                        <label
                          key={acc}
                          onClick={() => toggleAccessory(acc)}
                          className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-semibold cursor-pointer transition-all ${
                            isChecked
                              ? 'border-coral-pop bg-[#ffe8e5] text-[#9e1d0d]'
                              : 'border-hairline-mist bg-pure-white text-ink-black hover:bg-sandstone/20'
                          }`}
                        >
                          <span>{acc}</span>
                          <span className={`w-4 h-4 rounded-md border flex items-center justify-center ${isChecked ? 'bg-coral-pop text-pure-white border-coral-pop' : 'border-hairline-mist'}`}>
                            {isChecked && '✓'}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </Card>

                {/* Step 4: Late Fee & Deductions */}
                <Card className="space-y-4">
                  <h3 className="text-base font-bold text-ink-black">4. Late Fees & Repair Deductions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Late Fee Penalty (₹)"
                      type="number"
                      placeholder={isLate ? '1500' : '0'}
                      value={lateFeeOverride}
                      onChange={(e) => setLateFeeOverride(e.target.value)}
                      helperText={isLate ? 'Auto-calculated based on overdue days' : 'No overdue days detected'}
                    />
                    <Input
                      label="Damage / Repair Fee (₹)"
                      type="number"
                      value={damageDeduction}
                      onChange={(e) => setDamageDeduction(e.target.value)}
                    />
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Settlement Summary Box (4 cols) */}
          <div className="lg:col-span-4">
            <Card className="space-y-6 sticky top-24 border-2 border-hairline-mist">
              <h3 className="text-lg font-bold text-ink-black border-b border-hairline-mist pb-3">
                Deposit Settlement Calculation
              </h3>

              {selectedRental ? (
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between py-1 border-b border-hairline-mist/50">
                    <span className="text-stone-gray font-medium">Security Deposit Held:</span>
                    <span className="font-bold text-ink-black">₹{depositHeld.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-hairline-mist/50 text-coral-pop font-medium">
                    <span>Late Fee Deduction:</span>
                    <span className="font-bold">- ₹{calculatedLateFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-hairline-mist/50 text-coral-pop font-medium">
                    <span>Damage & Accessories Fee:</span>
                    <span className="font-bold">- ₹{calculatedDamageDeduction.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t border-hairline-mist space-y-1">
                    <div className="flex justify-between items-baseline text-sm font-bold text-ink-black">
                      <span>Net Deposit Refund to Customer:</span>
                      <span className="text-xl font-black text-[#2a6809]">
                        ₹{netRefund.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-gray">
                      Deposit settlement will be automatically disbursed to customer's account.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    icon={CheckCircle2}
                    isLoading={isSubmitting}
                  >
                    Confirm Return & Refund
                  </Button>
                </div>
              ) : (
                <p className="text-xs text-stone-gray">Select a rental to compute deposit settlement.</p>
              )}
            </Card>
          </div>
        </form>
      </main>
    </div>
  );
};
