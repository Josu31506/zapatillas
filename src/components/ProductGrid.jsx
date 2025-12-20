import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  if (!products?.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 sm:p-8 text-center text-sm sm:text-base text-gray-500">
        No hay productos cargados todavía.
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

