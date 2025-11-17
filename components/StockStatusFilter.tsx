import React from 'react';
import type { StockStatus } from '../types';

interface StockStatusFilterProps {
  activeFilter: StockStatus;
  onFilterChange: (filter: StockStatus) => void;
}

const filters: { id: StockStatus; label: string; activeClass: string; inactiveClass: string }[] = [
  { id: 'all', label: 'Todos', activeClass: 'bg-stone-700 text-white border-stone-700', inactiveClass: 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300' },
  { id: 'ok', label: 'Estoque OK', activeClass: 'bg-green-600 text-white border-green-600', inactiveClass: 'bg-white text-green-700 hover:bg-green-50 border-green-300' },
  { id: 'warning', label: 'Atenção', activeClass: 'bg-amber-500 text-white border-amber-500', inactiveClass: 'bg-white text-amber-800 hover:bg-amber-50 border-amber-300' },
  { id: 'low', label: 'Estoque Baixo', activeClass: 'bg-red-600 text-white border-red-600', inactiveClass: 'bg-white text-red-700 hover:bg-red-50 border-red-300' },
];

const StockStatusFilter: React.FC<StockStatusFilterProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 shadow-sm border ${
            activeFilter === filter.id ? filter.activeClass : filter.inactiveClass
          }`}
          aria-pressed={activeFilter === filter.id}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StockStatusFilter;