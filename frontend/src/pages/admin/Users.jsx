import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { INITIAL_USERS } from '../../api/mockData';
import { Users as UsersIcon, Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';

export const AdminUsers = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Customer User',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-fresh-grass text-ink-black flex items-center justify-center font-bold text-sm">
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
      header: 'Role',
      cell: (row) => (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${row.role === 'admin' ? 'bg-ink-black text-fresh-grass' : 'bg-sandstone/30 text-ink-black'}`}>
          {row.role}
        </span>
      )
    },
    {
      header: 'Phone Contact',
      cell: (row) => <span className="text-xs text-stone-gray font-medium">{row.phone || 'N/A'}</span>
    },
    {
      header: 'Total Rentals',
      cell: (row) => <span className="font-bold text-ink-black text-xs">{row.totalRentals}</span>
    },
    {
      header: 'Active Rentals',
      cell: (row) => <span className="font-bold text-fresh-grass text-xs">{row.activeRentals} Active</span>
    },
    {
      header: 'Account Status',
      cell: (row) => <Badge status={row.status} size="sm" />
    }
  ];

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        <div className="pb-6 border-b border-hairline-mist">
          <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">User Administration</span>
          <h1 className="text-3xl font-black text-ink-black tracking-tight">Customer & User Accounts</h1>
          <p className="text-xs text-stone-gray font-medium mt-1">
            Directory of registered rental customers and operations administration roles.
          </p>
        </div>

        <div className="bg-pure-white p-4 rounded-3xl border border-hairline-mist card-shadow max-w-md">
          <div className="relative">
            <Input
              placeholder="Search user accounts by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full"
            />
            <Search className="w-4 h-4 text-stone-gray absolute left-3.5 top-3.5" />
          </div>
        </div>

        <Table columns={columns} data={filtered} />
      </main>
    </div>
  );
};
