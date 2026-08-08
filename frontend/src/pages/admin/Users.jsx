import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { api } from '../../api/api';
import { useToast } from '../../context/ToastContext';
import { Users as UsersIcon, Search, UserPlus, Shield, ShieldCheck, Mail, Lock, Phone } from 'lucide-react';

export const AdminUsers = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.users.getAll();
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to load users', err);
      addToast('Failed to load user accounts.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      addToast('Please fill out name, email, and password.', 'error');
      return;
    }
    if (adminForm.password.length < 6) {
      addToast('Password must be at least 6 characters.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await api.users.createAdmin(adminForm);
      addToast(`🎉 Admin account created for ${adminForm.name}!`, 'success');
      setShowCreateModal(false);
      setAdminForm({ name: '', email: '', password: '', phone: '' });
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create admin user.';
      addToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleToggle = async (userObj) => {
    const newRole = userObj.role === 'admin' ? 'customer' : 'admin';
    const actionText = newRole === 'admin' ? 'Promote to Admin' : 'Demote to Customer';
    
    if (window.confirm(`Are you sure you want to ${actionText} for ${userObj.name}?`)) {
      try {
        await api.users.updateRole(userObj.id || userObj._id, newRole);
        addToast(`Updated role for ${userObj.name} to ${newRole.toUpperCase()}!`, 'success');
        fetchUsers();
      } catch (err) {
        addToast('Failed to update user role.', 'error');
      }
    }
  };

  const filtered = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const columns = [
    {
      header: 'User Account',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
            row.role === 'admin' ? 'bg-ink-black text-fresh-grass border border-hairline-mist' : 'bg-fresh-grass text-ink-black'
          }`}>
            {row.name[0].toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-ink-black text-sm block">{row.name}</span>
            <span className="text-stone-gray text-xs">{row.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Role Access',
      cell: (row) => (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1 w-fit ${
          row.role === 'admin' ? 'bg-ink-black text-fresh-grass border border-hairline-mist' : 'bg-sandstone/40 text-ink-black border border-hairline-mist'
        }`}>
          {row.role === 'admin' && <ShieldCheck className="w-3 h-3 text-fresh-grass" />}
          <span>{row.role}</span>
        </span>
      )
    },
    {
      header: 'Phone Contact',
      cell: (row) => <span className="text-xs text-stone-gray font-medium">{row.phone || 'N/A'}</span>
    },
    {
      header: 'Total Rentals',
      cell: (row) => <span className="font-bold text-ink-black text-xs">{row.totalRentals || 0}</span>
    },
    {
      header: 'Active Rentals',
      cell: (row) => <span className="font-bold text-fresh-grass text-xs">{row.activeRentals || 0} Active</span>
    },
    {
      header: 'Account Status',
      cell: (row) => <Badge status={row.status || 'Active'} size="sm" />
    },
    {
      header: 'Role Actions',
      cell: (row) => (
        <button
          onClick={() => handleRoleToggle(row)}
          className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
            row.role === 'admin'
              ? 'text-stone-gray hover:text-coral-pop border-hairline-mist hover:border-coral-pop/50 hover:bg-[#ffe8e5]'
              : 'text-ink-black hover:text-fresh-grass border-hairline-mist hover:border-fresh-grass/50 hover:bg-sandstone/30'
          }`}
        >
          {row.role === 'admin' ? 'Demote' : 'Make Admin'}
        </button>
      )
    }
  ];

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline-mist">
          <div>
            <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">User Administration</span>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">Customer & Admin Accounts</h1>
            <p className="text-xs text-stone-gray font-medium mt-1">
              Directory of registered rental customers, platform administrators, and role permissions.
            </p>
          </div>

          <Button
            variant="primary"
            icon={UserPlus}
            onClick={() => setShowCreateModal(true)}
          >
            + Add Admin Account
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-pure-white p-4 rounded-3xl border border-hairline-mist card-shadow">
          <div className="relative max-w-md w-full">
            <Input
              placeholder="Search accounts by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full"
            />
            <Search className="w-4 h-4 text-stone-gray absolute left-3.5 top-3.5" />
          </div>

          {/* Role Filter Tabs */}
          <div className="bg-sandstone/30 p-1 rounded-full border border-hairline-mist flex items-center gap-1 self-start sm:self-auto">
            {[
              { id: 'All', label: 'All Users' },
              { id: 'admin', label: 'Admins Only' },
              { id: 'customer', label: 'Customers Only' }
            ].map(rf => (
              <button
                key={rf.id}
                onClick={() => setRoleFilter(rf.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  roleFilter === rf.id
                    ? 'bg-fresh-grass text-ink-black shadow-xs'
                    : 'text-stone-gray hover:text-ink-black'
                }`}
              >
                {rf.label}
              </button>
            ))}
          </div>
        </div>

        <Table columns={columns} data={filtered} isLoading={loading} />

        {/* Create Admin Account Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Admin Account"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <p className="text-xs text-stone-gray leading-relaxed">
              Register a new administrative account. Admins have full access to operations, inventory management, return processing, and finance ledgers.
            </p>

            <Input
              label="Admin Full Name *"
              placeholder="e.g. Operations Manager"
              value={adminForm.name}
              onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
              required
            />

            <Input
              label="Admin Email Address *"
              type="email"
              placeholder="e.g. manager@rentiq.com"
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
              required
            />

            <Input
              label="Password (min 6 chars) *"
              type="password"
              placeholder="••••••••"
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
              required
            />

            <Input
              label="Phone Contact (Optional)"
              placeholder="+91 98765 00000"
              value={adminForm.phone}
              onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
            />

            <div className="pt-4 border-t border-hairline-mist flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={submitting}
              >
                {submitting ? 'Creating...' : 'Create Admin Account'}
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
};
