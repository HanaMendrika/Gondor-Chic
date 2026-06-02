import React from 'react';
import './ProductCard.css';

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  description, 
  category,
  onAddToCart 
}) => {
  return (
    <div className="gc-product-card">
      <div className="gc-product-image-container">
        <img 
          src={image} 
          alt={name} 
          className="gc-product-image"
        />
        {category && (
          <div className="gc-product-badge">{category}</div>
        )}
      </div>

      <div className="gc-product-info">
        <h3 className="gc-product-name">{name}</h3>
        
        {description && (
          <p className="gc-product-description">{description}</p>
        )}

        <div className="gc-product-price-row">
          <span className="gc-product-price">{price} ₷</span>
          {/* Optional: Rating */}
          <div className="gc-product-rating">★★★★☆</div>
        </div>

        <button 
          className="gc-product-button"
          onClick={() => onAddToCart?.(id)}
        >
          Add to Cart
        </button>
      </div>

      {/* Decorative crosses */}
      <div className="gc-cross gc-cross--bl"></div>
      <div className="gc-cross gc-cross--br"></div>
    </div>
  );
};

export default ProductCard;