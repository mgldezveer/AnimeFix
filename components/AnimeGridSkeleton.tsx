import React from 'react';
import { AnimeCardSkeleton } from './AnimeCardSkeleton';

interface AnimeGridSkeletonProps {
  count?: number;
}

export const AnimeGridSkeleton: React.FC<AnimeGridSkeletonProps> = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <AnimeCardSkeleton key={index} />
      ))}
    </div>
  );
};
