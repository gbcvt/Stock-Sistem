import { useState, useCallback, useMemo } from 'react';
import type { Product, AdjustmentData, AdjustmentLog } from '../types';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Farinha de Trigo',
    description: 'Farinha de trigo tipo 1, ideal para pães e bolos. Estoque em quilogramas (kg).',
    stock: 22,
    reorderLevel: 10,
    averageCost: 4.50,
  },
  {
    id: '2',
    name: 'Ovos',
    description: 'Ovos brancos tipo grande. Estoque em unidades.',
    stock: 48,
    reorderLevel: 60,
    averageCost: 0.80,
  },
  {
    id: '3',
    name: 'Açúcar Refinado',
    description: 'Açúcar refinado para confeitaria e massas. Estoque em quilogramas (kg).',
    stock: 8,
    reorderLevel: 5,
    averageCost: 5.20,
  },
  {
    id: '4',
    name: 'Manteiga sem Sal',
    description: 'Manteiga sem sal de primeira qualidade. Estoque em gramas (g).',
    stock: 2200,
    reorderLevel: 1000,
    averageCost: 0.08,
  },
  {
    id: '5',
    name: 'Leite Integral',
    description: 'Leite integral UHT. Estoque em litros (L).',
    stock: 12,
    reorderLevel: 10,
    averageCost: 4.80,
  },
  {
    id: '6',
    name: 'Fermento Biológico Seco',
    description: 'Fermento biológico seco instantâneo. Estoque em gramas (g).',
    stock: 450,
    reorderLevel: 250,
    averageCost: 0.03,
  },
  {
    id: '7',
    name: 'Chocolate em Pó 50%',
    description: 'Chocolate em pó 50% cacau. Estoque em gramas (g).',
    stock: 1500,
    reorderLevel: 800,
    averageCost: 0.09,
  },
];


export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [adjustmentHistory, setAdjustmentHistory] = useState<AdjustmentLog[]>([]);

  const addProduct = useCallback((productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: crypto.randomUUID(),
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  }, []);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  }, []);

  const adjustStock = useCallback((productId: string, adjustment: AdjustmentData) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newLog: AdjustmentLog = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      date: new Date().toISOString(),
      type: adjustment.type,
      value: adjustment.value,
      totalPurchaseCost: adjustment.totalPurchaseCost,
      supplierId: adjustment.supplierId,
      expirationDate: adjustment.expirationDate,
    };
    
    setAdjustmentHistory(prev => [newLog, ...prev]);
    
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p.id !== productId) {
          return p;
        }
        
        let newStock = p.stock;
        let newAverageCost = p.averageCost;

        switch(adjustment.type) {
            case 'add':
                newStock += adjustment.value;
                const purchaseCost = adjustment.totalPurchaseCost || 0;
                if (newStock > 0 && purchaseCost > 0 && adjustment.value > 0) {
                    const oldTotalValue = p.stock * p.averageCost;
                    newAverageCost = (oldTotalValue + purchaseCost) / newStock;
                }
                break;
            case 'remove':
                newStock -= adjustment.value;
                break;
            case 'balance':
                newStock = adjustment.value;
                break;
        }

        return { ...p, stock: Math.max(0, newStock), averageCost: newAverageCost };
      })
    );
  }, [products]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const ratioA = a.reorderLevel > 0 ? a.stock / a.reorderLevel : Infinity;
      const ratioB = b.reorderLevel > 0 ? b.stock / b.reorderLevel : Infinity;
      return ratioA - ratioB;
    });
  }, [products]);


  return {
    products,
    sortedProducts,
    addProduct,
    updateProduct,
    adjustStock,
    adjustmentHistory,
  };
};