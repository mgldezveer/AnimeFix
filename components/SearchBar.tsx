import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Поиск аниме..." }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-4 pr-10 py-2 rounded-full bg-brand-dark border border-brand-gray focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none transition-all text-white placeholder-brand-gray"
        aria-label="Поиск аниме"
      />
      <div
        className="absolute right-0 top-0 h-full px-3 flex items-center text-brand-gray pointer-events-none"
        aria-hidden="true"
      >
        <SearchIcon className="w-5 h-5" />
      </div>
    </div>
  );
};