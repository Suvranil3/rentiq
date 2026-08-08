import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Filter, RotateCcw } from 'lucide-react';

export const ProductFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  categories = [],
  brands = []
}) => {
  return (
    <div className="bg-pure-white p-6 rounded-3xl border border-hairline-mist card-shadow space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-hairline-mist">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-ink-black" />
          <h3 className="font-bold text-ink-black text-sm uppercase tracking-wider">Refine Inventory</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-stone-gray hover:text-ink-black flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink-black uppercase tracking-wider block">Category</label>
        <div className="flex flex-wrap gap-1.5">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange('category', cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filters.category === cat
                  ? 'bg-fresh-grass text-ink-black shadow-xs'
                  : 'bg-sandstone/30 text-stone-gray hover:text-ink-black hover:bg-sandstone/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <Input
          label="Brand"
          type="select"
          value={filters.brand || 'All'}
          onChange={(e) => onFilterChange('brand', e.target.value)}
          options={[
            { label: 'All Brands', value: 'All' },
            ...brands.map(b => ({ label: b, value: b }))
          ]}
        />
      </div>

      {/* Price Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-ink-black uppercase tracking-wider">Max Daily Rate</span>
          <span className="font-bold text-fresh-grass text-sm">₹{Number(filters.maxPrice || 5000).toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="500"
          max="10000"
          step="500"
          value={filters.maxPrice || 5000}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          className="w-full accent-fresh-grass cursor-pointer"
        />
      </div>

      {/* Available Only Checkbox */}
      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink-black">
          <input
            type="checkbox"
            checked={!!filters.availableOnly}
            onChange={(e) => onFilterChange('availableOnly', e.target.checked)}
            className="w-4 h-4 rounded-md accent-fresh-grass cursor-pointer"
          />
          <span>In-Stock Only</span>
        </label>
      </div>
    </div>
  );
};
