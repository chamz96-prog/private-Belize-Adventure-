export class CreateTourDto {
  title: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  basePriceAdult: number;
  basePriceChild?: number;
  currency?: string;
  isActive?: boolean;
  videoUrl?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  metaTitle?: string;
  metaDescription?: string;
  salePrice?: number;
  featureImageUrl?: string;
  locationId?: number;
  images?: string[];
  faqs?: { question: string; answer: string }[];
  surroundings?: { name: string; content: string; distance: string; type: string }[];
  itinerary?: { day: number; title: string; description: string; image?: string }[];
  inclusions?: string[];
  exclusions?: string[];
  options?: any[];
}
