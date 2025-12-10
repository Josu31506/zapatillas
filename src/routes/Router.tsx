import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Listings } from '../pages/Listings';
import { ProductDetails } from '../pages/ProductDetails';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { MapPage } from '../pages/MapPage';
import { AdminLogin } from '../pages/AdminLogin';
import { AdminDashboard } from '../pages/AdminDashboard';
import { AdminBannerPage } from '../pages/AdminBannerPage';
import TopBar from '../components/TopBar';
import Header from '../components/Header';

export const Router = () => (
  <div className="min-h-screen bg-white text-text font-sans">
    <TopBar />
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Listings />} />
        <Route path="/avisos" element={<Navigate to="/catalogo" replace />} /> {/* Redirect old route */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/mapa" element={<MapPage />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-banner" element={<AdminBannerPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>
);
