export enum WorkerCategory {
  ALL = 'All',
  PLUMBER = 'Plumber',
  GARDENER = 'Gardener',
  CARPENTER = 'Carpenter',
  PAINTER = 'Painter',
  ELECTRICIAN = 'Electrician',
  ARTS_CRAFTS = 'Arts & Crafts',
  OTHER = 'Others'
}

export interface WorkerProfile {
  id: string;
  name: string;
  category: WorkerCategory;
  rating: number;
  reviews: number;
  phone: string;
  hourlyRate: number;
  imageUrl: string;
  services: string[];
  description: string;
  location: string;
  isVerified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export interface GeminiDiagnosisResponse {
  category: WorkerCategory;
  safetyTip: string;
  reasoning: string;
  suggestedAction: string;
}

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  category?: WorkerCategory;
}