import React from 'react';
import type { Genre } from '../types';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenreIds: number[];
  onToggleGenre: (id: number) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenreIds, onToggleGenre }) => {
  return (
    <div className="mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-white mb-3">Фильтр по жанрам</h2>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => {
          const isSelected = selectedGenreIds.includes(genre.mal_id);
          return (
            <button
              key={genre.mal_id}
              onClick={() => onToggleGenre(genre.mal_id)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                isSelected
                  ? 'bg-brand-purple text-white'
                  : 'bg-brand-light-dark text-brand-light-gray hover:bg-brand-gray'
              }`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};