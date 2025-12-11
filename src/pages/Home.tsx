import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabaseClient';

export const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Pedimos productos reales a Supabase
        const { data, error } = await supabase
          .from('zapatillas')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;

        if (data) {
          const formatted = data.map((item: any) => {
            // Lógica para sacar la imagen limpia
            let mainImage = "https://via.placeholder.com/300?text=No+Image";

            if (item.image_url) {
              // Si es un array JSON
              if (Array.isArray(item.image_url) && item.image_url.length > 0) {
                mainImage = item.image_url[0];
              }
              // Si es un string simple
              else if (typeof item.image_url === 'string') {
                // Limpiamos caracteres extraños si existen
                mainImage = item.image_url.replace(/[\[\]"]/g, '');
              }
            }

            return {
              id: item.id,
              name: item.name,
              price: item.price,
              // CALCULAMOS DATOS VISUALES (Fake para diseño)
              originalPrice: (item.price * 1.3).toFixed(2), // Precio inflado un 30%
              discount: 30, // Etiqueta del 30%
              image: mainImage
            };
          });
          setProducts(formatted);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Hero />

      {/* Solo mostramos si hay productos cargados */}
      {!loading && products.length > 0 && (
        <Carousel title="Novedades" products={products} />
      )}

      {/* Mensaje si la base de datos está vacía */}
      {!loading && products.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p>No hay zapatillas en la base de datos.</p>
          <a href="/catalogo" className="text-blue-500 underline">Ir a subir productos</a>
        </div>
      )}
    </div>
  );
};