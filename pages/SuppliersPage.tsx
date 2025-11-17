import React, { useState, useMemo } from 'react';
import type { Supplier } from '../types';
import PlusIcon from '../components/icons/PlusIcon';
import EditIcon from '../components/icons/EditIcon';
import TrashIcon from '../components/icons/TrashIcon';
import SearchBar from '../components/SearchBar';

interface SuppliersPageProps {
  suppliers: Supplier[];
  onAdd: () => void;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplierId: string) => void;
}

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const SupplierCard: React.FC<{ supplier: Supplier; onEdit: () => void; onDelete: () => void; }> = ({ supplier, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between border border-slate-200/80 transition-shadow hover:shadow-lg">
      <div>
        <h3 className="text-xl font-semibold text-slate-800">{supplier.name}</h3>
        {supplier.contactPerson && <p className="text-slate-600 mt-1">Contato: {supplier.contactPerson}</p>}
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          {supplier.phone && (
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-slate-500" />
              <span>{supplier.phone}</span>
            </div>
          )}
          {supplier.email && (
            <div className="flex items-center gap-2">
              <MailIcon className="w-4 h-4 text-slate-500" />
              <a href={`mailto:${supplier.email}`} className="hover:text-orange-600 hover:underline">{supplier.email}</a>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
         <button onClick={onEdit} className="p-2 text-slate-500 hover:text-orange-600 transition-colors"><EditIcon className="w-5 h-5"/></button>
         <button onClick={onDelete} className="p-2 text-slate-500 hover:text-red-600 transition-colors"><TrashIcon className="w-5 h-5"/></button>
      </div>
    </div>
  );
};


const SuppliersPage: React.FC<SuppliersPageProps> = ({ suppliers, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = useMemo(() => {
    if (!searchTerm.trim()) {
      return suppliers;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(lowercasedFilter) ||
      (supplier.contactPerson && supplier.contactPerson.toLowerCase().includes(lowercasedFilter))
    );
  }, [suppliers, searchTerm]);

  return (
    <div>
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex-grow md:w-80">
                    <SearchBar 
                        searchTerm={searchTerm} 
                        onSearchChange={setSearchTerm} 
                        placeholder="Pesquisar fornecedores..."
                    />
                </div>
                <button onClick={onAdd} className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition-colors flex-shrink-0">
                    <PlusIcon className="h-5 w-5 sm:mr-2" />
                    <span className="hidden sm:inline">Novo Fornecedor</span>
                </button>
            </div>
        </div>

       {filteredSuppliers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map(supplier => (
            <SupplierCard 
                key={supplier.id}
                supplier={supplier}
                onEdit={() => onEdit(supplier)}
                onDelete={() => onDelete(supplier.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-xl shadow-sm">
          <p className="text-slate-600 text-xl font-semibold">Nenhum fornecedor encontrado</p>
          <p className="text-slate-500 mt-2">
            {searchTerm 
                ? "Tente ajustar seu termo de pesquisa." 
                : 'Clique em "Novo Fornecedor" para começar.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default SuppliersPage;