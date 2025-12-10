export interface Listing {
  id: string; // o number, depende de cómo creaste la tabla en Supabase
  title: string;       // En Supabase puede llamarse 'name'
  price: number;
  description: string;
  image: string;       // En Supabase puede llamarse 'image_url'
  // Eliminamos address, latitude y longitude
}