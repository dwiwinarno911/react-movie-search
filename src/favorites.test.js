import { describe, it, expect } from 'vitest';

function toggleFav(favSet, imdbID) {
  const newSet = new Set(favSet);
  if (newSet.has(imdbID)) {
    newSet.delete(imdbID);
  } else {
    newSet.add(imdbID);
  }
  return newSet;
}

describe('toggleFav', () => {
  it('adds a movie to favorites', () => {
    const favSet = new Set();
    const updated = toggleFav(favSet, 'tt123');
    expect(updated.has('tt123')).toBe(true);
  });

  it('removes a movie from favorites', () => {
    const favSet = new Set(['tt123']);
    const updated = toggleFav(favSet, 'tt123');
    expect(updated.has('tt123')).toBe(false);
  });
});