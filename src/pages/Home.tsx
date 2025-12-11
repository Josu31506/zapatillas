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
  ))
}
            </div >
          </div >
        )}

{/* Loading State */ }
{
  loading && (
    <div className="px-4 py-20 text-center">
      <p className="text-gray-500">Cargando productos...</p>
    </div>
  )
}

{/* Empty State */ }
{
  !loading && products.length === 0 && (
    <div className="px-4 py-20 text-center">
      <p className="text-gray-500 mb-4">No hay productos disponibles</p>
      <a href="/admin-dashboard" className="text-blue-500 underline">
        Ir al panel de administración
      </a>
    </div>
  )
}
      </div >
    </div >
  );
};