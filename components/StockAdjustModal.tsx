
import React, { useState, useEffect } from 'react';
import type { Product, AdjustmentData } from '../types';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';

interface StockAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdjust: (productId: string, adjustmentData: AdjustmentData) => void;
  product: Product | null;
}

const StockAdjustModal: React.FC<StockAdjustModalProps> = ({ isOpen, onClose, onAdjust, product }) => {
  const [amount, setAmount] = useState<number>(1);
  const [cost, setCost] = useState<number>(0);
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove' | 'balance'>('add');

  useEffect(() => {
    if (isOpen) {
        setAdjustmentType('add');
        setAmount(1);
        setCost(0);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (adjustmentType === 'remove' && product.stock - amount < 0) {
        alert("O estoque não pode ser negativo.");
        return;
    }
    
    const adjustmentData: AdjustmentData = {
      type: adjustmentType,
      value: amount,
    };
    if (adjustmentType === 'add' && cost > 0) {
      adjustmentData.cost = cost;
    }
    onAdjust(product.id, adjustmentData);
  };

  const getLabel = () => {
    switch (adjustmentType) {
        case 'add': return 'Quantidade a Adicionar';
        case 'remove': return 'Quantidade a Remover';
        case 'balance': return 'Nova Quantidade em Estoque';
    }
  }
  
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-stone-800">
            Ajustar Estoque: <span className="text-orange-800">{product.name}</span>
          </h3>
           <p className="text-sm text-stone-500 mt-1">Estoque atual: {product.stock}</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Tipo de Ajuste</label>
                <div className="grid grid-cols-3 gap-2">
                    <button type="button" onClick={() => setAdjustmentType('add')} className={`flex items-center justify-center p-3 rounded-md text-sm font-medium transition-colors ${adjustmentType === 'add' ? 'bg-green-600 text-white shadow' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}>
                        <PlusIcon className="w-5 h-5 mr-2" /> Adicionar
                    </button>
                    <button type="button" onClick={() => setAdjustmentType('remove')} className={`flex items-center justify-center p-3 rounded-md text-sm font-medium transition-colors ${adjustmentType === 'remove' ? 'bg-red-600 text-white shadow' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}>
                        <MinusIcon className="w-5 h-5 mr-2" /> Remover
                    </button>
                    <button type="button" onClick={() => setAdjustmentType('balance')} className={`flex items-center justify-center p-3 rounded-md text-sm font-medium transition-colors ${adjustmentType === 'balance' ? 'bg-blue-600 text-white shadow' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}>
                        <ClipboardCheckIcon className="w-5 h-5 mr-2" /> Balanço
                    </button>
                </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-stone-700">{getLabel()}</label>
              <input 
                type="number" 
                id="amount" 
                value={amount} 
                onChange={e => setAmount(Math.max(0, parseInt(e.target.value, 10)) || 0)} 
                min="0" 
                required 
                className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            
            {adjustmentType === 'add' && (
                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-stone-700">Valor Investido (R$)</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-stone-500 sm:text-sm">R$</span>
                        </div>
                        <input 
                            type="number" 
                            id="cost" 
                            value={cost} 
                            onChange={e => setCost(parseFloat(e.target.value) || 0)} 
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="block w-full rounded-md border-stone-300 pl-9 pr-4 py-2 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        />
                    </div>
                </div>
            )}
          </div>
          <div className="px-6 py-4 bg-stone-50 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-800 hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700">
              Confirmar Ajuste
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustModal;
