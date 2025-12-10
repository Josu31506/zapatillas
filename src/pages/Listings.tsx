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
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Catálogo de Zapatillas</h2>
        <p className="text-sm text-slate-600">Modelos exclusivos disponibles.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listings.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {listings.length === 0 && (
        <p className="text-center text-slate-500">No hay zapatillas registradas en Supabase todavía.</p>
      )}
    </section>
  );
};