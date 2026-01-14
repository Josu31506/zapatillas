import React from 'react';

const PromoBanner = () => {
    const whatsappNumber = "51957700678";
    const whatsappMessage = encodeURIComponent("¡Hola! Quiero más información sobre los productos de FutBolt Shop.");

    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 sm:py-12 md:py-16">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}>
                </div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">

                    {/* Left Side - Services & Brand */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Services List */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-3 sm:gap-4 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-white font-black text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-lg">
                                    Envíos a todo el país
                                </span>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-white font-black text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-lg">
                                    Entregas en estación del tren
                                </span>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-white font-black text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-lg">
                                    Pago contraentrega
                                </span>
                            </div>
                        </div>

                        {/* Brand Badge */}
                        <div className="flex items-center gap-2 sm:gap-3 bg-yellow-400 px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl shadow-2xl inline-flex transform hover:scale-105 transition-transform">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-900 font-black text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-wide">
                                FutBolt Shop
                            </span>
                        </div>
                    </div>

                    {/* Right Side - CTA */}
                    <div className="text-center lg:text-right space-y-4 sm:space-y-6">
                        {/* Pin Icon */}
                        <div className="flex justify-center lg:justify-end mb-4 sm:mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-500 blur-2xl opacity-60 animate-pulse"></div>
                                <svg className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-red-500 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-3 sm:space-y-5">
                            {/* Main Heading */}
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tight leading-none drop-shadow-2xl">
                                ¡No te quedes<br />
                                <span className="text-yellow-300">sin la tuya!</span>
                            </h2>

                            {/* Subheading */}
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                                Contáctanos ahora
                                <span className="inline-block ml-2 text-2xl sm:text-3xl md:text-4xl">👟⚽</span>
                            </p>

                            {/* WhatsApp CTA Button */}
                            <div className="pt-2 sm:pt-4">
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 bg-white text-green-700 font-black text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 rounded-full shadow-2xl hover:shadow-yellow-400/50 hover:scale-110 hover:bg-yellow-400 hover:text-green-900 transition-all duration-300 uppercase tracking-wide group"
                                >
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span>¡Escríbenos Ya!</span>
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>

                            {/* Trust Badge */}
                            <div className="flex items-center justify-center lg:justify-end gap-2 pt-2 sm:pt-4">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center">
                                        <span className="text-base sm:text-lg">⭐</span>
                                    </div>
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center">
                                        <span className="text-base sm:text-lg">⚡</span>
                                    </div>
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center">
                                        <span className="text-base sm:text-lg">🏆</span>
                                    </div>
                                </div>
                                <span className="text-white font-bold text-xs sm:text-sm md:text-base">
                                    Miles de clientes satisfechos
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PromoBanner;

