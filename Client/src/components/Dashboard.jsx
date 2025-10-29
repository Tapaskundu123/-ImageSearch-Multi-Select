import React, { useState, useEffect } from 'react';
import { searchService, authService } from '../services/api';
import TopSearches from './TopSearches';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import SearchHistory from './SearchHistory';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [topSearches, setTopSearches] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTopSearches();
    loadHistory();
  }, []);

  const loadTopSearches = async () => {
    try {
      const response = await searchService.getTopSearches();
      setTopSearches(response.data.topSearches);
    } catch (err) {
      console.error('Failed to load top searches:', err);
    }
  };

  const loadHistory = async () => {
    try {
      const response = await searchService.getHistory();
      setHistory(response.data.history);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const handleSearch = async (term) => {
    setLoading(true);
    setSelectedImages([]);
    try {
      const response = await searchService.search(term);
      setSearchResults(response.data);
      loadTopSearches();
      loadHistory();
    } catch (err) {
      console.error('Search failed:', err);
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      onLogout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Image Search</h1>
        <div className="user-info">
          {user.avatar && <img src={user.avatar} alt={user.name} />}
          <span>{user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <TopSearches searches={topSearches} onSearchClick={handleSearch} />

      <div className="main-content">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} loading={loading} />

          {searchResults && (
            <div className="results-header">
              <h2>You searched for "{searchResults.term}" -- {searchResults.count} results.</h2>
              {selectedImages.length > 0 && (
                <div className="selection-counter">
                  Selected: {selectedImages.length} images
                </div>
              )}
            </div>
          )}

          {loading && <div className="loading">Searching...</div>}

          {searchResults && !loading && (
            <ImageGrid
              images={searchResults.images}
              selectedImages={selectedImages}
              onImageSelect={handleImageSelect}
            />
          )}
        </div>

        <SearchHistory history={history} onSearchClick={handleSearch} />
      </div>
    </div>
  );
};

export default Dashboard;