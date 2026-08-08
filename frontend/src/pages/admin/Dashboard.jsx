import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { StatCard } from '../../components/dashboard/StatCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { api } from '../../api/api';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  CalendarClock, 
  RotateCcw, 
  AlertTriangle, 
  DollarSign, 
  ShieldCheck, 
  TrendingUp, 
  Package
} from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const rentalData = await api.rentals.getAll();
      const productData = await api.products.getAll();
      setRentals(rentalData);
      setProducts(productData);
      setLoading(false);
    };
    loadData();
  }, []);

  // Compute KPI Counts
  const activeCount = rentals.filter(r => r.status === 'Active').length;
  const overdueCount = rentals.filter(r => r.status === 'Overdue').length;
  const returnedCount = rentals.filter(r => r.status === 'Returned').length;
  const dueTodayCount = 2; // Demo count
  const upcomingPickups = 3;
  const upcomingReturns = 4;

  const totalRevenue = 82400;
  const depositsHeld = rentals
    .filter(r => r.depositStatus === 'HELD')
    .reduce((acc, r) => acc + (r.securityDeposit || 0), 0);
  const lateFeesCollected = 4500;

  // Chart Dataset
  const revenueData = [
    { day: 'Mon', revenue: 12000, rentals: 4 },
    { day: 'Tue', revenue: 18500, rentals: 6 },
    { day: 'Wed', revenue: 15000, rentals: 5 },
    { day: 'Thu', revenue: 22000, rentals: 8 },
    { day: 'Fri', revenue: 29000, rentals: 10 },
    { day: 'Sat', revenue: 34000, rentals: 12 },
    { day: 'Sun', revenue: 28000, rentals: 9 }
  ];

  const statusDistribution = [
    { name: 'Active', count: activeCount, fill: '#8ed462' },
    { name: 'Overdue', count: overdueCount, fill: '#ff705d' },
    { name: 'Returned', count: returnedCount, fill: '#2ba0ff' }
  ];

  const depositOverview = [
    { name: 'Held in Escrow', value: depositsHeld, color: '#8ed462' },
    { name: 'Refunded', value: 18000, color: '#2ba0ff' },
    { name: 'Deducted (Late/Damage)', value: 3500, color: '#ff705d' }
  ];

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline-mist">
          <div>
            <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Rental Fleet Operations</span>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">Operations Dashboard</h1>
            <p className="text-xs text-stone-gray font-medium mt-1">
              Real-time rental monitoring, deposit ledger, and return processing center.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin/returns">
              <Button variant="primary" size="sm" icon={RotateCcw}>
                Process Return Inspection
              </Button>
            </Link>
            <Link to="/admin/products/new">
              <Button variant="outline" size="sm" icon={Package}>
                + Add Product
              </Button>
            </Link>
          </div>
        </div>

        {/* 8 Top KPI Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Active Rentals"
            value={activeCount}
            subtext="Equipment out with customers"
            icon={CalendarClock}
            accentColor="fresh-grass"
            trend={{ value: '+14%', positive: true }}
          />
          <StatCard
            title="Due Today"
            value={dueTodayCount}
            subtext="Expect return before 6:00 PM"
            icon={CalendarClock}
            accentColor="sunshine-pop"
          />
          <StatCard
            title="Overdue Rentals"
            value={overdueCount}
            subtext="Requires return inspection & late fee"
            icon={AlertTriangle}
            accentColor="coral-pop"
            trend={{ value: '-2', positive: true }}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            subtext="Rental fees + collected late fees"
            icon={DollarSign}
            accentColor="fresh-grass"
            trend={{ value: '+22%', positive: true }}
          />

          <StatCard
            title="Upcoming Pickups"
            value={upcomingPickups}
            subtext="Dispatch & store collection ready"
            icon={Package}
            accentColor="sky-pop"
          />
          <StatCard
            title="Upcoming Returns"
            value={upcomingReturns}
            subtext="Scheduled returns in next 48h"
            icon={RotateCcw}
            accentColor="fresh-grass"
          />
          <StatCard
            title="Deposits Held"
            value={`₹${depositsHeld.toLocaleString()}`}
            subtext="Escrow held for active rentals"
            icon={ShieldCheck}
            accentColor="sky-pop"
          />
          <StatCard
            title="Late Fees Collected"
            value={`₹${lateFeesCollected.toLocaleString()}`}
            subtext="Deducted upon return"
            icon={DollarSign}
            accentColor="sunshine-pop"
          />
        </div>

        {/* Charts Row 1: Revenue Trend & Status Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Recharts Line Chart (8 cols) */}
          <Card className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink-black">Weekly Revenue & Rental Volume</h3>
                <p className="text-xs text-stone-gray">Daily rental revenue trajectory (INR)</p>
              </div>
              <span className="text-xs font-bold text-[#2a6809] bg-[#e8f7df] px-3 py-1 rounded-full border border-[#c4ebae]">
                +18.5% Growth
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8ed462" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8ed462" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#80827f" fontSize={12} tickLine={false} />
                  <YAxis stroke="#80827f" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #d5d5d4',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#8ed462" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Deposit Settlement Pie Chart (4 cols) */}
          <Card className="lg:col-span-4 space-y-4">
            <h3 className="text-base font-bold text-ink-black">Security Deposit Overview</h3>
            <p className="text-xs text-stone-gray">Escrow breakdown & deduction history</p>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={depositOverview}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                  >
                    {depositOverview.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2 border-t border-hairline-mist text-xs">
              {depositOverview.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-stone-gray font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-ink-black">₹{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Actionable Overdue & Returns Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active / Overdue Rental Table Preview (12 cols) */}
          <Card className="lg:col-span-12 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink-black">Recent & Overdue Rental Orders</h3>
              <Link to="/admin/rentals" className="text-xs font-bold text-stone-gray hover:text-ink-black">
                View All Rentals →
              </Link>
            </div>

            <div className="divide-y divide-hairline-mist/60 text-xs">
              {rentals.map((r) => (
                <div key={r.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink-black text-sm">{r.productName}</span>
                      <Badge status={r.status} size="sm" />
                    </div>
                    <p className="text-stone-gray">
                      Customer: <strong>{r.customerName}</strong> • Return Due: <strong>{r.endDate}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-black text-ink-black text-sm">
                      Deposit ₹{(r.securityDeposit || 0).toLocaleString()}
                    </span>
                    <Link to="/admin/returns">
                      <Button variant="outline" size="sm">
                        Inspect Return
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
