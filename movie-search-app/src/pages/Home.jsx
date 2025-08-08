import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Spinner from '../components/Spinner';
import { searchMovies } from '../api/omdb';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { favorites } = useFavorites();

  useEffect(() => {
    // optional: load a default search on mount
    // search('batman');
  }, []);

  async function search(q) {
    setQuery(q);
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(q);
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'No results');
      }
    } catch (err) {
      setMovies([]);
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page home">
      <div className="header-row">
        <h1>Movie Explorer</h1>
        <Link className="fav-link" to="/favorites">
          Favorites ({favorites.length})
        </Link>
      </div>

      <SearchBar onSearch={search} initial={query} />

      {loading && <Spinner />}

      {error && <div className="error">{error}</div>}

      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}
