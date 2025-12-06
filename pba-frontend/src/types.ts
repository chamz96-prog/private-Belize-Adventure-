export interface Tour {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  images: string[];
  featureImageUrl?: string;
  duration: string;
  departureLocation: string;
  groupSize?: string;
  difficulty?: string;
  isCruiseFriendly?: boolean;
  isFamilyFriendly?: boolean;

  priceFrom: number; // mapped from basePriceAdult
  basePriceAdult: number; // kept for compatibility
  basePriceChild?: number;
  currency: string;
  ratingAverage: number;
  ratingCount: number;

  shortDescription: string;
  overview: string;            // main description text

  highlights: string[];        // bullet list

  itinerary: {
    time?: string;
    title: string;
    description: string;
  }[];

  included: string[];
  excluded: string[];

  whatToBring: string[];
  goodToKnow: string[];

  pickupInfo?: {
    cruisePassengers?: string;
    hotelGuests?: string;
  };

  faqs: {
    question: string;
    answer: string;
  }[];

  relatedTours?: {
    slug: string;
    title: string;
    duration: string;
    priceFrom: number;
    image?: string;
  }[];
  
  isActive: boolean;
  options?: TourOptionPayload[];
}

export interface Location {
  id: number;
  name: string;
  slug: string;
  parentId?: number | null;
  shortTitle?: string;
  heroSubtitle?: string;
  descriptionHtml?: string;
  excerpt?: string;
  latitude?: number | null;
  longitude?: number | null;
  mapZoom?: number | null;
  heroImageUrl?: string;
  featureImageUrl?: string;
  status: "publish" | "draft";
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface LocationCategory {
  id: number;
  name: string;
  iconClass?: string;
  status: "publish" | "draft";
  createdAt: string;
  updatedAt: string;
}

export interface TourOptionPricingTier {
  id?: number;
  label: string;
  guestType: "adult" | "child" | "youth" | "infant" | "other";
  minGuests: number;
  maxGuests: number;
  pricePerPerson: number;
}

export interface TourOptionSchedule {
  id?: number;
  startDate: string;          // "2023-10-04"
  endDate?: string | null;    // null means no end date
  daysOfWeek: number[];       // 0=Sun..6=Sat
  startTime: string;          // "08:00"
  durationHours?: number;
  pricingTiers: TourOptionPricingTier[];
}

export interface TourOptionPayload {
  id?: number;
  code: string;               // e.g. "TG1-PRIVATE"
  name: string;               // "Private Tour"
  description?: string;
  type: "private" | "shared" | "with_transfers" | "transport_only" | "custom";
  isDefault?: boolean;
  includesTransportation: boolean;
  includesTransfers: boolean;
  includesEntranceFees?: boolean;
  currency: string;
  isActive: boolean;
  schedules: TourOptionSchedule[];
}

export interface Quote {
  tourId: number;
  tourTitle: string;
  adults: number;
  children: number;
  priceAdult: number;
  priceChild: number;
  subtotal: number;
  total: number;
  currency: string;
}

export interface Booking {
  id: number;
  bookingCode: string;
  tourId: number;
  date: string;
  adults: number;
  children: number;
  subtotal: number;
  total: number;
  currency: string;
  status: string;
  paymentStatus: string;
}

export interface TourCard {
  id: number;
  slug: string;
  title: string;
  image: string;
  featured?: boolean;
  destinationName: string;
  duration: string;
  fromPrice: number;
  currency: string;
  ratingAverage: number;
  ratingCount: number;
  tagLine?: string;
}

export interface ToursListResponse {
  total: number;
  page: number;
  perPage: number;
  tours: TourCard[];
}
