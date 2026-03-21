import { X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export function FilterSidebar({ filters, setFilters, isOpen, setIsOpen, maxPriceRange }) {
  const [price, setPrice] = useState(filters.maxPrice);

  const handleApply = () => {
    setFilters(prev => ({ ...prev, maxPrice: price }));
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:sticky md:top-24 inset-y-0 left-0 w-[300px] bg-white z-50 shadow-xl md:shadow-none md:border-r border-border/50
          transform transition-transform duration-300 ease-in-out overflow-y-auto h-full md:h-[calc(100vh-100px)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <SlidersHorizontal size={20} /> Filters
            </h3>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* BHK Filter */}
          <div className="mb-8">
            <h4 className="font-medium mb-4">Bedrooms (BHK)</h4>
            <div className="flex flex-wrap gap-2">
              {[2, 3, 4, 5, 6, 7, 8].map(bhk => (
                <button
                  key={bhk}
                  onClick={() => setFilters(prev => ({ ...prev, bhk: prev.bhk === bhk ? null : bhk }))}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors border ${
                    filters.bhk === bhk 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {bhk} BHK
                </button>
              ))}
            </div>
          </div>

          {/* Pool Type */}
          <div className="mb-8">
            <h4 className="font-medium mb-4">Pool Type</h4>
            <div className="space-y-2">
              {['Private', 'Shared'].map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="pool" 
                    checked={filters.pool === type}
                    onChange={() => setFilters(prev => ({ ...prev, pool: type }))}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="group-hover:text-primary transition-colors">{type} Pool</span>
                </label>
              ))}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="pool" 
                  checked={filters.pool === null}
                  onChange={() => setFilters(prev => ({ ...prev, pool: null }))}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="group-hover:text-primary transition-colors">Any</span>
              </label>
            </div>
          </div>

          {/* Beach View */}
          <div className="mb-8">
            <h4 className="font-medium mb-4">View</h4>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.beachView}
                onChange={() => setFilters(prev => ({ ...prev, beachView: !prev.beachView }))}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="group-hover:text-primary transition-colors">Beach View Only</span>
            </label>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h4 className="font-medium mb-4">Max Price: ₹{price.toLocaleString()}</h4>
            <input 
              type="range" 
              min="5000" 
              max={maxPriceRange} 
              step="1000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              onMouseUp={handleApply}
              onTouchEnd={handleApply}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>₹5,000</span>
              <span>₹{maxPriceRange.toLocaleString()}</span>
            </div>  
          </div>

          {/* Reset */}
          <button 
            onClick={() => {
              setFilters({ bhk: null, pool: null, beachView: false, maxPrice: maxPriceRange });
              setPrice(maxPriceRange);
            }}
            className="w-full py-3 text-sm font-medium text-gray-500 hover:text-primary underline transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  );
}
