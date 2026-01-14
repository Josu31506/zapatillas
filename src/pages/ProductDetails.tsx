import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface Product {
    id: number;
    name: string;
    title?: string;
    price: number;
    description: string;
    marca?: string;
    modelo?: string;
    tipo_suela?: string;
    tallas?: string[];
    image_url: string[]; // Array of image URLs
}

// Function to format product name: first letter uppercase, rest lowercase  
// Special handling for Roman numerals (II, III, IV, etc.)
const formatProductName = (name: string) => {
    if (!name) return '';
    return name
        .toLowerCase()
        .split(' ')
        .map(word => {
            // Check if word is a Roman numeral
            if (/^(i{1,3}|iv|v|vi{0,3}|ix|x)$/i.test(word)) {
                return word.toUpperCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

export const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');

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
                    // Ensure image_url is always an array
                    let imageUrlArray: string[] = [];
                    if (Array.isArray(data.image_url)) {
                        imageUrlArray = data.image_url;
                    } else if (typeof data.image_url === 'string') {
                        imageUrlArray = [data.image_url];
                    }

                    setProduct({
                        id: data.id,
                        name: data.name,
                        title: data.title || data.name,
                        price: data.price,
                        description: data.description,
                        marca: data.marca,
                        modelo: data.modelo,
                        tipo_suela: data.tipo_suela,
                        tallas: data.tallas,
                        image_url: imageUrlArray
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
                const fileName = `${product.id}-${Date.now()}-${Math.random()}.${fileExt}`;
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

            // Update Database - append new URLs to existing array
            const updatedImageUrls = [...product.image_url, ...newImageUrls];

            const { error: updateError } = await supabase
                .from('zapatillas')
                .update({ image_url: updatedImageUrls })
                .eq('id', product.id);

            if (updateError) throw updateError;

            // Update local state
            setProduct({ ...product, image_url: updatedImageUrls });
            setMessage({ type: 'success', text: '¡Fotos subidas con éxito!' });

        } catch (error: any) {
            console.error('Error uploading photos:', error);
            setMessage({ type: 'error', text: error.message || 'Error al subir las fotos.' });
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleSetCover = async (imageUrl: string) => {
        if (!product) return;

        setUploadingCover(true);
        setMessage(null);

        try {
            // Remove the selected image from its current position
            const filteredImages = product.image_url.filter(url => url !== imageUrl);
            // Place it at the beginning (as cover)
            const updatedImageUrls = [imageUrl, ...filteredImages];

            const { error: updateError } = await supabase
                .from('zapatillas')
                .update({ image_url: updatedImageUrls })
                .eq('id', product.id);

            if (updateError) throw updateError;

            // Update local state and reset to first image
            setProduct({ ...product, image_url: updatedImageUrls });
            setCurrentImageIndex(0);
            setMessage({ type: 'success', text: '¡Portada actualizada con éxito!' });

        } catch (error: any) {
            console.error('Error setting cover:', error);
            setMessage({ type: 'error', text: error.message || 'Error al actualizar la portada.' });
        } finally {
            setUploadingCover(false);
        }
    };

    const nextImage = () => {
        if (product && product.image_url.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % product.image_url.length);
        }
    };

    const prevImage = () => {
        if (product && product.image_url.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + product.image_url.length) % product.image_url.length);
        }
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    const startEditingDescription = () => {
        if (product) {
            setEditedDescription(product.description);
            setIsEditingDescription(true);
        }
    };

    const cancelEditingDescription = () => {
        setIsEditingDescription(false);
        setEditedDescription('');
    };

    const saveDescription = async () => {
        if (!product) return;

        try {
            const { error } = await supabase
                .from('zapatillas')
                .update({ description: editedDescription })
                .eq('id', product.id);

            if (error) throw error;

            setProduct({ ...product, description: editedDescription });
            setIsEditingDescription(false);
            setMessage({ type: 'success', text: '¡Descripción actualizada!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error: any) {
            console.error('Error updating description:', error);
            setMessage({ type: 'error', text: 'Error al actualizar la descripción.' });
        }
    };

    if (loading) return (
        <div className="p-10 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-brand-cyan"></div>
            <p className="mt-4 text-gray-500">Cargando producto...</p>
        </div>
    );

    if (!product) return (
        <div className="p-10 text-center">
            <p className="text-gray-500">Producto no encontrado.</p>
            <Link to="/catalogo" className="text-brand-cyan hover:underline mt-4 inline-block">← Volver al Catálogo</Link>
        </div>
    );

    const currentImage = product.image_url[currentImageIndex] || product.image_url[0] || 'https://via.placeholder.com/600';

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-10 max-w-7xl">
                <Link to="/catalogo" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6 font-medium transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al Catálogo
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    {/* Image Gallery with Carousel */}
                    <div className="space-y-6">
                        {/* Main Image with Navigation Arrows */}
                        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-md group">
                            <img
                                src={currentImage}
                                alt={product.title || product.name}
                                className="w-full h-full object-contain p-8"
                            />

                            {/* Navigation Arrows - Only show if multiple images */}
                            {product.image_url.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Image Counter */}
                            {product.image_url.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                                    {currentImageIndex + 1} / {product.image_url.length}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Grid */}
                        {product.image_url.length > 1 && (
                            <div className="grid grid-cols-6 gap-3">
                                {product.image_url.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => selectImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${index === currentImageIndex
                                            ? 'border-brand-cyan shadow-lg'
                                            : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Vista ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category badges */}
                        <div className="flex flex-wrap gap-2">
                            {product.marca && (
                                <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                                    {product.marca}
                                </span>
                            )}
                            {product.modelo && (
                                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                    {product.modelo}
                                </span>
                            )}
                            {product.tipo_suela && (
                                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                                    Suela: {product.tipo_suela}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 leading-none">
                            {formatProductName(product.title || product.name)}
                        </h1>

                        <div className="flex items-baseline gap-4">
                            <div className="text-4xl font-black text-gray-900">
                                S/ {product.price}
                            </div>
                        </div>

                        {/* Description - Editable */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-gray-900">Descripción</h3>
                                {!isEditingDescription && (
                                    <button
                                        onClick={startEditingDescription}
                                        className="text-sm text-brand-cyan hover:text-blue-600 font-semibold flex items-center gap-1 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Editar
                                    </button>
                                )}
                            </div>

                            {isEditingDescription ? (
                                <div className="space-y-3">
                                    <textarea
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        rows={6}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-brand-cyan focus:outline-none text-gray-700 leading-relaxed resize-none"
                                        placeholder="Ingresa la descripción del producto..."
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={saveDescription}
                                            className="flex-1 bg-black text-white py-3 px-4 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={cancelEditingDescription}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 min-h-[150px]">
                                    <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sizes - Show all sizes 40-44 with strikethrough for unavailable */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">Tallas:</h3>
                            <div className="flex flex-wrap gap-2">
                                {['40', '41', '42', '43', '44'].map((size) => {
                                    const isAvailable = product.tallas?.includes(size);
                                    return (
                                        <button
                                            key={size}
                                            disabled={!isAvailable}
                                            className={`px-4 py-2 border-2 rounded-lg font-semibold transition-all ${isAvailable
                                                ? 'border-gray-300 hover:border-black hover:bg-black hover:text-white cursor-pointer'
                                                : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/51957700678?text=${encodeURIComponent(`Hola, bríndame información de la zapatillas que vi en Futbolshop.\n\n${product.title || product.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition uppercase tracking-wide shadow-lg hover:shadow-xl text-center"
                        >
                            Comprar Ahora
                        </a>

                        {/* Admin Upload Section */}
                        <div className="mt-10 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 space-y-6">
                            {/* Cover Image Selection */}
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Cambiar Portada</h3>
                                <p className="text-sm text-gray-600 mb-4">Selecciona cuál imagen será la portada principal.</p>

                                {product.image_url.length > 1 ? (
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                        {product.image_url.map((imageUrl, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSetCover(imageUrl)}
                                                disabled={uploadingCover || index === 0}
                                                className={`relative aspect-square rounded-lg overflow-hidden border-3 transition-all ${index === 0
                                                    ? 'border-yellow-400 ring-2 ring-yellow-400 ring-offset-2'
                                                    : 'border-gray-200 hover:border-yellow-400 hover:scale-105'
                                                    } ${uploadingCover ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt={`Opción ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                {index === 0 && (
                                                    <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                                                        <div className="bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full">
                                                            PORTADA
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Este producto solo tiene una imagen.</p>
                                )}

                                {uploadingCover && (
                                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                                        <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                        Actualizando portada...
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-300"></div>

                            {/* Gallery Images Upload */}
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Agregar Fotos a Galería</h3>
                                <p className="text-sm text-gray-600 mb-4">Sube fotos adicionales para este producto.</p>

                                {message && (
                                    <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${message.type === 'success'
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : 'bg-red-100 text-red-700 border border-red-200'
                                        }`}>
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
                                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-3 file:px-6
                          file:rounded-full file:border-0
                          file:text-sm file:font-bold
                          file:bg-brand-cyan file:text-black
                          hover:file:bg-opacity-80
                          file:cursor-pointer cursor-pointer
                          disabled:opacity-50"
                                    />
                                </label>
                                {uploading && (
                                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                                        <div className="w-4 h-4 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
                                        Subiendo fotos...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
