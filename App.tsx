import React, { useState } from 'react';
import Header from './components/Header';
import ProductModal from './components/ProductModal';
import StockAdjustModal from './components/StockAdjustModal';
import AppNavigation from './components/AppNavigation';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import ReportsPage from './pages/ReportsPage';
import type { Product, AdjustmentData } from './types';
import { useProducts } from './hooks/useProducts';

const App: React.FC = () => {
  const { 
    products, 
    sortedProducts, 
    addProduct, 
    updateProduct, 
    adjustStock, 
    adjustmentHistory 
  } = useProducts();
  
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isStockModalOpen, setStockModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adjustingStockProduct, setAdjustingStockProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'inventory' | 'reports'>('dashboard');

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };
  
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };

  const handleOpenStockModal = (product: Product) => {
    setAdjustingStockProduct(product);
    setStockModalOpen(true);
  };
  
  const handleCloseModals = () => {
    setProductModalOpen(false);
    setStockModalOpen(false);
    setEditingProduct(null);
    setAdjustingStockProduct(null);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    handleCloseModals();
  };

  const handleAdjustStock = (productId: string, adjustmentData: AdjustmentData) => {
    adjustStock(productId, adjustmentData);
    handleCloseModals();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            products={products}
            adjustmentHistory={adjustmentHistory}
            onAdjustStock={handleOpenStockModal}
          />
        );
      case 'inventory':
        return (
          <InventoryPage
            products={sortedProducts}
            onEditProduct={handleOpenEditModal}
            onAdjustStock={handleOpenStockModal}
          />
        );
      case 'reports':
        return <ReportsPage adjustmentHistory={adjustmentHistory} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-orange-50/50 text-stone-800">
      <Header onAddProduct={handleOpenAddModal} />

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <AppNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="mt-6">
            {renderPage()}
        </div>
      </main>

      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={handleCloseModals}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
      />

      <StockAdjustModal
        isOpen={isStockModalOpen}
        onClose={handleCloseModals}
        onAdjust={handleAdjustStock}
        product={adjustingStockProduct}
      />
    </div>
  );
};

export default App;
