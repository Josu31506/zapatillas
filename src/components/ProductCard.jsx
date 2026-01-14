import { Link } from 'react-router-dom';

// Function to format product name: first letter uppercase, rest lowercase
// Special handling for Roman numerals (II, III, IV, etc.)
const formatProductName = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Check if word is a Roman numeral
      if (/^(i{1,3}|iv|v|vi{0,3}|ix|x)$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

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

      {/* Image Container - Square Aspect Ratio */}
      <div className="relative aspect-square w-full bg-gray-50 flex items-center justify-center overflow-hidden p-2 sm:p-4">

        {/* Brand Logo (Top Right) - Smaller */}
        <div className="absolute top-2 right-2 z-10 opacity-60 text-slate-900">
          {isAdidas && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4"><path d="M20.66 10.9l-7.58-4.38L16.4 1.5l7.58 4.38-3.32 5.02zM12.08 10.9L4.5 6.52l3.32-5.02 7.58 4.38-3.32 5.02zM3.5 10.9L.18 8.98l1.66-2.5 3.32 1.92L3.5 10.9z" /></svg>
          )}
          {isNike && (
            <svg width="20" height="8" viewBox="0 0 50 18" fill="currentColor" className="sm:w-6 sm:h-2.5"><path d="M50 0C42.8 2.8 33.6 8.8 23.6 14.8 13.6 20.8 5.6 17.8 0 15.8c12.4 12.4 34 8.4 50-15.8z" /></svg>
          )}
        </div>

        {/* Product Image */}
        <img
          src={image || 'https://via.placeholder.com/300x300?text=Sin+Foto'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info Container - Responsive Text Sizes */}
      <div className="px-3 sm:px-4 pb-4 sm:pb-5 pt-3 sm:pt-4">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 line-clamp-2 min-h-[38px] sm:min-h-[44px] md:min-h-[52px] leading-tight mb-2 sm:mb-3">
          {formatProductName(name)}
        </h3>

        <div className="flex flex-col items-start">
          <span className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            S/ {price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
