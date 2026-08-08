import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { api } from '../../api/api';
import { CreditCard, DollarSign, ShieldCheck, TrendingUp } from 'lucide-react';

export const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const data = await api.payments.getPayments();
        setPayments(data);
      } catch (err) {
        console.error('Failed to load payments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filtered = payments.filter(p => {
    if (filterType === 'All') return true;
    return p.type.toLowerCase().includes(filterType.toLowerCase());
  });

  const columns = [
    {
      header: 'Transaction Ref',
      cell: (row) => (
        <div>
          <span className="font-bold text-ink-black text-sm block">{row.id}</span>
          <span className="text-stone-gray text-[11px]">{row.date}</span>
        </div>
      )
    },
    {
      header: 'Customer',
      cell: (row) => (
        <div>
          <span className="font-bold text-ink-black text-xs block">{row.customer}</span>
          <span className="text-stone-gray text-[11px]">Ref: {row.rentalId}</span>
        </div>
      )
    },
    {
      header: 'Payment Type',
      cell: (row) => (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sandstone/30 border border-hairline-mist text-ink-black">
          {row.type}
        </span>
      )
    },
    {
      header: 'Amount',
      cell: (row) => <span className="font-bold text-ink-black text-sm">₹{row.amount.toLocaleString()}</span>
    },
    {
      header: 'Gateway Method',
      cell: (row) => <span className="text-xs text-stone-gray font-medium">{row.method}</span>
    },
    {
      header: 'Status',
      cell: (row) => <Badge status={row.status} size="sm" />
    }
  ];

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline-mist">
          <div>
            <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Financial Management</span>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">Payments & Security Deposits Ledger</h1>
            <p className="text-xs text-stone-gray font-medium mt-1">
              Audit rental fees, security deposit holds, deposit disburse history, and late fee deductions.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-pure-white p-4 rounded-3xl border border-hairline-mist card-shadow max-w-sm">
          <Input
            type="select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { label: 'All Transaction Types', value: 'All' },
              { label: 'Rental Fee', value: 'Rental Fee' },
              { label: 'Deposit Hold', value: 'Deposit Hold' },
              { label: 'Deposit Refund', value: 'Deposit Refund' },
              { label: 'Late Fee Penalty', value: 'Late Fee' }
            ]}
            className="rounded-full"
          />
        </div>

        {/* Table */}
        <Table columns={columns} data={filtered} isLoading={loading} />
      </main>
    </div>
  );
};
