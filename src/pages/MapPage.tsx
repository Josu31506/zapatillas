import { useEffect, useState } from 'react';
import { MapView } from '../components/MapView';
import { CardListing } from '../components/CardListing';
import { Listing } from '../types';
import { supabase } from '../lib/supabaseClient';

export const MapPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        // Pedimos datos reales a Supabase
        const { data, error } = await supabase
          .from('zapatillas')
          .select('*')
          .limit(20);

        if (error) throw error;

        if (data) {
          const formattedData = data.map((item: any) => {
            // Lógica de imagen segura
            let mainImage = "https://via.placeholder.com/300";
            if (Array.isArray(item.image_url) && item.image_url.length > 0) mainImage = item.image_url[0];
            else if (typeof item.image_url === 'string') mainImage = item.image_url.replace(/[\[\]"]/g, '');

            return {
              id: item.id,
              title: item.name,
              price: item.price,
              description: item.description || '',
              image: mainImage,
              // Coordenadas aleatorias simuladas en Lima (ya que tu DB no tiene GPS aún)
              latitude: -12.0635 + (Math.random() - 0.5) * 0.02,
              longitude: -77.077 + (Math.random() - 0.5) * 0.02,
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

    fetchListings();
  }, []);

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Mapa de Tiendas</h2>
        <p className="text-sm text-slate-600">Ubicación de los productos disponibles.</p>
      </div>

      <MapView listings={listings} />

      <div className="grid gap-4 md:grid-cols-2">
        {listings.map((listing) => (
          <CardListing key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
};