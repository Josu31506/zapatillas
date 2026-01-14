const FutBoltLogo = ({ className = "" }) => {
    return (
        <div className={`relative flex flex-col items-center ${className}`}>
            {/* Rayo más pequeño y reubicado - detrás de la B */}
            <div
                className="absolute top-0 left-[45%] w-10 md:w-12 lg:w-14 h-20 md:h-24 lg:h-28 bg-yellow-400 -translate-x-1/2 -rotate-12 -z-10"
                style={{
                    clipPath: 'polygon(70% 0, 100% 0, 60% 40%, 95% 40%, 15% 100%, 40% 55%, 5% 55%)'
                }}
            />

            {/* Texto principal FUT-BOLT */}
            <div className="relative z-10 flex items-center justify-center">
                <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-600 font-black tracking-tighter leading-none uppercase">
                    FUT
                </span>
                <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-600 mx-1 relative -top-2">
                    -
                </span>
                <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-600 font-black tracking-tighter leading-none uppercase">
                    B
                </span>

                {/* Balón de Fútbol Realista SVG */}
                <svg
                    className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-[75px] xl:h-[75px] mx-1 animate-spin-slow"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="256" cy="256" r="245" fill="#ffffff" stroke="#1a1a1a" strokeWidth="15" />

                    <g fill="#1a1a1a">
                        <path d="M256,107.3 l-86.6,62.9 l33.1,101.9 h107 l33.1,-101.9 Z" />
                        <path d="M256,107.3 L256,11" />
                        <path d="M169.4,170.2 L78.2,140.6" />
                        <path d="M342.6,170.2 L433.8,140.6" />
                        <path d="M202.5,272.1 L123,381.4" />
                        <path d="M309.5,272.1 L389,381.4" />
                        <path d="M78.2,140.6 L11,233 L78.2,325.4 L169.4,295.8 L123,381.4 Z" />
                        <path d="M433.8,140.6 L501,233 L433.8,325.4 L342.6,295.8 L389,381.4 Z" />
                        <path d="M123,381.4 L256,478 L389,381.4 L309.5,272.1 h-107 Z" />
                    </g>
                </svg>

                <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-600 font-black tracking-tighter leading-none uppercase">
                    LT
                </span>
            </div>

            {/* Etiqueta negra de abajo */}
            <div className="relative z-20 bg-[#1a1a1a] text-white text-[10px] md:text-xs lg:text-sm px-4 md:px-5 py-1 rounded font-sans font-bold tracking-wide -mt-3 md:-mt-4 ml-16 md:ml-20 lg:ml-24 shadow-md">
                TIENDA DE FUTBOL
            </div>
        </div>
    );
};

export default FutBoltLogo;
