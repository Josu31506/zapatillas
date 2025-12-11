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
                    .eq('is_active', true)
                    .single();

                if (data) setBanner(data);
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };
        fetchBanner();
    }, []);

    // Valores por defecto
    const linkText = banner?.link_text || "Ver Ofertas";
    const bgImage = banner?.image_url;

    return (
        <div className="relative bg-black text-white overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center justify-center">

            {/* LÓGICA DE FONDO: Imagen vs Diseño Propio */}
            {bgImage ? (
                // OPCIÓN A: IMAGEN DE FONDO LIMPIA
                // El usuario pidió "eliminar todo lo que está encima de la imagen"
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 hover:scale-105"
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    {/* Banner completo como fondo, sin texto encima */}
                </div>
            ) : (
                // OPCIÓN B: DISEÑO PROPIO (Gradiente "Cyber" si no hay imagen)
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-neutral-900"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                    {/* Solo mostramos texto si NO hay imagen, ya que la imagen trae su texto */}
                    <div className="relative container mx-auto px-4 py-20 flex flex-col items-center text-center z-10">
                        <span className="mb-4 inline-block rounded-full bg-brand-cyan px-3 py-1 text-xs font-bold text-black tracking-widest uppercase">
                            Oferta Limitada
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase drop-shadow-2xl max-w-5xl leading-none">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan to-white">
                                CYBER WEEK
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl font-medium mb-10 max-w-2xl leading-snug text-gray-200">
                            Hasta el 70% de descuento
                        </p>
                        <button className="group relative bg-white text-black font-black text-lg px-10 py-4 rounded-full overflow-hidden transition-all hover:scale-105">
                            <span className="relative z-10 uppercase tracking-wide">{linkText}</span>
                            <div className="absolute inset-0 bg-brand-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;