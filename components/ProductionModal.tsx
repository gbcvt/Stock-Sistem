import React, { useState } from 'react';
import type { Recipe } from '../types';
import XIcon from './icons/XIcon';

interface ProductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (recipe: Recipe, batches: number) => void;
  recipe: Recipe;
}

const ProductionModal: React.FC<ProductionModalProps> = ({ isOpen, onClose, onConfirm, recipe }) => {
  const [batches, setBatches] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (batches > 0) {
      onConfirm(recipe, batches);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm relative">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-slate-800">
            Produzir Receita: <span className="text-orange-600">{recipe.name}</span>
          </h3>
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="batches" className="block text-sm font-medium text-slate-700">
                Quantas "fornadas" ou lotes deseja produzir?
              </label>
              <input
                type="number"
                id="batches"
                value={batches}
                onChange={e => setBatches(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                required
                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-600">Estoque a ser consumido:</h4>
              <ul className="text-sm text-slate-700 mt-2 space-y-1">
                {recipe.ingredients.map(ing => (
                  <li key={ing.productId}>- {ing.quantity * batches} do insumo correspondente</li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mt-2">Certifique-se de que há estoque suficiente antes de confirmar.</p>
            </div>
          </div>
          <div className="px-6 py-4 bg-slate-50 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 text-sm font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700">
              Confirmar Produção
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductionModal;