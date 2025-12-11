import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-white text-brand-black shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-5">
                <div className="flex flex-col md:flex-row items-center gap-6">

                    {/* 1. LOGO + TÍTULO (Bloque Sólido) */}
                    <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity group flex-shrink-0 w-full md:w-auto justify-center md:justify-start">
                        {/* Logo Icono */}
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="9" stroke="#00FFD1" strokeWidth="2" />
                                <path d="M12 8v8M8 12h8" stroke="#00FFD1" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        {/* Texto del Título */}
                        <div className="flex flex-col justify-center">
                            <span className="font-black text-3xl tracking-tighter uppercase italic leading-none">
                                FUTBOLTSHOP
                            </span>
                            <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase">
                                Official Store
                            </span>
                        </div>
                    </Link>

                    {/* 2. BUSCADOR GIGANTE (Ocupa todo el resto) */}
                    <div className="flex-1 w-full relative">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="¿Qué estás buscando hoy?"
                                className="w-full bg-gray-100 text-gray-900 px-6 py-4 pl-6 rounded-xl border-2 border-transparent focus:bg-white focus:border-black focus:outline-none transition-all shadow-inner text-lg placeholder-gray-500"
                            />
                            {/* Botón de búsqueda integrado */}
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-brand-cyan h-11 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-all hover:scale-105 shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="hidden md:inline font-bold uppercase text-sm tracking-wide">Buscar</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;