import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  productToEdit?: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setStock(productToEdit.stock);
      setReorderLevel(productToEdit.reorderLevel);
      setImageUrl(productToEdit.imageUrl);
      setUnitPrice(productToEdit.unitPrice);
    } else {
      setName('');
      setDescription('');
      setStock(0);
      setReorderLevel(10);
      setImageUrl('https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=400&auto=format&fit=crop');
      setUnitPrice(0);
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = { name, description, stock, reorderLevel, imageUrl, unitPrice };
    if (productToEdit) {
      onSave({ ...productData, id: productToEdit.id });
    } else {
      onSave(productData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold text-stone-800">
            {productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}
          </h3>
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700">Nome do Produto</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-stone-700">Descrição</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-stone-700">Quantidade em Estoque</label>
                <div className="mt-1 flex items-center">
                    <button type="button" onClick={() => setStock(s => Math.max(0, s - 1))} className="px-3 py-2 border border-r-0 border-stone-300 rounded-l-md bg-stone-50 hover:bg-stone-100 text-stone-600 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors" aria-label="Diminuir quantidade">
                        <MinusIcon className="h-4 w-4" />
                    </button>
                    <input type="number" id="stock" value={stock} onChange={e => setStock(parseInt(e.target.value, 10) || 0)} min="0" required className="w-full px-3 py-2 border-t border-b border-stone-300 text-center focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"/>
                    <button type="button" onClick={() => setStock(s => s + 1)} className="px-3 py-2 border border-l-0 border-stone-300 rounded-r-md bg-stone-50 hover:bg-stone-100 text-stone-600 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors" aria-label="Aumentar quantidade">
                        <PlusIcon className="h-4 w-4" />
                    </button>
                </div>
              </div>
              <div>
                <label htmlFor="reorderLevel" className="block text-sm font-medium text-stone-700">Nível para Recompra</label>
                 <div className="mt-1 flex items-center">
                    <button type="button" onClick={() => setReorderLevel(s => Math.max(0, s - 1))} className="px-3 py-2 border border-r-0 border-stone-300 rounded-l-md bg-stone-50 hover:bg-stone-100 text-stone-600 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors" aria-label="Diminuir nível de recompra">
                        <MinusIcon className="h-4 w-4" />
                    </button>
                    <input type="number" id="reorderLevel" value={reorderLevel} onChange={e => setReorderLevel(parseInt(e.target.value, 10) || 0)} min="0" required className="w-full px-3 py-2 border-t border-b border-stone-300 text-center focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"/>
                    <button type="button" onClick={() => setReorderLevel(s => s + 1)} className="px-3 py-2 border border-l-0 border-stone-300 rounded-r-md bg-stone-50 hover:bg-stone-100 text-stone-600 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors" aria-label="Aumentar nível de recompra">
                        <PlusIcon className="h-4 w-4" />
                    </button>
                </div>
              </div>
            </div>
             <div>
                <label htmlFor="unitPrice" className="block text-sm font-medium text-stone-700">Preço Unitário (R$)</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-stone-500 sm:text-sm">R$</span>
                    </div>
                    <input 
                        type="number" 
                        id="unitPrice" 
                        value={unitPrice} 
                        onChange={e => setUnitPrice(parseFloat(e.target.value) || 0)} 
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        required
                        className="block w-full rounded-md border-stone-300 pl-9 pr-4 py-2 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                </div>
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-stone-700">URL da Imagem</label>
              <input type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
            </div>
          </div>
          <div className="px-6 py-4 bg-stone-50 flex justify-end space-x-2 sticky bottom-0 z-10">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-800 hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
