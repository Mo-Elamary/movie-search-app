import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../api/omdb';
import Spinner from '../components/Spinner';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieById(id);
        if (data.Response === 'True') setMovie(data);
        else setError(data.Error || 'Not found');
      } catch (err) {
        setError(err.message || 'Failed to fetch details');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function toggleFav() {
    if (!movie) return;
    if (isFavorite(movie.imdbID)) removeFavorite(movie.imdbID);
    else addFavorite({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster
    });
  }

  if (loading) return <Spinner />;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return null;

  return (
    <div className="page details">
      <Link to="/">← Back</Link>
      <div className="details-grid">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
          alt={`${movie.Title} poster`}
          className="details-poster"
        />
        <div className="details-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <button onClick={toggleFav}>
            {isFavorite(movie.imdbID) ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}
