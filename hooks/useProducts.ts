import { useState, useCallback, useMemo } from 'react';
import type { Product, AdjustmentData, AdjustmentLog } from '../types';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Pão Francês',
    description: 'Pão tradicional crocante por fora e macio por dentro.',
    stock: 55,
    reorderLevel: 50,
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=400&auto=format&fit=crop',
    unitPrice: 0.75,
  },
  {
    id: '2',
    name: 'Croissant de Manteiga',
    description: 'Clássico croissant francês, amanteigado e folhado.',
    stock: 18,
    reorderLevel: 20,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop',
    unitPrice: 4.50,
  },
  {
    id: '3',
    name: 'Bolo de Chocolate',
    description: 'Bolo fofinho com cobertura cremosa de chocolate.',
    stock: 8,
    reorderLevel: 5,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop',
    unitPrice: 35.00,
  },
  {
    id: '4',
    name: 'Sonho de Creme',
    description: 'Doce frito recheado com creme de baunilha e polvilhado com açúcar.',
    stock: 60,
    reorderLevel: 30,
    imageUrl: 'https://images.unsplash.com/photo-1621204093964-b0578f7311c3?q=80&w=400&auto=format&fit=crop',
    unitPrice: 5.00,
  },
    {
    id: '5',
    name: 'Baguete',
    description: 'Pão longo e fino com casca crocante, ideal para sanduíches.',
    stock: 25,
    reorderLevel: 15,
    imageUrl: 'https://images.unsplash.com/photo-1556909172-6ab63f18fd12?q=80&w=400&auto=format&fit=crop',
    unitPrice: 6.00,
  },
  {
    id: '6',
    name: 'Pão de Queijo',
    description: 'Pequenos pães de queijo macios e deliciosos, perfeitos para um lanche.',
    stock: 200,
    reorderLevel: 100,
    imageUrl: 'https://images.unsplash.com/photo-1593570275883-207a90893f41?q=80&w=400&auto=format&fit=crop',
    unitPrice: 1.50,
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
      cost: adjustment.cost,
    };
    
    setAdjustmentHistory(prev => [newLog, ...prev]);
    
    setProducts(prevProducts =>
      prevProducts.map(p => {
        if (p.id !== productId) {
          return p;
        }
        
        let newStock = p.stock;
        switch(adjustment.type) {
            case 'add':
                newStock += adjustment.value;
                break;
            case 'remove':
                newStock -= adjustment.value;
                break;
            case 'balance':
                newStock = adjustment.value;
                break;
        }

        return { ...p, stock: Math.max(0, newStock) };
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