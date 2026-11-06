export type TabType = 'home' | 'style' | 'ai-stylist' | 'lookbook' | 'shop' | 'magazine' | 'my-style' | 'admin';

export interface ProductItem {
  id: string;
  name: string;
  category: 'jacket' | 'knitwear' | 'shirts' | 'trousers' | 'shoes' | 'accessories';
  categoryLabel: string;
  brand: string; // e.g. "Sartoria V [샘플 브랜딩]"
  price: number;
  samplePriceDisplay: string;
  imageUrl: string;
  description: string;
  fabricDetails: string;
  stylingNotes: string;
  styleTags: string[];
  externalUrl?: string;
  isCurated?: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  season: string;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  stylingConcept: string;
  ageRecommendation: string;
  tpo: string;
  items: {
    part: 'Top' | 'Bottom' | 'Shoes' | 'Outer' | 'Accessory';
    name: string;
    description: string;
  }[];
  palette: string[];
}

export interface MagazineArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Styling' | 'Grooming' | 'Material' | 'Watch & Shoes' | 'Lifestyle';
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string[]; // paragraph blocks
  tags: string[];
}

export interface StyleCategory {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  description: string;
  imageUrl: string;
  recommendedAge: string;
  keyItems: string[];
}

export interface StylingInput {
  ageGroup: string;
  bodyType: string;
  occasion: string;
  budget: string;
  preferredStyle: string;
  notes?: string;
}

export interface StylingRecommendation {
  id?: string;
  createdAt?: string;
  title: string;
  concept: string;
  top: {
    item: string;
    stylingTip: string;
    color: string;
  };
  bottom: {
    item: string;
    fitPoint: string;
    color: string;
  };
  shoes: {
    item: string;
    stylingTip: string;
    color: string;
  };
  accessories: string[];
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    rationale: string;
  };
  recommendationReason: string;
  ageFitGuide: string;
  stylingDos: string[];
  stylingDonts: string[];
  inputSnapshot?: StylingInput;
}

export interface UserSavedState {
  savedProducts: string[]; // product IDs
  savedLookbooks: string[]; // lookbook IDs
  savedArticles: string[]; // article IDs
  recommendationHistory: StylingRecommendation[];
}
