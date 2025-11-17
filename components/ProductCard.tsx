import React from 'react';
import type { Product } from '../types';
import EditIcon from './icons/EditIcon';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
}

const SlidersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
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


const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onAdjustStock }) => {
  const isLowStock = product.stock < product.reorderLevel;

  const stockStatusClass = isLowStock
    ? 'bg-red-100 text-red-800'
    : 'bg-green-100 text-green-800';
  
  const stockStatusText = isLowStock ? 'Estoque Baixo' : 'Em Estoque';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img
        className="h-48 w-full object-cover"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-stone-800 truncate pr-2">{product.name}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatusClass}`}>
                {stockStatusText}
            </span>
        </div>
        <p className="mt-2 text-stone-600 text-sm flex-grow">{product.description}</p>
        <div className="mt-4 pt-4 border-t border-stone-200 flex justify-between items-center">
          <div>
            <p className="text-sm text-stone-500">Em estoque</p>
            <p className="text-2xl font-bold text-stone-900">{product.stock}</p>
          </div>
          <div>
            <p className="text-sm text-stone-500 text-right">Recompra</p>
            <p className="text-2xl font-bold text-stone-900">{product.reorderLevel}</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-stone-50 grid grid-cols-2 gap-2">
        <button onClick={() => onEdit(product)} className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-800 bg-orange-100 hover:bg-orange-200 transition-colors duration-200">
          <EditIcon className="w-4 h-4 mr-2"/>
          Editar
        </button>
        <button onClick={() => onAdjustStock(product)} className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-800 bg-blue-100 hover:bg-blue-200 transition-colors duration-200">
          <SlidersIcon className="w-4 h-4 mr-2"/>
          Ajustar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;