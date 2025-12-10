import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const defaultFilters = {
  search: '',
  brand: 'all',
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

      let query = supabase.from('products').select('*');

      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      if (filters.brand && filters.brand !== 'all') {
        query = query.eq('brand', filters.brand);
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
  }, [filters.brand, filters.search, filters.sort]);

  return { products, loading, error };
};
