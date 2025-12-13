import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ProductCard from '../components/ProductCard';
import FiltersBar from '../components/FiltersBar';
import { useProducts } from '../hooks/useProducts';
import { Listing } from '../types';

export const Listings = () => {
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    search: searchFromUrl,
    brand: 'all',
    category: 'all',
    model: 'all',
    size: 'all',
    minPrice: 0,
    maxPrice: 1000,
    sort: 'newest',
  });

  // Update search filter when URL search param changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: searchFromUrl }));
  }, [searchFromUrl]);

  const { products, loading, error } = useProducts(filters);

  // Format products to match Listing type
  const listings: Listing[] = products.map((item: any) => {
    let mainImage = item.image_url;
    if (Array.isArray(item.image_url) && item.image_url.length > 0) {
      mainImage = item.image_url[0];
    } else if (Array.isArray(item.image_url) && item.image_url.length === 0) {
      mainImage = "https://via.placeholder.com/300";
    }

    return {
      id: item.id,
      name: item.name || item.title,
      title: item.title || item.name,
      description: item.description || '',
      price: item.price,
      image: mainImage || item.image,
      originalPrice: item.originalPrice,
      discount: item.discount
    };
  });

  if (loading) return <div className="p-10 text-center">Cargando zapatillas...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">

        {/* Header Section with Admin Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-gray-900">
              Catálogo de Zapatillas
            </h1>
            <p className="text-gray-600">
              Explora nuestra colección completa de {listings.length} productos
            </p>
          </div>

          {/* Prominent Admin Button */}
          <a
            href="/admin-dashboard"
            className="inline-flex items-center gap-2 bg-black text-brand-cyan font-bold uppercase text-sm tracking-wider px-6 py-4 rounded-full hover:bg-gray-800 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Agregar Zapatillas
          </a>
        </div>

        {/* Filters Bar */}
        <FiltersBar filters={filters} onChange={setFilters} />

        {/* Product Grid */}
        {!loading && listings.length > 0 && (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
            {listings.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="max-w-md mx-auto space-y-4">
              <svg
                className="mx-auto w-24 h-24 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-900">
                No hay productos aún
              </h3>
              <p className="text-gray-600">
                Comienza agregando tu primer par de zapatillas
              </p>
              <a
                href="/admin-dashboard"
                className="inline-block bg-black text-white font-bold px-8 py-3 rounded-full hover:bg-gray-800 transition-all"
              >
                Agregar Producto
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};