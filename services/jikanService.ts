import type { Anime, Genre, JikanResponse, JikanSingleResponse, JikanRelationsResponse } from '../types';

const API_BASE_URL = 'https://api.jikan.moe/v4';

const fetchWithRetry = async <T>(url: string, retries = 3, delay = 1000): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.status === 429) { // Too Many Requests
        console.warn(`Rate limited. Retrying in ${delay * (i + 1)}ms...`);
        await new Promise(res => setTimeout(res, delay * (i + 1)));
        continue;
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown API error' }));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
  throw new Error('Failed to fetch after multiple retries');
};


export const getAnime = async ({
    page = 1, 
    limit = 24, 
    query = '', 
    genres = [],
    orderBy = 'popularity',
    sort = 'asc',
} : {
    page?: number, 
    limit?: number, 
    query?: string, 
    genres?: number[],
    orderBy?: string,
    sort?: string,
}): Promise<JikanResponse<Anime[]>> => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        order_by: orderBy,
        sort: sort,
        sfw: 'true',
    });

    if (query) {
        params.append('q', query);
    }
    
    if (genres.length > 0) {
        params.append('genres', genres.join(','));
    }
    
    const url = `${API_BASE_URL}/anime?${params.toString()}`;
    return fetchWithRetry<JikanResponse<Anime[]>>(url);
};


export const getAnimeById = async (id: number): Promise<JikanSingleResponse<Anime>> => {
  const url = `${API_BASE_URL}/anime/${id}/full`;
  return fetchWithRetry<JikanSingleResponse<Anime>>(url);
};

export const getAnimeRelations = async (id: number): Promise<JikanRelationsResponse> => {
  const url = `${API_BASE_URL}/anime/${id}/relations`;
  return fetchWithRetry<JikanRelationsResponse>(url);
};

export const getGenres = async (): Promise<JikanResponse<Genre[]>> => {
  const url = `${API_BASE_URL}/genres/anime?filter=genres`;
  return fetchWithRetry<JikanResponse<Genre[]>>(url);
};