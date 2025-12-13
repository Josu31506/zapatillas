import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Hero = () => {
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchBanner = async () => {
            try {
                const { data, error } = await supabase
                    .from('banners')
                    .select('*')
                    .eq('is_active', true)
                    .single();

                if (error) throw error;
                if (mounted && data) {
                    setBanner(data);
                }
            } catch (error) {
                console.error('Error fetching banner:', error);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchBanner();

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
                <div className="relative h-[500px] flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-brand-cyan rounded-full animate-spin"></div>
                        <p className="text-gray-400 font-medium">Cargando banner...</p>
                    </div>
                </div>
            </div>
        );
    }

    const title = banner?.title || "PACK ELITE VELOCIDAD TOTAL";
    const subtitle = banner?.subtitle || "Descubre la colección diseñada para los jugadores más rápidos del campo.";
    const linkText = banner?.link_text || "COMPRAR AHORA";
    const bgImage = banner?.image_url;

    return (
        <div className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>

            {/* Main Container */}
            <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-32">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Side - Text Content */}
                    <div className="space-y-6 md:space-y-8 max-w-2xl animate-fade-in">
                        {/* Limited Time Label with Icon */}
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse"></div>
                            <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-gray-500 uppercase">
                                SOLO POR TIEMPO LIMITADO
                            </span>
                        </div>

                        {/* Main Title with Gradient Underline */}
                        <div className="relative">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase italic leading-[0.9] tracking-tighter text-gray-900 mb-4">
                                {title}
                            </h1>
                            {/* Decorative underline */}
                            <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-blue-500 rounded-full"></div>
                        </div>

                        {/* Subtitle/Description */}
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed font-medium max-w-xl">
                            {subtitle}
                        </p>

                        {/* CTA Button with Hover Effect */}
                        <div className="pt-4">
                            <a
                                href="/catalogo"
                                className="group inline-flex items-center gap-3 bg-black text-white font-bold uppercase text-xs md:text-sm tracking-[0.25em] px-8 md:px-12 py-4 md:py-5 border-2 border-black hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                            >
                                <span>{linkText}</span>
                                <svg
                                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-6 pt-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">Envío Gratis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-semibold">Garantía 30 días</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Product Image with Enhanced Glow */}
                    <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                        {/* Multi-layer Glow Effect */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Outer glow */}
                            <div className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-cyan-300 via-brand-cyan to-blue-400 opacity-20 blur-[140px] rounded-full animate-pulse"></div>
                            {/* Middle glow */}
                            <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-brand-cyan to-cyan-200 opacity-30 blur-[100px] rounded-full"></div>
                            {/* Inner glow */}
                            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-brand-cyan opacity-20 blur-[80px] rounded-full"></div>
                        </div>

                        {/* Product Image Container */}
                        <div className="relative z-10 w-full max-w-lg transform hover:scale-105 transition-transform duration-500">
                            {bgImage ? (
                                <div className="relative group">
                                    <img
                                        src={bgImage}
                                        alt={title}
                                        className="w-full h-auto object-contain drop-shadow-2xl filter brightness-105 contrast-105"
                                    />
                                    {/* Subtle reflection effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-30 pointer-events-none"></div>
                                </div>
                            ) : (
                                <div className="aspect-square bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-3xl flex items-center justify-center shadow-2xl border border-gray-200">
                                    <div className="text-center space-y-4">
                                        <svg
                                            className="mx-auto w-32 h-32 text-gray-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <p className="text-sm text-gray-400 font-medium">Imagen del banner</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default Hero;