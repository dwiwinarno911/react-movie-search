import { describe, it, expect, vi, beforeEach } from 'vitest';

// Copy fetchMovies from App.jsx for testing
const API_URL = 'https://www.omdbapi.com/';
async function fetchMovies(query, signal) {
  const key = import.meta.env.VITE_OMDB_API_KEY;
  if (!key) throw new Error('Missing VITE_OMDB_API_KEY in .env');
  if (!query) return [];
  const url = `${API_URL}?apikey=${key}&s=${encodeURIComponent(query)}&type=movie`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  if (data.Response === 'False') throw new Error(data.Error || 'No results');
  return data.Search || [];
}

describe('fetchMovies', () => {
  beforeEach(() => {
    import.meta.env = { VITE_OMDB_API_KEY: 'testkey' };
  });

  it('fetches movies from OMDb API', async () => {
    const mockMovies = [{ Title: 'Naruto', Year: '2002', imdbID: 'tt123' }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ Response: 'True', Search: mockMovies }),
      })
    );

    const result = await fetchMovies('naruto');
    expect(result).toEqual(mockMovies);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('naruto'),
      expect.any(Object)
    );
  });

  it('returns empty array for empty query', async () => {
    const result = await fetchMovies('');
    expect(result).toEqual([]);
  });

  it('throws error if API key is missing', async () => {
    import.meta.env = {};
    await expect(fetchMovies('naruto')).rejects.toThrow('Missing VITE_OMDB_API_KEY in .env');
  });
});