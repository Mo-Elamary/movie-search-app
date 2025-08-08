// small wrapper for OMDb requests
const BASE = 'https://www.omdbapi.com/';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(query, page = 1) {
  if (!API_KEY) throw new Error('OMDb API key missing. Set VITE_OMDB_API_KEY in .env');
  const url = `${BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getMovieById(imdbID) {
  if (!API_KEY) throw new Error('OMDb API key missing. Set VITE_OMDB_API_KEY in .env');
  const url = `${BASE}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
