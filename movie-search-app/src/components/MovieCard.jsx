import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieCard({ movie }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const fav = isFavorite(movie.imdbID);

  function toggleFav(e) {
    e.preventDefault(); // prevent clicking the card's link when toggling
    if (fav) removeFavorite(movie.imdbID);
    else addFavorite(movie);
  }

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
          alt={`${movie.Title} poster`}
          className="poster"
        />
        <div className="card-body">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </Link>

      <button className="fav-btn" onClick={toggleFav}>
        {fav ? '★ Remove' : '☆ Favorite'}
      </button>
    </div>
  );
}
