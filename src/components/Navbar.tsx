import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.svg';
import { useAuth } from '../context/AuthContext';
import { CloseIcon, MenuIcon } from './Icons';

const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `${linkBase} ${isActive ? 'text-white bg-primary' : 'text-slate-700 hover:text-primary hover:bg-white/60'}`;

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="CampusRoom" className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-slate-900">CampusRoom</span>
            <span className="text-xs text-slate-500">Vive cerca, vive conectado</span>
          </div>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>

        <div
          className={`${open ? 'flex' : 'hidden'} absolute left-0 top-16 w-full flex-col gap-2 bg-white/90 px-4 pb-4 shadow-md backdrop-blur-md md:static md:flex md:w-auto md:flex-row md:items-center md:gap-3 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <NavLink to="/" className={linkClasses} onClick={() => setOpen(false)}>
            Inicio
          </NavLink>
          <NavLink to="/avisos" className={linkClasses} onClick={() => setOpen(false)}>
            Avisos
          </NavLink>
          <NavLink to="/mapa" className={linkClasses} onClick={() => setOpen(false)}>
            Mapa
          </NavLink>
          <NavLink to="/login" className={linkClasses} onClick={() => setOpen(false)}>
            {user ? 'Mi cuenta' : 'Login'}
          </NavLink>
          {user && (
            <button
              className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-secondary/90"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
