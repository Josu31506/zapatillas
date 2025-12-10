import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminBannerForm from '../components/AdminBannerForm';

export const AdminBannerPage = () => {
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
                    <h1 className="text-3xl font-bold text-slate-900">Editar Banner / Carrusel</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/admin-dashboard')}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm font-bold"
                        >
                            Volver al Dashboard
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-bold"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="mb-6 text-gray-600">
                        Aquí puedes modificar la imagen principal, el título y el descuento que aparece en la portada.
                    </p>
                    <AdminBannerForm />
                </div>
            </div>
        </div>
    );
};
