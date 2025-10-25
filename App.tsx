import React, { useState, useEffect, useCallback } from 'react';
import type { Anime, Genre } from './types';
import { getAnime, getGenres } from './services/jikanService';
import { useDebounce } from './hooks/useDebounce';
import { Header } from './components/Header';
import { AnimeGrid } from './components/AnimeGrid';
import { AnimeDetailModal } from './components/AnimeDetailModal';
import { ErrorDisplay } from './components/ErrorDisplay';
import { GenreFilter } from './components/GenreFilter';
import { Pagination } from './components/Pagination';
import { SortControls } from './components/SortControls';
import { AnimeGridSkeleton } from './components/AnimeGridSkeleton';

const App: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [sort, setSort] = useState('popularity:desc');

  const fetchAnimeData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // Add a small delay to prevent scrollbar flicker on fast connections
    await new Promise(res => setTimeout(res, 200));
    try {
      const [orderBy, sortDirection] = sort.split(':');
      const data = await getAnime({ 
          page: currentPage, 
          query: debouncedSearchQuery,
          genres: selectedGenreIds,
          orderBy,
          sort: sortDirection,
        });
      setAnimeList(data.data);
      setTotalPages(data.pagination.last_visible_page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить аниме.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearchQuery, selectedGenreIds, sort]);

  const fetchGenreData = async () => {
    try {
        const data = await getGenres();
        // Sort genres alphabetically for better UX
        const sortedGenres = data.data.sort((a, b) => a.name.localeCompare(b.name));
        setGenres(sortedGenres);
    } catch (err) {
        console.error("Failed to fetch genres:", err);
    }
  }

  useEffect(() => {
    fetchGenreData();
  }, []);

  useEffect(() => {
    // Reset page to 1 when filters change to avoid being on a page that no longer exists
    if (currentPage !== 1) {
        setCurrentPage(1);
    } else {
        fetchAnimeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, selectedGenreIds, sort]);

  useEffect(() => {
    fetchAnimeData();
  }, [currentPage, fetchAnimeData]);


  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnime = (id: number) => {
    setSelectedAnimeId(id);
  };

  const handleCloseModal = () => {
    setSelectedAnimeId(null);
  };

  const handleRetry = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchAnimeData();
    }
  };
  
  const handleToggleGenre = (id: number) => {
    setSelectedGenreIds(prev => 
      prev.includes(id) ? prev.filter(gid => gid !== id) : [...prev, id]
    );
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  }

  const handleLogoClick = () => {
    setSearchQuery('');
    setSelectedGenreIds([]);
    setSort('popularity:desc');
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }

  const renderContent = () => {
    if (isLoading && animeList.length === 0) {
      return <AnimeGridSkeleton count={24} />;
    }
    if (error) {
      return <ErrorDisplay message={error} onRetry={handleRetry} />;
    }
    if (animeList.length === 0) {
      return (
        <div className="text-center py-16 text-white animate-fade-in">
          <h3 className="text-xl font-semibold">Ничего не найдено</h3>
          <p className="text-brand-light-gray mt-2">Попробуйте изменить поисковый запрос или фильтры.</p>
        </div>
      );
    }
    return (
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        <AnimeGrid animeList={animeList} onSelectAnime={handleSelectAnime} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    );
  };

  return (
    <div className="bg-brand-dark min-h-screen text-brand-light-gray font-sans">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
        onLogoClick={handleLogoClick}
      />
      <main className="container mx-auto px-4 py-8">
        <GenreFilter 
            genres={genres} 
            selectedGenreIds={selectedGenreIds} 
            onToggleGenre={handleToggleGenre} 
        />
        <SortControls currentSort={sort} onSortChange={handleSortChange} />
        {renderContent()}
      </main>
      {selectedAnimeId && (
        <AnimeDetailModal animeId={selectedAnimeId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
