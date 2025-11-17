import React, { useState, useMemo } from 'react';
import ProductListItem from '../components/ProductListItem';
import type { Product } from '../types';
import SearchBar from '../components/SearchBar';
import StockStatusFilter from '../components/StockStatusFilter';
import type { StockStatus } from '../types';

interface InventoryPageProps {
    products: Product[];
    onEditProduct: (product: Product) => void;
    onAdjustStock: (product: Product) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ products, onEditProduct, onAdjustStock }) => {
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
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-stone-200 space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h2 className="text-2xl font-bold text-stone-700">Inventário de Insumos</h2>
                    <div className="w-full sm:w-64 md:w-80">
                        <SearchBar 
                            searchTerm={searchTerm} 
                            onSearchChange={setSearchTerm}
                            placeholder="Pesquisar insumos..."
                        />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-stone-600 block mb-2">Filtrar por status:</label>
                    <StockStatusFilter activeFilter={stockFilter} onFilterChange={setStockFilter} />
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="divide-y divide-stone-200">
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
                <div className="text-center py-16 px-4">
                    <p className="text-stone-600 text-xl font-semibold">Nenhum insumo encontrado</p>
                    <p className="text-stone-500 mt-2">Tente ajustar seus filtros ou termos de pesquisa.</p>
                </div>
            )}
        </div>
    );
};

export default InventoryPage;