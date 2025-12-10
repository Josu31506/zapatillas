import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 px-4 py-10">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Acceso seguro</p>
        <h2 className="text-2xl font-bold text-slate-900">Inicia sesión en CampusRoom</h2>
        <p className="text-sm text-slate-600">Ingresa con tu correo institucional para continuar.</p>
      </div>
      <LoginForm onSubmit={login} />
    </section>
  );
};
