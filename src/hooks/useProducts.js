import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const defaultFilters = {
  search: '',
  brand: 'all',
  category: 'all',
  model: 'all',
  size: 'all',
  minPrice: 0,
  maxPrice: 1000,
  sort: 'newest',
};

export const useProducts = (filters = defaultFilters) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      let query = supabase.from('zapatillas').select('*');

      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      if (filters.brand && filters.brand !== 'all') {
        query = query.eq('marca', filters.brand);
      }

      if (filters.category && filters.category !== 'all') {
        query = query.eq('tipo_suela', filters.category);
      }

      if (filters.model && filters.model !== 'all') {
        query = query.eq('modelo', filters.model);
      }

      if (filters.size && filters.size !== 'all') {
        // tallas is an array, so we need to check if it contains the size
        query = query.contains('tallas', [filters.size]);
      }

      // Price range filters - only apply if not at default values
      if (filters.minPrice > 0) {
        query = query.gte('price', filters.minPrice);
      }

      if (filters.maxPrice < 1000) {
        query = query.lte('price', filters.maxPrice);
      }

      if (filters.sort === 'price-asc') {
        query = query.order('price', { ascending: true });
      } else if (filters.sort === 'price-desc') {
        query = query.order('price', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        setError(supabaseError.message);
        setProducts([]);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [filters.brand, filters.search, filters.sort, filters.category, filters.model, filters.size, filters.minPrice, filters.maxPrice]);

  return { products, loading, error };
};
