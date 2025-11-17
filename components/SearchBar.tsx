
import React from 'react';
import SearchIcon from './icons/SearchIcon';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-stone-400" />
      </div>
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
        aria-label="Pesquisar produtos"
      />
    </div>
  );
};

export default SearchBar;
