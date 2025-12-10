import { useState } from 'react';
import FiltersBar from '../components/FiltersBar';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const CatalogPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    brand: 'all',
    sort: 'newest',
  });
  const { products, loading, error } = useProducts(filters);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500">Colección</p>
        <h1 className="text-3xl font-semibold text-gray-900">Catálogo de zapatillas</h1>
        <p className="mt-2 text-gray-600">
          Explora el inventario de modelos publicados desde la base de datos de Supabase.
        </p>
      </div>

      <FiltersBar filters={filters} onChange={setFilters} />

      {loading && <p className="text-gray-600">Cargando productos...</p>}
      {error && <p className="text-red-600">Error al cargar productos: {error}</p>}
      {!loading && !error && <ProductGrid products={products} />}
    </div>
  );
};

export default CatalogPage;
