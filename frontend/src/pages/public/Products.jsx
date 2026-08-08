import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FloatingNavbar } from '../../components/layout/FloatingNavbar';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/products/ProductCard';
import { ProductFilters } from '../../components/products/ProductFilters';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { api } from '../../api/api';
import { Search, Filter, SlidersHorizontal, PackageX } from 'lucide-react';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'All',
    brand: searchParams.get('brand') || 'All',
    maxPrice: searchParams.get('maxPrice') || '25000',
    availableOnly: false,
    sortBy: 'recommended'
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch full catalog once to populate filter categories & brands
    api.products.getAll({}).then((allData) => {
      if (allData && Array.isArray(allData)) {
        const cats = Array.from(new Set(allData.map(p => p.category))).filter(Boolean).sort();
        const brs = Array.from(new Set(allData.map(p => p.brand))).filter(Boolean).sort();
        setCategories(cats);
        setBrands(brs);
      }
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await api.products.getAll({
        search: filters.search,
        category: filters.category,
        brand: filters.brand,
        maxPrice: filters.maxPrice,
        availableOnly: filters.availableOnly
      });

      // Sort
      let sorted = [...data];
      if (filters.sortBy === 'price-low') {
        sorted.sort((a, b) => a.dailyPrice - b.dailyPrice);
      } else if (filters.sortBy === 'price-high') {
        sorted.sort((a, b) => b.dailyPrice - a.dailyPrice);
      }

      setProducts(sorted);
      setLoading(false);
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      brand: 'All',
      maxPrice: '10000',
      availableOnly: false,
      sortBy: 'recommended'
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-paper">
      <FloatingNavbar />

      <main className="grow max-w-7xl mx-auto w-full px-6 md:px-12 py-10 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline-mist">
          <div>
            <span className="text-xs font-bold text-fresh-grass uppercase tracking-wider block mb-1">Rental Inventory</span>
            <h1 className="text-3xl md:text-4xl font-black text-ink-black tracking-tight">
              Browse Equipment Catalog
            </h1>
            <p className="text-sm text-stone-gray font-medium mt-1">
              Showing {products.length} verified production gear items available for rent
            </p>
          </div>

          {/* Search & Sort Header */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative grow md:w-72">
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 rounded-full"
              />
              <Search className="w-4 h-4 text-stone-gray absolute left-3.5 top-3.5" />
            </div>

            <div className="w-40 shrink-0">
              <Input
                type="select"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                options={[
                  { label: 'Sort: Featured', value: 'recommended' },
                  { label: 'Price: Low to High', value: 'price-low' },
                  { label: 'Price: High to Low', value: 'price-high' }
                ]}
                className="rounded-full"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="md:hidden p-3 rounded-full"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block col-span-1">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              categories={categories}
              brands={brands}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="md:hidden col-span-1">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                categories={categories}
                brands={brands}
              />
            </div>
          )}

          {/* Product Grid */}
          <div className="col-span-1 md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="h-96 rounded-3xl bg-pure-white border border-hairline-mist animate-pulse p-4 space-y-4">
                    <div className="h-48 bg-sandstone/40 rounded-2xl" />
                    <div className="h-4 bg-sandstone/40 rounded-full w-3/4" />
                    <div className="h-4 bg-sandstone/40 rounded-full w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-pure-white p-12 rounded-3xl border border-hairline-mist text-center space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-sandstone/30 flex items-center justify-center text-stone-gray">
                  <PackageX className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-ink-black">No Products Match Your Filters</h3>
                <p className="text-sm text-stone-gray max-w-md mx-auto">
                  Try adjusting your search criteria, category selection, or price threshold.
                </p>
                <Button variant="secondary" onClick={handleResetFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
