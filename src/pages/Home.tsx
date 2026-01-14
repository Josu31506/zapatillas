import React, { useEffect, useState } from 'react';
import InfoBanner from '../components/InfoBanner';
import { supabase } from '../lib/supabaseClient';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Function to format product name: first letter uppercase, rest lowercase
// Special handling for Roman numerals (II, III, IV, etc.)
const formatProductName = (name: string) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Check if word is a Roman numeral
      if (/^(i{1,3}|iv|v|vi{0,3}|ix|x)$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('zapatillas')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;

        if (mounted && data) {
          const formatted = data.map((item) => {
            let mainImage = "https://via.placeholder.com/300?text=No+Image";

            if (item.image_url) {
              if (Array.isArray(item.image_url) && item.image_url.length > 0) {
                mainImage = item.image_url[0];
              } else if (typeof item.image_url === 'string') {
                mainImage = item.image_url.replace(/[\[\]"]/g, '');
              }
            }

            return {
              id: item.id,
              name: item.name,
              price: item.price,
              image: mainImage
            };
          });
          setProducts(formatted);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Info Banner */}
      <InfoBanner />

      {/* Main Products Section */}
      <div className="relative bg-gradient-to-b from-white via-gray-50 to-white py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">

          {/* Section Header */}
          <div className="mb-8 sm:mb-10 md:mb-14 text-center max-w-3xl mx-auto">
            {/* Eyebrow Text */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent"></div>
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 uppercase">
                Lo Mejor para Ti
              </span>
              <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-brand-cyan to-transparent"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter text-gray-900 mb-3 sm:mb-4 leading-none">
              Productos Destacados
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed px-4 sm:px-0">
              Descubre nuestra selección exclusiva de zapatillas de fútbol diseñadas para máximo rendimiento
            </p>
          </div>

          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
                {products.slice(0, 4).map((product, index) => (
                  <a
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group block bg-white rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-brand-cyan transform hover:-translate-y-2 animate-fade-in scale-[0.8] origin-center"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-white flex items-center justify-center overflow-hidden p-4 sm:p-6">
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 sm:p-5 space-y-2 sm:space-y-3 bg-white">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-2 min-h-[38px] sm:min-h-[44px] md:min-h-[52px] group-hover:text-brand-cyan transition-colors leading-tight">
                        {formatProductName(product.name)}
                      </h3>

                      <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl md:text-2xl font-black text-gray-900">
                          S/ {product.price}
                        </span>

                        {/* Arrow Icon */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 group-hover:bg-brand-cyan flex items-center justify-center transition-colors duration-300">
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 group-hover:text-white transform group-hover:translate-x-0.5 transition-all duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* View All Products Button */}
              <div className="text-center px-4 sm:px-0">
                <a
                  href="/catalogo"
                  className="group inline-flex items-center gap-3 sm:gap-4 bg-black text-white font-bold uppercase text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] px-8 sm:px-12 py-4 sm:py-5 hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <span>Ver Catálogo Completo</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>

                {/* Stats Below Button */}
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1">{products.length}+</div>
                    <div className="font-semibold">Productos</div>
                  </div>
                  <div className="w-px h-10 sm:h-12 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1">100%</div>
                    <div className="font-semibold">Auténticos</div>
                  </div>
                  <div className="w-px h-10 sm:h-12 bg-gray-300"></div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1">24/7</div>
                    <div className="font-semibold">Soporte</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Loading State */}
          {loading && (
            <div className="py-20 sm:py-32 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-gray-200 border-t-brand-cyan mb-4 sm:mb-6"></div>
              <p className="text-gray-500 font-medium text-base sm:text-lg">Cargando productos...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <div className="py-20 sm:py-32 text-center bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 border-gray-100">
              <div className="max-w-md mx-auto space-y-4 sm:space-y-6 px-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
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
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  No hay productos disponibles
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Aún no hay productos en el catálogo. Comienza agregando tu primera zapatilla.
                </p>
                <a
                  href="/admin-dashboard"
                  className="inline-flex items-center gap-2 bg-black text-white font-bold px-6 sm:px-8 py-3 sm:py-4 hover:bg-gray-800 transition-all hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Ir al Panel de Admin
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
