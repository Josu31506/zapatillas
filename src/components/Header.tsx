import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/catalogo?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/catalogo');
        }
    };

    return (
        <header className="bg-white text-brand-black shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-5">
                <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6">

                    {/* 1. LOGO + TÍTULO (Bloque Sólido) */}
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 hover:opacity-80 transition-opacity group flex-shrink-0 w-full md:w-auto justify-center md:justify-start">
                        {/* Logo Icono */}
                        <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6 md:w-7 md:h-7">
                                <circle cx="12" cy="12" r="9" stroke="#00FFD1" strokeWidth="2" />
                                <path d="M12 8v8M8 12h8" stroke="#00FFD1" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        {/* Texto del Título */}
                        <div className="flex flex-col justify-center">
                            <span className="font-black text-2xl sm:text-2xl md:text-3xl tracking-tighter uppercase italic leading-none">
                                FUTBOLTSHOP
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 uppercase">
                                Official Store
                            </span>
                        </div>
                    </Link>

                    {/* 2. BUSCADOR GIGANTE (Ocupa todo el resto) */}
                    <div className="flex-1 w-full relative">
                        <form onSubmit={handleSearch} className="relative group">
                            <input
                                type="text"
                                placeholder="¿Qué estás buscando hoy?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-100 text-gray-900 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 pl-4 sm:pl-5 md:pl-6 rounded-lg sm:rounded-xl border-2 border-transparent focus:bg-white focus:border-black focus:outline-none transition-all shadow-inner text-base sm:text-lg placeholder-gray-500"
                            />
                            {/* Botón de búsqueda integrado */}
                            <button
                                type="submit"
                                className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 bg-black text-brand-cyan h-9 sm:h-10 md:h-11 px-3 sm:px-4 md:px-6 rounded-md sm:rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-gray-800 transition-all hover:scale-105 shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="hidden md:inline font-bold uppercase text-sm tracking-wide">Buscar</span>
                            </button>
                        </form>
                    </div>

                    {/* 3. CATALOGO LINK */}
                    <Link
                        to="/catalogo"
                        className="flex-shrink-0 bg-black text-brand-cyan font-bold uppercase text-xs sm:text-sm tracking-wider px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full hover:bg-gray-800 transition-all hover:scale-105 shadow-md"
                    >
                        Catálogo
                    </Link>

                </div>
            </div>
        </header>
    );
};

export default Header;
