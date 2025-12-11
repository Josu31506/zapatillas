import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AdminBannerForm = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [linkText, setLinkText] = useState('Ver Ofertas');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
    const [currentBannerId, setCurrentBannerId] = useState<number | null>(null);
    const [removeImage, setRemoveImage] = useState(false);

    useEffect(() => {
        fetchCurrentBanner();
    }, []);

    const fetchCurrentBanner = async () => {
        try {
            const { data } = await supabase
                .from('banners')
                .select('*')
                .eq('is_active', true) // CORREGIDO: 'is_active'
                .single();

            if (data) {
                setTitle(data.title || '');
                setSubtitle(data.subtitle || '');
                setLinkText(data.link_text || 'Ver Ofertas');
                setCurrentImageUrl(data.image_url);
                setCurrentBannerId(data.id);
            }
        } catch (error) {
            console.log('No active banner found');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setRemoveImage(false); // Si sube nueva, cancelamos el borrado
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setRemoveImage(true);
        // Limpiamos el input file visualmente si es necesario
        const fileInput = document.getElementById('banner-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            let finalImageUrl = currentImageUrl;

            // 1. Si marcó "Quitar imagen", la URL será null
            if (removeImage) {
                finalImageUrl = null;
            }

            // 2. Si subió una nueva imagen, la subimos y reemplazamos la URL
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `banner-${Date.now()}.${fileExt}`;

                // Usamos el bucket 'banners-img' (o crea uno si no existe, o usa 'zapatillas-img')
                const { error: uploadError } = await supabase.storage
                    .from('banners-img')
                    .upload(fileName, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('banners-img')
                    .getPublicUrl(fileName);

                finalImageUrl = publicUrl;
            }

            // 3. Datos a guardar
            const bannerData = {
                title,
                subtitle,
                link_text: linkText,
                image_url: finalImageUrl, // Puede ser URL nueva, vieja o null
                is_active: true // CORREGIDO: 'is_active'
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
            setRemoveImage(false);
            setImageFile(null);
            fetchCurrentBanner();
        } catch (error: any) {
            console.error(error);
            setMessage({ type: 'error', text: error.message || 'Error al guardar banner' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 mt-4">
            {message && (
                <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Título Principal</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
                        placeholder="Ej: CYBER WEEK"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Subtítulo / Descuento</label>
                    <textarea
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
                        rows={2}
                        placeholder="Ej: Hasta 70% de descuento en todo..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Texto del Botón</label>
                    <input
                        type="text"
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
                    />
                </div>

                <div className="border-t pt-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Imagen de Fondo</label>

                    {/* Previsualización del estado actual */}
                    <div className="mb-3 p-3 bg-gray-50 rounded border flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            Estado: {removeImage ? "Se usará diseño propio (sin imagen)" : (currentImageUrl || imageFile) ? "Usando Imagen" : "Diseño propio"}
                        </span>
                        {(currentImageUrl || imageFile) && !removeImage && (
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="text-xs text-red-600 hover:underline font-bold"
                            >
                                Quitar Imagen X
                            </button>
                        )}
                    </div>

                    <input
                        id="banner-file"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                    />
                    <p className="text-xs text-gray-400 mt-1">Sube una foto para usarla de fondo, o déjalo vacío para usar el diseño gráfico por defecto.</p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-cyan text-black py-3 px-4 rounded font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
                >
                    {loading ? 'Guardando...' : 'Actualizar Portada'}
                </button>
            </form>
        </div>
    );
};

export default AdminBannerForm;