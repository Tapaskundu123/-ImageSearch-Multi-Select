import React from 'react';
import './TopSearches.css';

const TopSearches = ({ searches, onSearchClick }) => {
  if (!searches || searches.length === 0) {
    return null;
  }

  return (
    <div className="top-searches-banner">
      <span className="banner-label">Top Searches:</span>
      <div className="search-tags">
        {searches.map((search, index) => (
          <button
            key={index}
            className="search-tag"
            onClick={() => onSearchClick(search.term)}
          >
            {search.term} ({search.count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopSearches;