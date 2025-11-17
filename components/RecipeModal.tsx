import React, { useState, useEffect } from 'react';
import type { Recipe, Product, RecipeIngredient } from '../types';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Omit<Recipe, 'id'> | Recipe) => void;
  recipeToEdit?: Recipe | null;
  products: Product[];
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, onSave, recipeToEdit, products }) => {
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (recipeToEdit) {
        setName(recipeToEdit.name);
        setInstructions(recipeToEdit.instructions || '');
        setIngredients(recipeToEdit.ingredients);
      } else {
        setName('');
        setInstructions('');
        setIngredients([]);
      }
    }
  }, [isOpen, recipeToEdit]);

  const handleAddIngredient = () => {
    if (products.length > 0) {
      setIngredients([...ingredients, { productId: products[0].id, quantity: 1 }]);
    }
  };

  const handleIngredientChange = (index: number, field: keyof RecipeIngredient, value: string) => {
    const newIngredients = [...ingredients];
    if (field === 'quantity') {
      newIngredients[index][field] = parseFloat(value) || 0;
    } else {
      newIngredients[index][field] = value;
    }
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.length === 0) {
      alert('Uma receita precisa de pelo menos um ingrediente.');
      return;
    }
    const recipeData = { name, instructions, ingredients };
    if (recipeToEdit) {
      onSave({ ...recipeData, id: recipeToEdit.id });
    } else {
      onSave(recipeData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold text-stone-800">
            {recipeToEdit ? 'Editar Receita' : 'Adicionar Nova Receita'}
          </h3>
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700">Nome da Receita</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"/>
            </div>
            <div>
              <h4 className="text-sm font-medium text-stone-700">Ingredientes</h4>
              <div className="mt-2 space-y-2">
                {ingredients.map((ing, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <select
                      value={ing.productId}
                      onChange={e => handleIngredientChange(index, 'productId', e.target.value)}
                      className="w-1/2 border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    >
                      {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <input
                      type="number"
                      value={ing.quantity}
                      onChange={e => handleIngredientChange(index, 'quantity', e.target.value)}
                      min="0.001"
                      step="any"
                      className="w-1/2 border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Quantidade"
                    />
                    <button type="button" onClick={() => handleRemoveIngredient(index)} className="p-2 text-red-500 hover:text-red-700">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={handleAddIngredient} className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-orange-800 bg-orange-100 hover:bg-orange-200">
                <PlusIcon className="w-4 h-4 mr-2"/> Adicionar Ingrediente
              </button>
            </div>
             <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-stone-700">Instruções (Opcional)</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} rows={5} className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"/>
            </div>
          </div>
          <div className="px-6 py-4 bg-stone-50 flex justify-end space-x-2 sticky bottom-0 z-10">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-800 hover:bg-orange-900">
              Salvar Receita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeModal;
