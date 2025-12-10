import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Hero = () => {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const { data } = await supabase
                    .from('banners')
                    .select('*')
                    .eq('active', true)
                    .single();

                if (data) setBanner(data);
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };
        fetchBanner();
    }, []);

    // Default values if no banner is set
    const title = banner?.title || "Fútbol Emotion";
    const subtitle = banner?.subtitle || "La mejor tienda de fútbol online";
    const linkText = banner?.link_text || "Ver Catálogo";
    const bgImage = banner?.image_url; // If null, use default gradient

    return (
        <div className="relative bg-black text-white overflow-hidden min-h-[500px] flex items-center">
            {/* Background Image or Gradient */}
            {bgImage ? (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center z-0"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
                </>
            ) : (
                <>
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50"></div>
                </>
            )}

            <div className="relative container mx-auto px-4 py-20 flex flex-col items-center text-center z-10">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase drop-shadow-lg max-w-4xl">
                    {title}
                </h1>

                <div className="text-xl md:text-3xl font-bold mb-10 max-w-3xl leading-tight text-gray-200">
                    {subtitle}
                </div>

                <button className="bg-white text-black font-black text-xl px-10 py-4 rounded-full hover:bg-brand-cyan hover:text-black hover:scale-105 transition-all duration-300 uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    {linkText}
                </button>
            </div>
        </div>
    );
};

export default Hero;
