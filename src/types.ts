export type LiquidLevel = 'Almost Full' | '3/4' | 'Half' | '1/4';

export interface Distributor {
  id: string;
  name: string;
  initials: string;
  email: string;
}

export interface Bottle {
  id: string;
  name: string;
  brand: string;
  category: 'Spirits' | 'Beer' | 'Wine' | 'Other';
  level: LiquidLevel;
  price: number;
  parLevel: number;
  currentStock: number;
  imageUrl?: string;
  detected?: boolean;
  voiceNote?: string;
  distributorId?: string;
}

export interface OrderItem {
  bottleId: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  urgency: 'normal' | 'moderate' | 'critical';
  distributorId?: string;
}

export type AppScreen = 
  | 'onboarding'
  | 'camera'
  | 'pen-detection'
  | 'review'
  | 'order-summary'
  | 'history'
  | 'settings'
  | 'manual-add';

export interface Location {
  id: string;
  name: string;
  isCurrent: boolean;
}
