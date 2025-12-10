import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white text-brand-black shadow-sm">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Fútbol<br /><span className="font-normal">Emotion</span></span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="¿Qué es lo que buscas?"
              className="w-full bg-brand-gray text-text px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Icons removed for Admin separation */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {/* Empty or minimal if needed, but removing specific user actions */}
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-sm font-medium border-t border-gray-100">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          <Link to="/catalogo" className="bg-black text-brand-cyan px-3 py-1 font-bold uppercase text-xs tracking-wider hover:bg-gray-800 transition-colors">Catálogo</Link>
          {/* Categories removed as requested */}
        </div>
        <div className="hidden lg:flex items-center gap-4 text-gray-600">
          <a href="#" className="hover:text-black">Equipaciones para clubs</a>
          <a href="#" className="hover:text-black">Blogs</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
