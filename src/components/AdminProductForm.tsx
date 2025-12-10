import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AdminProductForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (!image) throw new Error('Por favor selecciona una imagen.');

            // 1. Upload Image
            const fileExt = image.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('zapatillas-img')
                .upload(filePath, image);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('zapatillas-img')
                .getPublicUrl(filePath);

            // 3. Insert into Database
            const { error: insertError } = await supabase
                .from('zapatillas')
                .insert([
                    {
                        name,
                        price: parseFloat(price),
                        description,
                        // ✅ CORRECCIÓN AQUÍ:
                        // Envolvemos la URL en corchetes [] para que sea un Array válido
                        image_url: [publicUrl],
                    },
                ]);

            if (insertError) throw insertError;

            setMessage({ type: 'success', text: '¡Producto subido con éxito! Redirigiendo...' });

            // Redirect after short delay
            setTimeout(() => {
                navigate('/catalogo');
            }, 1500);

            // Reset form
            setName('');
            setPrice('');
            setDescription('');
            setImage(null);
            // Reset file input manually via ID or ref if needed
            const fileInput = document.getElementById('file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            console.error('Error uploading product:', error);
            setMessage({ type: 'error', text: error.message || 'Error al subir el producto.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200 my-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 uppercase tracking-tight">Subir Nuevo Producto</h2>

            {message && (
                <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Nike Air Max"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio (€)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Detalles del producto..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-md font-bold text-white uppercase tracking-wide transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800'
                        }`}
                >
                    {loading ? 'Subiendo...' : 'Subir Producto'}
                </button>
            </form>
        </div>
    );
};

export default AdminProductForm;