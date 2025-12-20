import { useState } from 'react';
import FiltersBar from '../components/FiltersBar';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const CatalogPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    brand: 'all',
    category: 'all',
    model: 'all',
    size: 'all',
    minPrice: 0,
    maxPrice: 1000,
    sort: 'newest',
  });
  const { products, loading, error } = useProducts(filters);

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="px-2 sm:px-0">
        <p className="text-xs sm:text-sm uppercase tracking-wide text-gray-500">Colección</p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Catálogo de zapatillas</h1>
        <p className="mt-1 text-sm sm:text-base text-gray-600">
          Explora nuestra colección completa de 5 productos
        </p>
      </div>

      <FiltersBar filters={filters} onChange={setFilters} />

      {loading && <p className="text-sm sm:text-base text-gray-600 px-2 sm:px-0">Cargando productos...</p>}
      {error && <p className="text-sm sm:text-base text-red-600 px-2 sm:px-0">Error al cargar productos: {error}</p>}
      {!loading && !error && <ProductGrid products={products} />}
    </div>
  );
};

export default CatalogPage;

