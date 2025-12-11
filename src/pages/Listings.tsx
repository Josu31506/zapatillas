import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ProductCard from '../components/ProductCard';
import { Listing } from '../types';

export const Listings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const { data, error } = await supabase
          .from('zapatillas')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const formattedData = data.map((item: any) => {
            // Handle image_url
            let mainImage = item.image_url;
            if (Array.isArray(item.image_url) && item.image_url.length > 0) {
              mainImage = item.image_url[0];
            } else if (Array.isArray(item.image_url) && item.image_url.length === 0) {
              mainImage = "https://via.placeholder.com/300";
            }

            return {
              id: item.id,
              name: item.name || item.title, // ProductCard expects 'name'
              price: item.price,
              image: mainImage || item.image,
              originalPrice: item.originalPrice, // Pass if available
              discount: item.discount // Pass if available
            };
          });

          setListings(formattedData);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSneakers();
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando zapatillas...</div>;

  return (
    <section className="bg-white min-h-screen pb-20">
      {/* 1. Header Banner del Catalogo */}
      <div className="relative bg-black text-white py-16 px-4 md:py-24 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900 z-0"></div>
        {/* Cyber Gradient */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brand-cyan/10 to-transparent z-0"></div>

        <div className="relative container mx-auto z-10 text-center md:text-left">
          <span className="text-brand-cyan font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">
            Novedades de Temporada
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            COLECCIÓN 2025
          </h1>
          <p className="text-gray-400 max-w-xl text-sm md:text-base">
            Explora la última tecnología en calzado de fútbol. Rendimiento profesional para todos los niveles.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* 2. Barra de Filtros (Mock) */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-4 mb-8 gap-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full md:w-auto">
            <button className="whitespace-nowrap px-4 py-2 bg-black text-white text-xs font-bold uppercase rounded-full">Todo</button>
            <button className="whitespace-nowrap px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full hover:bg-gray-200">Botas de Fútbol</button>
            <button className="whitespace-nowrap px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full hover:bg-gray-200">Zapatillas Futsal</button>
            <button className="whitespace-nowrap px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full hover:bg-gray-200">Ofertas</button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{listings.length} Productos</span>
            <span className="text-gray-300">|</span>
            <select className="bg-transparent font-bold text-gray-900 border-none outline-none cursor-pointer">
              <option>Más recientes</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listings.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {listings.length === 0 && (
          <p className="text-center text-slate-500">No hay zapatillas registradas en Supabase todavía.</p>
        )}
      </div>
    </section>
  );
};