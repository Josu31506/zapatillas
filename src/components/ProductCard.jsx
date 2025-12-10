import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, price, image, originalPrice, discount } = product;

  // Detect brand for logo placeholder (simple logic)
  const isAdidas = name.toLowerCase().includes('adidas') || name.toLowerCase().includes('predator');
  const isNike = name.toLowerCase().includes('nike') || name.toLowerCase().includes('mercurial') || name.toLowerCase().includes('phantom');
  const isPuma = name.toLowerCase().includes('puma');

  const formatMoney = (amount) => {
    // Format like "S/ 289.99"
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount);
  };

  return (
    <Link to={`/product/${id}`} className="group block h-full bg-white transition-all hover:shadow-lg rounded-sm overflow-hidden border border-transparent hover:border-gray-200">

      {/* Image Container - Aspect Ratio 4:3 (Compact) */}
      <div className="relative aspect-[4/3] w-full bg-[#f9f9f9] flex items-center justify-center overflow-hidden mb-2">

        {/* Brand Logo (Top Right) - Smaller */}
        <div className="absolute top-2 right-2 z-10 opacity-60 text-slate-900">
          {isAdidas && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.66 10.9l-7.58-4.38L16.4 1.5l7.58 4.38-3.32 5.02zM12.08 10.9L4.5 6.52l3.32-5.02 7.58 4.38-3.32 5.02zM3.5 10.9L.18 8.98l1.66-2.5 3.32 1.92L3.5 10.9z" /></svg>
          )}
          {isNike && (
            <svg width="24" height="10" viewBox="0 0 50 18" fill="currentColor"><path d="M50 0C42.8 2.8 33.6 8.8 23.6 14.8 13.6 20.8 5.6 17.8 0 15.8c12.4 12.4 34 8.4 50-15.8z" /></svg>
          )}
        </div>

        {/* Product Image */}
        <img
          src={image || 'https://via.placeholder.com/300x300?text=Sin+Foto'}
          alt={name}
          className="h-[85%] w-[85%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info Container - Compact Text */}
      <div className="px-2 pb-3">
        <h3 className="text-[11px] font-bold text-slate-900 line-clamp-2 min-h-[28px] leading-tight uppercase mb-1">
          {name}
        </h3>

        <div className="flex flex-col items-start">
          <span className="text-sm font-black text-blue-600 tracking-tight">
            {formatMoney(price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;