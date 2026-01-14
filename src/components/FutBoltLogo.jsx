const FutBoltLogo = ({ className = "" }) => {
    return (
        <div className={`relative inline-block text-center ${className}`}>
            {/* Rayo de fondo */}
            <div
                className="absolute -top-1/4 left-1/4 w-24 md:w-32 lg:w-36 h-40 md:h-48 lg:h-56 bg-yellow-400 -rotate-12 -z-10"
                style={{
                    clipPath: 'polygon(60% 0, 100% 0, 60% 45%, 90% 45%, 20% 100%, 40% 50%, 10% 50%)'
                }}
            />

            {/* Texto principal FUT-BOLT */}
            <div className="relative z-10 flex items-center justify-center text-gray-600 font-black tracking-tighter leading-none uppercase text-4xl md:text-5xl lg:text-6xl">
                <span>FUT</span>
                <span className="mx-1 font-sans">-</span>
                <span>B</span>

                {/* Balón de Fútbol SVG */}
                <svg
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mx-0.5 animate-spin-slow"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="256" cy="256" r="240" fill="white" stroke="black" strokeWidth="20" />
                    <path d="M256,48 L200,160 L312,160 Z" fill="black" />
                    <path d="M256,48 L256,10" stroke="black" strokeWidth="20" />
                    <path d="M200,160 L100,140" stroke="black" strokeWidth="20" />
                    <path d="M312,160 L412,140" stroke="black" strokeWidth="20" />
                    <path d="M256,260 L180,360 L332,360 Z" fill="black" />
                    <circle cx="256" cy="256" r="60" fill="black" />
                    <path d="M205,230 L100,250" stroke="black" strokeWidth="20" />
                    <path d="M307,230 L412,250" stroke="black" strokeWidth="20" />
                    <path d="M256,316 L256,490" stroke="black" strokeWidth="20" />
                </svg>

                <span>LT</span>
            </div>

            {/* Etiqueta negra de abajo */}
            <div className="relative z-20 bg-black text-white text-[8px] md:text-[10px] lg:text-xs px-3 md:px-4 py-1 rounded inline-block tracking-widest -mt-2 ml-12 md:ml-16 lg:ml-20 shadow-md font-sans">
                TIENDA DE FUTBOL
            </div>
        </div>
    );
};

export default FutBoltLogo;
