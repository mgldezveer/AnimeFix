import React from 'react';
import { SearchBar } from './SearchBar';
import { PlaySquareIcon } from './icons/PlaySquareIcon';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onLogoClick }) => {
  return (
    <header className="bg-brand-light-dark/80 backdrop-blur-sm sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={onLogoClick}
            >
          <PlaySquareIcon className="h-8 w-8 text-brand-purple group-hover:text-violet-400 transition-colors" />
          <h1 className="text-xl md:text-2xl font-bold text-white group-hover:text-violet-400 transition-colors">
            AnimeFlix
          </h1>
        </div>
        <div className="w-full max-w-xs">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </header>
  );
};
