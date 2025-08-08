import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map(m => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </div>
  );
}
