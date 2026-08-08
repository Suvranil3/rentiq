import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { api } from '../../api/api';
import { useToast } from '../../context/ToastContext';
import { Plus, Search, Edit, Trash2, Shield, Eye } from 'lucide-react';

export const AdminProducts = () => {
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadProducts();
  }, [search, selectedCategory]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await api.products.getAll({ search, category: selectedCategory });
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} from inventory?`)) {
      await api.products.delete(id);
      addToast(`Deleted ${name} from products catalog.`, 'success');
      loadProducts();
    }
  };

  const columns = [
    {
      header: 'Product Item',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={(row.images && row.images[0]) || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
            alt={row.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-12 h-12 rounded-xl object-cover bg-sandstone/30 border border-hairline-mist shrink-0"
          />
          <div>
            <span className="font-bold text-ink-black text-sm block">{row.name}</span>
            <span className="text-stone-gray text-xs">{row.brand} • Ref: {row.id}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      cell: (row) => (
        <span className="text-xs font-semibold text-ink-black bg-sandstone/30 px-2.5 py-1 rounded-full border border-hairline-mist">
          {row.category}
        </span>
      )
    },
    {
      header: 'Daily Rate',
      cell: (row) => <span className="font-bold text-ink-black text-sm">₹{row.dailyPrice.toLocaleString()}</span>
    },
    {
      header: 'Deposit Hold',
      cell: (row) => <span className="font-semibold text-stone-gray text-xs">₹{row.securityDeposit.toLocaleString()}</span>
    },
    {
      header: 'Stock Fleet',
      cell: (row) => (
        <span className={`text-xs font-bold ${row.availableStock === 0 ? 'text-coral-pop' : 'text-ink-black'}`}>
          {row.availableStock === 0 ? `0 / ${row.totalStock} Available (All Distributed)` : `${row.availableStock} / ${row.totalStock} Available`}
        </span>
      )
    },
    {
      header: 'Status',
      cell: (row) => <Badge status={row.availableStock > 0 ? 'Available' : 'All Distributed'} size="sm" />
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`/products/${row.id}`}>
            <button className="p-1.5 text-stone-gray hover:text-ink-black rounded-lg hover:bg-sandstone/40">
              <Eye className="w-4 h-4" />
            </button>
          </Link>
          <Link to={`/admin/products/${row.id}`}>
            <button className="p-1.5 text-stone-gray hover:text-ink-black rounded-lg hover:bg-sandstone/40">
              <Edit className="w-4 h-4" />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(row.id, row.name)}
            className="p-1.5 text-stone-gray hover:text-coral-pop rounded-lg hover:bg-sandstone/40"
          >
            <Trash2 className="w-4 h-4" />
          </button>
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
            <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Catalog Operations</span>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">Inventory & Fleet Management</h1>
            <p className="text-xs text-stone-gray font-medium mt-1">
              Add products, adjust hourly/daily pricing tiers, and configure security deposit amounts.
            </p>
          </div>

          <Link to="/admin/products/new">
            <Button variant="primary" icon={Plus}>
              Add New Product
            </Button>
          </Link>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-pure-white p-4 rounded-3xl border border-hairline-mist card-shadow">
          <div className="relative w-full sm:w-80">
            <Input
              placeholder="Search products by name or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full"
            />
            <Search className="w-4 h-4 text-stone-gray absolute left-3.5 top-3.5" />
          </div>

          <div className="w-full sm:w-48">
            <Input
              type="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={[
                { label: 'All Categories', value: 'All' },
                { label: 'Cameras', value: 'Cameras' },
                { label: 'Lenses', value: 'Lenses' },
                { label: 'Drones', value: 'Drones' },
                { label: 'Audio', value: 'Audio' },
                { label: 'Lighting', value: 'Lighting' },
                { label: 'Stabilizers', value: 'Stabilizers' },
                { label: 'Production', value: 'Production' }
              ]}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Table */}
        <Table columns={columns} data={products} isLoading={loading} />
      </main>
    </div>
  );
};
