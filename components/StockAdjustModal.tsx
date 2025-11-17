import React, { useState, useEffect } from 'react';
import type { Product, AdjustmentData, Supplier } from '../types';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';

interface StockAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdjust: (productId: string, adjustmentData: AdjustmentData) => void;
  product: Product | null;
  suppliers: Supplier[];
}

const StockAdjustModal: React.FC<StockAdjustModalProps> = ({ isOpen, onClose, onAdjust, product, suppliers }) => {
  const [amount, setAmount] = useState<number>(1);
  const [totalPurchaseCost, setTotalPurchaseCost] = useState<number>(0);
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove' | 'balance'>('add');
  const [supplierId, setSupplierId] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
        setAdjustmentType('add');
        setAmount(1);
        setTotalPurchaseCost(0);
        setSupplierId('');
        setExpirationDate('');
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
    if (adjustmentType === 'add') {
      adjustmentData.totalPurchaseCost = totalPurchaseCost;
      adjustmentData.supplierId = supplierId;
      adjustmentData.expirationDate = expirationDate;
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
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-slate-800">
            Ajustar Estoque: <span className="text-orange-600">{product.name}</span>
          </h3>
           <p className="text-sm text-slate-500 mt-1">Estoque atual: {product.stock}</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
          <div className="p-6 space-y-6 flex-grow">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Ajuste</label>
                <div className="grid grid-cols-3 gap-2">
                    <button type="button" onClick={() => setAdjustmentType('add')} className={`flex items-center justify-center p-3 rounded-lg text-sm font-semibold transition-colors ${adjustmentType === 'add' ? 'bg-green-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                        <PlusIcon className="w-5 h-5 mr-2" /> Adicionar
                    </button>
                    <button type="button" onClick={() => setAdjustmentType('remove')} className={`flex items-center justify-center p-3 rounded-lg text-sm font-semibold transition-colors ${adjustmentType === 'remove' ? 'bg-red-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                        <MinusIcon className="w-5 h-5 mr-2" /> Remover
                    </button>
                    <button type="button" onClick={() => setAdjustmentType('balance')} className={`flex items-center justify-center p-3 rounded-lg text-sm font-semibold transition-colors ${adjustmentType === 'balance' ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                        <ClipboardCheckIcon className="w-5 h-5 mr-2" /> Balanço
                    </button>
                </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-slate-700">{getLabel()}</label>
              <input 
                type="number" 
                id="amount" 
                value={amount} 
                onChange={e => setAmount(Math.max(0, parseInt(e.target.value, 10)) || 0)} 
                min="0" 
                required 
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            
            {adjustmentType === 'add' && (
              <div className="space-y-4 p-4 bg-slate-50/70 rounded-lg border border-slate-200">
                <div>
                    <label htmlFor="totalPurchaseCost" className="block text-sm font-medium text-slate-700">Custo Total da Compra (R$)</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-slate-500 sm:text-sm">R$</span>
                        </div>
                        <input 
                            type="number" 
                            id="totalPurchaseCost" 
                            value={totalPurchaseCost} 
                            onChange={e => setTotalPurchaseCost(parseFloat(e.target.value) || 0)} 
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="block w-full rounded-md border-slate-300 pl-9 pr-4 py-2 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                  <label htmlFor="supplier" className="block text-sm font-medium text-slate-700">Fornecedor (Opcional)</label>
                  <select id="supplier" value={supplierId} onChange={e => setSupplierId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                    <option value="">Nenhum</option>
                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                 <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-slate-700">Data de Validade (Opcional)</label>
                  <input
                    type="date"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={e => setExpirationDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="px-6 py-4 bg-slate-50 flex justify-end space-x-2 sticky bottom-0 z-10">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 text-sm font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
              Confirmar Ajuste
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustModal;