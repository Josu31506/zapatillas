import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { supabase } from '../lib/supabaseClient';

export const Home = () => {
  const [products, setProducts] = useState([]);
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
      {/* Hero Banner - Renderizado UNA SOLA VEZ */}
      <Hero />

      {/* Main Content - Alineado a la izquierda */}
      <div className="bg-white pb-20">

        {/* SECTION 1: NOVEDADES */}
        {!loading && products.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 text-shadow-sm">
                Últimas Novedades
              </h2>
              <a href="/catalogo" className="text-xs font-bold uppercase tracking-wider underline hover:text-brand-cyan">Ver todo</a>
            </div>

            {/* Carousel con NOVEDADES */}
            <Carousel title="" products={products.slice(0, 8)} />
          </div>
        )}

        {/* PROMO BANNER INTERMEDIO */}
        <div className="w-full bg-black text-white py-16 my-10 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-cyan/20 blur-[100px] rounded-full transform translate-x-1/2"></div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-brand-cyan font-bold tracking-widest uppercase text-xs mb-2 block">Solo por tiempo limitado</span>
              <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-4">
                PACK ELITE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-white">VELOCIDAD TOTAL</span>
              </h3>
              <p className="text-gray-400 mb-6">Descubre la colección diseñada para los jugadores más rápidos del campo.</p>
              <a href="/catalogo" className="inline-block bg-white text-black font-black uppercase text-sm px-8 py-3 rounded-full hover:scale-105 transition-transform">
                Comprar Ahora
              </a>
            </div>
            {/* Imagen decorativa */}
            {products.length > 0 && products[0]?.image && (
              <div className="w-64 h-64 md:w-80 md:h-80 relative">
                <img
                  src={products[0].image}
                  alt="Promo Shoe"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,255,209,0.3)] transform -rotate-12 hover:rotate-0 transition-transform duration-700"
                />
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: MÁS VENDIDOS (Grid) */}
        {!loading && products.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 mb-8 border-b border-gray-200 pb-2">
              Más Vendidos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-start">
              {products.slice(0, 10).map((product) => (
                <a
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group block bg-white border border-transparent hover:border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 w-full"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide z-10">Top Ventas</span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-2 min-h-[32px] mb-2 uppercase tracking-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-blue-600">
                        S/ {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through decoration-red-500">S/ {product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="px-4 py-20 text-center">
            <p className="text-gray-500">Cargando productos...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="px-4 py-20 text-center">
            <p className="text-gray-500 mb-4">No hay productos disponibles</p>
            <a href="/admin-dashboard" className="text-blue-500 underline">
              Ir al panel de administración
            </a>
          </div>
        )}
      </div>
    </div>
  );
};