import ProductCard from './ProductCard';

const Carousel = ({ title, products }) => {
    return (
        <section className="py-10 border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900">
                        {title}
                    </h2>
                    <div className="flex gap-2">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors transition-transform active:scale-95">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors transition-transform active:scale-95">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>

                {/* Carrusel con tarjetas "chiquitas" (varios cuadritos) */}
                <div className="flex gap-3 overflow-x-auto pb-6 snap-x px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style>
                        {`
                            .no-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                        `}
                    </style>
                    {products.map((product) => (
                        <div key={product.id} className="min-w-[160px] md:min-w-[190px] snap-start flex-shrink-0">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Carousel;