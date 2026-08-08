import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export const FloatingNavbar = () => {
  const { user, isAuthenticated, isAdmin, logout, loginAsDemoUser } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Rentals', path: '/products' },
    ...(isAuthenticated ? [{ name: 'My Rentals', path: '/my-rentals' }] : []),
    ...(isAdmin ? [{ name: 'Admin Operations', path: '/admin/dashboard' }] : [])
  ];

  return (
    <header className="sticky top-4 z-40 px-4 md:px-8 max-w-7xl mx-auto">
      <nav className="glass-nav rounded-full px-4 md:px-6 py-3 flex items-center justify-between pill-shadow">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-fresh-grass flex items-center justify-center font-black text-ink-black text-lg shadow-sm">
            IQ
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-ink-black">RentIQ</span>
            <span className="text-[10px] font-semibold text-stone-gray uppercase tracking-widest -mt-1">Operations</span>
          </div>
        </Link>

        {/* Desktop Nav Pills */}
        <div className="hidden md:flex items-center gap-1 bg-sandstone/40 p-1.5 rounded-full border border-hairline-mist/50">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-fresh-grass text-ink-black shadow-sm'
                  : 'text-ink-black hover:bg-pure-white/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full bg-pure-white border border-hairline-mist hover:bg-sandstone/40 transition-colors text-ink-black"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-fresh-grass text-ink-black text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-pure-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Account Profile / Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 bg-pure-white border border-hairline-mist rounded-full hover:bg-sandstone/30 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-fresh-grass text-ink-black flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span className="text-sm font-semibold text-ink-black max-w-[100px] truncate">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-stone-gray hover:text-coral-pop hover:bg-sandstone/40 rounded-full transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 text-ink-black rounded-full hover:bg-sandstone/40"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-pure-white rounded-3xl border border-hairline-mist card-shadow space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-2xl text-sm font-semibold ${
                  isActive(link.path) ? 'bg-fresh-grass text-ink-black' : 'text-ink-black hover:bg-sandstone/30'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-hairline-mist flex flex-col gap-2">

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 bg-sandstone/30 rounded-2xl text-sm font-semibold"
            >
              <span>Cart</span>
              <span className="px-2 py-0.5 bg-fresh-grass text-ink-black rounded-full text-xs font-bold">
                {itemCount}
              </span>
            </Link>

            {isAuthenticated ? (
              <Button variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                Log Out
              </Button>
            ) : (
              <Button variant="primary" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
