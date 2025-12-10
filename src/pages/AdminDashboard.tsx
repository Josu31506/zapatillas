import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProductForm from '../components/AdminProductForm';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = () => {
            const isAdmin = localStorage.getItem('isAdmin');
            if (!isAdmin) {
                navigate('/admin-login');
            }
            setLoading(false);
        };
        checkSession();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin-login');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Panel de Administración</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-bold"
                    >
                        Cerrar Sesión
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="mb-6 text-gray-600">Aquí puedes subir nuevos productos al catálogo.</p>
                    <AdminProductForm />
                </div>

                <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Configuración del Banner</h3>
                        <p className="text-gray-600 text-sm">Edita la imagen principal y los descuentos de portada.</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin-banner')}
                        className="px-6 py-3 bg-black text-brand-cyan font-bold rounded hover:bg-gray-800 transition-colors"
                    >
                        Editar Banner
                    </button>
                </div>
            </div>
        </div>
    );
};
