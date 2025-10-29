import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, loading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search for images..."
        disabled={loading}
        className="search-input"
      />
      <button type="submit" disabled={loading || !term.trim()} className="search-button">
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;