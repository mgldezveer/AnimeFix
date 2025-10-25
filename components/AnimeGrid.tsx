
import React from 'react';
import { AnimeCard } from './AnimeCard';
import type { Anime } from '../types';

interface AnimeGridProps {
  animeList: Anime[];
  onSelectAnime: (id: number) => void;
}

export const AnimeGrid: React.FC<AnimeGridProps> = ({ animeList, onSelectAnime }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 animate-fade-in">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} onSelectAnime={onSelectAnime} />
      ))}
    </div>
  );
};
