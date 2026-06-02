import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  description, 
  categories = [], // Changé: categories est maintenant un tableau
  rating = 4.5,
  maxRating = 5,
  onAddToCart,
  onQuickView,
  inStock = true,
  discount = null,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const finalPrice = discount 
    ? (price * (1 - discount / 100)).toFixed(2)
    : price;
  
  const originalPrice = discount ? price : null;

  const renderRating = () => {
    const numericRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = (numericRating % 1) >= 0.5;
    const emptyStars = maxRating - Math.ceil(numericRating);
    
    return (
      <div className="gc-product-rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="gc-star gc-star-full">★</span>
        ))}
        {hasHalfStar && <span key="half" className="gc-star gc-star-half">½</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="gc-star gc-star-empty">☆</span>
        ))}
        <span className="gc-rating-text">({numericRating.toFixed(1)})</span>
      </div>
    );
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleAddToCart = () => {
    if (onAddToCart && inStock) {
      onAddToCart({ id, name, price: finalPrice, quantity: 1, image, categories });
    }
  };

  const handleQuickView = () => {
    if (onQuickView && inStock) {
      onQuickView(id);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) return 'https://placehold.co/400x300/2a1a10/d4b896?text=No+Image';
    return image;
  };

  const getBadge = () => {
    if (discount && inStock) {
      return (
        <div className="gc-product-badge gc-product-badge--discount">
          -{discount}%
        </div>
      );
    }
    if (!inStock) {
      return (
        <div className="gc-product-badge gc-product-badge--out-of-stock">
          Out of Stock
        </div>
      );
    }
    return null;
  };

  // Rendu des catégories multiples
  const renderCategories = () => {
    if (!categories || categories.length === 0) return null;
    return (
      <div className="gc-product-categories">
        {categories.slice(0, 3).map((cat, index) => (
          <span key={index} className="gc-category-tag">{cat}</span>
        ))}
        {categories.length > 3 && (
          <span className="gc-category-tag gc-category-more">+{categories.length - 3}</span>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`gc-product-card gc-product-card--${variant} ${!inStock ? 'gc-product-card--out-of-stock' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="gc-product-image-container">
        <img 
          src={getImageSrc()} 
          alt={name} 
          className="gc-product-image"
          loading="lazy"
          onError={handleImageError}
        />
        
        {getBadge()}

        {onQuickView && isHovered && inStock && (
          <button 
            className="gc-quick-view-btn"
            onClick={handleQuickView}
          >
            Quick View
          </button>
        )}
      </div>

      <div className="gc-product-info">
        <h3 className="gc-product-name">{truncateText(name, 40)}</h3>
        
        {renderCategories()}
        
        {description && variant !== 'compact' && (
          <p className="gc-product-description">
            {truncateText(description, variant === 'featured' ? 120 : 70)}
          </p>
        )}

        <div className="gc-product-price-row">
          <div className="gc-price-container">
            <span className="gc-product-price">
              ${typeof finalPrice === 'number' ? finalPrice.toFixed(2) : parseFloat(finalPrice).toFixed(2)}
            </span>
            {originalPrice && (
              <span className="gc-product-price--original">
                ${typeof originalPrice === 'number' ? originalPrice.toFixed(2) : parseFloat(originalPrice).toFixed(2)}
              </span>
            )}
          </div>
          
          {rating > 0 && renderRating()}
        </div>

        {inStock && variant !== 'compact' && (
          <div className="gc-stock-indicator">
            <span className="gc-stock-dot"></span>
            In Stock
          </div>
        )}

        <button 
          className="gc-product-button"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          {!inStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>

      <div className="gc-cross gc-cross--tl"></div>
      <div className="gc-cross gc-cross--bl"></div>
      <div className="gc-cross gc-cross--br"></div>
    </div>
  );
};

export default ProductCard;