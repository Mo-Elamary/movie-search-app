import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(movie) {
    setFavorites(prev => {
      if (prev.find(m => m.imdbID === movie.imdbID)) return prev;
      return [...prev, movie];
    });
  }

  function removeFavorite(imdbID) {
    setFavorites(prev => prev.filter(m => m.imdbID !== imdbID));
  }

  function isFavorite(imdbID) {
    return favorites.some(m => m.imdbID === imdbID);
  }

  const value = { favorites, addFavorite, removeFavorite, isFavorite };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
