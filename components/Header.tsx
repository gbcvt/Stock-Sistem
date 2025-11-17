
import React from 'react';
import PlusIcon from './icons/PlusIcon';

interface HeaderProps {
  onAddProduct: () => void;
}

const BreadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20.38 8.57 12 1.69 3.62 8.57a2 2 0 0 0-1.12 1.7V19a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-8.73a2 2 0 0 0-1.12-1.7Z"/>
        <path d="M8 12a4 4 0 0 1 8 0"/>
        <path d="M22 10.5V19a2 2 0 0 1-2 2"/>
        <path d="M2 19a2 2 0 0 1-2-2v-8.73"/>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onAddProduct }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BreadIcon className="h-8 w-8 text-orange-900" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-800">
              Estoque da Padaria
            </h1>
          </div>
          <button
            onClick={onAddProduct}
            className="inline-flex items-center justify-center rounded-md bg-orange-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-offset-2 transition-colors duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Adicionar Produto</span>
            <span className="sm:hidden">Adicionar</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
