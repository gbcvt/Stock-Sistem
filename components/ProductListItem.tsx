import React from 'react';
import type { Product } from '../types';
import EditIcon from './icons/EditIcon';

interface ProductListItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
}

const SlidersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="4" y1="21" x2="4" y2="14"/>
        <line x1="4" y1="10" x2="4" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12" y2="3"/>
        <line x1="20" y1="21" x2="20" y2="16"/>
        <line x1="20" y1="12" x2="20"y2="3"/>
        <line x1="1" y1="14" x2="7" y2="14"/>
        <line x1="9" y1="8" x2="15" y2="8"/>
        <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
);

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onEdit, onAdjustStock }) => {
  const getStockStatus = () => {
    if (product.reorderLevel <= 0) {
      return { text: 'Estoque OK', tagClass: 'bg-green-100 text-green-800', progressClass: 'bg-green-500' };
    }
    const statusRatio = product.stock / product.reorderLevel;
    if (statusRatio < 1) {
      return { text: 'Estoque Baixo', tagClass: 'bg-red-100 text-red-800', progressClass: 'bg-red-500' };
    }
    if (statusRatio <= 1.2) {
      return { text: 'Atenção', tagClass: 'bg-amber-100 text-amber-800', progressClass: 'bg-amber-500' };
    }
    return { text: 'Estoque OK', tagClass: 'bg-green-100 text-green-800', progressClass: 'bg-green-500' };
  };
  
  const status = getStockStatus();
  const stockPercentage = product.reorderLevel > 0 ? Math.min((product.stock / (product.reorderLevel * 1.5)) * 100, 100) : 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row items-center transition-shadow duration-200 hover:shadow-md">
      <div className="flex-grow w-full">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-slate-800 truncate pr-2">{product.name}</h3>
             <span className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.tagClass}`}>
                {status.text}
            </span>
        </div>
        <p className="mt-1 text-slate-600 text-sm hidden md:block max-w-prose">{product.description}</p>
        <div className="mt-3">
          <div className="flex justify-between items-center text-sm text-slate-500">
             <span>Estoque: <span className="font-bold text-slate-800">{product.stock}</span></span>
             <span>Recompra: <span className="font-bold text-slate-800">{product.reorderLevel}</span></span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className={`h-full rounded-full ${status.progressClass} transition-all duration-500`}
              style={{ width: `${stockPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
       <div className="pt-4 sm:pt-0 sm:pl-4 sm:ml-4 sm:border-l border-slate-200/60 w-full sm:w-auto flex flex-row sm:flex-col justify-end space-x-2 sm:space-x-0 sm:space-y-2 mt-4 sm:mt-0">
        <button onClick={() => onEdit(product)} className="flex-1 sm:flex-none flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 transition-colors duration-200">
          <EditIcon className="w-4 h-4 md:mr-2"/>
          <span className="hidden md:inline">Editar</span>
        </button>
        <button onClick={() => onAdjustStock(product)} className="flex-1 sm:flex-none flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-200">
          <SlidersIcon className="w-4 h-4 md:mr-2"/>
          <span className="hidden md:inline">Ajustar</span>
        </button>
      </div>
    </div>
  );
};

export default ProductListItem;