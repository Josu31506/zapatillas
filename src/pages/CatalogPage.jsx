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
    <div className="space-y-3">
      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500">Colección</p>
        <h1 className="text-3xl font-semibold text-gray-900">Catálogo de zapatillas</h1>
        <p className="mt-1 text-gray-600">
          Explora nuestra colección completa de 5 productos
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
