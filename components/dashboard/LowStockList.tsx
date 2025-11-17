import React, { useMemo } from 'react';
import type { Product } from '../../types';

interface LowStockListProps {
  products: Product[];
  onAdjustStock: (product: Product) => void;
}

const SlidersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20"y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
);

const LowStockList: React.FC<LowStockListProps> = ({ products, onAdjustStock }) => {
  const lowStockProducts = useMemo(() => {
    return products
      .filter(p => p.stock < p.reorderLevel)
      .sort((a, b) => (a.stock / a.reorderLevel) - (b.stock / b.reorderLevel))
      .slice(0, 5);
  }, [products]);

  if (lowStockProducts.length === 0) {
    return <div className="text-center py-10 px-4 text-slate-500 h-full flex items-center justify-center">Nenhum insumo com estoque baixo.</div>;
  }

  return (
    <div className="flow-root">
        <ul className="divide-y divide-slate-200">
        {lowStockProducts.map(product => (
            <li key={product.id} className="p-4 flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{product.name}</p>
                    <p className="text-sm text-slate-500">
                    Estoque: <span className="font-bold text-red-600">{product.stock}</span> / {product.reorderLevel}
                    </p>
                </div>
                <button 
                    onClick={() => onAdjustStock(product)}
                    className="flex-shrink-0 flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                >
                    <SlidersIcon className="w-4 h-4" />
                    <span className="hidden sm:inline ml-2">Ajustar</span>
                </button>
            </li>
        ))}
        </ul>
    </div>
  );
};

export default LowStockList;