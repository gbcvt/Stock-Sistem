import React, { useState, useEffect } from 'react';
import type { Supplier } from '../types';
import XIcon from './icons/XIcon';

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: Omit<Supplier, 'id'> | Supplier) => void;
  supplierToEdit?: Supplier | null;
}

const SupplierModal: React.FC<SupplierModalProps> = ({ isOpen, onClose, onSave, supplierToEdit }) => {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (supplierToEdit) {
        setName(supplierToEdit.name);
        setContactPerson(supplierToEdit.contactPerson || '');
        setPhone(supplierToEdit.phone || '');
        setEmail(supplierToEdit.email || '');
      } else {
        setName('');
        setContactPerson('');
        setPhone('');
        setEmail('');
      }
    }
  }, [isOpen, supplierToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const supplierData = { name, contactPerson, phone, email };
    if (supplierToEdit) {
      onSave({ ...supplierData, id: supplierToEdit.id });
    } else {
      onSave(supplierData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-stone-800">
            {supplierToEdit ? 'Editar Fornecedor' : 'Adicionar Novo Fornecedor'}
          </h3>
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700">Nome do Fornecedor</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"/>
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-stone-700">Pessoa de Contato</label>
              <input type="text" id="contactPerson" value={contactPerson} onChange={e => setContactPerson(e.target.value)} className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700">Telefone</label>
                  <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"/>
                </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-stone-50 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-800 hover:bg-orange-900">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierModal;
