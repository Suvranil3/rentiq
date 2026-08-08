import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  RotateCcw, 
  CalendarClock, 
  CreditCard, 
  Users, 
  Sparkles, 
  Settings, 
  LogOut,
  ArrowLeft,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loginAsDemoUser } = useAuth();

  const isActive = (path) => location.pathname === path;

  const sections = [
    {
      title: "Core Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" }
      ]
    },
    {
      title: "Rental Operations",
      items: [
        { label: "All Rentals", icon: CalendarClock, path: "/admin/rentals" },
        { label: "Return Inspection", icon: RotateCcw, path: "/admin/returns" }
      ]
    },
    {
      title: "Inventory & Pricelists",
      items: [
        { label: "Products Catalog", icon: Package, path: "/admin/products" },
        { label: "Pricelists", icon: DollarSign, path: "/admin/pricelists" }
      ]
    },
    {
      title: "Finance & Users",
      items: [
        { label: "Payments & Deposits", icon: CreditCard, path: "/admin/payments" },
        { label: "Customers", icon: Users, path: "/admin/users" }
      ]
    },
    {
      title: "Intelligence",
      items: [
        { label: "AI Insights", icon: Sparkles, path: "/admin/ai-insights", highlight: true }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-pure-white border-r border-hairline-mist min-h-screen p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-hairline-mist">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-fresh-grass flex items-center justify-center font-black text-ink-black text-base">
              IQ
            </div>
            <div>
              <h1 className="text-lg font-bold text-ink-black tracking-tight leading-none">RentIQ</h1>
              <span className="text-[10px] font-semibold text-stone-gray uppercase tracking-widest">Admin Suite</span>
            </div>
          </Link>
          <button
            onClick={() => navigate('/')}
            className="p-1.5 text-stone-gray hover:text-ink-black hover:bg-sandstone/40 rounded-full"
            title="Return to Public Store"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <h3 className="text-[11px] font-bold text-stone-gray uppercase tracking-wider px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-fresh-grass text-ink-black font-semibold shadow-xs'
                          : item.highlight
                          ? 'text-sky-pop hover:bg-sky-pop/10'
                          : 'text-stone-gray hover:text-ink-black hover:bg-sandstone/30'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-ink-black' : item.highlight ? 'text-sky-pop' : 'text-stone-gray'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Profile & Switcher */}
      <div className="pt-4 border-t border-hairline-mist space-y-3">
        <div className="p-3 bg-sandstone/30 rounded-2xl border border-hairline-mist text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-stone-gray">Mode:</span>
            <span className="px-2 py-0.5 bg-ink-black text-fresh-grass font-bold rounded-full text-[10px]">
              ADMIN
            </span>
          </div>
          <button
            onClick={() => loginAsDemoUser('customer')}
            className="w-full text-center py-1.5 bg-pure-white hover:bg-sandstone/40 border border-hairline-mist rounded-xl font-semibold text-ink-black text-xs transition-colors"
          >
            Switch to Customer View
          </button>
        </div>

        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-fresh-grass text-ink-black flex items-center justify-center font-bold">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-ink-black truncate max-w-[110px]">{user?.name || 'Admin'}</span>
              <span className="text-[10px] text-stone-gray">Operations</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-stone-gray hover:text-coral-pop"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
