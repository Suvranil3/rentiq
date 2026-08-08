import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { api } from '../../api/api';
import { Search, RotateCcw, Eye, ShieldCheck, AlertTriangle } from 'lucide-react';

export const AdminRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadRentals();
  }, [activeTab]);

  const loadRentals = async () => {
    setLoading(true);
    const data = await api.rentals.getAll({ status: activeTab });
    setRentals(data);
    setLoading(false);
  };

  const tabs = ['All', 'Active', 'Due Today', 'Overdue', 'Returned'];

  const filtered = rentals.filter(r => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.id.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.productName.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      header: 'Rental ID',
      cell: (row) => (
        <div>
          <span className="font-bold text-ink-black text-sm block">{row.id}</span>
          <span className="text-stone-gray text-[11px]">{row.createdDate}</span>
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
      cell: (row) => (
        <span className="font-semibold text-ink-black text-xs block max-w-xs truncate">
          {row.productName}
        </span>
      )
    },
    {
      header: 'Rental Period',
      cell: (row) => (
        <span className="text-xs text-stone-gray font-medium">
          {row.startDate} to <strong className="text-ink-black">{row.endDate}</strong>
        </span>
      )
    },
    {
      header: 'Deposit Status',
      cell: (row) => <Badge status={row.depositStatus} size="sm" />
    },
    {
      header: 'Rental Status',
      cell: (row) => <Badge status={row.status} size="sm" />
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`/admin/rentals/${row.id}`}>
            <button className="p-1.5 text-stone-gray hover:text-ink-black rounded-lg hover:bg-sandstone/40">
              <Eye className="w-4 h-4" />
            </button>
          </Link>
          <Link to={`/admin/returns?rentalId=${row.id}`}>
            <Button variant="outline" size="sm" icon={RotateCcw}>
              Inspect
            </Button>
          </Link>
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
            <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Rental Fleet Directory</span>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">Rental Orders & Operations</h1>
            <p className="text-xs text-stone-gray font-medium mt-1">
              Audit active rentals, track overdue items, and trigger return inspections.
            </p>
          </div>

          <Link to="/admin/returns">
            <Button variant="primary" icon={RotateCcw}>
              Return Inspection Wizard
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

        {/* Search */}
        <div className="bg-pure-white p-4 rounded-3xl border border-hairline-mist card-shadow max-w-md">
          <div className="relative">
            <Input
              placeholder="Search by Rental ID, customer name, or gear..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full"
            />
            <Search className="w-4 h-4 text-stone-gray absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Table */}
        <Table columns={columns} data={filtered} isLoading={loading} />
      </main>
    </div>
  );
};
