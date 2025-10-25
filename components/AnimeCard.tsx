
import React from 'react';
import type { Anime } from '../types';
import { StarIcon } from './icons/StarIcon';

interface AnimeCardProps {
  anime: Anime;
  onSelectAnime: (id: number) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onSelectAnime }) => {
  return (
    <div
      className="bg-brand-light-dark rounded-lg overflow-hidden shadow-lg cursor-pointer group transform hover:-translate-y-2 transition-transform duration-300"
      onClick={() => onSelectAnime(anime.mal_id)}
    >
      <div className="relative">
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          className="w-full h-64 sm:h-72 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">
            {anime.title_english || anime.title}
          </h3>
          {anime.score && (
            <div className="flex items-center mt-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-xs ml-1 font-semibold">{anime.score.toFixed(2)}</span>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
           <div className="w-16 h-16 rounded-full bg-brand-purple/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           </div>
        </div>
      </div>
    </div>
  );
};
