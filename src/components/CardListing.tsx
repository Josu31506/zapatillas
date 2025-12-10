import { Link } from 'react-router-dom';
import { Listing } from '../types';
import { BanknoteIcon } from './Icons';

interface CardListingProps {
  listing: Listing;
}

export const CardListing = ({ listing }: CardListingProps) => (
  <Link to={`/product/${listing.id}`} className="block group">
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition group-hover:-translate-y-1 group-hover:shadow-xl h-full">
      <img src={listing.image} alt={listing.title} className="h-64 w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-cyan transition-colors">{listing.title}</h3>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            <BanknoteIcon className="h-4 w-4" /> S/ {listing.price}
          </span>
        </div>
        <p className="text-sm text-slate-600 line-clamp-3">{listing.description}</p>

        <button className="mt-auto inline-flex justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-secondary/90">
          Ver Detalles
        </button>
      </div>
    </article>
  </Link>
);