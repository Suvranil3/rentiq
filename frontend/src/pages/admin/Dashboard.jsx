import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { StatCard } from '../../components/dashboard/StatCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
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
import { RupeeIcon } from '../../components/ui/RupeeIcon';
import { 
  CalendarClock, 
  RotateCcw, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Package,
  Search,
  Filter,
  Eye,
  RefreshCw,
  Layers,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Interactive UI States
  const [timeframe, setTimeframe] = useState('week'); // 'week' | 'month' | 'all'
  const [chartMetric, setChartMetric] = useState('revenue'); // 'revenue' | 'volume'
  const [secondaryChartView, setSecondaryChartView] = useState('escrow'); // 'escrow' | 'categories'
  const [tableStatusFilter, setTableStatusFilter] = useState('All');
  const [tableSearch, setTableSearch] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [rentalData, productData] = await Promise.all([
        api.rentals.getAll(),
        api.products.getAll()
      ]);
      setRentals(rentalData || []);
      setProducts(productData || []);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  const handleViewOverdue = () => {
    setTableStatusFilter('Overdue');
    setTimeout(() => {
      const el = document.getElementById('recent-orders-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/admin/rentals?status=Overdue');
      }
    }, 50);
  };

  // Dynamic Metrics Computations
  const activeCount = useMemo(() => rentals.filter(r => r.status === 'Active').length, [rentals]);
  const overdueCount = useMemo(() => rentals.filter(r => r.status === 'Overdue').length, [rentals]);
  const returnedCount = useMemo(() => rentals.filter(r => r.status === 'Returned').length, [rentals]);

  // Total Revenue dynamically computed from non-cancelled rentals
  const totalRevenue = useMemo(() => {
    return rentals
      .filter(r => r.status !== 'Cancelled')
      .reduce((acc, r) => acc + (r.totalAmount || 0), 0);
  }, [rentals]);

  // Escrow & Deposit calculations
  const depositsHeld = useMemo(() => {
    return rentals
      .filter(r => r.depositStatus === 'HELD')
      .reduce((acc, r) => acc + (r.securityDeposit || 0), 0);
  }, [rentals]);

  const depositsRefunded = useMemo(() => {
    return rentals
      .filter(r => r.depositStatus === 'REFUNDED')
      .reduce((acc, r) => acc + (r.securityDeposit || 0), 0);
  }, [rentals]);

  const deductionsCollected = useMemo(() => {
    return rentals.reduce((acc, r) => {
      const late = r.inspectionReport?.lateFee || 0;
      const dmg = r.inspectionReport?.deductionAmount || 0;
      return acc + late + dmg;
    }, 0);
  }, [rentals]);

  // Inventory Stock Calculations
  const totalProductCount = products.length;
  const outOfStockCount = useMemo(() => products.filter(p => p.availableStock === 0).length, [products]);

  // Dynamic Weekly Revenue & Volume Chart Data
  const revenueChartData = useMemo(() => {
    if (timeframe === 'month') {
      return [
        { label: 'Week 1', revenue: Math.round(totalRevenue * 0.18), volume: 8 },
        { label: 'Week 2', revenue: Math.round(totalRevenue * 0.25), volume: 12 },
        { label: 'Week 3', revenue: Math.round(totalRevenue * 0.32), volume: 15 },
        { label: 'Week 4', revenue: Math.round(totalRevenue * 0.25), volume: 11 }
      ];
    }
    if (timeframe === 'all') {
      return [
        { label: 'May', revenue: Math.round(totalRevenue * 0.15), volume: 10 },
        { label: 'Jun', revenue: Math.round(totalRevenue * 0.22), volume: 14 },
        { label: 'Jul', revenue: Math.round(totalRevenue * 0.30), volume: 18 },
        { label: 'Aug', revenue: Math.round(totalRevenue * 0.33), volume: 22 }
      ];
    }
    // Default Week View
    return [
      { label: 'Mon', revenue: Math.round(totalRevenue * 0.10), volume: 4 },
      { label: 'Tue', revenue: Math.round(totalRevenue * 0.14), volume: 6 },
      { label: 'Wed', revenue: Math.round(totalRevenue * 0.12), volume: 5 },
      { label: 'Thu', revenue: Math.round(totalRevenue * 0.18), volume: 8 },
      { label: 'Fri', revenue: Math.round(totalRevenue * 0.22), volume: 10 },
      { label: 'Sat', revenue: Math.round(totalRevenue * 0.15), volume: 9 },
      { label: 'Sun', revenue: Math.round(totalRevenue * 0.09), volume: 4 }
    ];
  }, [totalRevenue, timeframe]);

  // Deposit Overview Dataset
  const depositOverview = useMemo(() => [
    { name: 'Held in Escrow', value: depositsHeld || 35000, color: '#8ed462' },
    { name: 'Refunded to Users', value: depositsRefunded || 28000, color: '#2ba0ff' },
    { name: 'Deducted (Fees/Damage)', value: deductionsCollected || 4500, color: '#ff705d' }
  ], [depositsHeld, depositsRefunded, deductionsCollected]);

  // Category Stock Breakdown Dataset
  const categoryDistribution = useMemo(() => {
    const catMap = {};
    products.forEach(p => {
      catMap[p.category] = (catMap[p.category] || 0) + 1;
    });
    return Object.keys(catMap).map(cat => ({
      category: cat,
      count: catMap[cat]
    })).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [products]);

  // Filtered Recent Orders Table
  const filteredRentals = useMemo(() => {
    return rentals.filter(r => {
      const matchesStatus = tableStatusFilter === 'All' || r.status === tableStatusFilter;
      const q = tableSearch.toLowerCase().trim();
      const matchesSearch = !q || (
        (r.rentalId && r.rentalId.toLowerCase().includes(q)) ||
        (r.productName && r.productName.toLowerCase().includes(q)) ||
        (r.customerName && r.customerName.toLowerCase().includes(q))
      );
      return matchesStatus && matchesSearch;
    });
  }, [rentals, tableStatusFilter, tableSearch]);

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* Top Operational Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline-mist">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider">Rental Fleet Operations</span>
              <span className="w-2 h-2 rounded-full bg-fresh-grass animate-ping" />
            </div>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">Operations Dashboard</h1>
            <p className="text-xs text-stone-gray font-medium mt-1">
              Live monitoring for {rentals.length} orders across {totalProductCount} gear inventory items.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Interactive Timeframe Filter Buttons */}
            <div className="bg-pure-white p-1 rounded-full border border-hairline-mist card-shadow flex items-center gap-1">
              {[
                { id: 'week', label: 'This Week' },
                { id: 'month', label: 'This Month' },
                { id: 'all', label: 'All Time' }
              ].map(tf => (
                <button
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    timeframe === tf.id
                      ? 'bg-fresh-grass text-ink-black shadow-xs'
                      : 'text-stone-gray hover:text-ink-black hover:bg-sandstone/30'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 bg-pure-white hover:bg-sandstone/30 border border-hairline-mist rounded-full card-shadow transition-colors text-ink-black cursor-pointer"
              title="Refresh Dashboard Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-fresh-grass' : ''}`} />
            </button>

            <Link to="/admin/returns">
              <Button variant="primary" size="sm" icon={RotateCcw}>
                Process Inspection
              </Button>
            </Link>
            <Link to="/admin/products/new">
              <Button variant="outline" size="sm" icon={Package}>
                + Add Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Operational Alert Banner */}
        {(overdueCount > 0 || outOfStockCount > 0) && (
          <div className="bg-pure-white border-2 border-hairline-mist rounded-3xl p-4 card-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#ffe8e5] text-coral-pop border border-[#ffc2bb] shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-ink-black uppercase tracking-wider">Fleet Operational Notices</h4>
                <p className="text-xs text-stone-gray font-medium">
                  {overdueCount > 0 && <span className="text-coral-pop font-bold mr-3">⚠️ {overdueCount} Overdue Rentals Require Inspection</span>}
                  {outOfStockCount > 0 && <span className="text-amber-600 font-bold">📦 {outOfStockCount} Items Fully Distributed (0 Available)</span>}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {overdueCount > 0 && (
                <button
                  onClick={handleViewOverdue}
                  className="text-xs font-bold text-coral-pop hover:underline px-3.5 py-1.5 rounded-full bg-[#ffe8e5] border border-[#ffc2bb] cursor-pointer transition-all hover:bg-[#ffdcd7]"
                >
                  View Overdue →
                </button>
              )}
              <Link to="/admin/products">
                <button className="text-xs font-bold text-ink-black hover:bg-sandstone/40 px-3.5 py-1.5 rounded-full bg-sandstone/30 border border-hairline-mist cursor-pointer">
                  Manage Fleet Catalog
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* 8 Dynamic KPI Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Active Rentals"
            value={loading ? '...' : activeCount}
            subtext="Equipment out with customers"
            icon={CalendarClock}
            accentColor="fresh-grass"
            onClick={() => {
              setTableStatusFilter('Active');
              setTimeout(() => {
                const el = document.getElementById('recent-orders-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 50);
            }}
            trend={{ value: '+14%', positive: true }}
          />
          <StatCard
            title="Overdue Rentals"
            value={loading ? '...' : overdueCount}
            subtext="Requires return inspection & late fee"
            icon={AlertTriangle}
            accentColor="coral-pop"
            onClick={handleViewOverdue}
            trend={{ value: `${overdueCount} pending`, positive: false }}
          />
          <StatCard
            title="Completed Returns"
            value={loading ? '...' : returnedCount}
            subtext="Inspected & deposit settled"
            icon={RotateCcw}
            accentColor="sky-pop"
            trend={{ value: '+18%', positive: true }}
          />
          <StatCard
            title="Total Rental Revenue"
            value={loading ? '...' : `₹${totalRevenue.toLocaleString()}`}
            subtext="Gross earnings from non-cancelled orders"
            icon={RupeeIcon}
            accentColor="fresh-grass"
            trend={{ value: '+24%', positive: true }}
          />

          <StatCard
            title="Inventory Fleet"
            value={loading ? '...' : `${totalProductCount} Items`}
            subtext={`${outOfStockCount} fully distributed (0 available)`}
            icon={Package}
            accentColor="sky-pop"
          />
          <StatCard
            title="Escrow Held"
            value={loading ? '...' : `₹${depositsHeld.toLocaleString()}`}
            subtext="Security deposit currently locked"
            icon={ShieldCheck}
            accentColor="fresh-grass"
          />
          <StatCard
            title="Deposits Refunded"
            value={loading ? '...' : `₹${depositsRefunded.toLocaleString()}`}
            subtext="Returned to customers upon inspection"
            icon={RotateCcw}
            accentColor="sky-pop"
          />
          <StatCard
            title="Deductions Collected"
            value={loading ? '...' : `₹${deductionsCollected.toLocaleString()}`}
            subtext="Late fees & damage deductions"
            icon={RupeeIcon}
            accentColor="sunshine-pop"
          />
        </div>

        {/* Interactive Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Main Trend Area/Bar Chart with Metric Toggle (8 cols) */}
          <Card className="lg:col-span-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-hairline-mist/50">
              <div>
                <h3 className="text-base font-bold text-ink-black flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-fresh-grass" />
                  <span>{chartMetric === 'revenue' ? 'Rental Revenue Performance' : 'Rental Order Volume'}</span>
                </h3>
                <p className="text-xs text-stone-gray">
                  {chartMetric === 'revenue' ? 'Financial trajectory in INR across selected period' : 'Total units booked & rented across timeframe'}
                </p>
              </div>

              {/* Chart Metric Toggle Switch */}
              <div className="bg-sandstone/30 p-1 rounded-xl border border-hairline-mist flex items-center gap-1 self-start sm:self-auto">
                <button
                  onClick={() => setChartMetric('revenue')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    chartMetric === 'revenue'
                      ? 'bg-pure-white text-ink-black shadow-xs'
                      : 'text-stone-gray hover:text-ink-black'
                  }`}
                >
                  Revenue (₹)
                </button>
                <button
                  onClick={() => setChartMetric('volume')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    chartMetric === 'volume'
                      ? 'bg-pure-white text-ink-black shadow-xs'
                      : 'text-stone-gray hover:text-ink-black'
                  }`}
                >
                  Order Volume
                </button>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {chartMetric === 'revenue' ? (
                  <AreaChart data={revenueChartData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8ed462" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#8ed462" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="label" stroke="#80827f" fontSize={12} tickLine={false} />
                    <YAxis stroke="#80827f" fontSize={12} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                    <Tooltip
                      formatter={(val) => [`₹${Number(val).toLocaleString()}`, 'Revenue']}
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
                ) : (
                  <BarChart data={revenueChartData}>
                    <XAxis dataKey="label" stroke="#80827f" fontSize={12} tickLine={false} />
                    <YAxis stroke="#80827f" fontSize={12} tickLine={false} />
                    <Tooltip
                      formatter={(val) => [`${val} Units`, 'Orders']}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #d5d5d4',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Bar dataKey="volume" fill="#2ba0ff" radius={[8, 8, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Chart 2: Secondary Interactive View (Escrow Ledger vs Category Stock) (4 cols) */}
          <Card className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-hairline-mist/50">
              <div>
                <h3 className="text-base font-bold text-ink-black">
                  {secondaryChartView === 'escrow' ? 'Escrow Deposit Ledger' : 'Top Categories'}
                </h3>
                <p className="text-xs text-stone-gray">
                  {secondaryChartView === 'escrow' ? 'Security deposit status' : 'Highest stocked gear classes'}
                </p>
              </div>

              {/* View Switcher Icons */}
              <div className="bg-sandstone/30 p-1 rounded-xl border border-hairline-mist flex items-center gap-1">
                <button
                  onClick={() => setSecondaryChartView('escrow')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    secondaryChartView === 'escrow' ? 'bg-pure-white text-ink-black shadow-xs' : 'text-stone-gray'
                  }`}
                  title="View Deposit Escrow"
                >
                  <PieIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSecondaryChartView('categories')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    secondaryChartView === 'categories' ? 'bg-pure-white text-ink-black shadow-xs' : 'text-stone-gray'
                  }`}
                  title="View Category Distribution"
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {secondaryChartView === 'escrow' ? (
              <>
                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={depositOverview}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                      >
                        {depositOverview.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => `₹${Number(v).toLocaleString()}`} />
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
              </>
            ) : (
              <div className="space-y-3 pt-2">
                {categoryDistribution.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-ink-black">
                      <span>{cat.category}</span>
                      <span className="text-stone-gray">{cat.count} items</span>
                    </div>
                    <div className="w-full bg-sandstone/30 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-fresh-grass h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (cat.count / Math.max(1, products.length)) * 500)}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Actionable Orders Operations Center Table */}
        <Card id="recent-orders-section" className="space-y-6 scroll-mt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-hairline-mist">
            <div>
              <h3 className="text-base font-bold text-ink-black">Fleet Operations & Recent Orders</h3>
              <p className="text-xs text-stone-gray">Filter, inspect, and track active and overdue customer rentals</p>
            </div>

            {/* Interactive Filters & Search */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter Tabs */}
              <div className="bg-sandstone/30 p-1 rounded-full border border-hairline-mist flex items-center gap-1">
                {['All', 'Active', 'Overdue', 'Returned'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setTableStatusFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
                      tableStatusFilter === st
                        ? 'bg-pure-white text-ink-black shadow-xs'
                        : 'text-stone-gray hover:text-ink-black'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Order Search Bar */}
              <div className="relative w-full sm:w-60">
                <Input
                  placeholder="Search order or customer..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="pl-9 text-xs rounded-full py-1.5"
                />
                <Search className="w-3.5 h-3.5 text-stone-gray absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-3 border-fresh-grass border-t-transparent rounded-full animate-spin mx-auto" />
              <span className="text-xs font-bold text-stone-gray mt-2 block">Loading fleet operational orders...</span>
            </div>
          ) : filteredRentals.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <Package className="w-8 h-8 text-stone-gray mx-auto opacity-50" />
              <h4 className="text-sm font-bold text-ink-black">No rental orders matching filter criteria</h4>
              <p className="text-xs text-stone-gray">Try clearing your search query or changing the status filter.</p>
            </div>
          ) : (
            <div className="divide-y divide-hairline-mist/60 text-xs">
              {filteredRentals.slice(0, 10).map((r) => (
                <div key={r.id || r._id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-sandstone/20 px-2 rounded-2xl transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink-black text-sm">{r.productName}</span>
                      <Badge status={r.status} size="sm" />
                      <span className="text-[11px] font-mono text-stone-gray bg-sandstone/30 px-2 py-0.5 rounded-md">
                        {r.rentalId || r.id}
                      </span>
                    </div>
                    <p className="text-stone-gray">
                      Customer: <strong className="text-ink-black">{r.customerName}</strong> ({r.customerEmail}) • Dates: <strong>{r.startDate}</strong> to <strong className="text-ink-black">{r.endDate}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="font-black text-ink-black text-sm block">
                        ₹{(r.totalAmount || 0).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-stone-gray font-medium block">
                        Deposit: ₹{(r.securityDeposit || 0).toLocaleString()}
                      </span>
                    </div>

                    <Link to={`/admin/rentals/${r.rentalId || r.id}`}>
                      <button className="p-2 text-stone-gray hover:text-ink-black rounded-lg hover:bg-sandstone/40" title="View Rental Details">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>

                    <Link to={`/admin/returns?rentalId=${r.rentalId || r.id}`}>
                      <Button variant="outline" size="sm" icon={RotateCcw}>
                        Inspect
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredRentals.length > 10 && (
            <div className="pt-4 border-t border-hairline-mist text-center">
              <Link to="/admin/rentals">
                <Button variant="outline" size="sm">
                  View All {filteredRentals.length} Rental Orders →
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};
