import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-hairline-mist bg-sandstone/20 pt-16 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-fresh-grass flex items-center justify-center font-black text-ink-black text-base">
              IQ
            </div>
            <span className="text-xl font-bold tracking-tight text-ink-black">RentIQ</span>
          </div>
          <p className="text-sm text-stone-gray leading-relaxed">
            A rental management and operations platform designed for seamless customer renting and efficient fleet operations.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-gray bg-pure-white px-3 py-1.5 rounded-full border border-hairline-mist w-fit">
            <ShieldCheck className="w-4 h-4 text-fresh-grass" />
            <span>Escrow Protected Deposits</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-ink-black uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2.5 text-sm text-stone-gray font-medium">
            <li><Link to="/products" className="hover:text-ink-black transition-colors">Browse Catalog</Link></li>
            <li><Link to="/cart" className="hover:text-ink-black transition-colors">My Cart</Link></li>
            <li><Link to="/my-rentals" className="hover:text-ink-black transition-colors">Active Rentals</Link></li>
            <li><Link to="/login" className="hover:text-ink-black transition-colors">Customer Portal</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-bold text-ink-black uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2.5 text-sm text-stone-gray font-medium">
            <li><Link to="/products?category=Cameras" className="hover:text-ink-black transition-colors">Cameras & Cinema</Link></li>
            <li><Link to="/products?category=Drones" className="hover:text-ink-black transition-colors">Aerial Drones</Link></li>
            <li><Link to="/products?category=Audio" className="hover:text-ink-black transition-colors">Wireless Audio</Link></li>
            <li><Link to="/products?category=Lighting" className="hover:text-ink-black transition-colors">Studio Lighting</Link></li>
          </ul>
        </div>

        {/* Operational Highlights */}
        <div>
          <h4 className="text-xs font-bold text-ink-black uppercase tracking-wider mb-4">Operations Suite</h4>
          <ul className="space-y-2.5 text-sm text-stone-gray font-medium">
            <li><Link to="/admin/dashboard" className="hover:text-ink-black transition-colors">Operations Dashboard</Link></li>
            <li><Link to="/admin/returns" className="hover:text-ink-black transition-colors">Return Inspection</Link></li>
            <li><Link to="/admin/payments" className="hover:text-ink-black transition-colors">Deposit Settlement</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-hairline-mist/60 flex flex-col md:flex-row items-center justify-between text-xs text-stone-gray gap-4">
        <p>© 2026 RentIQ Operations Platform. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Rent Smart. Return Easy.</span>
        </p>
      </div>
    </footer>
  );
};
