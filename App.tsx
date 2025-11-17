import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductModal from './components/ProductModal';
import StockAdjustModal from './components/StockAdjustModal';
import RecipeModal from './components/RecipeModal';
import SupplierModal from './components/SupplierModal';
import ProductionModal from './components/ProductionModal';
import AppNavigation from './components/AppNavigation';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import ReportsPage from './pages/ReportsPage';
import RecipesPage from './pages/RecipesPage';
import SuppliersPage from './pages/SuppliersPage';
import type { Product, AdjustmentData, Recipe, Supplier } from './types';
import { useProducts } from './hooks/useProducts';
import { useRecipes } from './hooks/useRecipes';
import { useSuppliers } from './hooks/useSuppliers';

type Page = 'dashboard' | 'inventory' | 'reports' | 'recipes' | 'suppliers';

const App: React.FC = () => {
  const { 
    products, 
    sortedProducts, 
    addProduct, 
    updateProduct, 
    adjustStock, 
    adjustmentHistory,
    handleProduction,
  } = useProducts();
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useSuppliers();
  
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isStockModalOpen, setStockModalOpen] = useState(false);
  const [isRecipeModalOpen, setRecipeModalOpen] = useState(false);
  const [isSupplierModalOpen, setSupplierModalOpen] = useState(false);
  const [isProductionModalOpen, setProductionModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [adjustingStockProduct, setAdjustingStockProduct] = useState<Product | null>(null);
  const [producingRecipe, setProducingRecipe] = useState<Recipe | null>(null);
  
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const lowStockCount = useMemo(() => {
    return products.filter(p => p.reorderLevel > 0 && p.stock < p.reorderLevel).length;
  }, [products]);

  // Modal Handlers
  const handleOpenAddModal = () => { setEditingProduct(null); setProductModalOpen(true); };
  const handleOpenEditModal = (product: Product) => { setEditingProduct(product); setProductModalOpen(true); };
  const handleOpenStockModal = (product: Product) => { setAdjustingStockProduct(product); setStockModalOpen(true); };
  const handleOpenAddRecipeModal = () => { setEditingRecipe(null); setRecipeModalOpen(true); };
  const handleOpenEditRecipeModal = (recipe: Recipe) => { setEditingRecipe(recipe); setRecipeModalOpen(true); };
  const handleOpenAddSupplierModal = () => { setEditingSupplier(null); setSupplierModalOpen(true); };
  const handleOpenEditSupplierModal = (supplier: Supplier) => { setEditingSupplier(supplier); setSupplierModalOpen(true); };
  const handleOpenProductionModal = (recipe: Recipe) => { setProducingRecipe(recipe); setProductionModalOpen(true); };
  
  const handleCloseModals = () => {
    setProductModalOpen(false);
    setStockModalOpen(false);
    setRecipeModalOpen(false);
    setSupplierModalOpen(false);
    setProductionModalOpen(false);
  };

  // Save Handlers
  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) updateProduct(productData); else addProduct(productData);
    handleCloseModals();
  };
  const handleSaveRecipe = (recipeData: Omit<Recipe, 'id'> | Recipe) => {
    if ('id' in recipeData) updateRecipe(recipeData); else addRecipe(recipeData);
    handleCloseModals();
  };
  const handleSaveSupplier = (supplierData: Omit<Supplier, 'id'> | Supplier) => {
    if ('id' in supplierData) updateSupplier(supplierData); else addSupplier(supplierData);
    handleCloseModals();
  };
  const handleAdjustStock = (productId: string, adjustmentData: AdjustmentData) => {
    adjustStock(productId, adjustmentData);
    handleCloseModals();
  };
  const handleConfirmProduction = (recipe: Recipe, batches: number) => {
    handleProduction(recipe, batches);
    handleCloseModals();
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage products={products} adjustmentHistory={adjustmentHistory} onAdjustStock={handleOpenStockModal} />;
      case 'inventory': return <InventoryPage products={sortedProducts} onEditProduct={handleOpenEditModal} onAdjustStock={handleOpenStockModal}/>;
      case 'reports': return <ReportsPage adjustmentHistory={adjustmentHistory} suppliers={suppliers} />;
      case 'recipes': return <RecipesPage recipes={recipes} products={products} onAdd={handleOpenAddRecipeModal} onEdit={handleOpenEditRecipeModal} onDelete={deleteRecipe} onProduce={handleOpenProductionModal} />;
      case 'suppliers': return <SuppliersPage suppliers={suppliers} onAdd={handleOpenAddSupplierModal} onEdit={handleOpenEditSupplierModal} onDelete={deleteSupplier} />;
      default: return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-orange-50/50 text-stone-800">
      <Header onAddProduct={handleOpenAddModal} lowStockCount={lowStockCount} />

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <AppNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="mt-6">{renderPage()}</div>
      </main>

      <ProductModal isOpen={isProductModalOpen} onClose={handleCloseModals} onSave={handleSaveProduct} productToEdit={editingProduct} />
      <StockAdjustModal isOpen={isStockModalOpen} onClose={handleCloseModals} onAdjust={handleAdjustStock} product={adjustingStockProduct} suppliers={suppliers} />
      <RecipeModal isOpen={isRecipeModalOpen} onClose={handleCloseModals} onSave={handleSaveRecipe} recipeToEdit={editingRecipe} products={products} />
      <SupplierModal isOpen={isSupplierModalOpen} onClose={handleCloseModals} onSave={handleSaveSupplier} supplierToEdit={editingSupplier} />
      {producingRecipe && <ProductionModal isOpen={isProductionModalOpen} onClose={handleCloseModals} onConfirm={handleConfirmProduction} recipe={producingRecipe} />}
    </div>
  );
};

export default App;
