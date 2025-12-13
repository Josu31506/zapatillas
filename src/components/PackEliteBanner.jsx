const PackEliteBanner = () => {
    return (
        <div className="w-full bg-gradient-to-r from-black via-gray-900 to-emerald-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* Left Side - Text Content */}
                    <div className="text-left space-y-4">
                        {/* Small Top Text */}
                        <p className="text-emerald-400 text-xs md:text-sm font-semibold tracking-wider uppercase">
                            Solo por tiempo limitado
                        </p>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-6xl font-black italic leading-tight">
                            <span className="text-white block">PACK ELITE</span>
                            <span className="text-emerald-400 block">VELOCIDAD TOTAL</span>
                        </h1>

                        {/* Description */}
                        <p className="text-gray-300 text-sm md:text-base max-w-md">
                            Descubre la colección diseñada para los jugadores más rápidos del campo.
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <a
                                href="/catalogo"
                                className="inline-block bg-white text-black font-bold text-sm md:text-base px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 uppercase tracking-wide"
                            >
                                Comprar Ahora
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Product Image */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-transparent rounded-lg"></div>
                            <img
                                src="/banner-pack-elite.png"
                                alt="Zapatillas Pack Elite"
                                className="w-full h-full object-contain relative z-10"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PackEliteBanner;
