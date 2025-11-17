import { useState, useCallback } from 'react';
import type { Supplier } from '../types';

const initialSuppliers: Supplier[] = [
    { id: 'sup1', name: 'Farinhas & Cia', contactPerson: 'João Silva', phone: '11 98765-4321', email: 'contato@farinhascia.com' },
    { id: 'sup2', name: 'Ovos Dourados Granja', contactPerson: 'Maria Souza', phone: '21 91234-5678', email: 'vendas@ovosdourados.com' },
    { id: 'sup3', name: 'Doce Moinho Açúcares', contactPerson: 'Carlos Pereira', phone: '31 95555-1234', email: 'carlos.p@docemoinho.com' },
];

export const useSuppliers = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

    const addSupplier = useCallback((supplierData: Omit<Supplier, 'id'>) => {
        const newSupplier: Supplier = {
            ...supplierData,
            id: crypto.randomUUID(),
        };
        setSuppliers(prev => [newSupplier, ...prev]);
    }, []);

    const updateSupplier = useCallback((updatedSupplier: Supplier) => {
        setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
    }, []);

    const deleteSupplier = useCallback((supplierId: string) => {
        if (window.confirm('Tem certeza que deseja remover este fornecedor?')) {
            setSuppliers(prev => prev.filter(s => s.id !== supplierId));
        }
    }, []);

    return {
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
    };
};
