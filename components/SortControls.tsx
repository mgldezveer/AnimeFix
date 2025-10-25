import React from 'react';

interface SortControlsProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: 'popularity:desc', label: 'По популярности' },
  { value: 'score:desc', label: 'По оценке' },
  { value: 'start_date:desc', label: 'По дате выхода' },
  { value: 'rank:asc', label: 'По рейтингу' },
  { value: 'title:asc', label: 'По названию' },
];

export const SortControls: React.FC<SortControlsProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="mb-6 flex justify-end">
        <label htmlFor="sort-select" className="sr-only">Сортировать аниме</label>
      <div className="relative">
        <select
          id="sort-select"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-brand-light-dark border border-brand-gray text-white rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple cursor-pointer"
          aria-label="Сортировать аниме"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};
