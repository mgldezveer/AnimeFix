
import React, { useState, useEffect } from 'react';
import type { Anime, Relation } from '../types';
import { getAnimeById, getAnimeRelations } from '../services/jikanService';
import { Loader } from './Loader';
import { ErrorDisplay } from './ErrorDisplay';
import { CloseIcon } from './icons/CloseIcon';
import { StarIcon } from './icons/StarIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { UsersIcon } from './icons/UsersIcon';
import { TvIcon } from './icons/TvIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { LinkIcon } from './icons/LinkIcon';

interface AnimeDetailModalProps {
  animeId: number;
  onClose: () => void;
}

const InfoPill: React.FC<{ icon: React.ReactNode; label: string; value: string | number | null | undefined }> = ({ icon, label, value }) => {
    if (value === null || value === undefined) return null;
    return (
        <div className="bg-brand-dark p-3 rounded-lg flex flex-col items-center text-center">
            <div className="text-brand-purple mb-1">{icon}</div>
            <span className="text-xs text-brand-light-gray">{label}</span>
            <span className="text-sm font-bold text-white">{value}</span>
        </div>
    );
};

const RelationLink: React.FC<{ relation: string, entries: { name: string; url: string }[] }> = ({ relation, entries }) => (
    <div>
        <h4 className="text-sm font-semibold text-brand-light-gray mb-1">{relation}</h4>
        <ul className="list-disc list-inside">
            {entries.map(entry => (
                <li key={entry.url} className="text-sm text-white">
                    <a href={entry.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple hover:underline">
                        {entry.name}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);


export const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({ animeId, onClose }) => {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [relations, setRelations] = useState<Relation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleRetry = () => {
    fetchData();
  };
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [animeResponse, relationsResponse] = await Promise.all([
        getAnimeById(animeId),
        getAnimeRelations(animeId)
      ]);
      setAnime(animeResponse.data);
      setRelations(relationsResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить подробную информацию.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  
  const renderContent = () => {
    if (loading) {
      return <div className="h-96 flex items-center justify-center"><Loader /></div>;
    }
    if (error || !anime) {
      return <div className="p-8"><ErrorDisplay message={error || 'Anime not found.'} onRetry={handleRetry} /></div>;
    }
    
    const trailerEmbedUrl = anime.trailer?.embed_url || (anime.trailer?.youtube_id ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}` : null);

    return (
        <>
            {/* Header */}
            <div className="relative h-48 md:h-64 rounded-t-lg overflow-hidden">
                <img src={anime.images.webp.large_image_url} alt={anime.title} className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-light-dark to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="p-4 md:p-8 -mt-24 md:-mt-32 relative">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Poster */}
                    <div className="flex-shrink-0 w-36 md:w-48 mx-auto md:mx-0">
                        <img src={anime.images.webp.large_image_url} alt={anime.title} className="w-full rounded-lg shadow-xl" />
                    </div>
                    {/* Title & Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">{anime.title_english || anime.title}</h2>
                        <p className="text-sm text-brand-light-gray">{anime.title_japanese}</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3">
                            {anime.genres.map(g => <span key={g.mal_id} className="text-xs bg-brand-gray px-2 py-1 rounded-full">{g.name}</span>)}
                            {anime.themes.map(t => <span key={t.mal_id} className="text-xs bg-brand-gray px-2 py-1 rounded-full">{t.name}</span>)}
                        </div>
                    </div>
                </div>

                {/* Info Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 my-6">
                    <InfoPill icon={<StarIcon className="w-6 h-6"/>} label="Score" value={anime.score ? `${anime.score.toFixed(2)} (${anime.scored_by?.toLocaleString()})` : 'N/A'} />
                    <InfoPill icon={<TrophyIcon className="w-6 h-6"/>} label="Rank" value={anime.rank ? `#${anime.rank.toLocaleString()}` : 'N/A'} />
                    <InfoPill icon={<UsersIcon className="w-6 h-6"/>} label="Popularity" value={anime.popularity ? `#${anime.popularity.toLocaleString()}` : 'N/A'} />
                    <InfoPill icon={<TvIcon className="w-6 h-6"/>} label="Type" value={`${anime.type} (${anime.episodes || '?'})`} />
                    <InfoPill icon={<CalendarIcon className="w-6 h-6"/>} label="Aired" value={anime.aired.string} />
                    <InfoPill icon={<StarIcon className="w-6 h-6"/>} label="Rating" value={anime.rating} />
                </div>
                
                {/* Trailer */}
                {trailerEmbedUrl && (
                  <div className="my-6 animate-fade-in">
                    <h3 className="text-xl font-semibold text-white mb-3">Трейлер</h3>
                    <div className="relative rounded-lg overflow-hidden shadow-lg bg-black" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                      <iframe
                        src={trailerEmbedUrl}
                        title={`${anime.title} Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Synopsis & Relations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-semibold text-white mb-2">Synopsis</h3>
                        <p className="text-brand-light-gray text-sm leading-relaxed whitespace-pre-wrap">{anime.synopsis || 'No synopsis available.'}</p>
                    </div>
                    <div>
                         <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                            <LinkIcon className="w-5 h-5"/>
                            Relations
                        </h3>
                         {relations.length > 0 ? (
                            <div className="space-y-3">
                                {relations.map(rel => <RelationLink key={rel.relation} relation={rel.relation} entries={rel.entry} />)}
                            </div>
                         ) : <p className="text-brand-light-gray text-sm">No relations found.</p>}
                         <a href={anime.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-brand-purple hover:text-violet-400 font-semibold transition-colors">
                            View on MyAnimeList <ExternalLinkIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-brand-light-dark w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl overflow-y-auto relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors" aria-label="Close modal">
            <CloseIcon className="w-6 h-6"/>
        </button>
        {renderContent()}
      </div>
    </div>
  );
};
