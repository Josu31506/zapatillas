import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { AuthUser } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string, password: string) => {
    console.log('Iniciar sesión', { email, password });
    setUser({ name: 'Estudiante', email });
  };

  const register = (name: string, email: string, password: string) => {
    console.log('Registrarse', { name, email, password });
    setUser({ name, email });
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
