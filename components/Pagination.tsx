import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 my-8">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-brand-light-dark disabled:bg-brand-dark disabled:text-brand-gray disabled:cursor-not-allowed hover:bg-brand-gray text-white transition-colors"
        aria-label="Предыдущая страница"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <span className="text-white font-semibold">
        Страница {currentPage} из {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-brand-light-dark disabled:bg-brand-dark disabled:text-brand-gray disabled:cursor-not-allowed hover:bg-brand-gray text-white transition-colors"
        aria-label="Следующая страница"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};