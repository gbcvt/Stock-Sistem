export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  reorderLevel: number;
  imageUrl: string;
  unitPrice: number;
}

export interface AdjustmentData {
  type: 'add' | 'remove' | 'balance';
  value: number;
  cost?: number;
}

export type StockStatus = 'all' | 'ok' | 'warning' | 'low';

export interface AdjustmentLog {
  id: string;
  productId: string;
  productName: string;
  date: string;
  type: 'add' | 'remove' | 'balance';
  value: number;
  cost?: number;
}
