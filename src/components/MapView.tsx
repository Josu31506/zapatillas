import { Listing } from '../types';

interface MapViewProps {
  listings: Listing[];
}

const normalize = (value: number, min: number, max: number) => {
  if (max === min) return 0.5;
  return (value - min) / (max - min);
};

export const MapView = ({ listings }: MapViewProps) => {
  const latitudes = listings.map((item) => item.latitude);
  const longitudes = listings.map((item) => item.longitude);
  const latMin = Math.min(...latitudes, -12.07);
  const latMax = Math.max(...latitudes, -12.05);
  const lonMin = Math.min(...longitudes, -77.09);
  const lonMax = Math.max(...longitudes, -77.07);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="relative h-[360px] w-full overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#00C8E320,transparent_35%),radial-gradient(circle_at_80%_20%,#007BFF20,transparent_30%),radial-gradient(circle_at_40%_80%,#007BFF18,transparent_30%)]" />
        {listings.map((listing) => {
          const top = 100 - normalize(listing.latitude, latMin, latMax) * 100;
          const left = normalize(listing.longitude, lonMin, lonMax) * 100;

          return (
            <div
              key={listing.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow">
                S/ {listing.price}
              </div>
              <div className="h-3 w-3 rounded-full border-2 border-white bg-secondary shadow" />
            </div>
          );
        })}
        {listings.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-slate-600">
            Añade avisos para visualizar puntos en el mapa.
          </div>
        )}
      </div>
      <div className="border-t bg-slate-50 px-4 py-3 text-xs text-slate-600">
        Mapa placeholder listo para integrar con React Leaflet o Google Maps. Coordenadas simuladas cerca del campus.
      </div>
    </div>
  );
};
