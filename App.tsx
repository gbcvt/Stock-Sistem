import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductModal from './components/ProductModal';
import StockAdjustModal from './components/StockAdjustModal';
import RecipeModal from './components/RecipeModal';
import SupplierModal from './components/SupplierModal';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import ReportsPage from './pages/ReportsPage';
import RecipesPage from './pages/RecipesPage';
import SuppliersPage from './pages/SuppliersPage';
import ShoppingListPage from './pages/ShoppingListPage';
import type { Product, AdjustmentData, Recipe, Supplier } from './types';
import { useProducts } from './hooks/useProducts';
import { useRecipes } from './hooks/useRecipes';
import { useSuppliers } from './hooks/useSuppliers';

export type Page = 'dashboard' | 'inventory' | 'recipes' | 'suppliers' | 'reports' | 'shoppinglist';
export const pageTitles: Record<Page, string> = {
  dashboard: 'Dashboard',
  inventory: 'Inventário',
  recipes: 'Receitas',
  suppliers: 'Fornecedores',
  reports: 'Relatórios',
  shoppinglist: 'Lista de Compras'
};

const App: React.FC = () => {
  const { 
    products, 
    sortedProducts, 
    addProduct, 
    updateProduct, 
    adjustStock, 
    adjustmentHistory,
  } = useProducts();
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useSuppliers();
  
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isStockModalOpen, setStockModalOpen] = useState(false);
  const [isRecipeModalOpen, setRecipeModalOpen] = useState(false);
  const [isSupplierModalOpen, setSupplierModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [adjustingStockProduct, setAdjustingStockProduct] = useState<Product | null>(null);
  
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
  
  const handleCloseModals = () => {
    setProductModalOpen(false);
    setStockModalOpen(false);
    setRecipeModalOpen(false);
    setSupplierModalOpen(false);
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

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage products={products} adjustmentHistory={adjustmentHistory} onAdjustStock={handleOpenStockModal} />;
      case 'inventory': return <InventoryPage onAddProduct={handleOpenAddModal} products={sortedProducts} onEditProduct={handleOpenEditModal} onAdjustStock={handleOpenStockModal}/>;
      case 'reports': return <ReportsPage adjustmentHistory={adjustmentHistory} suppliers={suppliers} />;
      case 'recipes': return <RecipesPage recipes={recipes} products={products} onAdd={handleOpenAddRecipeModal} onEdit={handleOpenEditRecipeModal} onDelete={deleteRecipe} />;
      case 'suppliers': return <SuppliersPage suppliers={suppliers} onAdd={handleOpenAddSupplierModal} onEdit={handleOpenEditSupplierModal} onDelete={deleteSupplier} />;
      case 'shoppinglist': return <ShoppingListPage products={products} />;
      default: return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onAddProduct={handleOpenAddModal} 
          lowStockCount={lowStockCount} 
          currentPage={currentPage}
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>


      <ProductModal isOpen={isProductModalOpen} onClose={handleCloseModals} onSave={handleSaveProduct} productToEdit={editingProduct} />
      <StockAdjustModal isOpen={isStockModalOpen} onClose={handleCloseModals} onAdjust={handleAdjustStock} product={adjustingStockProduct} suppliers={suppliers} />
      <RecipeModal isOpen={isRecipeModalOpen} onClose={handleCloseModals} onSave={handleSaveRecipe} recipeToEdit={editingRecipe} products={products} />
      <SupplierModal isOpen={isSupplierModalOpen} onClose={handleCloseModals} onSave={handleSaveSupplier} supplierToEdit={editingSupplier} />
    </div>
  );
};

export default App;