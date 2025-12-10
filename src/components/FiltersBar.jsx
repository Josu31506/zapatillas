const FiltersBar = ({ filters, onChange }) => {
  const handleInput = (key) => (event) => {
    onChange({ ...filters, [key]: event.target.value });
  };

  return (
    <section className="mb-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-2 text-sm text-gray-600">
          <span>Búsqueda</span>
          <input
            type="search"
            placeholder="Buscar por nombre"
            value={filters.search}
            onChange={handleInput('search')}
            className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 focus:border-black focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <span>Marca</span>
          <select
            value={filters.brand}
            onChange={handleInput('brand')}
            className="rounded border border-gray-300 px-3 py-2 text-gray-800 focus:border-black focus:outline-none"
          >
            <option value="all">Todas</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="New Balance">New Balance</option>
            <option value="Puma">Puma</option>
          </select>
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <span>Orden</span>
        <select
          value={filters.sort}
          onChange={handleInput('sort')}
          className="rounded border border-gray-300 px-3 py-2 text-gray-800 focus:border-black focus:outline-none"
        >
          <option value="newest">Novedades</option>
          <option value="price-asc">Precio (menor a mayor)</option>
          <option value="price-desc">Precio (mayor a menor)</option>
        </select>
      </label>
    </section>
  );
};

export default FiltersBar;
