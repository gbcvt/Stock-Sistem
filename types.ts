export interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
}

export interface RecipeIngredient {
  productId: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  instructions?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  reorderLevel: number;
  averageCost: number;
}

export interface AdjustmentData {
  type: 'add' | 'remove' | 'balance';
  value: number;
  totalPurchaseCost?: number;
  supplierId?: string;
  expirationDate?: string;
}

export type StockStatus = 'all' | 'ok' | 'warning' | 'low';

export interface AdjustmentLog {
  id: string;
  productId: string;
  productName: string;
  date: string;
  type: 'add' | 'remove' | 'balance';
  value: number;
  totalPurchaseCost?: number;
  supplierId?: string;
  expirationDate?: string;
}
