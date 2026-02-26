export interface FashionItem {
  id: string;
  name: string;
  category: string;
  color: string;
  pattern?: string;
  style: string;
  imageUrl: string;
  price?: string;
  store?: 'Myntra' | 'Amazon' | 'Ajio' | 'Flipkart';
  buyUrl?: string;
  matchScore?: number;
}

export interface AnalysisResult {
  detectedItem: Partial<FashionItem>;
  recommendations: FashionItem[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  items?: FashionItem[];
}
