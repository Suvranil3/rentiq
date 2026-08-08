import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/products/ProductCard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { api } from '../../api/api';
import { 
  Search, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  Radio, 
  Zap, 
  Compass
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadFeatured = async () => {
      const data = await api.products.getAll();
      setFeaturedProducts(data.slice(0, 4));
    };
    loadFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const categories = [
    { name: 'Cameras', icon: Camera, count: '12 items', desc: 'Full-frame mirrorless & cinema gear' },
    { name: 'Drones', icon: Compass, count: '8 items', desc: '4K Aerial photography & videography' },
    { name: 'Audio', icon: Radio, count: '15 items', desc: 'Wireless mics, boom poles & recorders' },
    { name: 'Lighting', icon: Zap, count: '10 items', desc: 'High-output LED monolights & modifiers' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream-paper">
      <FloatingNavbar />

      {/* Hero Section */}
      <section className="pt-12 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pure-white border border-hairline-mist card-shadow text-xs font-semibold text-ink-black">
            <Sparkles className="w-4 h-4 text-fresh-grass" />
            <span>AI-Powered Rental & Operations Management</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-ink-black tracking-tight leading-[0.95] uppercase">
            RENT SMART.<br />
            <span className="text-fresh-grass">RETURN EASY.</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-gray font-medium max-w-2xl mx-auto leading-relaxed">
            Discover premium production gear and mobility tools, rent for the time you need, and track every active rental with automated deposit settlement.
          </p>

          {/* Quick Search Widget */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-4">
            <div className="bg-pure-white p-2.5 rounded-full border border-hairline-mist card-shadow flex items-center gap-2">
              <div className="pl-4 text-stone-gray">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search cameras, drones, audio gear, or bikes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-ink-black text-sm placeholder:text-stone-gray focus:outline-none py-2"
              />
              <Button type="submit" variant="primary" size="md">
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink-black">Explore Gear Categories</h2>
            <p className="text-sm text-stone-gray mt-1">High-end equipment verified for immediate rental</p>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-1 text-sm font-bold text-ink-black hover:text-fresh-grass">
            <span>View All Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Card
                key={idx}
                hover
                onClick={() => navigate(`/products?category=${cat.name}`)}
                className="group flex flex-col justify-between h-48 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-fresh-grass/20 text-ink-black flex items-center justify-center group-hover:bg-fresh-grass transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-stone-gray bg-sandstone/40 px-2.5 py-1 rounded-full">
                    {cat.count}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink-black group-hover:text-fresh-grass transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-gray mt-1">{cat.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Rentals */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-fresh-grass uppercase tracking-widest block mb-1">Featured Inventory</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink-black">Available for Immediate Booking</h2>
          </div>
          <Link to="/products">
            <Button variant="outline" size="sm" icon={ArrowRight}>
              Browse All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* How Renting Works Timeline */}
      <section className="py-16 px-6 md:px-12 bg-pure-white border-y border-hairline-mist my-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-ink-black">How Renting Works</h2>
            <p className="text-sm text-stone-gray">
              Transparent 4-step rental lifecycle with security deposit escrow protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-3xl bg-cream-paper/60 border border-hairline-mist space-y-3">
              <div className="w-10 h-10 rounded-full bg-fresh-grass text-ink-black font-black flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-ink-black">Select Gear & Dates</h3>
              <p className="text-xs text-stone-gray leading-relaxed">
                Choose start and return dates. Real-time availability checks ensure your equipment is reserved.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-cream-paper/60 border border-hairline-mist space-y-3">
              <div className="w-10 h-10 rounded-full bg-fresh-grass text-ink-black font-black flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-ink-black">Shipping or Pickup</h3>
              <p className="text-xs text-stone-gray leading-relaxed">
                Opt for direct door shipping or collect instantly from our central warehouse hub.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-cream-paper/60 border border-hairline-mist space-y-3">
              <div className="w-10 h-10 rounded-full bg-fresh-grass text-ink-black font-black flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-ink-black">Execute Your Project</h3>
              <p className="text-xs text-stone-gray leading-relaxed">
                Enjoy high-performance gear with zero maintenance hassle. Track active rental status online.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-cream-paper/60 border border-hairline-mist space-y-3">
              <div className="w-10 h-10 rounded-full bg-fresh-grass text-ink-black font-black flex items-center justify-center text-sm">
                4
              </div>
              <h3 className="text-lg font-bold text-ink-black">Easy Return & Refund</h3>
              <p className="text-xs text-stone-gray leading-relaxed">
                Return on time for automated condition inspection and full security deposit refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Preview Section */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="bg-sandstone/30 border border-hairline-mist rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pure-white text-xs font-bold text-sky-pop border border-hairline-mist">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Operations Engine</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-ink-black">
              Smart Demand Forecasting & Fleet Health
            </h2>
            <p className="text-sm text-stone-gray leading-relaxed">
              RentIQ AI predicts equipment demand peaks, flags maintenance risks before gear is re-rented, and calculates precise deposit settlements.
            </p>
            <div className="flex gap-4 pt-2">
              <Link to="/admin/ai-insights">
                <Button variant="primary" size="md">
                  View AI Insights Demo
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-pure-white p-6 rounded-3xl border border-hairline-mist card-shadow w-full md:w-80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-gray uppercase">Predictive Maintenance</span>
              <span className="px-2 py-0.5 bg-coral-pop/20 text-coral-pop font-bold text-[10px] rounded-full">
                84% RISK
              </span>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-ink-black">Sony FX3 Camera #02</h4>
              <p className="text-xs text-stone-gray">18 Rentals • 240 Hours Usage</p>
            </div>
            <div className="p-3 bg-cream-paper rounded-2xl text-xs text-stone-gray font-medium">
              "Sensor cleaning & cooling fan inspection required before next release."
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full text-center">
        <div className="bg-ink-black text-pure-white rounded-3xl p-10 md:p-16 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Ready to Start Renting?
          </h2>
          <p className="text-stone-gray max-w-lg mx-auto text-sm md:text-base font-medium">
            Browse our full catalog, select your dates, and experience effortless gear rentals today.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link to="/products">
              <Button variant="primary" size="lg">
                Explore Rentals Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
