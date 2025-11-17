import React, { useState, useMemo } from 'react';
import ProductListItem from '../components/ProductListItem';
import type { Product } from '../types';
import SearchBar from '../components/SearchBar';
import StockStatusFilter from '../components/StockStatusFilter';
import type { StockStatus } from '../types';
import PlusIcon from '../components/icons/PlusIcon';

interface InventoryPageProps {
    products: Product[];
    onEditProduct: (product: Product) => void;
    onAdjustStock: (product: Product) => void;
    onAddProduct: () => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ products, onEditProduct, onAdjustStock, onAddProduct }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [stockFilter, setStockFilter] = useState<StockStatus>('all');

    const filteredProducts = useMemo(() => {
        const searched = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (stockFilter === 'all') {
            return searched;
        }

        return searched.filter(product => {
            const { stock, reorderLevel } = product;
            if (reorderLevel <= 0) {
                return stockFilter === 'ok';
            }
            
            const warningThreshold = reorderLevel * 1.2;

            if (stockFilter === 'low') {
                return stock < reorderLevel;
            }
            if (stockFilter === 'warning') {
                return stock >= reorderLevel && stock <= warningThreshold;
            }
            if (stockFilter === 'ok') {
                return stock > warningThreshold;
            }
            return false;
        });
    }, [products, searchTerm, stockFilter]);

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="w-full sm:w-64 md:w-80">
                        <SearchBar 
                            searchTerm={searchTerm} 
                            onSearchChange={setSearchTerm}
                            placeholder="Pesquisar insumos..."
                        />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-600 block mb-2">Filtrar por status:</label>
                    <StockStatusFilter activeFilter={stockFilter} onFilterChange={setStockFilter} />
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="space-y-4">
                    {filteredProducts.map(product => (
                        <ProductListItem
                            key={product.id}
                            product={product}
                            onEdit={onEditProduct}
                            onAdjustStock={onAdjustStock}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-4 bg-white rounded-xl shadow-sm">
                    <p className="text-slate-600 text-xl font-semibold">Nenhum insumo encontrado</p>
                    <p className="text-slate-500 mt-2">Tente ajustar seus filtros ou termos de pesquisa.</p>
                     <button
                        onClick={onAddProduct}
                        className="mt-6 inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Adicionar Primeiro Insumo
                    </button>
                </div>
            )}
        </div>
    );
};

export default InventoryPage;