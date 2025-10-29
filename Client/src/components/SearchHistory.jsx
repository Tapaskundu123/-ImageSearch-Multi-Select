import React from 'react';
import './SearchHistory.css';

const SearchHistory = ({ history, onSearchClick }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!history || history.length === 0) {
    return (
      <div className="search-history">
        <h3>Search History</h3>
        <p className="empty-history">No search history yet.</p>
      </div>
    );
  }

  return (
    <div className="search-history">
      <h3>Search History</h3>
      <div className="history-list">
        {history.map((item) => (
          <div
            key={item._id}
            className="history-item"
            onClick={() => onSearchClick(item.term)}
          >
            <div className="history-term">{item.term}</div>
            <div className="history-time">{formatDate(item.timestamp)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;