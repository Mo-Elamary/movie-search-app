import React, { useState } from 'react';

export default function SearchBar({ onSearch, initial = '' }) {
  const [query, setQuery] = useState(initial);

  function submit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <input
        aria-label="search"
        placeholder="Search movies (e.g., Inception)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
