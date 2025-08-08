import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { useFavorites } from './context/FavoritesContext';
import MovieList from './components/MovieList';

export default function App() {
  const { favorites } = useFavorites();

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        {/* simple favorites page implemented inline */}
        <Route
          path="/favorites"
          element={
            <div className="page">
              <h1>Your Favorites</h1>
              {favorites.length === 0 ? (
                <p>No favorites yet. Add some from the search results.</p>
              ) : (
                <MovieList movies={favorites} />
              )}
              <p><a href="/">Back to search</a></p>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
