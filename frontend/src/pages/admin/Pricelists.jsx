import React from 'react';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Table } from '../../components/ui/Table';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { RupeeIcon } from '../../components/ui/RupeeIcon';
import { Tag, Clock } from 'lucide-react';

export const AdminPricelists = () => {
  const pricelists = [
    {
      id: 'PL-01',
      name: 'Standard Cinema & Camera Rates',
      category: 'Cameras',
      hourlyMultiplier: '0.15x',
      dailyBase: '1.0x Base',
      weeklyDiscount: '5.0x (2 Days Free)',
      monthlyDiscount: '16.0x (14 Days Free)',
      status: 'Active'
    },
    {
      id: 'PL-02',
      name: 'Aerial Drone Rental Tier',
      category: 'Drones',
      hourlyMultiplier: '0.18x',
      dailyBase: '1.0x Base',
      weeklyDiscount: '5.0x (2 Days Free)',
      monthlyDiscount: '15.0x (15 Days Free)',
      status: 'Active'
    },
    {
      id: 'PL-03',
      name: 'Audio Equipment Pricing Tier',
      category: 'Audio',
      hourlyMultiplier: '0.17x',
      dailyBase: '1.0x Base',
      weeklyDiscount: '4.5x (2.5 Days Free)',
      monthlyDiscount: '14.0x (16 Days Free)',
      status: 'Active'
    }
  ];

  const columns = [
    {
      header: 'Pricelist Tier',
      cell: (row) => (
        <div>
          <span className="font-bold text-ink-black text-sm block">{row.name}</span>
          <span className="text-stone-gray text-xs">{row.category} • Ref: {row.id}</span>
        </div>
      )
    },
    {
      header: 'Hourly Rate Rate',
      cell: (row) => <span className="font-bold text-ink-black text-xs">{row.hourlyMultiplier}</span>
    },
    {
      header: 'Daily Base',
      cell: (row) => <span className="font-bold text-ink-black text-xs">{row.dailyBase}</span>
    },
    {
      header: 'Weekly Multiplier',
      cell: (row) => <span className="font-bold text-fresh-grass text-xs">{row.weeklyDiscount}</span>
    },
    {
      header: 'Monthly Multiplier',
      cell: (row) => <span className="font-bold text-sky-pop text-xs">{row.monthlyDiscount}</span>
    }
  ];

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        <div className="pb-6 border-b border-hairline-mist">
          <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Pricing Configuration</span>
          <h1 className="text-3xl font-black text-ink-black tracking-tight">Rental Pricelists & Tier Rules</h1>
          <p className="text-xs text-stone-gray font-medium mt-1">
            Configure hourly, daily, weekly, and monthly rate multipliers across product categories.
          </p>
        </div>

        <Table columns={columns} data={pricelists} />
      </main>
    </div>
  );
};
