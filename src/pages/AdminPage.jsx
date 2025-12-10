import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const initialForm = {
  name: '',
  brand: 'Nike',
  colorway: '',
  price: '',
  image_url: '',
};

const AdminPage = () => {
  const [formValues, setFormValues] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (key) => (event) => {
    setFormValues({ ...formValues, [key]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'loading', message: 'Guardando en Supabase...' });

    const { error } = await supabase.from('products').insert([
      {
        ...formValues,
        price: formValues.price ? Number(formValues.price) : null,
      },
    ]);

    if (error) {
      setStatus({ state: 'error', message: error.message });
      return;
    }

    setStatus({ state: 'success', message: 'Producto creado correctamente.' });
    setFormValues(initialForm);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-gray-500">Panel</p>
        <h1 className="text-3xl font-semibold text-gray-900">Administra el catálogo</h1>
        <p className="mt-2 text-gray-600">
          Desde aquí puedes insertar nuevos modelos en la tabla <code>products</code> de Supabase.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Nombre
            <input
              type="text"
              value={formValues.name}
              onChange={handleChange('name')}
              required
              className="rounded border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Marca
            <select
              value={formValues.brand}
              onChange={handleChange('brand')}
              className="rounded border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
            >
              <option>Nike</option>
              <option>Adidas</option>
              <option>New Balance</option>
              <option>Puma</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Colorway
            <input
              type="text"
              value={formValues.colorway}
              onChange={handleChange('colorway')}
              className="rounded border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Precio
            <input
              type="number"
              value={formValues.price}
              onChange={handleChange('price')}
              min="0"
              step="0.01"
              className="rounded border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          URL de imagen (opcional)
          <input
            type="url"
            value={formValues.image_url}
            onChange={handleChange('image_url')}
            placeholder="https://..."
            className="rounded border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
          />
        </label>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status.state === 'loading'}
            className="rounded bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-900 disabled:opacity-60"
          >
            {status.state === 'loading' ? 'Guardando...' : 'Guardar producto'}
          </button>
          {status.message && (
            <span
              className={
                status.state === 'error'
                  ? 'text-red-600'
                  : status.state === 'success'
                    ? 'text-green-700'
                    : 'text-gray-600'
              }
            >
              {status.message}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500">
          Nota: para subir imágenes al storage de Supabase necesitarás crear un bucket y generar la URL pública.
        </p>
      </form>
    </div>
  );
};

export default AdminPage;
