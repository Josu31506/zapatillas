import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Hero = () => {
    const [banner, setBanner] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 6);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    if (loading) {
        return (
            <div className="relative bg-gray-900 text-white overflow-hidden">
                <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
                    <p className="text-gray-400">Cargando...</p>
                </div>
            </div>
        );
    }

    const bgImage = banner?.image_url;

    return (
        <div className="relative bg-black text-white overflow-hidden">
            <div className="relative h-[400px] md:h-[500px]">
                {bgImage ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center z-0"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                ) : (
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
                        <img
                            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=500&fit=crop"
                            alt="Banner"
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>
                )}

                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {[...Array(6)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-white w-8' : 'bg-gray-500'
                                }`}
                            aria-label={`Ir a slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;