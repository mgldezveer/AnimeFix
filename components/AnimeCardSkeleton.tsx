import React from 'react';

export const AnimeCardSkeleton: React.FC = () => {
  return (
    <div className="bg-brand-light-dark rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-64 sm:h-72 md:h-80 bg-brand-gray"></div>
      <div className="p-3">
        <div className="h-4 bg-brand-gray rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-brand-gray rounded w-1/2"></div>
      </div>
    </div>
  );
};
