import React from 'react';
import ChartPieIcon from './icons/ChartPieIcon';
import ListIcon from './icons/ListIcon';
import ArchiveIcon from './icons/ArchiveIcon';

interface AppNavigationProps {
    currentPage: 'dashboard' | 'inventory' | 'reports';
    setCurrentPage: (page: 'dashboard' | 'inventory' | 'reports') => void;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ currentPage, setCurrentPage }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: ChartPieIcon },
        { id: 'inventory', label: 'Inventário', icon: ListIcon },
        { id: 'reports', label: 'Relatórios', icon: ArchiveIcon },
    ];

    return (
        <div>
            <div className="sm:hidden">
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-stone-300 focus:border-orange-500 focus:ring-orange-500"
                    value={currentPage}
                    onChange={(e) => setCurrentPage(e.target.value as 'dashboard' | 'inventory' | 'reports')}
                >
                    {navItems.map((item) => (
                        <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-stone-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id as 'dashboard' | 'inventory' | 'reports')}
                                className={`${
                                    currentPage === item.id
                                        ? 'border-orange-700 text-orange-800'
                                        : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'
                                } group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                                aria-current={currentPage === item.id ? 'page' : undefined}
                            >
                                <item.icon className="-ml-0.5 mr-2 h-5 w-5" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AppNavigation;
