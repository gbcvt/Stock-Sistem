import React from 'react';
import PlusIcon from './icons/PlusIcon';
import AlertTriangleIcon from './icons/AlertTriangleIcon';
import MenuIcon from './icons/MenuIcon';
import type { Page } from '../App';
import { pageTitles } from '../App';


interface HeaderProps {
  onAddProduct: () => void;
  lowStockCount: number;
  currentPage: Page;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddProduct, lowStockCount, currentPage, onToggleSidebar }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <button
              onClick={onToggleSidebar}
              className="lg:hidden -ml-2 mr-2 p-2 rounded-md text-slate-500 hover:bg-slate-100"
              aria-label="Toggle sidebar"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              {pageTitles[currentPage]}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {lowStockCount > 0 && (
                <div 
                    className="flex items-center p-2 rounded-full bg-red-100/80 cursor-pointer"
                    title={`${lowStockCount} insumo(s) com estoque baixo`}
                >
                    <AlertTriangleIcon className="h-5 w-5 text-red-600" />
                    <span className="ml-2 text-sm font-bold text-red-700 hidden sm:block">
                        {lowStockCount}
                    </span>
                </div>
            )}
            <button
              onClick={onAddProduct}
              className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Adicionar Insumo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;