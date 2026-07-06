// Shared public types — safe to import from both client and server components.

export interface PublicSpec {
  engine?: string;
  transmission?: string;
  battery?: string;
  range?: string;
  horsepower?: string;
  topSpeed?: string;
  acceleration?: string;
  dimensions?: string;
  seating?: string;
  features?: string[];
}

export interface PublicVehicle {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  brandName: string;
  brandSlug: string;
  categoryId: string | null;
  energyType: string;
  bodyType: string | null;
  priceUsd: number;
  image: string | null;
  gallery: string[];
  excerpt: string;
  description: string;
  specs: PublicSpec;
  featured: boolean;
}

export interface PublicBrand {
  id: string;
  slug: string;
  name: string;
  country: string;
  founded: number | null;
  description: string;
  history: string | null;
  modelCount: number;
}

export interface PublicShippingRoute {
  id: string;
  originPort: string;
  originCountry: string;
  destinationPort: string;
  destinationCountry: string;
  transitDays: number;
  incoterms: string[];
  frequency: string | null;
  notes: string | null;
}

export interface PublicTestimonial {
  id: string;
  name: string;
  company: string | null;
  country: string;
  rating: number;
  quote: string;
}

export interface PublicFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface PublicArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
}

export interface PlatformStats {
  vehicleCount: number;
  brandCount: number;
  routeCount: number;
  yearsInTrade: number;
}
