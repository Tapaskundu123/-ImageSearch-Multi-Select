import React from 'react';
import './ImageGrid.css';

const ImageGrid = ({ images, selectedImages, onImageSelect }) => {
  if (!images || images.length === 0) {
    return <div className="no-results">No images found. Try a different search term.</div>;
  }

  return (
    <div className="image-grid">
      {images.map((image) => (
        <div
          key={image.id}
          className={`image-card ${selectedImages.includes(image.id) ? 'selected' : ''}`}
          onClick={() => onImageSelect(image.id)}
        >
          <img src={image.thumb} alt={image.alt} />
          <div className="image-overlay">
            <input
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              onChange={() => onImageSelect(image.id)}
              onClick={(e) => e.stopPropagation()}
              className="image-checkbox"
            />
          </div>
          <div className="image-credit">
            Photo by <a href={image.photographerUrl} target="_blank" rel="noopener noreferrer">
              {image.photographer}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;