import React from 'react';
import type { Page } from '../App';
import HomeIcon from './icons/HomeIcon';
import PackageIcon from './icons/PackageIcon';
import ArchiveIcon from './icons/ArchiveIcon';
import ChefHatIcon from './icons/ChefHatIcon';
import TruckIcon from './icons/TruckIcon';
import XIcon from './icons/XIcon';

interface SidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

const BreadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20.38 8.57 12 1.69 3.62 8.57a2 2 0 0 0-1.12 1.7V19a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-8.73a2 2 0 0 0-1.12-1.7Z"/>
        <path d="M8 12a4 4 0 0 1 8 0"/>
        <path d="M22 10.5V19a2 2 0 0 1-2 2"/>
        <path d="M2 19a2 2 0 0 1-2-2v-8.73"/>
    </svg>
);


const NavItem: React.FC<{
    page: Page;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    currentPage: Page;
    onClick: (page: Page) => void;
}> = ({ page, label, icon: Icon, currentPage, onClick }) => (
    <li>
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick(page);
            }}
            className={`flex items-center p-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                currentPage === page
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
        >
            <Icon className="w-6 h-6 mr-3" />
            <span>{label}</span>
        </a>
    </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isSidebarOpen, setSidebarOpen }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
        { id: 'inventory', label: 'Inventário', icon: PackageIcon },
        { id: 'recipes', label: 'Receitas', icon: ChefHatIcon },
        { id: 'suppliers', label: 'Fornecedores', icon: TruckIcon },
        { id: 'reports', label: 'Relatórios', icon: ArchiveIcon },
    ];
    
    const handleNavigation = (page: Page) => {
        setCurrentPage(page);
        setSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    const sidebarContent = (
        <div className="flex flex-col h-full bg-white">
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <BreadIcon className="h-8 w-8 text-orange-700" />
                    <span className="text-xl font-bold text-slate-800">
                        Padaria+
                    </span>
                </div>
                 <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 -mr-2 rounded-md text-slate-500 hover:bg-slate-100"
                  aria-label="Close sidebar"
                >
                  <XIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            page={item.id as Page}
                            label={item.label}
                            icon={item.icon}
                            currentPage={currentPage}
                            onClick={handleNavigation}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );


    return (
        <>
            {/* Backdrop for mobile */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
            ></div>
            
            {/* Unified Sidebar for Mobile & Desktop */}
            <aside 
                className={`fixed lg:relative flex-shrink-0 inset-y-0 left-0 w-64 z-40 shadow-lg lg:shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {sidebarContent}
            </aside>
        </>
    );
};

export default Sidebar;