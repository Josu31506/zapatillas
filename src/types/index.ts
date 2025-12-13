export interface Listing {
  id: string;
  title: string;
  name?: string;
  price: number;
  description: string;
  image: string;
  originalPrice?: number;
  discount?: number;
  // Optional properties for MapView and PostAdForm
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  user_metadata?: any;
}