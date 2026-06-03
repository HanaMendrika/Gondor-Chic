import { useState } from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({
  id,
  name,
  price,
  image,
  description,
  categories = [],
  rating = 4.5,
  maxRating = 5,
  onAddToCart,
  onQuickView,
  inStock = true,
  discount = null,
  variant = 'default',
  stock = null,
  isNew = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isInStock = stock !== undefined ? stock > 0 : inStock;

  const finalPrice = discount
    ? (price * (1 - discount / 100)).toFixed(2)
    : price?.toFixed?.(2) ?? price;

  const originalPrice = discount ? price : null;

  const getCategoriesArray = () => {
    if (Array.isArray(categories)) return categories;
    if (typeof categories === 'string') return [categories];
    return [];
  };

  const categoriesArray = getCategoriesArray();

  const renderRating = () => {
    const numericRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;
    const emptyStars = maxRating - Math.ceil(numericRating);

    return (
      <div className={styles['gc-rating']}>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className={`${styles['gc-star']} ${styles['gc-star--full']}`}>★</span>
        ))}
        {hasHalfStar && (
          <span className={`${styles['gc-star']} ${styles['gc-star--half']}`}>½</span>
        )}
        {[...Array(Math.max(0, emptyStars))].map((_, i) => (
          <span key={`empty-${i}`} className={`${styles['gc-star']} ${styles['gc-star--empty']}`}>☆</span>
        ))}
        <span className={styles['gc-rating-num']}>({numericRating.toFixed(1)})</span>
      </div>
    );
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    return text.length <= maxLength ? text : text.substring(0, maxLength) + '…';
  };

  const handleAddToCart = () => {
    if (onAddToCart && isInStock) {
      onAddToCart({
        id,
        name,
        price: parseFloat(finalPrice),
        originalPrice,
        quantity: 1,
        image,
        categories: categoriesArray,
      });
    }
  };

  const handleQuickView = () => {
    if (onQuickView) onQuickView(id);
  };

  const getImageSrc = () => {
    if (imageError) return 'https://img.magnific.com/free-photo/dark-grunge-texture-background-with-scratches-stains_1048-18915.jpg?w=360';
    if (!image) return 'https://img.magnific.com/free-photo/dark-grunge-texture-background-with-scratches-stains_1048-18915.jpg?w=360';
    return image;
  };

  const renderBadges = () => (
    <div className={styles['gc-badge']}>
      {discount && isInStock && (
        <div className={`${styles['gc-badge-pill']} ${styles['gc-badge-pill--discount']}`}>
          -{discount}%
        </div>
      )}
      {isNew && isInStock && (
        <div className={`${styles['gc-badge-pill']} ${styles['gc-badge-pill--new']}`}>
          Nouveau
        </div>
      )}
      {!isInStock && (
        <div className={`${styles['gc-badge-pill']} ${styles['gc-badge-pill--oos']}`}>
          Rupture
        </div>
      )}
    </div>
  );

  const renderCategories = () => {
    if (!categoriesArray.length) return null;
    return (
      <div className={styles['gc-categories']}>
        {categoriesArray.slice(0, 3).map((cat, i) => (
          <span key={i} className={styles['gc-cat-tag']}>{cat}</span>
        ))}
        {categoriesArray.length > 3 && (
          <span className={`${styles['gc-cat-tag']} ${styles['gc-cat-tag--more']}`}>
            +{categoriesArray.length - 3}
          </span>
        )}
      </div>
    );
  };

  const getCardClasses = () => {
    const cls = [styles['gc-product-card']];
    if (variant === 'compact') cls.push(styles['gc-product-card--compact']);
    if (variant === 'featured') cls.push(styles['gc-product-card--featured']);
    if (!isInStock) cls.push(styles['gc-product-card--out-of-stock']);
    return cls.join(' ');
  };

  return (
    <div
      className={getCardClasses()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className={styles['gc-image-container']}>
        <img
          src={getImageSrc()}
          alt={name}
          className={styles['gc-product-image']}
          loading="lazy"
          onError={() => setImageError(true)}
        />
        <div className={styles['gc-image-fade']} />
        {renderBadges()}
        {onQuickView && isHovered && isInStock && (
          <button className={styles['gc-quick-view-btn']} onClick={handleQuickView}>
            Vue Rapide
          </button>
        )}
      </div>

      {/* Info */}
      <div className={styles['gc-info']}>
        <div className={styles['gc-divider']} />

        {renderCategories()}

        <h3 className={styles['gc-product-name']}>
          {truncateText(name, variant === 'compact' ? 30 : 40)}
        </h3>

        {description && variant !== 'compact' && (
          <p className={styles['gc-product-desc']}>
            {truncateText(description, variant === 'featured' ? 120 : 70)}
          </p>
        )}

        <div className={styles['gc-price-row']}>
          <div className={styles['gc-price-group']}>
            <span className={styles['gc-price']}>
              ${typeof finalPrice === 'number' ? finalPrice.toFixed(2) : finalPrice}
            </span>
            {originalPrice && (
              <span className={styles['gc-price-original']}>
                ${typeof originalPrice === 'number' ? originalPrice.toFixed(2) : originalPrice}
              </span>
            )}
          </div>
          {rating > 0 && renderRating()}
        </div>

        {isInStock && variant !== 'compact' && (
          <div className={styles['gc-stock']}>
            <span className={styles['gc-stock-dot']} />
            {stock !== undefined ? `${stock} en stock` : 'En stock'}
          </div>
        )}

        <button
          className={styles['gc-btn']}
          onClick={handleAddToCart}
          disabled={!isInStock}
        >
          {isInStock ? 'Ajouter au panier' : 'Rupture de stock'}
        </button>
      </div>

      {/* Decorative corners */}
      <div className={`${styles['gc-corner']} ${styles['gc-corner--tl']}`} />
      <div className={`${styles['gc-corner']} ${styles['gc-corner--bl']}`} />
      <div className={`${styles['gc-corner']} ${styles['gc-corner--br']}`} />
      <div className={`${styles['gc-corner']} ${styles['gc-corner--tr']}`} />
    </div>
  );
};

export default ProductCard;