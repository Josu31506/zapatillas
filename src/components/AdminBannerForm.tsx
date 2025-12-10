import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AdminBannerForm = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [linkText, setLinkText] = useState('Ver Ofertas');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentBannerId, setCurrentBannerId] = useState<number | null>(null);

    useEffect(() => {
        fetchCurrentBanner();
    }, []);

    const fetchCurrentBanner = async () => {
        try {
            const { data, error } = await supabase
                .from('banners')
                .select('*')
                .eq('active', true)
                .single();

            if (data) {
                setTitle(data.title || '');
                setSubtitle(data.subtitle || '');
                setLinkText(data.link_text || 'Ver Ofertas');
                setCurrentBannerId(data.id);
            }
        } catch (error) {
            console.log('No active banner found or error fetching');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            let imageUrl = null;

            // 1. Upload Image if selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `banner-${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('zapatillas-img') // Reusing existing bucket
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('zapatillas-img')
                    .getPublicUrl(fileName);

                imageUrl = publicUrl;
            }

            // 2. Insert or Update Banner
            const bannerData = {
                title,
                subtitle,
                link_text: linkText,
                active: true,
                ...(imageUrl && { image_url: imageUrl }), // Only update image if new one uploaded
            };

            if (currentBannerId) {
                const { error } = await supabase
                    .from('banners')
                    .update(bannerData)
                    .eq('id', currentBannerId);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('banners')
                    .insert([bannerData]);
                if (error) throw error;
            }

            setMessage({ type: 'success', text: 'Banner actualizado correctamente' });
            fetchCurrentBanner(); // Refresh
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error al guardar banner' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
            <h3 className="text-xl font-bold mb-4 text-slate-900">Configuración del Banner Principal</h3>

            {message && (
                <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Ej: Cyber Week"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo / Descripción</label>
                    <textarea
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Ej: Hasta 70% de descuento..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Texto del Botón</label>
                    <input
                        type="text"
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de Fondo (Opcional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-cyan file:text-black hover:file:bg-cyan-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-bold"
                >
                    {loading ? 'Guardando...' : 'Actualizar Banner'}
                </button>
            </form>
        </div>
    );
};

export default AdminBannerForm;
