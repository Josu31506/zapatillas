import React, { useState, useEffect } from 'react';

export default function FiltersBar({ filters, onChange }) {
  // Temporary state for filters before applying
  const [tempFilters, setTempFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(false);

  // Update temp filters when external filters change (from URL params, etc)
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleInput = (key) => (event) => {
    setTempFilters({ ...tempFilters, [key]: event.target.value });
  };

  const handlePriceChange = (key) => (event) => {
    const value = parseInt(event.target.value) || 0;
    setTempFilters({ ...tempFilters, [key]: value });
  };

  const handleApplyFilters = () => {
    onChange(tempFilters);
    setIsOpen(false); // Close filters on mobile after applying
  };

  const handleResetFilters = () => {
    const resetFilters = {
      search: filters.search, // Keep search from URL
      brand: 'all',
      category: 'all',
      model: 'all',
      size: 'all',
      minPrice: 0,
      maxPrice: 1000,
      sort: 'newest',
    };
    setTempFilters(resetFilters);
    onChange(resetFilters);
  };

  return (
    <section className="mb-4 sm:mb-6 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-6 font-semibold text-gray-900 lg:hidden hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-base sm:text-lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filtros
        </span>
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filters Content - Hidden on mobile when closed, always visible on desktop */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-4 sm:p-6`}>
        {/* Filter Grid - Responsive columns */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6">
          {/* Brand Filter */}
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            <span className="font-semibold">Marca</span>
            <select
              value={tempFilters.brand || 'all'}
              onChange={handleInput('brand')}
              className="rounded border border-gray-300 px-3 py-2.5 sm:py-2 text-base sm:text-sm text-gray-800 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="all">Todas</option>
              <option value="Nike">Nike</option>
              <option value="Puma">Puma</option>
              <option value="Munich">Munich</option>
              <option value="Umbro">Umbro</option>
              <option value="Mizuno">Mizuno</option>
              <option value="Joma">Joma</option>
            </select>
          </label>

          {/* Model Filter */}
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            <span className="font-semibold">Modelo</span>
            <select
              value={tempFilters.model || 'all'}
              onChange={handleInput('model')}
              className="rounded border border-gray-300 px-3 py-2.5 sm:py-2 text-base sm:text-sm text-gray-800 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="all">Todos</option>
              <option value="Gresca">Gresca</option>
              <option value="Continental">Continental</option>
              <option value="Premier 3 FG">Premier 3 FG</option>
              <option value="ULTRA PRO CAGE">ULTRA PRO CAGE</option>
              <option value="KING TOP IT">KING TOP IT</option>
              <option value="Sala Striker">Sala Striker</option>
              <option value="ULTRA ULTIMATE CAGE">ULTRA ULTIMATE CAGE</option>
              <option value="Continental Sky V1">Continental Sky V1</option>
              <option value="MORELIA II CLUB">MORELIA II CLUB</option>
              <option value="Fs Reactive 2402">Fs Reactive 2402</option>
              <option value="LUNAR GATO II">LUNAR GATO II</option>
            </select>
          </label>

          {/* Category (Sole Type) Filter */}
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            <span className="font-semibold">Tipo de Suela</span>
            <select
              value={tempFilters.category || 'all'}
              onChange={handleInput('category')}
              className="rounded border border-gray-300 px-3 py-2.5 sm:py-2 text-base sm:text-sm text-gray-800 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="all">Todas</option>
              <option value="Firm Ground">Firm Ground</option>
              <option value="Turf">Turf</option>
              <option value="TURF">TURF</option>
              <option value="INDOOR">INDOOR</option>
              <option value="Indoor Court">Indoor Court</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </label>

          {/* Size Filter */}
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            <span className="font-semibold">Talla</span>
            <select
              value={tempFilters.size || 'all'}
              onChange={handleInput('size')}
              className="rounded border border-gray-300 px-3 py-2.5 sm:py-2 text-base sm:text-sm text-gray-800 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="all">Todas</option>
              <option value="40">40</option>
              <option value="40.5">40.5</option>
              <option value="41">41</option>
              <option value="41.5">41.5</option>
              <option value="42">42</option>
              <option value="42.5">42.5</option>
              <option value="43">43</option>
              <option value="43.5">43.5</option>
              <option value="44">44</option>
            </select>
          </label>
        </div>

        {/* Price Range Slider */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">Rango de Precio</span>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              S/ {tempFilters.minPrice || 0} - S/ {tempFilters.maxPrice || 1000}
            </span>
          </div>

          <div className="space-y-3">
            {/* Min Price Slider */}
            <div className="flex items-center gap-3">
              <label className="text-xs text-gray-500 w-10 sm:w-12">Mín:</label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={tempFilters.minPrice || 0}
                onChange={handlePriceChange('minPrice')}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: 'black' }}
              />
              <span className="text-xs font-semibold text-gray-700 w-14 sm:w-16 text-right">S/ {tempFilters.minPrice || 0}</span>
            </div>

            {/* Max Price Slider */}
            <div className="flex items-center gap-3">
              <label className="text-xs text-gray-500 w-10 sm:w-12">Máx:</label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={tempFilters.maxPrice || 1000}
                onChange={handlePriceChange('maxPrice')}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: 'black' }}
              />
              <span className="text-xs font-semibold text-gray-700 w-14 sm:w-16 text-right">S/ {tempFilters.maxPrice || 1000}</span>
            </div>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="mb-4 sm:mb-6">
          <label className="flex flex-col gap-2 text-sm text-gray-600">
            <span className="font-semibold">Ordenar por</span>
            <select
              value={tempFilters.sort || 'newest'}
              onChange={handleInput('sort')}
              className="rounded border border-gray-300 px-3 py-2.5 sm:py-2 text-base sm:text-sm text-gray-800 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="newest">Novedades</option>
              <option value="price-asc">Precio (menor a mayor)</option>
              <option value="price-desc">Precio (mayor a menor)</option>
            </select>
          </label>
        </div>

        {/* Action Buttons - Stack on mobile, side-by-side on tablet+ */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleApplyFilters}
            className="flex-1 bg-black text-white font-bold uppercase text-sm sm:text-xs tracking-wider px-6 py-3.5 sm:py-3 rounded-lg hover:bg-gray-800 transition-all active:scale-95"
          >
            Aplicar Filtros
          </button>
          <button
            onClick={handleResetFilters}
            className="sm:flex-none px-6 py-3.5 sm:py-3 border-2 border-gray-300 text-gray-700 font-bold uppercase text-sm sm:text-xs tracking-wider rounded-lg hover:border-black hover:text-black transition-all active:scale-95"
          >
            Limpiar
          </button>
        </div>
      </div>
    </section>
  );
}
