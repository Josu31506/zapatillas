import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Listing } from '../types';

interface Product extends Listing {
    images?: string[]; // Array of additional image URLs
}

export const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from('zapatillas')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (data) {
                    // Map DB fields to our type if necessary, assuming DB matches somewhat
                    setProduct({
                        id: data.id,
                        title: data.name || data.title,
                        price: data.price,
                        description: data.description,
                        image: data.image_url || data.image,
                        images: data.images || [] // Additional images array
                    });
                }
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleUploadPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !product) return;

        setUploading(true);
        setMessage(null);
        const files = Array.from(e.target.files);
        const newImageUrls: string[] = [];

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${product.id}-${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('zapatillas-img')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('zapatillas-img')
                    .getPublicUrl(filePath);

                newImageUrls.push(publicUrl);
            }

            // Update Database
            const updatedImages = [...(product.images || []), ...newImageUrls];

            const { error: updateError } = await supabase
                .from('zapatillas')
                .update({ images: updatedImages })
                .eq('id', product.id);

            if (updateError) throw updateError;

            // Update local state
            setProduct({ ...product, images: updatedImages });
            setMessage({ type: 'success', text: '¡Fotos subidas con éxito!' });

        } catch (error: any) {
            console.error('Error uploading photos:', error);
            setMessage({ type: 'error', text: 'Error al subir las fotos.' });
        } finally {
            setUploading(false);
            // Clear input
            e.target.value = '';
        }
    };

    if (loading) return <div className="p-10 text-center">Cargando producto...</div>;
    if (!product) return <div className="p-10 text-center">Producto no encontrado.</div>;

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl">
            <Link to="/catalogo" className="text-brand-cyan hover:underline mb-6 inline-block">← Volver al Catálogo</Link>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Main Image */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Gallery Grid */}
                    {product.images && product.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((img, index) => (
                                <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-80 transition">
                                    <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-slate-900">{product.title}</h1>
                    <div className="text-3xl font-bold text-brand-cyan">S/ {product.price}</div>
                    <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>

                    <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition uppercase tracking-wide">
                        Comprar Ahora
                    </button>

                    {/* Admin / Upload Section */}
                    <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-lg mb-4 text-slate-800">Administrar Galería</h3>
                        <p className="text-sm text-slate-500 mb-4">Sube fotos adicionales para este producto.</p>

                        {message && (
                            <div className={`p-3 mb-4 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <label className="block">
                            <span className="sr-only">Elegir fotos</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleUploadPhotos}
                                disabled={uploading}
                                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-brand-cyan file:text-brand-black
                  hover:file:bg-opacity-80
                  cursor-pointer"
                            />
                        </label>
                        {uploading && <p className="text-sm text-gray-500 mt-2">Subiendo fotos...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
